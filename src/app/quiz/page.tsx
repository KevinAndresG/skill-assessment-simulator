import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuizSetup } from '@/components/quiz';
import { contentRepository } from '@/lib/repository';

export const metadata: Metadata = { title: 'Quiz · Skill Assessment Simulator' };

export default async function QuizPage() {
  const questions = await contentRepository.listQuiz();
  return (
    <>
      <PageHeader title="Quiz de opción múltiple">
        El test &quot;React&quot; dura 10 minutos y cubre hooks, manejo de estado, patrones de diseño y conceptos avanzados. Practica a ~1
        minuto por pregunta. Las preguntas están en inglés, como en la prueba real.
      </PageHeader>
      <QuizSetup questions={questions} />
    </>
  );
}
