import { ChallengeSidebar } from '@/components/coding';
import { PageHeader } from '@/components/layout/PageHeader';
import { contentRepository } from '@/lib/repository';

export default async function DebuggingLayout({ children }: LayoutProps<'/debugging'>) {
  const challenges = await contentRepository.listDebug();
  const items = challenges.map(({ id, title, minutes }) => ({ id, title, minutes }));
  return (
    <>
      <PageHeader title="Debugging">
        Formato de &quot;JavaScript/TypeScript (Coding): Debugging&quot;: te dan requisitos y un script que funciona a medias, y debes corregirlo. Lee
        primero los requisitos y luego el código.
      </PageHeader>
      <div className="layout">
        <ChallengeSidebar items={items} basePath="/debugging" />
        <section>{children}</section>
      </div>
    </>
  );
}
