import { PageHeader } from '@/components/layout/PageHeader';
import { CommonMistakes, LikelyTestsTable, ProgressStats, RoleTopics, ScoringGuide, StudyPlanChecklist } from '@/components/plan';
import { contentRepository } from '@/lib/repository';

export default async function PlanPage() {
  const [coding, debug] = await Promise.all([contentRepository.listCoding(), contentRepository.listDebug()]);
  const ids = [...coding, ...debug].map(c => c.id);
  return (
    <>
      <PageHeader title="Preparación · Frontend Engineer (Portal MSP)">
        Simulador para practicar las pruebas que probablemente te pongan: algoritmos y debugging en JS/TS, y opción múltiple de React y TypeScript. Tu
        progreso se guarda en este navegador.
      </PageHeader>
      <ProgressStats challengeIds={ids} />

      <h2>Qué es probable que te pongan</h2>
      <LikelyTestsTable />

      <h2>Cómo se califican los tests de código</h2>
      <ScoringGuide />

      <h2>Plan de 7 días</h2>
      <StudyPlanChecklist />

      <h2>Errores frecuentes que tumban la nota</h2>
      <CommonMistakes />

      <h2>Temas del cargo para la entrevista técnica posterior</h2>
      <RoleTopics />
    </>
  );
}
