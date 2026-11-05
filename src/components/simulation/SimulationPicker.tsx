'use client';

import { useState } from 'react';
import { SIMULATIONS, type SimulationConfig } from '@/config/simulations';
import { useProgress } from '@/lib/hooks/useProgress';
import { Button, Card } from '@/components/ui';
import { SimulationRunner, type SimulationContent } from './SimulationRunner';

export function SimulationPicker({ content }: { content: SimulationContent }) {
  const [active, setActive] = useState<SimulationConfig | null>(null);
  const { simulations } = useProgress();

  if (active) return <SimulationRunner config={active} content={content} onExit={() => setActive(null)} />;

  return (
    <>
      <div className="grid g3">
        {SIMULATIONS.map(sim => (
          <Card key={sim.id}>
            <h3>{sim.name}</h3>
            <ul className="small muted" style={{ paddingLeft: 18 }}>
              {sim.stages.map((st, i) => <li key={i}>{st.label} · {st.minutes} min</li>)}
            </ul>
            <Button variant="primary" onClick={() => setActive(sim)}>Empezar</Button>
          </Card>
        ))}
      </div>
      <h2>Historial de simulacros</h2>
      <Card tight>
        {simulations.length ? (
          <table>
            <thead><tr><th>Fecha</th><th>Simulacro</th><th>Etapas</th><th>Promedio</th></tr></thead>
            <tbody>
              {simulations.slice(-10).reverse().map(h => (
                <tr key={h.at}>
                  <td>{new Date(h.at).toLocaleString('es-CO')}</td>
                  <td>{h.name}</td>
                  <td>{h.results.map(r => `${r.label}: ${r.score}%`).join(' · ')}</td>
                  <td><b>{h.average}%</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="muted">Aún no has hecho simulacros.</span>
        )}
      </Card>
    </>
  );
}
