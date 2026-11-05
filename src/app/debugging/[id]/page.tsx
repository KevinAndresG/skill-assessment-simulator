import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CodingWorkspace } from '@/components/coding';
import { contentRepository } from '@/lib/repository';

export async function generateStaticParams() {
  const challenges = await contentRepository.listDebug();
  return challenges.map(c => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<'/debugging/[id]'>): Promise<Metadata> {
  const challenge = await contentRepository.getDebug((await params).id);
  return { title: challenge ? `${challenge.title} · Debugging` : 'Reto no encontrado' };
}

export default function DebugPage({ params }: PageProps<'/debugging/[id]'>) {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <DebugChallenge params={params} />
    </Suspense>
  );
}

async function DebugChallenge({ params }: { params: PageProps<'/debugging/[id]'>['params'] }) {
  const { id } = await params;
  const challenge = await contentRepository.getDebug(id);
  if (!challenge) notFound();
  return <CodingWorkspace key={challenge.id} challenge={challenge} />;
}
