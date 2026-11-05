import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "two-sum",
  title: "Two Sum",
  level: "entry",
  minutes: 15,
  fn: "twoSum",
  signatureJS: `function twoSum(nums, target)`,
  signatureTS: `function twoSum(nums: number[], target: number): number[]`,
  description: `Return the indices <code>[i, j]</code> (with <code>i &lt; j</code>) of the two numbers that add up to <code>target</code>.
Exactly one solution exists. You may not use the same element twice. Aim for O(n).`,
  examples: [["[2,7,11,15], 9","[0,1]"],["[3,2,4], 6","[1,2]"]],
  hint: `Map de valor → índice. Por cada número, busca target - n antes de guardarlo.`,
  solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let j = 0; j < nums.length; j++) {
    const need = target - nums[j];
    if (seen.has(need)) return [seen.get(need), j];
    seen.set(nums[j], j);
  }
  return [];
}`,
  visible: [
    { args: [[2,7,11,15], 9], expected: [0,1] },
    { args: [[3,2,4], 6], expected: [1,2] },
    { args: [[3,3], 6], expected: [0,1] },
  ],
  hidden: [
    { args: [[-1,-2,-3,-4,-5], -8], expected: [2,4] },
    { args: [[0,4,3,0], 0], expected: [0,3] },
    { args: [[1,5,9,13,2], 15], expected: [3,4] },
  ],
};

export default challenge;
