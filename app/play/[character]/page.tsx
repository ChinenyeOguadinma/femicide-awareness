import { notFound } from 'next/navigation';
import chiomaData from '@/content/chioma.json';
import fatimaData from '@/content/fatima.json';
import lisaData from '@/content/lisa.json';
import toluData from '@/content/tolu.json';
import { CharacterData } from '@/types/story';

const contentMap: Record<string, CharacterData> = {
  chioma: chiomaData as CharacterData,
  fatima: fatimaData as CharacterData,
  lisa: lisaData as CharacterData,
  tolu: toluData as CharacterData,
};

interface PageProps {
  params: {
    character: string;
  };
}

export default async function PlayCharacterPage({ params }: PageProps) {
  const { character } = await params;
  const data = contentMap[character];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 pt-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">{data.name}, {data.age}</h1>
        <p className="text-sm text-slate-400 mb-6">{data.setting}</p>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-sm italic text-slate-300">{data.blurb}</p>
        </div>
      </div>
    </main>
  );
}
