"use client";
import Link from "next/link";
import type { Modulo } from "@/lib/modulos";
 
interface ModuloCardProps {
  modulo: Modulo;
}
 
export default function ModuloCard({ modulo }: ModuloCardProps) {
  return (
    <Link href={`/modulo/${modulo.id}`}>
      <div className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${modulo.colorBg}`}>
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{modulo.icono}</span>
          <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
            {modulo.escenarios.length} escenarios
          </span>
        </div>
        <h3 className={`text-lg font-black mb-2 ${modulo.color}`}>
          {modulo.titulo}
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {modulo.descripcion}
        </p>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Ver escenarios →
        </span>
      </div>
    </Link>
  );
}