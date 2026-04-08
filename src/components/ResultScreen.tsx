"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  XCircle,
  Brain,
  Trophy,
  Target,
  ArrowLeft,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Escenario, Modulo } from "@/lib/modulos";
import type { RespuestaUsuario, InformeIA } from "@/lib/groq";

interface ResultScreenProps {
  escenario: Escenario;
  modulo: Modulo;
  respuestas: RespuestaUsuario[];
}

export default function ResultScreen({
  escenario,
  modulo,
  respuestas,
}: ResultScreenProps) {
  const [fase, setFase] = useState<"animacion" | "informe">("animacion");
  const [informe, setInforme] = useState<InformeIA | null>(null);
  const [cargandoIA, setCargandoIA] = useState(false);
  const [errorIA, setErrorIA] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const correctas = respuestas.filter((r) => r.esCorrecta).length;
  const total = respuestas.length;
  const neutralizado = correctas >= Math.ceil(total / 2);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFase("informe");
      generarInforme();
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const generarInforme = async () => {
    setCargandoIA(true);
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          escenarioTitulo: escenario.titulo,
          moduloTitulo: modulo.titulo,
          respuestas,
        }),
      });
      const data = await res.json();
      if (data.informe) {
        setInforme(data.informe);
      } else {
        setErrorIA(true);
      }
    } catch {
      setErrorIA(true);
    } finally {
      setCargandoIA(false);
    }
  };

  const nivelColor = {
    Experto: "text-green-400",
    Competente: "text-yellow-400",
    Principiante: "text-red-400",
  };

  const nivelBg = {
    Experto: "bg-green-500/10 border-green-500/30",
    Competente: "bg-yellow-500/10 border-yellow-500/30",
    Principiante: "bg-red-500/10 border-red-500/30",
  };

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

      <AnimatePresence mode="wait">

        {/* FASE ANIMACION */}
        {fase === "animacion" && (
          <motion.div
            key="animacion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Fondo de color */}
            <motion.div
              initial={{ scale: 0, borderRadius: "100%" }}
              animate={{ scale: 20, borderRadius: "0%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className={`absolute w-32 h-32 ${
                neutralizado ? "bg-green-500/20" : "bg-red-500/20"
              }`}
            />

            {/* Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`absolute inset-0 ${
                neutralizado
                  ? "bg-green-500/5"
                  : "bg-red-500/5"
              }`}
            />

            {/* Texto central */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.4 }}
              className="relative z-10 text-center space-y-6"
            >
              <motion.div
                animate={{ rotate: neutralizado ? [0, -10, 10, 0] : [0, -5, 5, 0] }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                {neutralizado ? (
                  <Shield className="w-24 h-24 text-green-400 mx-auto" />
                ) : (
                  <XCircle className="w-24 h-24 text-red-400 mx-auto" />
                )}
              </motion.div>

              <div className="space-y-2">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className={`text-4xl md:text-6xl font-black tracking-tighter ${
                    neutralizado ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {neutralizado ? "CIBERATAQUE" : "CIBERATAQUE"}
                </motion.h2>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className={`text-3xl md:text-5xl font-black tracking-tighter ${
                    neutralizado ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {neutralizado ? "NEUTRALIZADO" : "NO CONTENIDO"}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${
                  neutralizado
                    ? "bg-green-500/20 border-green-500/40 text-green-300"
                    : "bg-red-500/20 border-red-500/40 text-red-300"
                }`}
              >
                <span className="text-lg font-black">
                  {correctas}/{total} decisiones correctas
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                className="text-slate-400 text-sm"
              >
                Generando informe con IA...
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* FASE INFORME */}
        {fase === "informe" && (
          <motion.div
            key="informe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            {/* Header */}
            <header className="border-b border-slate-800/60 backdrop-blur-md bg-black/40">
              <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link
                  href={`/modulo/${modulo.id}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Volver</span>
                </Link>
                <span className="text-sm font-black text-white">
                  Crisis<span className="text-red-400">Core</span>
                </span>
              </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

              {/* Resultado principal */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`p-8 rounded-3xl border text-center space-y-4 ${
                  neutralizado
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <span className="text-5xl">{modulo.icono}</span>

                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">
                    {escenario.titulo}
                  </p>
                  <h2 className={`text-3xl font-black ${
                    neutralizado ? "text-green-400" : "text-red-400"
                  }`}>
                    {neutralizado ? "Ciberataque Neutralizado" : "Ciberataque No Contenido"}
                  </h2>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-black text-white">{correctas}/{total}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                      Decisiones correctas
                    </p>
                  </div>
                  {informe && (
                    <div className="text-center">
                      <p className="text-3xl font-black text-white">{informe.puntuación}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                        Puntuación
                      </p>
                    </div>
                  )}
                </div>

                {informe && (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${nivelBg[informe.nivel]}`}>
                    <Trophy className={`w-4 h-4 ${nivelColor[informe.nivel]}`} />
                    <span className={`text-sm font-bold ${nivelColor[informe.nivel]}`}>
                      Nivel: {informe.nivel}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Informe IA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest">
                    Evaluación de la IA
                  </h3>
                </div>

                {cargandoIA && (
                  <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                    <p className="text-sm text-slate-400">
                      Analizando tus decisiones...
                    </p>
                  </div>
                )}

                {errorIA && (
                  <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                    <p className="text-sm text-slate-400">
                      No se pudo generar el informe IA. Revisa tu conexión e inténtalo de nuevo.
                    </p>
                  </div>
                )}

                {informe && !cargandoIA && (
                  <div className="space-y-4">

                    {/* Resumen */}
                    <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {informe.resumen}
                      </p>
                    </div>

                    {/* Fortalezas y mejoras */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
                            Fortalezas
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {informe.fortalezas.map((f, i) => (
                            <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                              <span className="text-green-500 flex-shrink-0">·</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-orange-400" />
                          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                            Áreas de mejora
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {informe.mejoras.map((m, i) => (
                            <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                              <span className="text-orange-500 flex-shrink-0">·</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Consejo final */}
                    <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                          Consejo final
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed italic">
                        "{informe.consejo_final}"
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Detalle de decisiones */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setMostrarDetalle(!mostrarDetalle)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-800/40 transition-all"
                >
                  <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                    Detalle de decisiones
                  </span>
                  {mostrarDetalle ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <AnimatePresence>
                  {mostrarDetalle && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-3 border-t border-slate-800">
                        {respuestas.map((r, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-xl border mt-3 ${
                              r.esCorrecta
                                ? "bg-green-500/5 border-green-500/20"
                                : "bg-red-500/5 border-red-500/20"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {r.esCorrecta ? (
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                              )}
                              <div className="space-y-1">
                                <p className="text-xs text-slate-400 font-mono">
                                  Decision {i + 1}
                                </p>
                                <p className="text-sm text-slate-200 font-medium">
                                  {r.textoOpcion}
                                </p>
                                <p className={`text-xs leading-relaxed ${
                                  r.esCorrecta ? "text-green-400" : "text-red-400"
                                }`}>
                                  {r.impacto}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Acciones */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <Link href={`/modulo/${modulo.id}/escenario/${escenario.id}`}>
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-slate-700 transition-all">
                    <RotateCcw className="w-4 h-4" />
                    Repetir escenario
                  </button>
                </Link>

                <Link href={`/modulo/${modulo.id}`}>
                  <button className="w-full flex items-center justify-center gap-2 py-4 bg-red-600/20 border border-red-500/40 text-red-400 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-red-600/30 transition-all">
                    <Shield className="w-4 h-4" />
                    Otro escenario
                  </button>
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}