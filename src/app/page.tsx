"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Brain, Trophy, ChevronRight,AlertTriangle} from "lucide-react";
import { modulos } from "@/lib/modulos";

export default function Home() {
  const [hoveredModulo, setHoveredModulo] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-slate-200 overflow-x-hidden">

      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow rojo top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[150px] rounded-full z-0 pointer-events-none" />

      <header className="relative z-10 border-b border-slate-800/60 backdrop-blur-md bg-black/40">
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
    {/* Logo - izquierda */}
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
        <Shield className="w-5 h-5 text-red-400" />
      </div>
      <div>
        <h1 className="text-base font-black tracking-tight text-white">
          Crisis<span className="text-red-400">Core</span>
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          Incident Response Simulator
        </p>
      </div>
    </div>

    {/* Grupo de iconos + estado - derecha */}
    <div className="flex items-center gap-3">
      {/* Icono GitHub */}
      <a
        href="https://github.com/SirAlex23"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-slate-700 hover:border-slate-500 transition-all"
      >
        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      </a>

      {/* Icono LinkedIn */}
      <a
        href="https://www.linkedin.com/in/alejandro-crespo-574958388"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg border border-slate-700 hover:border-slate-500 transition-all"
      >
        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      {/* Indicador de estado */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-xs text-red-400 font-bold uppercase tracking-widest">
          Sistema Activo
        </span>
      </div>
    </div>
  </div>
</header>

      {/* Hero */}
      <section className="relative z-10 py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold tracking-widest uppercase">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Plataforma de Entrenamiento en Ciberseguridad
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
            ¿Sabrías defender
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              tu empresa?
            </span>
          </h2>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Enfréntate a ciberataques reales y toma decisiones críticas bajo presión.
            Cada decisión tiene consecuencias. La IA evaluará tu respuesta.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
            {[
              { icon: Shield, label: "Módulos", value: "10", color: "text-red-400" },
              { icon: Zap, label: "Escenarios", value: "60", color: "text-orange-400" },
              { icon: Brain, label: "Decisiones", value: "6", color: "text-yellow-400" },
              { icon: Trophy, label: "Evaluación IA", value: "Real", color: "text-green-400" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#modulos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-600/20 border border-red-500/40 text-red-400 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-red-600/30 transition-all"
            >
              Comenzar entrenamiento
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Modulos */}
      <section id="modulos" className="relative z-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-3">
              Módulos de Ataque
            </h3>
            <p className="text-slate-400 text-sm">
              Selecciona un tipo de ataque para ver los escenarios disponibles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modulos.map((modulo, index) => (
              <motion.div
                key={modulo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHoveredModulo(modulo.id)}
                onHoverEnd={() => setHoveredModulo(null)}
              >
                <Link href={`/modulo/${modulo.id}`}>
                  <div className={`p-6 bg-slate-900/40 border rounded-2xl cursor-pointer transition-all duration-300 h-full ${
                    hoveredModulo === modulo.id
                      ? `${modulo.colorBg} scale-[1.02]`
                      : "border-slate-800 hover:border-slate-600"
                  }`}>

                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{modulo.icono}</span>
                      <span className="text-xs text-slate-500 font-mono bg-slate-800/60 px-2 py-1 rounded-lg">
                        {modulo.escenarios.length} escenario{modulo.escenarios.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <h4 className={`text-base font-black text-white mb-2 ${
                      hoveredModulo === modulo.id ? modulo.color : ""
                    } transition-colors`}>
                      {modulo.titulo}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {modulo.descripcion}
                    </p>

                    <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors ${
                      hoveredModulo === modulo.id ? modulo.color : "text-slate-600"
                    }`}>
                      <span>Ver escenarios</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-8">
            <h3 className="text-lg font-black text-white uppercase tracking-widest text-center">
              Como funciona
            </h3>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Elige un módulo",
                  desc: "Selecciona el tipo de ciberataque que quieres practicar. Desde ransomware hasta APTs.",
                  color: "text-red-400",
                },
                {
                  step: "02",
                  title: "Enfrenta el escenario",
                  desc: "Se te presenta una situación real con contexto detallado. El reloj corre.",
                  color: "text-orange-400",
                },
                {
                  step: "03",
                  title: "Toma 6 decisiones criticas",
                  desc: "Cada decisión tiene consecuencias. No hay respuestas obvias — piensa como un profesional.",
                  color: "text-yellow-400",
                },
                {
                  step: "04",
                  title: "Recibe tu evaluación",
                  desc: "La IA analiza todas tus decisiones y genera un informe personalizado con fortalezas y áreas de mejora.",
                  color: "text-green-400",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <span className={`text-sm font-black font-mono ${item.color} flex-shrink-0 mt-0.5`}>
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white mb-1">{item.title}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 uppercase tracking-widest">
            CrisisCore — Simulador de Respuesta a Incidentes
          </p>
          <p className="text-sm text-slate-500 uppercase tracking-widest">
            By{" "}
            <a
              href="https://github.com/SirAlex23"
              className="text-slate-300 hover:text-white transition-colors"
            >
              SirAlex23
            </a>{" "}
            · 2026
          </p>
        </div>
      </footer>

    </main>
  );
}
