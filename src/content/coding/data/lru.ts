import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "lru",
  title: "LRU Cache",
  level: "data",
  minutes: 30,
  fn: "lruSimulate",
  signatureJS: `function lruSimulate(capacity, ops)`,
  signatureTS: `type Op = ['put', number, number] | ['get', number];
function lruSimulate(capacity: number, ops: Op[]): number[]`,
  description: `Implement an LRU cache and simulate <code>ops</code>. <code>["put", k, v]</code> inserts/updates (and marks as recently used);
when over capacity evict the least recently used key. <code>["get", k]</code> returns the value (marks as used) or <code>-1</code>.
Return the array of results of every <code>get</code>, in order.`,
  examples: [["2, [[\"put\",1,1],[\"put\",2,2],[\"get\",1],[\"put\",3,3],[\"get\",2],[\"get\",3]]","[1,-1,3]"]],
  hint: "Necesitas saber cuál fue el elemento usado hace más tiempo. Piensa en una estructura que recuerde el orden de inserción y cómo \"refrescar\" un elemento al leerlo.",
  solution: `function lruSimulate(capacity, ops) {
  const cache = new Map();
  const out = [];
  for (const [op, k, v] of ops) {
    if (op === 'get') {
      if (!cache.has(k)) { out.push(-1); continue; }
      const val = cache.get(k); cache.delete(k); cache.set(k, val); out.push(val);
    } else {
      if (cache.has(k)) cache.delete(k);
      cache.set(k, v);
      if (cache.size > capacity) cache.delete(cache.keys().next().value);
    }
  }
  return out;
}`,
  visible: [
    { args: [2, [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["get",3]]], expected: [1,-1,3] },
  ],
  hidden: [
    { args: [1, [["put",1,1],["put",2,2],["get",1],["get",2]]], expected: [-1,2] },
    { args: [2, [["put",1,1],["put",1,10],["put",2,2],["put",3,3],["get",1],["get",2],["get",3]]], expected: [-1,2,3] },
    { args: [3, [["get",5],["put",1,1],["put",2,2],["put",3,3],["get",1],["put",4,4],["get",2],["get",3],["get",4],["get",1]]], expected: [-1,1,-1,3,4,1] },
  ],
};

export default challenge;
