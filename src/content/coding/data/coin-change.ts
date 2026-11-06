import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "coin-change",
  title: "Coin Change",
  level: "data",
  minutes: 25,
  fn: "coinChange",
  noMutate: true,
  signatureJS: `function coinChange(coins, amount)`,
  signatureTS: `function coinChange(coins: number[], amount: number): number`,
  description: `Given coin denominations <code>coins</code> (unlimited supply of each) return the FEWEST coins needed to make <code>amount</code>,
or <code>-1</code> if it is impossible. <code>amount = 0</code> needs 0 coins. A greedy approach is not always correct (<code>[1,3,4]</code>, 6 → 2).`,
  examples: [["[1,2,5], 11","3"],["[2], 3","-1"]],
  hint: "Resuelve primero para montos pequeños y reutiliza esos resultados para los grandes. Piensa qué respuesta tiene el monto 0 y cómo marcar un monto imposible.",
  solution: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a && dp[a - c] + 1 < dp[a]) dp[a] = dp[a - c] + 1;
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
  visible: [
    { args: [[1,2,5],11], expected: 3 },
    { args: [[2],3], expected: -1 },
  ],
  hidden: [
    { args: [[1],0], expected: 0 },
    { args: [[1,3,4],6], expected: 2 },
    { args: [[5,10],7], expected: -1 },
    { args: [[186,419,83,408],6249], expected: 20 },
    { args: [[2,5,10,1],27], expected: 4 },
  ],
};

export default challenge;
