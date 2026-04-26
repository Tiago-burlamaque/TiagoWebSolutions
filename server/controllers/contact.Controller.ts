import nodemailer from "nodemailer";
import type { Request, Response } from "express";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = String(process.env.SMTP_SECURE || "false") === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const MAIL_TO = process.env.MAIL_TO || "tiagoburlamaque79@gmail.com";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function healthController(_req: Request, res: Response) {
  return res.status(200).json({ ok: true, service: "server", message: "API online" });
}

export async function contactController(
  req: Request<unknown, unknown, ContactBody>,
  res: Response
) {
  try {
    const { name = "", email = "", message = "" } = req.body || {};

    if (!name.trim() || !email.trim() || !message.trim()) {
      return res.status(400).json({
        ok: false,
        error: "Campos obrigatórios: name, email, message",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        error: "Email inválido",
      });
    }

    if (!SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({
        ok: false,
        error: "SMTP não configurado. Defina SMTP_USER e SMTP_PASS no .env",
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Site Contato" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject: `Novo contato do site - ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <h2>Novo contato do formulário</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({
      ok: true,
      message: "Mensagem enviada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);

    const message =
      error instanceof Error ? error.message : "Erro interno ao enviar mensagem";

    return res.status(500).json({
      ok: false,
      error: message,
    });
  }
}
