import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "most-frequent",
  title: "Most Frequent Letter",
  level: "entry",
  minutes: 10,
  fn: "mostFrequentChar",
  signatureJS: `function mostFrequentChar(s)`,
  signatureTS: `function mostFrequentChar(s: string): string`,
  description: `Return the most frequent letter in <code>s</code>, case-insensitive, as lowercase. Only letters a–z count.
On a tie return the alphabetically first letter. If there are no letters return <code>""</code>.`,
  examples: [["\"Hello World\"","\"l\""],["\"aabb\"","\"a\""]],
  hint: `Objeto/Map de frecuencias sobre s.toLowerCase(); recorre de "a" a "z" para resolver empates.`,
  solution: `function mostFrequentChar(s) {
  const freq = {};
  for (const ch of s.toLowerCase()) if (ch >= 'a' && ch <= 'z') freq[ch] = (freq[ch] || 0) + 1;
  let best = '', max = 0;
  for (const ch of Object.keys(freq).sort()) if (freq[ch] > max) { max = freq[ch]; best = ch; }
  return best;
}`,
  visible: [
    { args: ["Hello World"], expected: "l" },
    { args: ["aabb"], expected: "a" },
    { args: ["123 !!"], expected: "" },
  ],
  hidden: [
    { args: ["ZzZ yy"], expected: "z" },
    { args: ["bbaacc"], expected: "a" },
    { args: ["The quick brown fox jumps over the lazy dog"], expected: "o" },
    { args: [""], expected: "" },
  ],
};

export default challenge;
