import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `${email}@gmail.com`,
      to: "tiagoburlamaque79@gmail.com",
      subject: `Novo contato de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #71717a; padding-bottom: 10px;">
            Novo Formulário de Contato
          </h2>
          <div style="margin-top: 20px;">
            <p style="margin-bottom: 15px;"><strong style="display: inline-block; width: 80px;">Nome:</strong> ${name}</p>
            <p style="margin-bottom: 15px;"><strong style="display: inline-block; width: 80px;">Email:</strong> <a href="mailto:${email}" style="color: #71717a;">${email}</a></p>
            <p style="margin-bottom: 15px;"><strong style="display: inline-block; width: 80px;">Mensagem:</strong></p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 5px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            Enviado em: ${new Date().toLocaleString("pt-BR")}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
