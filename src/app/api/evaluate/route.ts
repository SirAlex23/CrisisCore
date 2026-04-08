import { NextRequest, NextResponse } from "next/server";
import { generarInformeIA } from "@/lib/groq";
import type { RespuestaUsuario } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { escenarioTitulo, moduloTitulo, respuestas } = await req.json();

    if (!escenarioTitulo || !moduloTitulo || !respuestas?.length) {
      return NextResponse.json(
        { error: "Faltan datos para generar el informe" },
        { status: 400 }
      );
    }

    const informe = await generarInformeIA(
      escenarioTitulo,
      moduloTitulo,
      respuestas as RespuestaUsuario[]
    );

    return NextResponse.json({ informe });

  } catch (error: any) {
    console.error("Error generando informe:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}