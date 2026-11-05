import { redirect } from 'next/navigation';
import { contentRepository } from '@/lib/repository';

export default async function AlgorithmsIndex() {
  const [first] = await contentRepository.listCoding();
  if (first) redirect(`/algoritmos/${first.id}`);
  return <p className="empty">Todavía no hay retos.</p>;
}
