import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "build-order",
  title: "Monorepo Build Order",
  level: "data",
  minutes: 30,
  fn: "buildOrder",
  signatureJS: `function buildOrder(graph)`,
  signatureTS: `function buildOrder(graph: Record<string, string[]>): string[] | null`,
  description: `Like <code>nx build</code> in a monorepo: <code>graph</code> maps each project to the projects it depends on (all deps are keys).
Return a build order where every dependency comes before its dependents. When several projects are ready at the same time,
pick the alphabetically smallest first. If there is a cycle, return <code>null</code>.`,
  examples: [["{app:[\"ui\",\"auth\"], ui:[\"tokens\"], auth:[], tokens:[]}","[\"auth\",\"tokens\",\"ui\",\"app\"]"]],
  hint: `Algoritmo de Kahn: cuenta dependencias pendientes; en cada paso ordena los disponibles y toma el primero.`,
  solution: `function buildOrder(graph) {
  const pending = {}, dependents = {};
  for (const p of Object.keys(graph)) { pending[p] = graph[p].length; dependents[p] = dependents[p] || []; }
  for (const [p, deps] of Object.entries(graph)) for (const d of deps) (dependents[d] = dependents[d] || []).push(p);
  let ready = Object.keys(graph).filter(p => pending[p] === 0);
  const order = [];
  while (ready.length) {
    ready.sort();
    const p = ready.shift();
    order.push(p);
    for (const q of dependents[p]) if (--pending[q] === 0) ready.push(q);
  }
  return order.length === Object.keys(graph).length ? order : null;
}`,
  visible: [
    { args: [{"app":["ui","auth"],"ui":["tokens"],"auth":[],"tokens":[]}], expected: ["auth","tokens","ui","app"] },
  ],
  hidden: [
    { args: [{}], expected: [] },
    { args: [{"a":["b"],"b":["a"]}], expected: null },
    { args: [{"shell":["billing","tickets","shared"],"billing":["shared"],"tickets":["shared","ui"],"shared":[],"ui":["shared"]}], expected: ["shared","billing","ui","tickets","shell"] },
    { args: [{"x":[],"y":[],"z":[]}], expected: ["x","y","z"] },
    { args: [{"a":["b"],"b":["c"],"c":["a"],"d":[]}], expected: null },
  ],
};

export default challenge;
