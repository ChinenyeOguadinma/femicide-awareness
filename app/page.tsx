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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.6)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-red)]" />
              Special investigative report
            </div>

            <h1 className="max-w-xl text-5xl font-black tracking-[-0.07em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
              Shadows
              <span className="mt-2 block text-[var(--brand-red)]">Unheard</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              An immersive data story and narrative simulation tracing the conditions, pressure, and
              institutional failures behind femicide and gender-based violence in Nigeria.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleStart}
                disabled={!accepted}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all ${
                  accepted
                    ? 'bg-[var(--brand-red)] text-white shadow-[0_18px_35px_rgba(198,55,45,0.2)] hover:translate-y-[-1px] hover:bg-[var(--brand-red-deep)]'
                    : 'cursor-not-allowed bg-[#d9d2c8] text-[#7a746d]'
                }`}
              >
                Launch experience
              </button>

              <Link
                href="/data-story"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:border-[rgba(23,22,17,0.2)] hover:bg-[var(--panel-strong)]"
              >
                Read data story
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#c6372d_0%,#d58d5d_100%)]" />

            <div className="mb-5 flex items-center justify-between border-b border-[var(--line)] pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Editorial advisory
                </p>
              </div>
              <span className="rounded-full bg-[rgba(198,55,45,0.08)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-red)]">
                sensitive content
              </span>
            </div>

            <p className="text-sm leading-7 text-[var(--muted)]">
              This experience contains realistic simulations of coercion, stalking, digital abuse, and
              fatal violence. The decisions shown here mirror the structural realities many women face,
              including delayed institutional action and the social systems that normalize harm.
            </p>

            <label className="mt-6 flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-strong)] p-4 transition hover:border-[rgba(23,22,17,0.2)]">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--brand-red)]"
              />
              <span className="text-sm leading-6 text-[var(--ink)]">
                I acknowledge the sensitivity of this simulation and am ready to proceed.
              </span>
            </label>

            <div className="mt-6 grid gap-3 border-t border-[var(--line)] pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] sm:grid-cols-3">
              <div>
                <span className="block text-[10px] text-[var(--muted)]">Focus</span>
                <span className="mt-1 block text-[var(--ink)]">Femicide</span>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--muted)]">Context</span>
                <span className="mt-1 block text-[var(--ink)]">Nigeria</span>
              </div>
              <div>
                <span className="block text-[10px] text-[var(--muted)]">Mode</span>
                <span className="mt-1 block text-[var(--ink)]">Interactive</span>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}


