'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/useGameStore';

export default function LandingPage() {
  const router = useRouter();
  const acceptWarning = useGameStore((state) => state.acceptWarning);
  const [accepted, setAccepted] = useState(false);

  const handleStart = () => {
    acceptWarning();
    router.push('/choose');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-rose-500">Content Warning</h1>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          This interactive experience contains themes of domestic and gender-based violence, stalking, harassment, and a death at the end of every story. You cannot change the outcome, and you can exit or pause at any time.
        </p>
        
        <div className="flex items-center gap-3 mb-6">
          <input 
            type="checkbox" 
            id="consent" 
            checked={accepted} 
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 text-rose-600 focus:ring-rose-500 bg-slate-800"
          />
          <label htmlFor="consent" className="text-xs text-slate-300 select-none cursor-pointer">
            I understand and accept the content warning to proceed.
          </label>
        </div>

        <button
          onClick={handleStart}
          disabled={!accepted}
          className={`w-full py-3 rounded-xl font-medium transition ${
            accepted 
              ? 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Enter Experience
        </button>
      </div>
    </main>
  );
}
