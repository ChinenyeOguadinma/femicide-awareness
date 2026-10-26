'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import Link from 'next/link';

export default function CoverPage() {
  const router = useRouter();
  const acceptWarning = useGameStore((state) => state.acceptWarning);
  const [accepted, setAccepted] = useState(false);

  const handleStart = () => {
    if (!accepted) return;
    acceptWarning();
    router.push('/choose');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white">
      {/* Editorial Navigation Panel */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-rose-600 rounded-sm" />
            <span className="text-xs uppercase font-mono tracking-widest text-slate-200 font-bold">
              Dataphyte <span className="text-rose-500 font-normal">Interactive</span>
            </span>
          </div>

          <nav className="flex items-center gap-6 text-xs font-medium">
            <Link href="/choose" className="text-slate-300 hover:text-white transition">
              Characters
            </Link>
            <Link href="/data-story" className="text-slate-300 hover:text-white transition">
              Data Story
            </Link>
            <Link href="/support" className="text-rose-400 hover:text-rose-300 transition">
              Support Line
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section Container */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col justify-center items-center text-center">
        {/* Category Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-rose-400 text-xs font-mono mb-6 shadow-inner"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <span>Special Investigative Report & Simulation</span>
        </motion.div>

        {/* Main Title Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-none"
        >
          Shadows <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500">Unheard</span>
        </motion.h1>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          An immersive narrative data project tracking systemic failure, institutional loops, and the final months of women lost to gender-based violence and femicide in Nigeria.
        </motion.p>

        {/* Interactive Warning Card & Entry Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-lg bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl text-left shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 to-amber-500" />
          
          <h3 className="text-xs uppercase tracking-wider font-mono text-rose-400 font-semibold mb-2">
            Editorial Content Advisory
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-6">
            This experience contains realistic simulations of intimate partner pressure, stalking, digital harassment, and fatality. Outcomes cannot be altered, mirroring real-world structural limitations.
          </p>

          <label className="flex items-start gap-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 cursor-pointer hover:border-slate-700 transition mb-6 group">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-600 focus:ring-rose-500 accent-rose-600 cursor-pointer"
            />
            <span className="text-xs text-slate-300 group-hover:text-white transition select-none leading-tight">
              I acknowledge the sensitivity of this simulation and am ready to proceed.
            </span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStart}
              disabled={!accepted}
              className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                accepted
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/60 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
              }`}
            >
              <span>Launch Experience</span>
              <span>→</span>
            </button>

            <Link
              href="/data-story"
              className="py-3.5 px-5 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition text-center flex items-center justify-center"
            >
              Read Data Story
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-400">
        <p>Built with verifiable security and empirical research references. Confidential support lines accessible globally.</p>
      </footer>
    </div>
  );
}
