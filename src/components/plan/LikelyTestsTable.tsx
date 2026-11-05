import Link from 'next/link';
import { Card } from '@/components/ui';

const ROWS = [
  { name: 'React', bold: true, time: '10 min', format: 'Opción múltiple: hooks, manejo de estado, patrones de diseño, conceptos avanzados', href: '/quiz', link: 'Quiz → React' },
  { name: 'JavaScript / TypeScript (Coding): Entry-Level Algorithms', bold: true, time: '10–15 min', format: 'Escribir una función; se califica con tests ocultos', href: '/algoritmos', link: 'Algoritmos → Entry' },
  { name: 'Coding: Intermediate Algorithms / Data Structures', bold: true, time: '30–35 min', format: 'Función más compleja: strings, arrays, objetos, grafos', href: '/algoritmos', link: 'Intermedio y Difícil' },
  { name: 'JavaScript / TypeScript (Coding): Debugging', bold: true, time: '~30 min', format: 'Te dan requisitos y un script que funciona a medias, y lo corriges', href: '/debugging', link: 'Debugging' },
  { name: 'TypeScript, JavaScript o Front-end (MCQ)', time: '~10 min', format: 'Opción múltiple', href: '/quiz', link: 'Quiz → TS / JS' },
  { name: 'Inglés (posible, piden B2+)', time: '~10 min', format: 'Comprensión de inglés', note: 'Los enunciados del simulador ya están en inglés' },
];

export function LikelyTestsTable() {
  return (
    <Card tight>
      <table>
        <thead>
          <tr><th>Test</th><th>Duración</th><th>Formato</th><th>Practícalo en</th></tr>
        </thead>
        <tbody>
          {ROWS.map(r => (
            <tr key={r.name}>
              <td>{r.bold ? <b>{r.name}</b> : r.name}</td>
              <td>{r.time}</td>
              <td>{r.format}</td>
              <td>{r.href ? <Link href={r.href}>{r.link}</Link> : <span className="muted">{r.note}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
