'use client';

import { useState } from 'react';
import type { RegexCase, RegexChallenge } from '@/content/types';
import { LEVEL_LABEL, REGEX_MODE_LABEL } from '@/content/types';
import { useIsClient } from '@/lib/hooks/useIsClient';
import { progressStore } from '@/lib/progress';
import { runRegex, type RegexOutcome } from '@/lib/regex';
import { formatValue } from '@/lib/utils';
import { Banner, Button, Card, RichText, Tag } from '@/components/ui';

const MODE_HELP: Record<RegexChallenge['mode'], string> = {
  test: 'Se usa regex.test(texto): debe dar true en los casos ✓ y false en los ✗. Si quieres validar el texto completo, ancla con ^ y $.',
  extract: 'Se extraen todas las coincidencias (la flag g se agrega sola) y se compara la lista exacta, en orden.',
  replace: 'Se ejecuta texto.replace(regex, reemplazo). Recuerda la flag g si quieres reemplazar todas las coincidencias. Puedes usar $1, $&, $<nombre>.',
};

interface Draft {
  pattern: string;
  flags: string;
  replacement: string;
}

function loadDraft(id: string): Draft {
  try {
    const raw = progressStore.getSnapshot().drafts[`${id}:js`];
    if (raw) return { pattern: '', flags: '', replacement: '', ...JSON.parse(raw) };
  } catch {
    /* borrador corrupto: se ignora */
  }
  return { pattern: '', flags: '', replacement: '' };
}

/** El borrador vive en localStorage: se monta solo en cliente para evitar diferencias de hidratación. */
export function RegexWorkspace({ challenge }: { challenge: RegexChallenge }) {
  const isClient = useIsClient();
  if (!isClient)
    return (
      <Card>
        <Statement challenge={challenge} />
        <p className="muted small">Cargando…</p>
      </Card>
    );
  return <Workspace challenge={challenge} />;
}

function Statement({ challenge }: { challenge: RegexChallenge }) {
  return (
    <>
      <div className="row">
        <h2 style={{ margin: 0 }}>{challenge.title}</h2>
        <Tag tone={challenge.level}>{LEVEL_LABEL[challenge.level]}</Tag>
        <Tag>{REGEX_MODE_LABEL[challenge.mode]}</Tag>
      </div>
      <RichText className="desc" html={challenge.description} />
      <p className="small muted">{MODE_HELP[challenge.mode]}</p>
    </>
  );
}

interface RunState {
  outcome: RegexOutcome;
  cases: RegexCase[];
  graded: boolean;
}

function Workspace({ challenge }: { challenge: RegexChallenge }) {
  const [draft, setDraft] = useState(() => loadDraft(challenge.id));
  const [run, setRun] = useState<RunState | null>(null);
  const [running, setRunning] = useState(false);
  const [help, setHelp] = useState<'none' | 'hint' | 'confirm' | 'solution'>('none');

  const update = (patch: Partial<Draft>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    progressStore.saveDraft(challenge.id, 'js', JSON.stringify(next));
  };

  const execute = async (graded: boolean) => {
    if (running) return;
    setRunning(true);
    const cases = graded ? [...challenge.visible, ...challenge.hidden] : challenge.visible;
    const outcome = await runRegex(challenge.mode, draft.pattern, draft.flags, draft.replacement, cases);
    setRun({ outcome, cases, graded });
    setRunning(false);
    if (graded && outcome.status === 'ok') {
      const passed = outcome.results.filter(r => r.pass).length;
      const hadErrors = outcome.results.some(r => r.error);
      progressStore.recordScore(challenge.id, hadErrors ? 0 : Math.round((passed / cases.length) * 100));
    }
  };

  const total = challenge.visible.length + challenge.hidden.length;
  const sol = challenge.solution;

  return (
    <Card>
      <Statement challenge={challenge} />

      <div className="row" style={{ margin: '14px 0 8px', alignItems: 'center' }}>
        <span className="rx-slash" aria-hidden>/</span>
        <input
          className="rx-input"
          aria-label="Patrón"
          placeholder="patrón"
          spellCheck={false}
          autoComplete="off"
          value={draft.pattern}
          onChange={e => update({ pattern: e.target.value })}
          onKeyDown={e => (e.ctrlKey || e.metaKey) && e.key === 'Enter' && execute(false)}
          style={{ flex: 1, minWidth: 200 }}
        />
        <span className="rx-slash" aria-hidden>/</span>
        <input
          className="rx-input"
          aria-label="Flags"
          placeholder="flags"
          spellCheck={false}
          autoComplete="off"
          value={draft.flags}
          onChange={e => update({ flags: e.target.value.replace(/[^dgimsuvy]/g, '') })}
          style={{ width: 80 }}
        />
      </div>
      {challenge.mode === 'replace' && (
        <div className="row" style={{ marginBottom: 8 }}>
          <label className="small muted" htmlFor={`rep-${challenge.id}`}>Reemplazo</label>
          <input
            id={`rep-${challenge.id}`}
            className="rx-input"
            spellCheck={false}
            autoComplete="off"
            value={draft.replacement}
            onChange={e => update({ replacement: e.target.value })}
            style={{ flex: 1, minWidth: 200 }}
          />
        </div>
      )}

      <div className="row" style={{ marginTop: 10 }}>
        <Button onClick={() => execute(false)} disabled={running}>Probar casos visibles ({challenge.visible.length})</Button>
        <Button variant="primary" onClick={() => execute(true)} disabled={running}>Enviar (todos los casos: {total})</Button>
        <span className="sp" />
        <Button variant="ghost" onClick={() => setHelp('hint')}>Pista</Button>
        <Button variant="ghost" onClick={() => setHelp(help === 'confirm' || help === 'solution' ? 'solution' : 'confirm')}>
          {help === 'confirm' ? '¿Seguro? Clic otra vez' : 'Ver solución'}
        </Button>
        <Button variant="ghost" onClick={() => update({ pattern: '', flags: '', replacement: '' })}>Limpiar</Button>
      </div>

      {help === 'hint' && <Banner tone="info">💡 {challenge.hint}</Banner>}
      {help === 'solution' && (
        <>
          <Banner tone="info">💡 {challenge.hint}</Banner>
          <pre className="console">
            {`/${sol.pattern}/${sol.flags ?? ''}`}
            {challenge.mode === 'replace' ? `\nreemplazo: ${sol.replacement ?? ''}` : ''}
          </pre>
        </>
      )}

      <div className="results" aria-live="polite">
        {running && <Banner tone="info">Ejecutando…</Banner>}
        {!running && run && <Results run={run} visibleCount={challenge.visible.length} mode={challenge.mode} />}
      </div>
    </Card>
  );
}

function expectedLabel(mode: RegexChallenge['mode'], expected: RegexCase['expected']) {
  if (mode === 'test') return expected ? '✓ debe coincidir' : '✗ NO debe coincidir';
  return formatValue(expected);
}

function Results({ run, visibleCount, mode }: { run: RunState; visibleCount: number; mode: RegexChallenge['mode'] }) {
  const { outcome, cases, graded } = run;
  if (outcome.status === 'timeout')
    return <Banner tone="bad">Timeout: la expresión tardó demasiado (¿backtracking catastrófico, p. ej. (a+)+ ?).</Banner>;
  if (outcome.status === 'fatal') return <Banner tone="bad">Expresión inválida: {outcome.message}</Banner>;

  const passed = outcome.results.filter(r => r.pass).length;
  const hadErrors = outcome.results.some(r => r.error);
  const all = passed === cases.length;
  return (
    <>
      <Banner tone={all ? 'good' : hadErrors ? 'bad' : 'warn'}>
        {graded ? 'Puntaje' : 'Casos visibles'}: {passed}/{cases.length}
        {graded && <> → <b>{hadErrors ? 0 : Math.round((passed / cases.length) * 100)}%</b></>}
      </Banner>
      <div className="card tight" style={{ padding: 0 }}>
        {outcome.results.map((r, i) => {
          const c = cases[i];
          const hidden = i >= visibleCount;
          return (
            <div key={i} className={`tc ${r.pass ? 'pass' : 'fail'}`}>
              <span className="ic" aria-label={r.pass ? 'Pasó' : 'Falló'}>{r.pass ? '✓' : '✗'}</span>
              <div style={{ whiteSpace: 'pre-wrap' }}>
                <div><b>{hidden ? `Oculto #${i - visibleCount + 1}` : `Visible #${i + 1}`}</b></div>
                <div className="muted">texto: <code>{formatValue(c.input)}</code></div>
                <div>esperado: <code>{expectedLabel(mode, c.expected)}</code></div>
                {r.error ? (
                  <div style={{ color: 'var(--bad)' }}>{r.error}</div>
                ) : (
                  !r.pass && <div>obtenido: <code>{mode === 'test' ? (r.got ? 'coincide' : 'no coincide') : formatValue(r.got)}</code></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
