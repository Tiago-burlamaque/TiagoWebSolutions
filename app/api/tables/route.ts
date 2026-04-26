import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.rpc("exec_sql", {
      query: `
        select table_name
        from information_schema.tables
        where table_schema = 'public'
        order by table_name;
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Erro ao buscar tabelas", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      tables: data ?? [],
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Falha ao listar tabelas",
        details: getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
