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
    <main className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 overflow-hidden">
      {/* Background Animated Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-rose-900/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-950/50 rounded-full blur-3xl"
        />
      </div>

      {/* Top Header / Brand */}
      <header className="relative z-10 flex justify-between items-center max-w-md w-full mx-auto pt-2">
        <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
          Interactive Documentary
        </span>
        <Link
          href="/support"
          className="text-xs text-rose-400 hover:text-rose-300 font-medium underline underline-offset-4"
        >
          Emergency Contacts
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-md w-full mx-auto my-auto py-8 flex flex-col justify-center">
        {/* Animated Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <span className="inline-block px-3 py-1 bg-rose-950/80 border border-rose-800/60 rounded-full text-[11px] font-mono text-rose-300 uppercase tracking-wider mb-4">
            Gender-Based Violence & Femicide Awareness
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3 leading-tight">
            SHADOWS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-400 to-amber-500">
              UNHEARD
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            An interactive exploration of systemic failure, societal pressure, and the final months of missing or killed women.
          </p>
        </motion.div>

        {/* Content Warning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <h2 className="text-xs uppercase tracking-wider font-semibold text-rose-400">
              Sensitive Content Notice
            </h2>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-5">
            This experience portrays realistic accounts of intimate partner violence, stalking, institutional neglect, and fatality. None of the character outcomes can be altered.
          </p>

          <label className="flex items-start gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition mb-6 group">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-600 focus:ring-rose-500"
            />
            <span className="text-xs text-slate-300 group-hover:text-white transition select-none leading-tight">
              I am prepared to engage with sensitive narrative material and understand the content warning.
            </span>
          </label>

          <button
            onClick={handleStart}
            disabled={!accepted}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              accepted
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/50 cursor-pointer scale-[1.01]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Begin Narrative Experience</span>
            <span className="text-sm">→</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Meta */}
      <footer className="relative z-10 text-center max-w-md w-full mx-auto pb-2">
        <p className="text-[10px] text-slate-500">
          Designed for high-impact educational awareness. Headphones recommended.
        </p>
      </footer>
    </main>
  );
}
