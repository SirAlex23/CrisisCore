"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, Clock, CheckCircle, XCircle, Brain } from "lucide-react";
import Link from "next/link";
import { getModulo, getEscenario } from "@/lib/modulos";
import type { RespuestaUsuario } from "@/lib/groq";
import type { Decision } from "@/lib/modulos";
import ResultScreen from "@/components/ResultScreen";

const TIEMPO_POR_DECISION = 60;

function barajarOpciones(decisiones: Decision[]): Decision[] {
  return decisiones.map((decision) => ({
    ...decision,
    opciones: [...decision.opciones].sort(() => Math.random() - 0.5),
  }));
}

export default function EscenarioPage() {
  const params = useParams();

  const moduloId = params.id as string;
  const escenarioId = params.escenarioId as string;

  const modulo = getModulo(moduloId);
  const escenario = getEscenario(moduloId, escenarioId);

  const [decisionesBarajadas] = useState(() =>
    escenario ? barajarOpciones(escenario.decisiones) : []
  );

  const [fase, setFase] = useState<"briefing" | "decisiones" | "resultado">("briefing");
  const [decisionActual, setDecisionActual] = useState(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<string | null>(null);
  const [mostrarImpacto, setMostrarImpacto] = useState(false);
  const [respuestas, setRespuestas] = useState<RespuestaUsuario[]>([]);
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_POR_DECISION);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);

  const handleTiempoAgotado = useCallback(() => {
    if (opcionSeleccionada || mostrarImpacto) return;
    setTiempoAgotado(true);
    const decision = decisionesBarajadas[decisionActual];
    const opcionIncorrecta = decision.opciones.find((o) => !o.esCorrecta) || decision.opciones[0];
    setOpcionSeleccionada(opcionIncorrecta.id);
    setMostrarImpacto(true);

    const nuevaRespuesta: RespuestaUsuario = {
      decision: decision.id,
      opcionElegida: opcionIncorrecta.id,
      esCorrecta: false,
      impacto: "Tiempo agotado — decision automática incorrecta.",
      textoDecision: decision.texto,
      textoOpcion: opcionIncorrecta.texto,
    };
    setRespuestas((prev) => [...prev, nuevaRespuesta]);
  }, [opcionSeleccionada, mostrarImpacto, decisionesBarajadas, decisionActual]);

  useEffect(() => {
    if (fase !== "decisiones" || mostrarImpacto) return;

    setTiempoRestante(TIEMPO_POR_DECISION);
    setTiempoAgotado(false);

    const interval = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTiempoAgotado();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fase, decisionActual, mostrarImpacto, handleTiempoAgotado]);

  if (!modulo || !escenario) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-400">Escenario no encontrado</p>
          <Link href="/" className="text-red-400 hover:text-red-300 text-sm underline">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  const handleSeleccionarOpcion = (opcionId: string) => {
    if (opcionSeleccionada || mostrarImpacto) return;

    const decision = decisionesBarajadas[decisionActual];
    const opcion = decision.opciones.find((o) => o.id === opcionId)!;

    setOpcionSeleccionada(opcionId);
    setMostrarImpacto(true);

    const nuevaRespuesta: RespuestaUsuario = {
      decision: decision.id,
      opcionElegida: opcionId,
      esCorrecta: opcion.esCorrecta,
      impacto: opcion.impacto,
      textoDecision: decision.texto,
      textoOpcion: opcion.texto,
    };
    setRespuestas((prev) => [...prev, nuevaRespuesta]);
  };

  const handleSiguienteDecision = () => {
    if (decisionActual < decisionesBarajadas.length - 1) {
      setDecisionActual((prev) => prev + 1);
      setOpcionSeleccionada(null);
      setMostrarImpacto(false);
      setTiempoAgotado(false);
    } else {
      setFase("resultado");
    }
  };

  const decision = decisionesBarajadas[decisionActual];
  const tiempoPorcentaje = (tiempoRestante / TIEMPO_POR_DECISION) * 100;
  const tiempoColor =
    tiempoRestante > 30 ? "bg-green-500" : tiempoRestante > 15 ? "bg-yellow-500" : "bg-red-500";

  if (fase === "resultado") {
    return (
      <ResultScreen
        escenario={escenario}
        modulo={modulo}
        respuestas={respuestas}
      />
    );
  }

  return (
    <main className="min-h-screen bg-black text-slate-200 overflow-x-hidden">

      <div
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <header className="relative z-10 border-b border-slate-800/60 backdrop-blur-md bg-black/40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/modulo/${moduloId}`}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Escenarios</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-lg">{modulo.icono}</span>
            <span className="text-sm font-bold text-white">{modulo.titulo}</span>
          </div>

          {fase === "decisiones" && (
            <div className="flex items-center gap-2 text-sm font-mono">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className={tiempoRestante <= 15 ? "text-red-400 font-bold" : "text-slate-300"}>
                {tiempoRestante}s
              </span>
            </div>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">

        {fase === "briefing" && (
          <motion.section
            key="briefing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 py-12 px-4"
          >
            <div className="max-w-3xl mx-auto space-y-8">

              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-slate-500 uppercase tracking-widest">
                    {modulo.titulo}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${
                    escenario.dificultad === "Básico"
                      ? "text-green-400 bg-green-500/10 border-green-500/20"
                      : escenario.dificultad === "Intermedio"
                      ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                      : "text-red-400 bg-red-500/10 border-red-500/20"
                  }`}>
                    {escenario.dificultad}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white">
                  {escenario.titulo}
                </h2>
              </div>

              <div className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                    Briefing del incidente
                  </span>
                </div>
                <p className="text-slate-200 leading-relaxed text-base">
                  {escenario.contexto}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Decisiones", value: `${decisionesBarajadas.length}` },
                  { label: "Tiempo por decisión", value: `${TIEMPO_POR_DECISION}s` },
                  { label: "Evaluación", value: "IA" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center"
                  >
                    <p className="text-xl font-black text-white">{item.value}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setFase("decisiones")}
                className="w-full py-4 bg-red-600/20 border border-red-500/40 text-red-400 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Iniciar simulación
              </button>
            </div>
          </motion.section>
        )}

        {fase === "decisiones" && (
          <motion.section
            key={`decision-${decisionActual}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="relative z-10 py-8 px-4"
          >
            <div className="max-w-3xl mx-auto space-y-6">

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Decision {decisionActual + 1} de {decisionesBarajadas.length}</span>
                  <span className="font-mono">{respuestas.filter((r) => r.esCorrecta).length} correctas</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-red-500 transition-all duration-300"
                    style={{ width: `${((decisionActual) / decisionesBarajadas.length) * 100}%` }}
                  />
                </div>
              </div>

              {!mostrarImpacto && (
                <div className="w-full bg-slate-800 rounded-full h-1">
                  <motion.div
                    className={`h-1 rounded-full ${tiempoColor} transition-colors duration-300`}
                    style={{ width: `${tiempoPorcentaje}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              )}

              <div className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl">
                <p className="text-base md:text-lg font-bold text-white leading-relaxed">
                  {decision.texto}
                </p>
              </div>

              <div className="space-y-3">
              {decision.opciones.map((opcion, index) => {
                  const letra = ["A", "B", "C"][index];
                  const seleccionada = opcionSeleccionada === opcion.id;
                  const correcta = opcion.esCorrecta;
                  const mostrar = mostrarImpacto;

                  let clases =
                    "w-full p-4 rounded-xl border text-left transition-all duration-300 ";

                  if (!mostrar) {
                    clases +=
                      "bg-slate-900/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 cursor-pointer";
                  } else if (correcta) {
                    clases += "bg-green-500/10 border-green-500/40 cursor-default";
                  } else if (seleccionada && !correcta) {
                    clases += "bg-red-500/10 border-red-500/40 cursor-default";
                  } else {
                    clases += "bg-slate-900/20 border-slate-800 opacity-50 cursor-default";
                  }

                  return (
                    <button
                      key={opcion.id}
                      onClick={() => handleSeleccionarOpcion(opcion.id)}
                      className={clases}
                      disabled={!!mostrarImpacto}
                    >
                      <div className="flex items-start gap-3">
                      <span className="text-xs font-black font-mono text-slate-500 flex-shrink-0 mt-0.5 uppercase">
                        {letra}
                        </span>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${
                            mostrar && correcta
                              ? "text-green-300"
                              : mostrar && seleccionada && !correcta
                              ? "text-red-300"
                              : "text-slate-200"
                          }`}>
                            {opcion.texto}
                          </p>
                        </div>
                        {mostrar && correcta && (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        )}
                        {mostrar && seleccionada && !correcta && (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {mostrarImpacto && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${
                      respuestas[respuestas.length - 1]?.esCorrecta
                        ? "bg-green-500/10 border-green-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <p className={`text-sm leading-relaxed ${
                      respuestas[respuestas.length - 1]?.esCorrecta
                        ? "text-green-300"
                        : "text-red-300"
                    }`}>
                      {tiempoAgotado
                        ? "Tiempo agotado. En una crisis real, la inacción tiene consecuencias graves."
                        : respuestas[respuestas.length - 1]?.impacto}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {mostrarImpacto && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleSiguienteDecision}
                  className="w-full py-4 bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  {decisionActual < decisionesBarajadas.length - 1 ? (
                    <>
                      Siguiente decisión
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Ver evaluación IA
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}