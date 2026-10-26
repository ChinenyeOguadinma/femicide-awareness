'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGameStore } from '@/store/useGameStore';

const sampleComments = [
  { id: 1, text: "Rest in peace. We must stop treating this as normal.", stance: "support" },
  { id: 2, text: "She reported it. Nobody listened.", stance: "support" },
  { id: 3, text: "What was she doing out at that time?", stance: "blame" },
  { id: 4, text: "Maybe she was rude to him. Women should learn to be calm.", stance: "blame" },
  { id: 5, text: "Nothing she wore or did gives anyone the right to kill her.", stance: "counter" },
];

export default function AftermathPage() {
  const params = useParams();
  const character = params.character as string;
  const reduceComments = useGameStore((state) => state.reduceComments);
  const toggleReduceComments = useGameStore((state) => state.toggleReduceComments);

  const commentsToShow = reduceComments
    ? sampleComments.filter((c) => c.stance !== 'blame')
    : sampleComments;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-rose-500">Aftermath Feed</h1>
        <button
          onClick={toggleReduceComments}
          className="text-xs bg-slate-900 border border-slate-700 px-3 py-1 rounded-lg text-slate-300"
        >
          {reduceComments ? 'Show All Comments' : 'Reduce Blame Comments'}
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {commentsToShow.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-xl border text-xs leading-relaxed ${
              comment.stance === 'blame'
                ? 'bg-rose-950/30 border-rose-900/40 text-rose-200'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href={`/play/${character}/doors`}
          className="w-full text-center py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
        >
          View System Doors Summary →
        </Link>
      </div>
    </main>
  );
}
