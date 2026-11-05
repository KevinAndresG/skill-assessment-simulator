import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { SimulationPicker } from '@/components/simulation';
import { contentRepository } from '@/lib/repository';

export const metadata: Metadata = { title: 'Simulacro · Skill Assessment Simulator' };

export default async function SimulationPage() {
  const [coding, debug, quiz] = await Promise.all([contentRepository.listCoding(), contentRepository.listDebug(), contentRepository.listQuiz()]);
  return (
    <>
      <PageHeader title="Simulacro cronometrado">
        Encadena pruebas como en una evaluación real. Cada etapa tiene su propio reloj y al acabarse el tiempo se envía sola. No hay
        pistas ni soluciones durante el simulacro.
      </PageHeader>
      <SimulationPicker content={{ coding, debug, quiz }} />
    </>
  );
}
