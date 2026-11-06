import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "second-largest",
  title: "Second Largest",
  level: "entry",
  minutes: 10,
  fn: "secondLargest",
  noMutate: true,
  signatureJS: `function secondLargest(nums)`,
  signatureTS: `function secondLargest(nums: number[]): number | null`,
  description: `Return the second largest DISTINCT value of <code>nums</code>, or <code>null</code> if there are fewer than two distinct values.
Do not mutate the input.`,
  examples: [["[3,1,4,2]","3"],["[5,5,5]","null"]],
  hint: "Puedes hacerlo en una pasada con dos variables. Prueba con duplicados del máximo y con arreglos de un solo valor distinto: ¿qué debería devolver?",
  solution: `function secondLargest(nums) {
  let first = -Infinity, second = -Infinity;
  for (const n of nums) {
    if (n > first) {
      second = first;
      first = n;
    } else if (n < first && n > second) {
      second = n;
    }
  }
  return second === -Infinity ? null : second;
}`,
  visible: [
    { args: [[3,1,4,2]], expected: 3 },
    { args: [[5,5,5]], expected: null },
  ],
  hidden: [
    { args: [[1]], expected: null },
    { args: [[]], expected: null },
    { args: [[-1,-5,-3]], expected: -3 },
    { args: [[2,2,1]], expected: 1 },
    { args: [[10,9,10,8]], expected: 9 },
  ],
};

export default challenge;
