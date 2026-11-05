export interface StudyDay {
  id: string;
  day: string;
  title: string;
  tasks: string[];
}

export const STUDY_PLAN: StudyDay[] = [
  { id: 'd1', day: 'Día 1', title: 'Diagnóstico + JS core', tasks: ['Haz el Simulacro corto sin preparación para tener tu línea base', 'Quiz de JavaScript en modo práctica: event loop, closures, this, coerción y sort', 'Resuelve 4 retos entry de algoritmos (cronometra cada uno)'] },
  { id: 'd2', day: 'Día 2', title: 'React a fondo', tasks: ['Quiz de React completo en práctica y repite las falladas', 'Repasa: batching, updater funcional, stale closures, keys, memo/useMemo/useCallback y la limpieza de efectos', 'Debugging: Todos Reducer y Counter Closures'] },
  { id: 'd3', day: 'Día 3', title: 'TypeScript + algoritmos intermedios', tasks: ['Quiz de TypeScript: narrowing, uniones discriminadas, utility types, genéricos y satisfies', 'Resuelve 3 retos intermedios EN TypeScript (selector de lenguaje)', 'Debugging: Load Users (async) y Parse Query String'] },
  { id: 'd4', day: 'Día 4', title: 'Estructuras de datos / B2B', tasks: ['Multi-column Table Sort, Paginate, Form Validation Rules y Revenue by Client', 'LRU Cache y Monorepo Build Order (Map, grafos, Kahn)', 'Quiz de Accesibilidad + Arquitectura (MFE / NX / Storybook)'] },
  { id: 'd5', day: 'Día 5', title: 'Debugging intensivo', tasks: ['Los retos de debugging, cada uno con un reloj de 10 a 15 min', 'Antes de editar, anota en un comentario cada bug que encuentres', 'Quiz de Auth / HTTP / Testing / Performance'] },
  { id: 'd6', day: 'Día 6', title: 'Simulacros', tasks: ['Simulacro completo y Simulacro mid-level', 'Rehaz todo reto que haya quedado por debajo del 100%', 'Repasa la tabla de errores frecuentes'] },
  { id: 'd7', day: 'Día 7', title: 'Repaso ligero', tasks: ['Un quiz mixto de 20 preguntas en modo examen', 'Dos retos entry para calentar', 'Descansa; prepara la cámara, la conexión estable y un lugar tranquilo'] },
];

export const COMMON_MISTAKES: [string, string][] = [
  ['<code>arr.sort()</code> con números', '<code>[...arr].sort((a, b) =&gt; a - b)</code>; además sort muta el array'],
  ['<code>reduce</code> sin valor inicial', 'Siempre <code>reduce(fn, 0)</code>; con un array vacío lanza TypeError'],
  ['<code>forEach</code> con async', '<code>await Promise.all(items.map(fn))</code>'],
  ['Mutar los argumentos', 'Copia con <code>[...arr]</code>, <code>{...obj}</code> o <code>structuredClone</code>'],
  ['<code>||</code> con 0 o ""', '<code>??</code> para valores por defecto'],
  ['<code>==</code> y asignar con <code>=</code> en un if', 'Siempre <code>===</code>'],
  ['Off-by-one en loops', '<code>i &lt; length</code>; revisa con arrays de 0, 1 y 2 elementos'],
  ['Comparar objetos por referencia', 'Compara por id o por una clave, o usa un <code>Set</code> de ids'],
  ['Floats en dinero', '<code>Math.round(x * 100) / 100</code> o trabajar en centavos'],
  ['<code>toFixed</code> devuelve string', 'Si piden un número, conviértelo con <code>Number()</code>'],
];
