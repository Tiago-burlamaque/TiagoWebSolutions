import validator from "validator";
import { z } from "zod";
import { sendMail } from "../providers/mail.provider.js";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(MAX_NAME_LENGTH),
  email: z.string().trim().min(1).max(MAX_EMAIL_LENGTH).email(),
  message: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
});

export type ContactInput = z.infer<typeof contactSchema>;

export class ContactValidationError extends Error {}
export class ContactServiceError extends Error {}

function escapeHtml(value: string): string {
  return validator.escape(value);
}

function toSafeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}

export async function executeContactService(input: unknown): Promise<void> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    throw new ContactValidationError("Dados inválidos no formulário de contato.");
  }

  const { name, email, message } = parsed.data;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessageText = message;
  const safeMessageHtml = toSafeHtmlMultiline(message);

  try {
    await sendMail({
      fromName: "Site Contato",
      replyTo: email,
      subject: `Novo contato do site - ${safeName}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${safeMessageText}`,
      html: `
        <h2>Novo contato do formulário</h2>
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${safeMessageHtml}</p>
      `,
    });
  } catch {
    throw new ContactServiceError("Falha ao enviar email.");
  }
}
