import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "roman",
  title: "Roman to Integer",
  level: "entry",
  minutes: 15,
  fn: "romanToInt",
  signatureJS: `function romanToInt(s)`,
  signatureTS: `function romanToInt(s: string): number`,
  description: `Convert a valid Roman numeral (I=1, V=5, X=10, L=50, C=100, D=500, M=1000) to an integer.
Subtractive notation applies: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.`,
  examples: [["\"MCMXCIV\"","1994"],["\"LVIII\"","58"]],
  hint: "Recorre de izquierda a derecha comparando cada símbolo con el siguiente. ¿Cuándo un valor resta en lugar de sumar?",
  solution: `function romanToInt(s) {
  const v = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = v[s[i]], next = v[s[i + 1]] || 0;
    total += cur < next ? -cur : cur;
  }
  return total;
}`,
  visible: [
    { args: ["MCMXCIV"], expected: 1994 },
    { args: ["LVIII"], expected: 58 },
    { args: ["III"], expected: 3 },
  ],
  hidden: [
    { args: ["IV"], expected: 4 },
    { args: ["IX"], expected: 9 },
    { args: ["MMXXVI"], expected: 2026 },
    { args: ["CDXLIV"], expected: 444 },
    { args: ["MMMCMXCIX"], expected: 3999 },
  ],
};

export default challenge;
