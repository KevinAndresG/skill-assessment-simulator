import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "entry",
  id: "dbg-sum-even",
  title: "Sum of Even Numbers",
  minutes: 10,
  fn: "sumEven",
  requirements: `<code>sumEven(nums)</code> must return the sum of all even numbers in <code>nums</code>. An empty array returns <code>0</code>.`,
  buggyCode: `function sumEven(nums) {
  let total;
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i] % 2 === 0) {
      total += nums[i];
    }
  }
  return total;
}`,
  solution: `function sumEven(nums) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) total += nums[i];
  }
  return total;
}`,
  hint: "Revisa tres cosas del for: con qué valor empieza la variable acumuladora, en qué índice arranca el contador y hasta dónde llega.",
  bugs: ["total sin inicializar (undefined + n = NaN)","el índice empieza en 1 (se salta el primero)","i <= length lee una posición fuera del array"],
  visible: [
    { args: [[1,2,3,4]], expected: 6 },
    { args: [[]], expected: 0 },
  ],
  hidden: [
    { args: [[2]], expected: 2 },
    { args: [[-2,-3,8]], expected: 6 },
    { args: [[1,3,5]], expected: 0 },
    { args: [[0,10,11]], expected: 10 },
  ],
};

export default challenge;
