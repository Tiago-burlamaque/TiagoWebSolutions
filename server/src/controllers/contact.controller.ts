import type { Request, Response } from "express";
import { ContactValidationError, executeContactService } from "../services/contact.service.js";
import { logger } from "../config/logger.js";
import { enqueueContactEmail } from "../queue/contact.queue.js";
import { env } from "../config/env.js";

export function healthController(_req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    service: "server",
    message: "API online",
  });
}

export async function contactController(req: Request, res: Response) {
  try {
    const body = req.body as { name?: string; email?: string; message?: string };

    if (!body?.name || !body?.email || !body?.message) {
      throw new ContactValidationError("Campos obrigatórios ausentes.");
    }

    if (env.REDIS_ENABLED) {
      const job = await enqueueContactEmail({
        name: body.name,
        email: body.email,
        message: body.message,
      });

      return res.status(202).json({
        ok: true,
        message: "Mensagem recebida e enfileirada para envio.",
        jobId: job.id,
      });
    }

    if (env.MAIL_ENABLED) {
      await executeContactService({
        name: body.name,
        email: body.email,
        message: body.message,
      });

      return res.status(200).json({
        ok: true,
        message: "Mensagem recebida e enviada com sucesso.",
      });
    }

    logger.info("contact_received_without_external_delivery", {
      mode: "redis_disabled_mail_disabled",
    });

    return res.status(200).json({
      ok: true,
      message: "Mensagem recebida com sucesso.",
    });
  } catch (error) {
    if (error instanceof ContactValidationError) {
      return res.status(400).json({
        ok: false,
        error: "Dados inválidos. Verifique os campos e tente novamente.",
      });
    }

    logger.error("contact_queue_error", {
      error: error instanceof Error ? error.message : "unknown_error",
    });

    return res.status(500).json({
      ok: false,
      error: "Não foi possível enviar.",
    });
  }
}
