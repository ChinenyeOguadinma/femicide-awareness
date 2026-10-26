'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useGameStore } from '@/store/useGameStore';

export default function DoorsSummaryPage() {
  const params = useParams();
  const character = params.character as string;
  const markCompleted = useGameStore((state) => state.markCompleted);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-md mx-auto flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-2">System Doors Map</h1>
        <p className="text-xs text-slate-400 mb-6">
          A summary of institutions and individuals she reached out to before the incident.
        </p>

        <div className="space-y-3 mb-8">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <span className="text-rose-400 font-semibold block mb-1">Police Desk</span>
            <p className="text-slate-300">"Come back if something physically happens."</p>
          </div>
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <span className="text-rose-400 font-semibold block mb-1">Family / Community</span>
            <p className="text-slate-300">"Pray about it and endure."</p>
          </div>
        </div>
      </div>

      <Link
        href="/finale"
        onClick={() => markCompleted(character as any)}
        className="w-full text-center py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition"
      >
        Proceed to Finale →
      </Link>
    </main>
  );
}
