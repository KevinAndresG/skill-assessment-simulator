import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CodingWorkspace } from '@/components/coding';
import { contentRepository } from '@/lib/repository';

export async function generateStaticParams() {
  const challenges = await contentRepository.listCoding();
  return challenges.map(c => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<'/algoritmos/[id]'>): Promise<Metadata> {
  const challenge = await contentRepository.getCoding((await params).id);
  return { title: challenge ? `${challenge.title} · Algoritmos` : 'Reto no encontrado' };
}

export default function AlgorithmPage({ params }: PageProps<'/algoritmos/[id]'>) {
  return (
    <Suspense fallback={<p>Cargando…</p>}>
      <AlgorithmChallenge params={params} />
    </Suspense>
  );
}

async function AlgorithmChallenge({ params }: { params: PageProps<'/algoritmos/[id]'>['params'] }) {
  const { id } = await params;
  const challenge = await contentRepository.getCoding(id);
  if (!challenge) notFound();
  return <CodingWorkspace key={challenge.id} challenge={challenge} />;
}
