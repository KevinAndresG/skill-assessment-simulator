import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "kth-largest",
  title: "Kth Largest Element",
  level: "intermediate",
  minutes: 15,
  fn: "kthLargest",
  noMutate: true,
  signatureJS: `function kthLargest(nums, k)`,
  signatureTS: `function kthLargest(nums: number[], k: number): number`,
  description: `Return the k-th largest element (1-based, duplicates count). Do not mutate the input.`,
  examples: [["[3,2,1,5,6,4], 2","5"],["[3,2,3,1,2,4,5,5,6], 4","4"]],
  hint: `Ordenar una copia descendente con (a, b) => b - a es suficiente aquí. Nunca uses .sort() sin comparador con números.`,
  solution: `function kthLargest(nums, k) {
  return [...nums].sort((a, b) => b - a)[k - 1];
}`,
  visible: [
    { args: [[3,2,1,5,6,4], 2], expected: 5 },
    { args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
  ],
  hidden: [
    { args: [[1], 1], expected: 1 },
    { args: [[10,9,100,1], 1], expected: 100 },
    { args: [[-1,-5,-3], 2], expected: -3 },
    { args: [[2,2,2,2], 3], expected: 2 },
  ],
};

export default challenge;
