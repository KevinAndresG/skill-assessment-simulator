import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "anagrams",
  title: "Group Anagrams",
  level: "intermediate",
  minutes: 20,
  fn: "groupAnagrams",
  signatureJS: `function groupAnagrams(words)`,
  signatureTS: `function groupAnagrams(words: string[]): string[][]`,
  description: `Group words that are anagrams of each other. Each group must be sorted alphabetically and the list of groups
must be sorted by the first word of each group. Duplicated words stay in the same group.`,
  examples: [["[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]","[[\"ate\",\"eat\",\"tea\"],[\"bat\"],[\"nat\",\"tan\"]]"]],
  hint: `Clave = palabra ordenada (split("").sort().join("")). Map clave → lista. Luego ordena.`,
  solution: `function groupAnagrams(words) {
  const map = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()].map(g => g.sort()).sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
}`,
  visible: [
    { args: [["eat","tea","tan","ate","nat","bat"]], expected: [["ate","eat","tea"],["bat"],["nat","tan"]] },
    { args: [[]], expected: [] },
  ],
  hidden: [
    { args: [["a"]], expected: [["a"]] },
    { args: [["abc","bca","cab","abc","xyz"]], expected: [["abc","abc","bca","cab"],["xyz"]] },
    { args: [["listen","silent","enlist","google","gogole"]], expected: [["enlist","listen","silent"],["gogole","google"]] },
  ],
};

export default challenge;
