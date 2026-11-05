'use client';

import { useState } from 'react';
import type { Challenge, CodingChallenge, DebugChallenge, QuizQuestion } from '@/content/types';
import type { SimulationConfig, SimulationStage } from '@/config/simulations';
import { progressStore } from '@/lib/progress';
import { shuffle } from '@/lib/utils';
import { Button, Card } from '@/components/ui';
import { CodingWorkspace } from '@/components/coding';
import { QuizRunner } from '@/components/quiz';

export interface SimulationContent {
  coding: CodingChallenge[];
  debug: DebugChallenge[];
  quiz: QuizQuestion[];
}

type PreparedStage =
  | { stage: SimulationStage; kind: 'quiz'; questions: QuizQuestion[] }
  | { stage: SimulationStage; kind: 'coding'; challenge: Challenge };

function prepare(stage: SimulationStage, content: SimulationContent): PreparedStage {
  if (stage.type === 'quiz') {
    const questions = shuffle(content.quiz.filter(q => stage.categories.includes(q.category))).slice(0, stage.count);
    return { stage, kind: 'quiz', questions };
  }
  const pool = stage.pool === 'debug' ? content.debug : content.coding.filter(c => c.level === stage.pool);
  return { stage, kind: 'coding', challenge: shuffle<Challenge>(pool)[0] };
}

interface StageResult {
  label: string;
  score: number;
  detail?: string;
}

export function SimulationRunner({ config, content, onExit }: { config: SimulationConfig; content: SimulationContent; onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState<PreparedStage>(() => prepare(config.stages[0], content));
  const [results, setResults] = useState<StageResult[]>([]);
  const [stageDone, setStageDone] = useState(false);

  const complete = (r: StageResult) => {
    setResults(rs => [...rs, r]);
    setStageDone(true);
  };

  const next = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    setStageDone(false);
    if (nextIndex < config.stages.length) {
      setCurrent(prepare(config.stages[nextIndex], content));
    } else {
      const average = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
      progressStore.addSimulation({ at: Date.now(), name: config.name, results, average });
    }
  };

  if (index >= config.stages.length) {
    const average = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
    return (
      <Card>
        <h2 style={{ marginTop: 0 }}>Simulacro terminado · promedio {average}%</h2>
        <table>
          <thead><tr><th>Etapa</th><th>Detalle</th><th>Puntaje</th></tr></thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}><td>{r.label}</td><td>{r.detail}</td><td>{r.score}%</td></tr>
            ))}
          </tbody>
        </table>
        <p className="muted small">Referencia: en tests de opción múltiple apunta a 80% o más. En coding, a pasar todos los casos; con una sola excepción el resultado es 0%.</p>
        <Button variant="primary" onClick={onExit}>Volver a simulacros</Button>
      </Card>
    );
  }

  return (
    <>
      <div className="stage" aria-label="Etapas">
        {config.stages.map((s, k) => (
          <span key={k} className={k === index ? 'cur' : k < index ? 'done' : ''}>
            {k < index ? '✓ ' : ''}{s.label}
          </span>
        ))}
      </div>
      {current.kind === 'quiz' ? (
        <QuizRunner
          key={`q-${index}`}
          questions={current.questions}
          exam
          minutes={current.stage.minutes}
          onFinish={r => complete({ label: current.stage.label, score: r.percent, detail: `${r.total} preguntas` })}
        />
      ) : (
        <CodingWorkspace
          key={`c-${index}`}
          challenge={current.challenge}
          exam={{
            minutes: current.stage.minutes,
            onSubmit: s => complete({ label: current.stage.label, score: s.score, detail: current.challenge.title + (s.auto ? ' (tiempo agotado)' : '') }),
          }}
        />
      )}
      {stageDone && (
        <div style={{ marginTop: 10 }}>
          <Button variant="primary" onClick={next}>{index + 1 < config.stages.length ? 'Siguiente etapa →' : 'Ver resultado'}</Button>
        </div>
      )}
    </>
  );
}
