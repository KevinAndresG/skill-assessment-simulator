import { ChallengeSidebar } from '@/components/coding';
import { PageHeader } from '@/components/layout/PageHeader';
import { contentRepository } from '@/lib/repository';

export default async function AlgorithmsLayout({ children }: LayoutProps<'/algoritmos'>) {
  const challenges = await contentRepository.listCoding();
  const items = challenges.map(({ id, title, minutes, level }) => ({ id, title, minutes, level }));
  return (
    <>
      <PageHeader title="Algoritmos">
        Formato de &quot;Coding: Entry-Level / Intermediate Algorithms&quot;: escribes una función y se califica con tests ocultos. Primero logra una
        versión correcta y después optimiza.
      </PageHeader>
      <div className="layout">
        <ChallengeSidebar items={items} basePath="/algoritmos" showLevelFilter />
        <section>{children}</section>
      </div>
    </>
  );
}
