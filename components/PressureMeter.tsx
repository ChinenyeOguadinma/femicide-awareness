'use client';
import React from 'react';
import { useGameStore } from '@/store/useGameStore';

export default function PressureMeter() {
  const pressure = useGameStore((state) => state.pressure);

  const totalPressure = Object.values(pressure).reduce<number>(
    (acc, val) => acc + (val ?? 0),
    0
  );

  const maxPressure = 100;
  const percentage = Math.min(Math.round((totalPressure / maxPressure) * 100), 100);

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 p-3 rounded-xl mb-4 text-xs">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
          Institutional Pressure
        </span>
        <span className="font-mono text-rose-400 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-amber-600 to-rose-600 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-[10px] text-slate-500 mt-1 italic">
        Measures outside pressure from institutions, family, and social channels.
      </p>
    </div>
  );
}
