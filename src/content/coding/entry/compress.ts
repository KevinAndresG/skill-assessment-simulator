import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "compress",
  title: "String Compression",
  level: "entry",
  minutes: 10,
  fn: "compress",
  signatureJS: `function compress(s)`,
  signatureTS: `function compress(s: string): string`,
  description: `Compress consecutive repeated characters: each run becomes the character followed by its count,
but the count is omitted when it is 1. Example: <code>"aaabccdd"</code> → <code>"a3bc2d2"</code>.`,
  examples: [["\"aaabccdd\"","\"a3bc2d2\""],["\"abc\"","\"abc\""]],
  hint: "Recorre agrupando caracteres iguales consecutivos. Piensa qué haces al cambiar de carácter, al terminar la cadena y cuando el grupo tiene un solo elemento.",
  solution: `function compress(s) {
  let out = '';
  for (let i = 0; i < s.length; ) {
    let j = i;
    while (j < s.length && s[j] === s[i]) j++;
    out += s[i] + (j - i > 1 ? j - i : '');
    i = j;
  }
  return out;
}`,
  visible: [
    { args: ["aaabccdd"], expected: "a3bc2d2" },
    { args: ["abc"], expected: "abc" },
    { args: [""], expected: "" },
  ],
  hidden: [
    { args: ["aaaaaaaaaaaa"], expected: "a12" },
    { args: ["aabbaa"], expected: "a2b2a2" },
    { args: ["zzzZZz"], expected: "z3Z2z" },
    { args: ["x"], expected: "x" },
  ],
};

export default challenge;
