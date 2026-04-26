const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase admin client (service role key for server-side operations)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Email transporter - Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Save to Supabase
    const { data: contact, error: dbError } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          message,
          sent_email: true,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      // Continue anyway - email is more important
    }

    // Send email notification
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      replyTo: email,
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
          ${contact ? `<p style="margin-top: 10px; color: #666; font-size: 12px;">ID no banco: ${contact.id}</p>` : ""}
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Erro ao enviar mensagem. Tente novamente." });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
