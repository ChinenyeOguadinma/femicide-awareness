'use client';
import Link from 'next/link';
import { useGameStore } from '@/store/useGameStore';

export default function FinalePage() {
  const completed = useGameStore((state) => state.completed);
  const lastCharacter = completed[completed.length - 1] || 'She';

  const capitalizedName = lastCharacter.charAt(0).toUpperCase() + lastCharacter.slice(1);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-md mx-auto flex flex-col items-center justify-center text-center">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-white">{capitalizedName} is not the only one.</h1>
        <p className="text-xs text-slate-300 mb-8 leading-relaxed">
          {capitalizedName} was killed just because of her gender. Learn more about femicide in Nigeria and how you can play a role.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href={`/data-story?from=${lastCharacter}`}
            className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
          >
            Learn More (Data Story)
          </Link>
          <Link
            href="/choose"
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
          >
            Play as Someone Else
          </Link>
          <Link
            href="/support"
            className="w-full py-3 bg-transparent text-slate-400 hover:text-white text-xs transition"
          >
            Get Support Resources
          </Link>
        </div>
      </div>
    </main>
  );
}
