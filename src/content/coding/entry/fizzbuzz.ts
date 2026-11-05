import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "fizzbuzz",
  title: "FizzBuzz",
  level: "entry",
  minutes: 10,
  fn: "fizzBuzz",
  signatureJS: `function fizzBuzz(n)`,
  signatureTS: `function fizzBuzz(n: number): string[]`,
  description: `Return an array of strings for numbers 1..n: <code>"FizzBuzz"</code> if divisible by 3 and 5, <code>"Fizz"</code> if by 3,
<code>"Buzz"</code> if by 5, otherwise the number as a string. For <code>n &lt;= 0</code> return an empty array.`,
  examples: [["5","[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]"]],
  hint: `Evalúa primero el caso % 15. Devuelve String(i).`,
  solution: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : String(i));
  }
  return out;
}`,
  visible: [
    { args: [5], expected: ["1","2","Fizz","4","Buzz"] },
    { args: [0], expected: [] },
  ],
  hidden: [
    { args: [15], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] },
    { args: [1], expected: ["1"] },
    { args: [-3], expected: [] },
    { args: [30], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz","16","17","Fizz","19","Buzz","Fizz","22","23","Fizz","Buzz","26","Fizz","28","29","FizzBuzz"] },
  ],
};

export default challenge;
