import { redirect } from 'next/navigation';
import { contentRepository } from '@/lib/repository';

export default async function RegexIndex() {
  const [first] = await contentRepository.listRegex();
  if (first) redirect(`/regex/${first.id}`);
  return <p className="empty">Todavía no hay retos.</p>;
}
