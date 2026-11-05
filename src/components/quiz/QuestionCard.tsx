'use client';

import type { QuizQuestion } from '@/content/types';
import { QUIZ_CATEGORY_LABEL } from '@/content/types';
import { cx } from '@/lib/utils';
import { Banner, CodeBlock, ProgressBar, Tag } from '@/components/ui';
import type { ReactNode } from 'react';

interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  total: number;
  selected: number | undefined;
  /** En práctica se muestra el resultado apenas se responde. */
  revealAnswer: boolean;
  onSelect: (option: number) => void;
  timer?: ReactNode;
  footer: ReactNode;
}

const LETTERS = 'ABCDEFGH';

export function QuestionCard({ question, index, total, selected, revealAnswer, onSelect, timer, footer }: QuestionCardProps) {
  const answered = selected != null;
  const locked = revealAnswer && answered;
  return (
    <div className="card">
      <div className="row">
        <Tag>{QUIZ_CATEGORY_LABEL[question.category]}</Tag>
        <span className="muted small">Pregunta {index + 1} de {total}</span>
        <span className="sp" />
        {timer}
      </div>
      <div style={{ margin: '10px 0' }}>
        <ProgressBar value={(index / total) * 100} label="Avance del quiz" />
      </div>
      <h3 style={{ fontSize: 17, marginTop: 12 }}>{question.question}</h3>
      {question.code && <CodeBlock code={question.code} />}
      <div role="group" aria-label="Opciones">
        {question.options.map((option, k) => {
          const state = locked ? (k === question.answer ? 'right' : k === selected ? 'wrong' : '') : selected === k ? 'sel' : '';
          return (
            <button key={k} type="button" className={cx('opt', state)} onClick={() => !locked && onSelect(k)} aria-pressed={selected === k}>
              <span className="lt">{LETTERS[k]}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {locked && (
        <>
          <Banner tone={selected === question.answer ? 'good' : 'bad'}>{selected === question.answer ? 'Correcto.' : 'Incorrecto.'}</Banner>
          <p className="muted">{question.explanation}</p>
        </>
      )}
      {footer}
    </div>
  );
}
