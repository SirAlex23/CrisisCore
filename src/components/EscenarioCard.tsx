"use client";
import Link from "next/link";
import type { Escenario } from "@/lib/modulos";
 
interface EscenarioCardProps {
  escenario: Escenario;
  moduloId: string;
  numero: number;
}
 
export default function EscenarioCard({ escenario, moduloId, numero }: EscenarioCardProps) {
  const dificultadColor =
    escenario.dificultad === "Básico"
      ? "text-green-400 bg-green-500/10 border-green-500/20"
      : escenario.dificultad === "Intermedio"
      ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      : "text-red-400 bg-red-500/10 border-red-500/20";
 
  return (
    <Link href={`/modulo/${moduloId}/escenario/${escenario.id}`}>
      <div className="p-5 bg-slate-900/60 border border-slate-700 rounded-2xl cursor-pointer hover:border-slate-500 hover:bg-slate-800/60 transition-all duration-300 group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black font-mono text-slate-600">
              #{String(numero).padStart(2, "0")}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${dificultadColor}`}>
              {escenario.dificultad}
            </span>
          </div>
          <span className="text-slate-600 group-hover:text-slate-400 transition-colors text-lg">
            →
          </span>
        </div>
        <h3 className="text-white font-bold text-base mb-1">
          {escenario.titulo}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          {escenario.descripcion}
        </p>
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 border-l-2 border-slate-700 pl-3">
          {escenario.contexto}
        </p>
      </div>
    </Link>
  );
}