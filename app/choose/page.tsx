'use client';
import Link from 'next/link';
import { useGameStore } from '@/store/useGameStore';
import { CharacterId } from '@/types/story';

interface CharacterOption {
  id: CharacterId;
  name: string;
  age: number;
  setting: string;
  blurb: string;
}

const characters: CharacterOption[] = [
  {
    id: 'chioma',
    name: 'Chioma',
    age: 20,
    setting: 'University student, campus life',
    blurb: 'Experiencing campus surveillance, isolation, and pressure that escalates over time.',
  },
  {
    id: 'fatima',
    name: 'Fatima',
    age: 38,
    setting: 'Business owner, Enugu',
    blurb: 'Managing a shop while navigating financial control, coercion, and public silence.',
  },
  {
    id: 'lisa',
    name: 'Lisa',
    age: 31,
    setting: 'Corporate worker, Abuja',
    blurb: 'Balancing work, family pressure, and a relationship shaped by manipulation and fear.',
  },
  {
    id: 'tolu',
    name: 'Tolu',
    age: 19,
    setting: 'Part-time worker, Lagos',
    blurb: 'Facing digital stalking, victim-blaming, and institutional inaction at a critical moment.',
  },
];

export default function ChooseCharacterPage() {
  const completed = useGameStore((state) => state.completed);
  const resetRunPressure = useGameStore((state) => state.resetRunPressure);

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Explore the case files
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--ink)] sm:text-5xl">
              Choose a story
            </h1>
          </div>

          <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
            Follow each woman through the final months before her story becomes part of the larger pattern.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {characters.map((char) => {
            const isCompleted = completed.includes(char.id);

            return (
              <Link
                key={char.id}
                href={`/play/${char.id}`}
                onClick={() => resetRunPressure()}
                className={`group block overflow-hidden rounded-[28px] border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] ${
                  isCompleted
                    ? 'border-[var(--line)] bg-white'
                    : 'border-[var(--line)] bg-[var(--panel)]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      Profile
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--ink)]">
                      {char.name}
                    </h2>
                  </div>

                  {isCompleted && (
                    <span className="rounded-full border border-[var(--line)] bg-[rgba(23,22,17,0.03)] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      completed
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm font-medium text-[var(--brand-red)]">{char.setting}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{char.blurb}</p>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink)]">
                    {isCompleted ? 'Replay story' : 'Start story'}
                  </span>
                  <span className="text-lg text-[var(--brand-red)] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {completed.length >= 2 && (
          <div className="mt-8 rounded-[24px] border border-[rgba(198,55,45,0.12)] bg-[rgba(198,55,45,0.04)] p-5 text-center">
            <p className="text-sm leading-6 text-[var(--ink)]">
              You have completed {completed.length} stories. Explore how systemic barriers affect multiple women across the country.
            </p>
            <Link
              href="/data-story"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--brand-red)] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--brand-red-deep)]"
            >
              View national data story
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

