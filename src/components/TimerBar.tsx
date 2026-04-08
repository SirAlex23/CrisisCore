"use client";
import { motion } from "framer-motion";
 
interface TimerBarProps {
  tiempoRestante: number;
  tiempoTotal: number;
}
 
export default function TimerBar({ tiempoRestante, tiempoTotal }: TimerBarProps) {
  const porcentaje = (tiempoRestante / tiempoTotal) * 100;
  const color =
    tiempoRestante > 30
      ? "bg-green-500"
      : tiempoRestante > 15
      ? "bg-yellow-500"
      : "bg-red-500";
 
  return (
    <div className="w-full bg-slate-800 rounded-full h-1">
      <motion.div
        className={`h-1 rounded-full ${color} transition-colors duration-300`}
        style={{ width: `${porcentaje}%` }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}