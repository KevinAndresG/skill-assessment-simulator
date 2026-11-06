import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "count-vowels",
  title: "Count Vowels",
  level: "entry",
  minutes: 8,
  fn: "countVowels",
  signatureJS: `function countVowels(str)`,
  signatureTS: `function countVowels(str: string): number`,
  description: `Return how many vowels (<code>a e i o u</code>, upper or lower case) <code>str</code> contains. Accented letters are not counted.`,
  examples: [["\"Hello World\"","3"]],
  hint: "Recorre y decide si cada carácter es vocal, sin importar mayúsculas. Si usas coincidencias de regex, ¿qué devuelve cuando no hay ninguna?",
  solution: `function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}`,
  visible: [
    { args: ["Hello World"], expected: 3 },
    { args: ["rhythm"], expected: 0 },
  ],
  hidden: [
    { args: [""], expected: 0 },
    { args: ["AEIOU"], expected: 5 },
    { args: ["education"], expected: 5 },
    { args: ["xyz 123"], expected: 0 },
  ],
};

export default challenge;
