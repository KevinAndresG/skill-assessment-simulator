import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-flatten-depth",
  title: "Flatten to Depth",
  level: "data",
  minutes: 15,
  fn: "flatten",
  noMutate: true,
  requirements: `<code>flatten(arr, depth)</code> flattens nested arrays up to <code>depth</code> levels (default 1).
<code>depth = 0</code> returns a shallow copy. Order must be preserved and the input must not be mutated.`,
  buggyCode: `function flatten(arr, depth = 1, out = []) {
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      flatten(item, depth--, out);
    } else {
      out.push(item);
    }
  }
  return out;
}`,
  solution: `function flatten(arr, depth = 1, out = []) {
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      flatten(item, depth - 1, out);
    } else {
      out.push(item);
    }
  }
  return out;
}`,
  hint: "Observa qué valor recibe la llamada recursiva con el operador de decremento postfijo, y si ese operador altera la variable que usan los siguientes elementos.",
  bugs: ["depth-- pasa el valor SIN decrementar a la llamada recursiva (post-decremento), así que siempre aplana todo","Además muta depth del nivel actual y afecta a los hermanos siguientes → depth - 1"],
  visible: [
    { args: [[1,[2,[3,[4]]]],1], expected: [1,2,[3,[4]]] },
  ],
  hidden: [
    { args: [[1,[2,[3,[4]]]],2], expected: [1,2,3,[4]] },
    { args: [[1,[2,[3,[4]]]],0], expected: [1,[2,[3,[4]]]] },
    { args: [[1,[2,[3,[4]]]],3], expected: [1,2,3,4] },
    { args: [[[1,[2]],[3,[4]]],1], expected: [1,[2],3,[4]] },
    { args: [[],2], expected: [] },
  ],
};

export default challenge;
