import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-memoize",
  title: "Memoize",
  level: "data",
  minutes: 15,
  fn: "runMemo",
  requirements: `<code>memoize(fn)</code> returns a function that caches results by the FULL list of arguments: calling it again
with the same arguments must not call <code>fn</code> again — even if the cached result is falsy (<code>0</code>, <code>''</code>).
<code>runMemo</code> is a test helper — do not modify it.`,
  buggyCode: `function memoize(fn) {
  const cache = {};
  return function (a) {
    if (cache[a]) return cache[a];
    return (cache[a] = fn.apply(this, arguments));
  };
}

// Do not modify: test helper
function runMemo(pairs) {
  let calls = 0;
  const add = memoize((a, b) => {
    calls++;
    return a + b;
  });
  const results = pairs.map(([a, b]) => add(a, b));
  return { results, calls };
}`,
  solution: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}

// Do not modify: test helper
function runMemo(pairs) {
  let calls = 0;
  const add = memoize((a, b) => {
    calls++;
    return a + b;
  });
  const results = pairs.map(([a, b]) => add(a, b));
  return { results, calls };
}`,
  hint: "Dos fallos: ¿de qué argumentos depende la clave del caché? y ¿qué valores falsy podría devolver fn que hagan que parezca \"no cacheado\"?",
  bugs: ["La clave del caché es solo el primer argumento: add(1, 2) y add(1, 3) devuelven lo mismo","if (cache[a]) trata 0 como \"no cacheado\" y vuelve a ejecutar fn → usar has()"],
  visible: [
    { args: [[[1,2],[1,3],[1,2]]], expected: {"results":[3,4,3],"calls":2} },
  ],
  hidden: [
    { args: [[[0,0],[0,0],[0,0]]], expected: {"results":[0,0,0],"calls":1} },
    { args: [[[2,3],[3,2],[2,3]]], expected: {"results":[5,5,5],"calls":2} },
    { args: [[]], expected: {"results":[],"calls":0} },
    { args: [[[-1,1],[-1,1]]], expected: {"results":[0,0],"calls":1} },
  ],
};

export default challenge;
