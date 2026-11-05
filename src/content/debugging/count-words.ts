import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-count-words",
  title: "Count Words",
  level: "entry",
  minutes: 8,
  fn: "countWords",
  requirements: `<code>countWords(str)</code> returns how many words a text has. Words are separated by one or more whitespace
characters (spaces, tabs, line breaks). Leading/trailing whitespace is ignored and an empty text has 0 words.`,
  buggyCode: `function countWords(str) {
  return str.split(' ').length;
}`,
  solution: `function countWords(str) {
  const text = str.trim();
  return text ? text.split(/\\s+/).length : 0;
}`,
  bugs: ["''.split(' ') devuelve [''] (longitud 1): un texto vacío no tiene 0 palabras","Espacios repetidos o al borde generan elementos vacíos → trim() y split(/\\s+/)","Tabs y saltos de línea no se separan con split(\" \")"],
  visible: [
    { args: ["hello world"], expected: 2 },
  ],
  hidden: [
    { args: [""], expected: 0 },
    { args: ["   "], expected: 0 },
    { args: ["  hello   world  "], expected: 2 },
    { args: ["one"], expected: 1 },
    { args: ["a b\tc\nd"], expected: 4 },
  ],
};

export default challenge;
