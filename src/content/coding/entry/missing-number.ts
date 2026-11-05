import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "missing-number",
  title: "Missing Number",
  level: "entry",
  minutes: 10,
  fn: "missingNumber",
  noMutate: true,
  signatureJS: `function missingNumber(nums)`,
  signatureTS: `function missingNumber(nums: number[]): number`,
  description: `<code>nums</code> contains <code>n</code> distinct numbers taken from the range <code>0..n</code>. Return the one number of that range that is missing.`,
  examples: [["[3,0,1]","2"],["[0,1]","2"]],
  hint: `La suma de 0..n es n(n+1)/2. Resta la suma real del arreglo. O(n) tiempo, O(1) memoria.`,
  solution: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}`,
  visible: [
    { args: [[3,0,1]], expected: 2 },
    { args: [[0,1]], expected: 2 },
  ],
  hidden: [
    { args: [[1]], expected: 0 },
    { args: [[0]], expected: 1 },
    { args: [[9,6,4,2,3,5,7,0,1]], expected: 8 },
    { args: [[1,2,3]], expected: 0 },
  ],
};

export default challenge;
