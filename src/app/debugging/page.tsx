import { redirect } from 'next/navigation';
import { contentRepository } from '@/lib/repository';

export default async function DebuggingIndex() {
  const [first] = await contentRepository.listDebug();
  if (first) redirect(`/debugging/${first.id}`);
  return <p className="empty">Todavía no hay retos.</p>;
}
