import type { TestCase } from '@/content/types';
import type { RunOutcome, ScoreSummary } from '@/lib/runner';
import { formatValue } from '@/lib/utils';
import { Banner } from '@/components/ui';

interface TestResultsProps {
  outcome: RunOutcome;
  tests: TestCase[];
  visibleCount: number;
  summary: ScoreSummary;
  /** true = evaluación completa (Enviar). */
  graded: boolean;
  /** Oculta args/esperado de los casos ocultos (modo examen). */
  hideHiddenDetails?: boolean;
}

const clip = (s: string) => (s.length > 300 ? s.slice(0, 300) + '…' : s);

export function TestResults({ outcome, tests, visibleCount, summary, graded, hideHiddenDetails }: TestResultsProps) {
  if (outcome.status === 'timeout')
    return <Banner tone="bad">Task timed out: tu código tardó demasiado (¿bucle infinito?). En la evaluación real esto da 0%.</Banner>;
  if (outcome.status === 'fatal')
    return (
      <>
        <Banner tone="bad">{outcome.message}</Banner>
        <Logs logs={outcome.logs} />
      </>
    );

  const allPass = summary.passed === summary.total;
  return (
    <>
      <Banner tone={allPass ? 'good' : summary.hadErrors ? 'bad' : 'warn'}>
        {graded ? 'Puntaje' : 'Tests visibles'}: {summary.passed}/{summary.total}
        {graded && <> → <b>{summary.score}%</b></>}
        {graded && summary.hadErrors && ' · Task finished with errors: una excepción en cualquier caso deja la nota en 0%.'}
      </Banner>
      <div className="card tight" style={{ padding: 0 }}>
        {outcome.results.map((r, i) => {
          const hidden = i >= visibleCount;
          const t = tests[i];
          return (
            <div key={i} className={`tc ${r.pass ? 'pass' : 'fail'}`}>
              <span className="ic" aria-label={r.pass ? 'Pasó' : 'Falló'}>{r.pass ? '✓' : '✗'}</span>
              <div>
                <div>
                  <b>{hidden ? `Oculto #${i - visibleCount + 1}` : `Visible #${i + 1}`}</b>{' '}
                  {r.ms != null && <span className="muted">{r.ms.toFixed(1)} ms</span>}
                </div>
                {!(hidden && hideHiddenDetails) && (
                  <>
                    <div className="muted">args: <code>{clip(t.args.map(formatValue).join(', '))}</code></div>
                    <div>esperado: <code>{clip(formatValue(t.expected))}</code></div>
                  </>
                )}
                {r.error ? <div style={{ color: 'var(--bad)' }}>{r.error}</div> : <div>obtenido: <code>{clip(String(r.out))}</code></div>}
                {r.note && <div style={{ color: 'var(--bad)' }}>{r.note}</div>}
              </div>
            </div>
          );
        })}
      </div>
      <Logs logs={outcome.logs} />
    </>
  );
}

function Logs({ logs }: { logs?: string[] }) {
  if (!logs?.length) return null;
  return (
    <>
      <div className="small muted" style={{ marginTop: 8 }}>console.log</div>
      <div className="console">{logs.join('\n')}</div>
    </>
  );
}
