'use client';

import { QUIZ_CATEGORY_LABEL } from '@/content/types';
import { useProgress } from '@/lib/hooks/useProgress';
import { Card } from '@/components/ui';

export function QuizHistory() {
  const { quiz } = useProgress();
  return (
    <Card tight>
      {quiz.length ? (
        <table>
          <thead>
            <tr><th>Fecha</th><th>Temas</th><th>Modo</th><th>Resultado</th></tr>
          </thead>
          <tbody>
            {quiz.slice(-10).reverse().map(h => (
              <tr key={h.at}>
                <td>{new Date(h.at).toLocaleString('es-CO')}</td>
                <td>{h.categories.map(c => QUIZ_CATEGORY_LABEL[c]).join(', ')}</td>
                <td>{h.exam ? 'Examen' : 'Práctica'}</td>
                <td>{h.percent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span className="muted">Aún no has hecho quizzes.</span>
      )}
    </Card>
  );
}
