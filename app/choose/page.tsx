'use client';
import Link from 'next/link';
import { useGameStore } from '@/store/useGameStore';

interface CharacterOption {
  id: 'fatima' | 'chioma' | 'lisa' | 'tolu';
  name: string;
  age: number;
  setting: string;
  blurb: string;
}

const characters: CharacterOption[] = [
  {
    id: 'chioma',
    name: 'Chioma',
    age: 31,
    setting: 'Corporate Worker, Abuja',
    blurb: 'Navigating controlling pressure at home and microaggressions at work.',
  },
  {
    id: 'fatima',
    name: 'Fatima',
    age: 20,
    setting: 'University Student, Campus',
    blurb: 'Experiencing campus surveillance and escalating isolation.',
  },
  {
    id: 'lisa',
    name: 'Lisa',
    age: 38,
    setting: 'Small Business Owner, Enugu',
    blurb: 'Managing a shop while facing financial control and isolation.',
  },
  {
    id: 'tolu',
    name: 'Tolu',
    age: 19,
    setting: 'Part-time Worker, Lagos',
    blurb: 'Dealing with digital stalking, platform inaction, and victim-blaming.',
  },
];

export default function ChooseCharacterPage() {
  const completed = useGameStore((state) => state.completed);
  const resetRunPressure = useGameStore((state) => state.resetRunPressure);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-1 text-white">Select a Story</h1>
        <p className="text-xs text-slate-400 mb-6">
          Choose a character to follow her final months. You can replay the others at any time.
        </p>

        <div className="flex flex-col gap-4">
          {characters.map((char) => {
            const isCompleted = completed.includes(char.id);

            return (
              <Link
                key={char.id}
                href={`/play/${char.id}`}
                onClick={() => resetRunPressure()}
                className={`block p-5 rounded-2xl border transition text-left relative overflow-hidden ${
                  isCompleted
                    ? 'bg-slate-900/60 border-slate-700/80 hover:border-slate-500'
                    : 'bg-slate-900 border-slate-800 hover:border-rose-500/50'
                }`}
              >
                {isCompleted && (
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    Completed
                  </span>
                )}
                
                <h2 className="text-lg font-semibold text-white mb-0.5">
                  {char.name}, <span className="text-slate-400 text-sm font-normal">{char.age}</span>
                </h2>
                <p className="text-xs text-rose-400 font-medium mb-2">{char.setting}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{char.blurb}</p>

                <div className="mt-4 flex items-center text-xs font-semibold text-rose-400">
                  <span>{isCompleted ? 'Replay Story' : 'Start Story'}</span>
                  <span className="ml-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        {completed.length >= 2 && (
          <div className="mt-8 p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl text-center">
            <p className="text-xs text-rose-200 mb-2">
              You have completed {completed.length} stories. Explore how structural barriers affect multiple women.
            </p>
            <Link
              href="/data-story"
              className="inline-block text-xs font-semibold bg-rose-800 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition"
            >
              View National Data Story
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
