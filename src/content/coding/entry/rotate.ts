import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "rotate",
  title: "Rotate Array Right",
  level: "entry",
  minutes: 10,
  fn: "rotateRight",
  noMutate: true,
  signatureJS: `function rotateRight(arr, k)`,
  signatureTS: `function rotateRight<T>(arr: T[], k: number): T[]`,
  description: `Return a NEW array rotated to the right by <code>k</code> steps (k ≥ 0, may be larger than the length). Do not mutate the input.`,
  examples: [["[1,2,3,4,5], 2","[4,5,1,2,3]"]],
  hint: `k % n; luego slice(-k).concat(slice(0, -k)). Cuidado con n = 0 y k % n = 0.`,
  solution: `function rotateRight(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const r = k % n;
  if (r === 0) return arr.slice();
  return arr.slice(n - r).concat(arr.slice(0, n - r));
}`,
  visible: [
    { args: [[1,2,3,4,5], 2], expected: [4,5,1,2,3] },
    { args: [[1,2], 0], expected: [1,2] },
  ],
  hidden: [
    { args: [[], 3], expected: [] },
    { args: [[1,2,3], 3], expected: [1,2,3] },
    { args: [[1,2,3], 7], expected: [3,1,2] },
    { args: [["a","b","c","d"], 1], expected: ["d","a","b","c"] },
  ],
};

export default challenge;
