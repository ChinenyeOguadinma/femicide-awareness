'use client';
import Link from 'next/link';

export default function DataStoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-rose-500 mb-4">Femicide in Nigeria: The National Picture</h1>
      <p className="text-sm text-slate-300 mb-8 leading-relaxed">
        Scroll-driven data story looking at perpetrators, breakdown points in reporting, and gaps in national reporting data.
      </p>

      <div className="space-y-6">
        <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <h2 className="text-lg font-semibold mb-2">1. Perpetrators</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Over 60% of femicide cases in documented domestic cases were committed by intimate partners or family members [DATA: verify].
          </p>
        </section>

        <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <h2 className="text-lg font-semibold mb-2">2. Reporting Breakdown</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Police desks, academic institutions, and religious leaders frequently treat intimate partner violence as private domestic disputes.
          </p>
        </section>

        <section className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <h2 className="text-lg font-semibold mb-2">3. Legal Implementation</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Adoption of the VAPP (Violence Against Persons Prohibition) Act varies across states, with significant gaps between law and enforcement.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/choose"
          className="inline-block px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
        >
          Return to Character Select
        </Link>
      </div>
    </main>
  );
}
