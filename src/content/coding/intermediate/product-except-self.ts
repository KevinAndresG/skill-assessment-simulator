import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "product-except-self",
  title: "Product Except Self",
  level: "intermediate",
  minutes: 20,
  fn: "productExceptSelf",
  noMutate: true,
  signatureJS: `function productExceptSelf(nums)`,
  signatureTS: `function productExceptSelf(nums: number[]): number[]`,
  description: `Return an array where position <code>i</code> holds the product of every element of <code>nums</code> except <code>nums[i]</code>.
Do it in O(n) <b>without using division</b> (the input may contain zeros).`,
  examples: [["[1,2,3,4]","[24,12,8,6]"]],
  hint: `Producto de prefijos × producto de sufijos. Una pasada de izquierda a derecha y otra de derecha a izquierda sobre el mismo resultado.`,
  solution: `function productExceptSelf(nums) {
  const n = nums.length;
  const res = Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    res[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}`,
  visible: [
    { args: [[1,2,3,4]], expected: [24,12,8,6] },
    { args: [[2,3]], expected: [3,2] },
  ],
  hidden: [
    { args: [[1,2,0,4]], expected: [0,0,8,0] },
    { args: [[0,0,3]], expected: [0,0,0] },
    { args: [[5]], expected: [1] },
    { args: [[2,3,4,5]], expected: [60,40,30,24] },
    { args: [[-1,2,3]], expected: [6,-3,-2] },
  ],
};

export default challenge;
