import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "camel",
  title: "To camelCase",
  level: "entry",
  minutes: 10,
  fn: "toCamelCase",
  signatureJS: `function toCamelCase(s)`,
  signatureTS: `function toCamelCase(s: string): string`,
  description: `Split <code>s</code> on underscores, hyphens and whitespace (ignore empty pieces). The first word is fully lowercased;
every following word has its first letter uppercased and the rest lowercased. Join without separators.`,
  examples: [["\"hello_world-foo bar\"","\"helloWorldFooBar\""],["\"  API  response_CODE \"","\"apiResponseCode\""]],
  hint: `split(/[_\\-\\s]+/).filter(Boolean) y luego map con índice.`,
  solution: `function toCamelCase(s) {
  return s.split(/[_\\-\\s]+/).filter(Boolean)
    .map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}`,
  visible: [
    { args: ["hello_world-foo bar"], expected: "helloWorldFooBar" },
    { args: ["  API  response_CODE "], expected: "apiResponseCode" },
  ],
  hidden: [
    { args: [""], expected: "" },
    { args: ["single"], expected: "single" },
    { args: ["--multiple___separators  here"], expected: "multipleSeparatorsHere" },
    { args: ["MSP partner_portal"], expected: "mspPartnerPortal" },
  ],
};

export default challenge;
