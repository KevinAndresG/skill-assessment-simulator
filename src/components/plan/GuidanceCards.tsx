import { Card } from '@/components/ui';

export function ScoringGuide() {
  return (
    <div className="grid g2">
      <Card>
        <h3>Tests visibles vs. ocultos</h3>
        <p className="small">Durante la prueba puedes ejecutar algunos casos visibles (y crear los tuyos), pero tu nota sale del <b>% de casos de validación ocultos que pasas</b>. Aquí funciona igual: &quot;Ejecutar&quot; usa los visibles y &quot;Enviar&quot; los evalúa todos.</p>
      </Card>
      <Card>
        <h3>Una excepción o un timeout = 0%</h3>
        <p className="small">Si tu código lanza una excepción en cualquier caso, o excede el tiempo de ejecución, el puntaje queda en 0% aunque otros casos hayan pasado. <b>Valida las entradas vacías</b> ([], &quot;&quot;, 0, null) y evita los bucles infinitos.</p>
      </Card>
      <Card className="prose">
        <h3>Estrategia en la prueba</h3>
        <ul className="small">
          <li>Lee el enunciado dos veces y subraya los casos borde</li>
          <li>Escribe primero una solución correcta y simple, ejecútala y luego optimiza</li>
          <li>Usa la pregunta de práctica del inicio para conocer el editor</li>
          <li>Deja 2 minutos al final para probar casos borde</li>
          <li>En opción múltiple no te atasques: ~1 min por pregunta</li>
        </ul>
      </Card>
      <Card className="prose">
        <h3>Antes de empezar</h3>
        <ul className="small">
          <li>Lee bien las reglas que te muestren al inicio (cámara, pantalla completa, uso de pestañas)</li>
          <li>Conexión estable, cargador conectado y lugar silencioso</li>
          <li>Elige el lenguaje en el que seas más rápido (JS o TS) y practica en ese mismo</li>
          <li>No uses IA ni copies código de afuera: además de ser deshonesto, se puede detectar</li>
        </ul>
      </Card>
    </div>
  );
}

const ROLE_TOPICS: [string, string][] = [
  ['Microfrontends', 'Module Federation (host, remotes, exposes, shared singleton), comunicación por contratos, versionado, fallos aislados con Error Boundary + Suspense por remote.'],
  ['NX monorepo', 'Grafo de proyectos, nx affected, caché, tags + enforce-module-boundaries, librerías feature/ui/data-access/util, generators.'],
  ['Storybook / design system', 'CSF3, args/argTypes, autodocs, play functions, addon a11y, design tokens, regresión visual.'],
  ['WCAG 2.1 AA', 'Contraste 4.5:1, teclado, foco visible y en modales, labels y errores en formularios, live regions, axe + pruebas manuales con lector de pantalla.'],
  ['BFF + auth en el navegador', 'OIDC Auth Code + PKCE, cookies HttpOnly/SameSite, refresh y 401 vs 403, CSRF, SAML vs OIDC, interceptores fetch o axios tipados.'],
  ['Formularios B2B y data grids', 'React Hook Form + Zod, validación por esquema, tablas con orden, filtros y paginación en el servidor, virtualización, Playwright, Web Vitals (LCP, INP, CLS).'],
];

export function RoleTopics() {
  return (
    <div className="grid g3">
      {ROLE_TOPICS.map(([title, text]) => (
        <Card key={title}>
          <h3>{title}</h3>
          <p className="small muted">{text}</p>
        </Card>
      ))}
    </div>
  );
}
