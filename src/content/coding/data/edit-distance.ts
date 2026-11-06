import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "edit-distance",
  title: "Edit Distance",
  level: "data",
  minutes: 30,
  fn: "editDistance",
  signatureJS: `function editDistance(a, b)`,
  signatureTS: `function editDistance(a: string, b: string): number`,
  description: `Return the minimum number of single-character operations (insert, delete or replace) needed to turn <code>a</code> into <code>b</code> (Levenshtein distance).`,
  examples: [["\"horse\", \"ros\"","3"],["\"kitten\", \"sitting\"","3"]],
  hint: "Es programación dinámica sobre prefijos de ambas cadenas. Define qué significa cada celda de la tabla, qué valores iniciales tiene la primera fila y columna, y qué tres operaciones llegan a una celda.",
  solution: `function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}`,
  visible: [
    { args: ["horse","ros"], expected: 3 },
    { args: ["kitten","sitting"], expected: 3 },
  ],
  hidden: [
    { args: ["","abc"], expected: 3 },
    { args: ["abc","abc"], expected: 0 },
    { args: ["a",""], expected: 1 },
    { args: ["intention","execution"], expected: 5 },
    { args: ["sunday","saturday"], expected: 3 },
  ],
};

export default challenge;
