import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "reverse-words",
  title: "Reverse Words",
  level: "entry",
  minutes: 10,
  fn: "reverseWords",
  signatureJS: `function reverseWords(s)`,
  signatureTS: `function reverseWords(s: string): string`,
  description: `Given a string <code>s</code>, return the words in reverse order joined by a single space.
Words are separated by one or more spaces. Leading/trailing spaces must be removed.`,
  examples: [["\"the sky is blue\"","\"blue is sky the\""],["\"  hello   world \"","\"world hello\""]],
  hint: `trim() + split(/\\s+/) + reverse() + join. Ojo con el string vacío o solo espacios.`,
  solution: `function reverseWords(s) {
  const t = s.trim();
  if (!t) return '';
  return t.split(/\\s+/).reverse().join(' ');
}`,
  visible: [
    { args: ["the sky is blue"], expected: "blue is sky the" },
    { args: ["  hello   world "], expected: "world hello" },
    { args: ["a"], expected: "a" },
  ],
  hidden: [
    { args: ["   "], expected: "" },
    { args: ["one  two three   four"], expected: "four three two one" },
    { args: ["React and TypeScript"], expected: "TypeScript and React" },
    { args: [""], expected: "" },
  ],
};

export default challenge;
