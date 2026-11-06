import { ChallengeSidebar } from '@/components/coding';
import { PageHeader } from '@/components/layout/PageHeader';
import { contentRepository } from '@/lib/repository';

export default async function RegexLayout({ children }: LayoutProps<'/regex'>) {
  const challenges = await contentRepository.listRegex();
  const items = challenges.map(({ id, title, level }) => ({ id, title, level }));
  return (
    <>
      <PageHeader title="Regex">
        Practica expresiones regulares de básico a avanzado: validar, extraer y reemplazar. Cada reto se califica con casos visibles y ocultos.
      </PageHeader>
      <div className="layout">
        <ChallengeSidebar items={items} basePath="/regex" showLevelFilter />
        <section>{children}</section>
      </div>
    </>
  );
}
