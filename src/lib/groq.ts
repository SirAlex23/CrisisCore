import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface RespuestaUsuario {
  decision: number;
  opcionElegida: string;
  esCorrecta: boolean;
  impacto: string;
  textoDecision: string;
  textoOpcion: string;
}

export interface InformeIA {
  puntuación: number;
  nivel: "Experto" | "Competente" | "Principiante";
  resumen: string;
  fortalezas: string[];
  mejoras: string[];
  consejo_final: string;
}

export async function generarInformeIA(
  escenarioTitulo: string,
  moduloTitulo: string,
  respuestas: RespuestaUsuario[]
): Promise<InformeIA> {
  const correctas = respuestas.filter((r) => r.esCorrecta).length;
  const total = respuestas.length;

  const resumenRespuestas = respuestas
    .map(
      (r, i) =>
        `Decision ${i + 1}: "${r.textoDecision}"
        Respuesta elegida: "${r.textoOpcion}"
        Correcta: ${r.esCorrecta ? "SI" : "NO"}
        Impacto: "${r.impacto}"`
    )
    .join("\n\n");

  const prompt = `Eres un experto en ciberseguridad y respuesta a incidentes evaluando a un profesional junior.
  
El usuario acaba de completar el escenario "${escenarioTitulo}" del modulo "${moduloTitulo}".
Ha acertado ${correctas} de ${total} decisiones.

Aquí están sus respuestas:
${resumenRespuestas}

Genera un informe de evaluación en JSON con exactamente esta estructura:
{
  "puntuación": numero del 0 al 100,
  "nivel": "Experto" si acertó 5-6, "Competente" si acertó 3-4, "Principiante" si acertó 0-2,
  "resumen": "2-3 frases evaluando su desempeño general de forma constructiva",
  "fortalezas": ["máximo 2 decisiones que tomo bien con explicación breve"],
  "mejoras": ["máximo 2 areas donde debe mejorar con consejo concreto"],
  "consejo_final": "1 frase de consejo practico para aplicar en la vida real"
}

Responde UNICAMENTE con el JSON, sin texto adicional, sin backticks.`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 800,
  });

  const content = completion.choices[0]?.message?.content || "";

  try {
    const clean = content.replace(/```json|```/g, "").trim();
    return JSON.parse(clean) as InformeIA;
  } catch {
    return {
      puntuación: Math.round((correctas / total) * 100),
      nivel: correctas >= 5 ? "Experto" : correctas >= 3 ? "Competente" : "Principiante",
      resumen: `Has completado el escenario con ${correctas} de ${total} decisiones correctas.`,
      fortalezas: ["Completaste el escenario"],
      mejoras: ["Revisa las decisiones incorrectas para mejorar"],
      consejo_final: "La practica continua es la clave para mejorar en respuesta a incidentes.",
    };
  }
}