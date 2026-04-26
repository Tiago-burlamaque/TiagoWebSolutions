import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.VITE_API_URL || "http://localhost:3001";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = (await request.json()) as ContactPayload;

    // Validação de campos obrigatórios
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Chama o backend Express que gerencia o SMTP
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Erro ao enviar mensagem" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: data.message || "Mensagem enviada com sucesso!",
    });
  } catch (error: unknown) {
    console.error("Error contacting backend:", error);
    return NextResponse.json(
      {
        error: "Erro ao enviar mensagem. Tente novamente.",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}

