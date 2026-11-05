import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "palindrome",
  title: "Valid Palindrome",
  level: "entry",
  minutes: 10,
  fn: "isPalindrome",
  signatureJS: `function isPalindrome(s)`,
  signatureTS: `function isPalindrome(s: string): boolean`,
  description: `Return <code>true</code> if <code>s</code> is a palindrome after converting all uppercase letters to lowercase
and removing every non-alphanumeric character. An empty string is a palindrome.`,
  examples: [["\"A man, a plan, a canal: Panama\"","true"],["\"race a car\"","false"]],
  hint: `Normaliza con toLowerCase().replace(/[^a-z0-9]/g, "") y usa dos punteros.`,
  solution: `function isPalindrome(s) {
  const c = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let i = 0, j = c.length - 1;
  while (i < j) { if (c[i++] !== c[j--]) return false; }
  return true;
}`,
  visible: [
    { args: ["A man, a plan, a canal: Panama"], expected: true },
    { args: ["race a car"], expected: false },
    { args: [""], expected: true },
  ],
  hidden: [
    { args: ["0P"], expected: false },
    { args: ["No lemon, no melon"], expected: true },
    { args: ["ab_a"], expected: true },
    { args: ["12321"], expected: true },
    { args: ["Was it a car or a cat I saw?"], expected: true },
  ],
};

export default challenge;
