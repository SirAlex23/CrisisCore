"use client";
 
interface Opcion {
  id: string;
  texto: string;
  esCorrecta: boolean;
  impacto: string;
}
 
interface DecisionPanelProps {
  texto: string;
  opciones: Opcion[];
  opcionSeleccionada: string | null;
  mostrarImpacto: boolean;
  onSeleccionar: (id: string) => void;
}
 
export default function DecisionPanel({
  texto,
  opciones,
  opcionSeleccionada,
  mostrarImpacto,
  onSeleccionar,
}: DecisionPanelProps) {
  return (
    <div className="space-y-4">
      <div className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl">
        <p className="text-base md:text-lg font-bold text-white leading-relaxed">
          {texto}
        </p>
      </div>
      <div className="space-y-3">
        {opciones.map((opcion) => {
          const seleccionada = opcionSeleccionada === opcion.id;
          const correcta = opcion.esCorrecta;
 
          let clases = "w-full p-4 rounded-xl border text-left transition-all duration-300 ";
          if (!mostrarImpacto) {
            clases += "bg-slate-900/40 border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 cursor-pointer";
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
              onClick={() => onSeleccionar(opcion.id)}
              className={clases}
              disabled={!!mostrarImpacto}
            >
              <div className="flex items-start gap-3">
                <span className="text-xs font-black font-mono text-slate-500 flex-shrink-0 mt-0.5 uppercase">
                  {opcion.id}
                </span>
                <p className={`text-sm font-medium ${
                  mostrarImpacto && correcta
                    ? "text-green-300"
                    : mostrarImpacto && seleccionada && !correcta
                    ? "text-red-300"
                    : "text-slate-200"
                }`}>
                  {opcion.texto}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}