'use client';

import { useState } from 'react';
import type { QuizCategory, QuizQuestion } from '@/content/types';
import { QUIZ_CATEGORY_LABEL } from '@/content/types';
import { progressStore } from '@/lib/progress';
import { shuffle } from '@/lib/utils';
import { Banner, Button, Card } from '@/components/ui';
import { QuizRunner } from './QuizRunner';
import { QuizHistory } from './QuizHistory';

const DEFAULT_CATEGORIES: QuizCategory[] = ['react', 'ts', 'js'];

export function QuizSetup({ questions }: { questions: QuizQuestion[] }) {
  const counts = questions.reduce<Partial<Record<QuizCategory, number>>>((m, q) => ({ ...m, [q.category]: (m[q.category] ?? 0) + 1 }), {});
  const [categories, setCategories] = useState<QuizCategory[]>(DEFAULT_CATEGORIES);
  const [count, setCount] = useState(10);
  const [exam, setExam] = useState(false);
  const [session, setSession] = useState<{ questions: QuizQuestion[]; exam: boolean; categories: QuizCategory[]; key: number } | null>(null);
  const [warning, setWarning] = useState('');

  const toggle = (c: QuizCategory) => setCategories(cs => (cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]));

  const start = () => {
    if (!categories.length) return setWarning('Elige al menos un tema.');
    setWarning('');
    const pool = shuffle(questions.filter(q => categories.includes(q.category)));
    const n = Math.min(pool.length, Math.max(3, count));
    setSession({ questions: pool.slice(0, n), exam, categories, key: Date.now() });
  };

  if (session) {
    return (
      <>
        <QuizRunner
          key={session.key}
          questions={session.questions}
          exam={session.exam}
          minutes={session.questions.length}
          onFinish={r => progressStore.addQuizAttempt({ at: Date.now(), categories: session.categories, exam: session.exam, percent: r.percent })}
        />
        <div className="row" style={{ marginTop: 12 }}>
          <Button onClick={() => setSession(null)}>Nuevo quiz</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Card>
        <h3>Temas</h3>
        <div className="chips">
          {(Object.keys(QUIZ_CATEGORY_LABEL) as QuizCategory[]).map(c => (
            <label key={c} className="chip">
              <input type="checkbox" checked={categories.includes(c)} onChange={() => toggle(c)} /> {QUIZ_CATEGORY_LABEL[c]}{' '}
              <span className="muted">({counts[c] ?? 0})</span>
            </label>
          ))}
        </div>
        <div className="row" style={{ marginTop: 14 }}>
          <label htmlFor="quiz-count">Preguntas</label>
          <input id="quiz-count" type="number" min={3} max={questions.length} value={count} onChange={e => setCount(Number(e.target.value) || 10)} style={{ width: 80 }} />
          <label htmlFor="quiz-mode">Modo</label>
          <select id="quiz-mode" value={exam ? 'exam' : 'practice'} onChange={e => setExam(e.target.value === 'exam')}>
            <option value="practice">Práctica (feedback inmediato)</option>
            <option value="exam">Examen (1 min por pregunta, sin feedback)</option>
          </select>
          <span className="sp" />
          <Button variant="primary" onClick={start}>Empezar</Button>
        </div>
        {warning && <Banner tone="warn">{warning}</Banner>}
      </Card>
      <h2>Historial</h2>
      <QuizHistory />
    </>
  );
}
