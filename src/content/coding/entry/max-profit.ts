import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "max-profit",
  title: "Best Time to Buy and Sell",
  level: "entry",
  minutes: 15,
  fn: "maxProfit",
  signatureJS: `function maxProfit(prices)`,
  signatureTS: `function maxProfit(prices: number[]): number`,
  description: `<code>prices[i]</code> is the price of a stock on day i. Choose one day to buy and a later day to sell.
Return the maximum profit, or <code>0</code> if no profit is possible. Must run in O(n).`,
  examples: [["[7,1,5,3,6,4]","5"],["[7,6,4,3,1]","0"]],
  hint: `Guarda el mínimo visto hasta ahora y la mejor diferencia. Un solo recorrido.`,
  solution: `function maxProfit(prices) {
  let min = Infinity, best = 0;
  for (const p of prices) {
    if (p < min) min = p;
    else if (p - min > best) best = p - min;
  }
  return best;
}`,
  visible: [
    { args: [[7,1,5,3,6,4]], expected: 5 },
    { args: [[7,6,4,3,1]], expected: 0 },
  ],
  hidden: [
    { args: [[]], expected: 0 },
    { args: [[1]], expected: 0 },
    { args: [[2,4,1]], expected: 2 },
    { args: [[3,3,5,0,0,3,1,4]], expected: 4 },
    { args: [Array.from({ length: 5000 }, (_, i) => (i * 7919) % 1000)], expected: 999 },
  ],
};

export default challenge;
