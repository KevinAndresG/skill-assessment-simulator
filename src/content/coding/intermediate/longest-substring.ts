import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "longest-substring",
  title: "Longest Substring Without Repeats",
  level: "intermediate",
  minutes: 20,
  fn: "lengthOfLongestSubstring",
  signatureJS: `function lengthOfLongestSubstring(s)`,
  signatureTS: `function lengthOfLongestSubstring(s: string): number`,
  description: `Return the length of the longest substring of <code>s</code> with no repeated characters. Aim for O(n) (sliding window).`,
  examples: [["\"abcabcbb\"","3"],["\"bbbbb\"","1"],["\"pwwkew\"","3"]],
  hint: `Ventana deslizante: Map char → último índice; mueve el inicio a max(inicio, último + 1).`,
  solution: `function lengthOfLongestSubstring(s) {
  const last = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    if (last.has(s[i]) && last.get(s[i]) >= start) start = last.get(s[i]) + 1;
    last.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}`,
  visible: [
    { args: ["abcabcbb"], expected: 3 },
    { args: ["bbbbb"], expected: 1 },
    { args: ["pwwkew"], expected: 3 },
  ],
  hidden: [
    { args: [""], expected: 0 },
    { args: [" "], expected: 1 },
    { args: ["dvdf"], expected: 3 },
    { args: ["abba"], expected: 2 },
    { args: ['abcdefghijklmnopqrstuvwxyz'.repeat(100)], expected: 26 },
  ],
};

export default challenge;
