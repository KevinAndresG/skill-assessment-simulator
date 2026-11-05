'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/content/types';
import { useCountdown } from '@/lib/hooks/useCountdown';
import { Button, TimerBadge } from '@/components/ui';
import { QuestionCard } from './QuestionCard';
import { gradeQuiz, QuizReview, type QuizResult } from './QuizReview';

export interface QuizRunnerProps {
  questions: QuizQuestion[];
  /** Examen: sin feedback y con reloj. */
  exam: boolean;
  minutes: number;
  onFinish?: (result: QuizResult) => void;
}

export function QuizRunner({ questions, exam, minutes, onFinish }: QuizRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const finish = () => {
    if (result) return;
    const r = gradeQuiz(questions, answers);
    setResult(r);
    onFinish?.(r);
  };

  const secondsLeft = useCountdown(minutes * 60, finish, exam && !result);

  if (result) return <QuizReview questions={questions} answers={answers} result={result} />;

  const last = index === questions.length - 1;
  const select = (k: number) => setAnswers(a => Object.assign([...a], { [index]: k }));

  return (
    <QuestionCard
      key={questions[index].id}
      question={questions[index]}
      index={index}
      total={questions.length}
      selected={answers[index]}
      revealAnswer={!exam}
      onSelect={select}
      timer={exam ? <TimerBadge seconds={secondsLeft} /> : null}
      footer={
        <div className="row" style={{ marginTop: 10 }}>
          <span className="sp" />
          <Button variant="primary" disabled={answers[index] == null} onClick={() => (last ? finish() : setIndex(i => i + 1))}>
            {last ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      }
    />
  );
}
