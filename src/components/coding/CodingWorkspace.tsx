'use client';

import { useCallback, useState } from 'react';
import type { Challenge, Language, TestCase } from '@/content/types';
import { useCountdown } from '@/lib/hooks/useCountdown';
import { useIsClient } from '@/lib/hooks/useIsClient';
import { progressStore } from '@/lib/progress';
import { runTests, summarize, toRunnableJS, type RunOutcome, type ScoreSummary } from '@/lib/runner';
import { Banner, Button, Card, CodeBlock, TimerBadge } from '@/components/ui';
import { ChallengeStatement } from './ChallengeStatement';
import { CodeEditor } from './CodeEditor';
import { TestResults } from './TestResults';

export interface ExamSubmission {
  score: number;
  /** true si se envió solo porque se acabó el tiempo. */
  auto: boolean;
  code: string;
  language: Language;
}

export interface CodingWorkspaceProps {
  challenge: Challenge;
  /** Modo examen: reloj, sin pistas ni soluciones, sin guardar borradores. */
  exam?: { minutes: number; onSubmit: (s: ExamSubmission) => void };
}

export function starterCode(challenge: Challenge, lang: Language): string {
  if (challenge.kind === 'debug') return challenge.buggyCode;
  const signature = lang === 'ts' ? challenge.signatureTS : challenge.signatureJS;
  return `${signature} {\n  // Write your code here\n  \n}\n`;
}

/** Evita diferencias de hidratación: el borrador vive en localStorage. */
export function CodingWorkspace(props: CodingWorkspaceProps) {
  const isClient = useIsClient();
  if (!isClient) {
    return (
      <Card>
        <ChallengeStatement challenge={props.challenge} />
        <p className="muted small">Cargando editor…</p>
      </Card>
    );
  }
  return <Workspace {...props} />;
}

interface RunState {
  outcome: RunOutcome;
  summary: ScoreSummary;
  tests: TestCase[];
  graded: boolean;
}

function Workspace({ challenge, exam }: CodingWorkspaceProps) {
  const isExam = !!exam;
  const [lang, setLang] = useState<Language>(() => progressStore.getSnapshot().language);
  const loadCode = useCallback(
    (l: Language) => (isExam ? starterCode(challenge, l) : progressStore.getSnapshot().drafts[`${challenge.id}:${l}`] ?? starterCode(challenge, l)),
    [challenge, isExam],
  );
  const [code, setCode] = useState(() => loadCode(lang));
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState<RunState | null>(null);
  const [help, setHelp] = useState<'none' | 'hint' | 'confirm' | 'solution'>('none');
  const [finished, setFinished] = useState(false);

  const allTests = [...challenge.visible, ...challenge.hidden];

  const updateCode = (value: string) => {
    setCode(value);
    if (!isExam) progressStore.saveDraft(challenge.id, lang, value);
  };

  const changeLang = (next: Language) => {
    setLang(next);
    if (!isExam) progressStore.setLanguage(next);
    // En debugging el código es el mismo; en algoritmos cambia la firma.
    if (challenge.kind === 'coding') setCode(loadCode(next));
  };

  const execute = async (graded: boolean, auto = false) => {
    if (finished || running) return;
    setRunning(true);
    const tests = graded ? allTests : challenge.visible;
    let js: string;
    try {
      js = await toRunnableJS(code, lang);
    } catch (e) {
      const outcome: RunOutcome = { status: 'fatal', message: 'TypeScript: ' + (e as Error).message };
      setRun({ outcome, summary: summarize(outcome, tests.length, true), tests, graded });
      setRunning(false);
      if (graded && isExam) finishExam(0, auto);
      return;
    }
    const outcome = await runTests(js, challenge.fn, tests, !!challenge.noMutate);
    const summary = summarize(outcome, tests.length, graded);
    setRun({ outcome, summary, tests, graded });
    setRunning(false);
    if (graded) {
      if (isExam) finishExam(summary.score, auto);
      else progressStore.recordScore(challenge.id, summary.score);
    }
  };

  const finishExam = (score: number, auto: boolean) => {
    setFinished(true);
    exam?.onSubmit({ score, auto, code, language: lang });
  };

  const secondsLeft = useCountdown((exam?.minutes ?? 0) * 60, () => execute(true, true), isExam && !finished);

  return (
    <Card>
      <ChallengeStatement challenge={challenge} aside={isExam && <TimerBadge seconds={secondsLeft} />} />

      <div className="row" style={{ margin: '14px 0 8px' }}>
        <label className="small muted" htmlFor={`lang-${challenge.id}`}>Lenguaje</label>
        <select id={`lang-${challenge.id}`} value={lang} onChange={e => changeLang(e.target.value as Language)} disabled={finished}>
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
        </select>
        <span className="sp" />
        {!isExam && (
          <>
            <Button variant="ghost" onClick={() => setHelp('hint')}>Pista</Button>
            <Button variant="ghost" onClick={() => setHelp(help === 'confirm' || help === 'solution' ? 'solution' : 'confirm')}>
              {help === 'confirm' ? '¿Seguro? Clic otra vez' : 'Ver solución'}
            </Button>
          </>
        )}
        <Button variant="ghost" onClick={() => updateCode(starterCode(challenge, lang))} disabled={finished}>Reiniciar código</Button>
      </div>

      <CodeEditor value={code} language={lang} onChange={updateCode}onRun={() => execute(false)} />

      <div className="row" style={{ marginTop: 10 }}>
        <Button onClick={() => execute(false)} disabled={running || finished}>
          Ejecutar tests visibles ({challenge.visible.length})
        </Button>
        <Button variant="primary" onClick={() => execute(true)} disabled={running || finished}>
          {isExam ? 'Enviar respuesta' : `Enviar (todos los tests: ${allTests.length})`}
        </Button>
        <span className="small muted">Ctrl/⌘ + Enter ejecuta</span>
      </div>

      {help === 'hint' && (
        <Banner tone="info">💡 {challenge.kind === 'coding' ? challenge.hint : 'Revisa las inicializaciones, los límites de los loops, la mutación, las comparaciones, el this y el async.'}</Banner>
      )}
      {help === 'solution' && (
        <>
          {challenge.kind === 'debug' ? (
            <Banner tone="warn">
              Bugs:
              <ul>{challenge.bugs.map(b => <li key={b}>{b}</li>)}</ul>
            </Banner>
          ) : (
            <Banner tone="info">💡 {challenge.hint}</Banner>
          )}
          <CodeBlock code={challenge.solution} />
        </>
      )}

      <div className="results" aria-live="polite">
        {running && <Banner tone="info">Ejecutando…</Banner>}
        {!running && run && (
          <TestResults
            outcome={run.outcome}
            tests={run.tests}
            visibleCount={challenge.visible.length}
            summary={run.summary}
            graded={run.graded}
            hideHiddenDetails={isExam}
          />
        )}
      </div>
    </Card>
  );
}
