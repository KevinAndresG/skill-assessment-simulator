import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "brackets",
  title: "Valid Brackets",
  level: "intermediate",
  minutes: 15,
  fn: "isValidBrackets",
  signatureJS: `function isValidBrackets(s)`,
  signatureTS: `function isValidBrackets(s: string): boolean`,
  description: `<code>s</code> may contain any characters. Return <code>true</code> if every <code>()</code>, <code>[]</code>, <code>{}</code>
is closed by the same type in the correct order. Other characters are ignored.`,
  examples: [["\"{[()]}\"","true"],["\"(]\"","false"],["\"fn(a[0]) { }\"","true"]],
  hint: `Pila (stack). Al cerrar, compara con el tope; al final la pila debe estar vacía.`,
  solution: `function isValidBrackets(s) {
  const pairs = { ')':'(', ']':'[', '}':'{' };
  const stack = [];
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (ch in pairs) { if (stack.pop() !== pairs[ch]) return false; }
  }
  return stack.length === 0;
}`,
  visible: [
    { args: ["{[()]}"], expected: true },
    { args: ["(]"], expected: false },
    { args: ["fn(a[0]) { }"], expected: true },
  ],
  hidden: [
    { args: [""], expected: true },
    { args: ["(("], expected: false },
    { args: ["))"], expected: false },
    { args: ["([)]"], expected: false },
    { args: ["if (x) { arr[i] = (a + b); }"], expected: true },
  ],
};

export default challenge;
