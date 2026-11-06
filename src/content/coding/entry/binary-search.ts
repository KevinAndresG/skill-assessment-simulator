import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "binary-search",
  title: "Binary Search",
  level: "entry",
  minutes: 10,
  fn: "binarySearch",
  signatureJS: `function binarySearch(arr, target)`,
  signatureTS: `function binarySearch(arr: number[], target: number): number`,
  description: `<code>arr</code> is sorted ascending with unique values. Return the index of <code>target</code> or <code>-1</code>. Must be O(log n).`,
  examples: [["[-1,0,3,5,9,12], 9","4"],["[-1,0,3,5,9,12], 2","-1"]],
  hint: "Mantén un rango [bajo, alto] y descarta la mitad en cada paso. Revisa la condición del bucle y cómo mueves los extremos para evitar un bucle infinito.",
  solution: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}`,
  visible: [
    { args: [[-1,0,3,5,9,12], 9], expected: 4 },
    { args: [[-1,0,3,5,9,12], 2], expected: -1 },
  ],
  hidden: [
    { args: [[], 1], expected: -1 },
    { args: [[5], 5], expected: 0 },
    { args: [[1,3], 3], expected: 1 },
    { args: [Array.from({ length: 20000 }, (_, i) => i * 2), 39998], expected: 19999 },
    { args: [[1,2,3,4,5,6], 0], expected: -1 },
  ],
};

export default challenge;
