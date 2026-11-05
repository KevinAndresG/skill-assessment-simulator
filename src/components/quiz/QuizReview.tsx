import type { QuizCategory, QuizQuestion } from '@/content/types';
import { QUIZ_CATEGORY_LABEL } from '@/content/types';
import { CodeBlock } from '@/components/ui';

export interface QuizResult {
  correct: number;
  total: number;
  percent: number;
  byCategory: Partial<Record<QuizCategory, { ok: number; n: number }>>;
}

export function gradeQuiz(questions: QuizQuestion[], answers: (number | undefined)[]): QuizResult {
  const byCategory: QuizResult['byCategory'] = {};
  let correct = 0;
  questions.forEach((q, i) => {
    const c = (byCategory[q.category] ??= { ok: 0, n: 0 });
    c.n++;
    if (answers[i] === q.answer) {
      c.ok++;
      correct++;
    }
  });
  return { correct, total: questions.length, percent: Math.round((correct / questions.length) * 100), byCategory };
}

export function QuizReview({ questions, answers, result }: { questions: QuizQuestion[]; answers: (number | undefined)[]; result: QuizResult }) {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Resultado: {result.correct}/{result.total} · {result.percent}%</h2>
      <table>
        <thead>
          <tr><th>Tema</th><th>Aciertos</th></tr>
        </thead>
        <tbody>
          {Object.entries(result.byCategory).map(([cat, v]) => (
            <tr key={cat}>
              <td>{QUIZ_CATEGORY_LABEL[cat as QuizCategory]}</td>
              <td>{v.ok}/{v.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Revisión</h2>
      {questions.map((q, i) => {
        const ok = answers[i] === q.answer;
        return (
          <details key={q.id} open={!ok}>
            <summary>{ok ? '✓' : '✗'} {q.question}</summary>
            {q.code && <CodeBlock code={q.code} />}
            <p>
              Tu respuesta: <b>{answers[i] == null ? 'sin responder' : q.options[answers[i]!]}</b>
              <br />
              Correcta: <b style={{ color: 'var(--good)' }}>{q.options[q.answer]}</b>
            </p>
            <p className="muted">{q.explanation}</p>
          </details>
        );
      })}
    </div>
  );
}
