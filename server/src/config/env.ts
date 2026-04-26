import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3001),

  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_SECURE: z
    .string()
    .default("true")
    .transform((value) => value === "true"),
  SMTP_USER: z.string().min(1, "SMTP_USER é obrigatório"),
  SMTP_PASS: z.string().min(1, "SMTP_PASS é obrigatório"),
  MAIL_TO: z.string().email().optional(),
  MAIL_ENABLED: z
    .string()
    .default("false")
    .transform((value) => value === "true"),

  REDIS_URL: z.string().default("redis://127.0.0.1:6379"),
  REDIS_ENABLED: z
    .string()
    .default("false")
    .transform((value) => value === "true"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(" | ");
  throw new Error(`[env] configuração inválida: ${issues}`);
}

export const env = {
  ...parsed.data,
  MAIL_TO: parsed.data.MAIL_TO || parsed.data.SMTP_USER,
};
