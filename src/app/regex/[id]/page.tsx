import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RegexWorkspace } from '@/components/regex';
import { contentRepository } from '@/lib/repository';

export async function generateStaticParams() {
  const challenges = await contentRepository.listRegex();
  return challenges.map(c => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<'/regex/[id]'>): Promise<Metadata> {
  const challenge = await contentRepository.getRegex((await params).id);
  return { title: challenge ? `${challenge.title} · Regex` : 'Reto no encontrado' };
}

export default function RegexPage({ params }: PageProps<'/regex/[id]'>) {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <RegexChallengeView params={params} />
    </Suspense>
  );
}

async function RegexChallengeView({ params }: { params: PageProps<'/regex/[id]'>['params'] }) {
  const { id } = await params;
  const challenge = await contentRepository.getRegex(id);
  if (!challenge) notFound();
  return <RegexWorkspace key={challenge.id} challenge={challenge} />;
}
