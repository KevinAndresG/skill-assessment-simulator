import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "max-subarray",
  title: "Maximum Subarray Sum",
  level: "intermediate",
  minutes: 15,
  fn: "maxSubarray",
  signatureJS: `function maxSubarray(nums)`,
  signatureTS: `function maxSubarray(nums: number[]): number`,
  description: `Return the largest sum of a non-empty contiguous subarray. <code>nums</code> has at least one element. O(n).`,
  examples: [["[-2,1,-3,4,-1,2,1,-5,4]","6"]],
  hint: "En cada posición decide: ¿conviene extender la suma acumulada o empezar de nuevo desde aquí? Cuidado con arreglos de solo negativos.",
  solution: `function maxSubarray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,
  visible: [
    { args: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
    { args: [[1]], expected: 1 },
  ],
  hidden: [
    { args: [[-3,-1,-2]], expected: -1 },
    { args: [[5,4,-1,7,8]], expected: 23 },
    { args: [[0,0,0]], expected: 0 },
    { args: [Array.from({ length: 10000 }, (_, i) => (i % 7) - 3)], expected: 6 },
  ],
};

export default challenge;
