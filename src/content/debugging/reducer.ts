import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "data",
  id: "dbg-reducer",
  title: "Todos Reducer (React)",
  minutes: 15,
  fn: "runReducer",
  requirements: `<code>todosReducer</code> is used with <code>useReducer</code>. It must NEVER mutate the previous state and must return a NEW
reference whenever something changes. Actions: <code>add</code> {id, text} adds <code>{id, text, done:false}</code>;
<code>toggle</code> {id} flips <code>done</code> of that todo only; unknown actions return the same state.
<code>runReducer</code> is a test helper — do not modify it.`,
  buggyCode: `function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      state.push({ id: action.id, text: action.text, done: false });
      return state;
    case 'toggle':
      return state.map(t => {
        if (t.id = action.id) t.done = !t.done;
        return t;
      });
    default:
      return state;
  }
}

// Do not modify: test helper
function runReducer(actions) {
  let state = [];
  for (const a of actions) {
    const before = JSON.stringify(state);
    const next = todosReducer(state, a);
    if (JSON.stringify(state) !== before) return 'MUTATED';
    if (a.type !== 'unknown' && next === state) return 'SAME_REFERENCE';
    if (a.type === 'unknown' && next !== state) return 'NEW_REFERENCE_ON_UNKNOWN';
    state = next;
  }
  return state;
}`,
  solution: `function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: action.id, text: action.text, done: false }];
    case 'toggle':
      return state.map(t => (t.id === action.id ? { ...t, done: !t.done } : t));
    default:
      return state;
  }
}

// Do not modify: test helper
function runReducer(actions) {
  let state = [];
  for (const a of actions) {
    const before = JSON.stringify(state);
    const next = todosReducer(state, a);
    if (JSON.stringify(state) !== before) return 'MUTATED';
    if (a.type !== 'unknown' && next === state) return 'SAME_REFERENCE';
    if (a.type === 'unknown' && next !== state) return 'NEW_REFERENCE_ON_UNKNOWN';
    state = next;
  }
  return state;
}`,
  bugs: ["push muta el estado y devuelve la misma referencia (React no re-renderiza)","t.id = action.id es asignación, no comparación","t.done = ... muta el objeto: crear copia con spread"],
  visible: [
    { args: [[{"type":"add","id":1,"text":"a"}]], expected: [{"id":1,"text":"a","done":false}] },
  ],
  hidden: [
    { args: [[{"type":"add","id":1,"text":"a"},{"type":"add","id":2,"text":"b"},{"type":"toggle","id":2}]], expected: [{"id":1,"text":"a","done":false},{"id":2,"text":"b","done":true}] },
    { args: [[{"type":"add","id":1,"text":"a"},{"type":"unknown"},{"type":"toggle","id":1},{"type":"toggle","id":1}]], expected: [{"id":1,"text":"a","done":false}] },
    { args: [[{"type":"add","id":7,"text":"x"},{"type":"add","id":8,"text":"y"},{"type":"toggle","id":7}]], expected: [{"id":7,"text":"x","done":true},{"id":8,"text":"y","done":false}] },
  ],
};

export default challenge;
