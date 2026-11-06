import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "top-k-frequent",
  title: "Top K Frequent",
  level: "intermediate",
  minutes: 20,
  fn: "topKFrequent",
  noMutate: true,
  signatureJS: `function topKFrequent(nums, k)`,
  signatureTS: `function topKFrequent(nums: number[], k: number): number[]`,
  description: `Return the <code>k</code> most frequent values of <code>nums</code>, ordered from most to least frequent.
When two values have the same frequency, the SMALLER value goes first. If there are fewer than <code>k</code> distinct values, return all of them.`,
  examples: [["[1,1,1,2,2,3], 2","[1,2]"]],
  hint: "Dos pasos: contar cuántas veces aparece cada elemento y luego ordenar con un criterio principal y uno de desempate. Piensa qué estructura te deja contar rápido.",
  solution: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, k)
    .map(([value]) => value);
}`,
  visible: [
    { args: [[1,1,1,2,2,3],2], expected: [1,2] },
    { args: [[1],1], expected: [1] },
  ],
  hidden: [
    { args: [[3,3,2,2,1],2], expected: [2,3] },
    { args: [[],3], expected: [] },
    { args: [[-1,-1,2],1], expected: [-1] },
    { args: [[4,4,5,5,6],5], expected: [4,5,6] },
    { args: [[7,8,8,9,9,9],2], expected: [9,8] },
  ],
};

export default challenge;
