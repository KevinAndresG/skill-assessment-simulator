import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-closure",
  title: "Counter Closures",
  minutes: 10,
  fn: "counterValues",
  requirements: `<code>makeCounters(n)</code> must return n functions where the i-th function returns <code>i</code>.
<code>counterValues(n)</code> (do not modify) calls them all.`,
  buggyCode: `function makeCounters(n) {
  var fns = [];
  for (var i = 0; i < n; i++) {
    fns.push(function () { return i; });
  }
  return fns;
}

// Do not modify
function counterValues(n) {
  return makeCounters(n).map(f => f());
}`,
  solution: `function makeCounters(n) {
  const fns = [];
  for (let i = 0; i < n; i++) {
    fns.push(() => i);
  }
  return fns;
}

// Do not modify
function counterValues(n) {
  return makeCounters(n).map(f => f());
}`,
  bugs: ["var tiene scope de función: todas las closures comparten el mismo i (valor final n) → usar let"],
  visible: [
    { args: [3], expected: [0,1,2] },
  ],
  hidden: [
    { args: [0], expected: [] },
    { args: [1], expected: [0] },
    { args: [6], expected: [0,1,2,3,4,5] },
  ],
};

export default challenge;
