import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-average",
  title: "Average of Numbers",
  level: "entry",
  minutes: 8,
  fn: "average",
  requirements: `<code>average(nums)</code> returns the arithmetic mean of an array of numbers, rounded to 2 decimals.
An empty array returns <code>0</code>.`,
  buggyCode: `function average(nums) {
  let sum = 0;
  for (let i = 0; i <= nums.length; i++) {
    sum += nums[i];
  }
  return Math.round((sum / nums.length) * 100) / 100;
}`,
  solution: `function average(nums) {
  if (nums.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return Math.round((sum / nums.length) * 100) / 100;
}`,
  bugs: ["i <= nums.length lee una posición de más (undefined) y el resultado es NaN → usar i < nums.length","Array vacío: 0 / 0 = NaN → devolver 0 antes de calcular"],
  visible: [
    { args: [[1,2,3]], expected: 2 },
  ],
  hidden: [
    { args: [[]], expected: 0 },
    { args: [[1,2]], expected: 1.5 },
    { args: [[10,5,5,1]], expected: 5.25 },
    { args: [[1,1,2]], expected: 1.33 },
    { args: [[7]], expected: 7 },
  ],
};

export default challenge;
