"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ChevronRight, ArrowLeft, Clock, Target } from "lucide-react";
import { getModulo } from "@/lib/modulos";

const dificultadColor = {
  Básico: "text-green-400 bg-green-500/10 border-green-500/20",
  Intermedio: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Avanzado: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function ModuloPage() {
  const params = useParams();
  const modulo = getModulo(params.id as string);

  if (!modulo) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-lg">Modulo no encontrado</p>
          <Link href="/" className="text-red-400 hover:text-red-300 text-sm underline">
            Volver al inicio
          </Link>
        </div>
      </main>
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

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/60 backdrop-blur-md bg-black/40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Volver</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-sm font-black text-white">
              Crisis<span className="text-red-400">Core</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero del modulo */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">{modulo.icono}</span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                  Modulo de entrenamiento
                </p>
                <h2 className={`text-3xl md:text-4xl font-black text-white`}>
                  {modulo.titulo}
                </h2>
              </div>
            </div>

            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
              {modulo.descripcion}
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <Target className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">
                  {modulo.escenarios.length} escenario{modulo.escenarios.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">6 decisiones por escenario</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Escenarios */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
            Escenarios disponibles
          </h3>

          {modulo.escenarios.map((escenario, index) => (
            <motion.div
              key={escenario.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/modulo/${modulo.id}/escenario/${escenario.id}`}>
                <div className="group p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-slate-600 hover:bg-slate-900/60 transition-all cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs text-slate-500 font-mono">
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${dificultadColor[escenario.dificultad]}`}>
                          {escenario.dificultad}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                        {escenario.titulo}
                      </h4>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {escenario.descripcion}
                      </p>

                      <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-slate-700 pl-3 mt-3">
                        {escenario.contexto.slice(0, 150)}...
                      </p>
                    </div>

                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-red-500/20 group-hover:border group-hover:border-red-500/40 transition-all">
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}