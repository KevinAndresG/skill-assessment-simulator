import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "islands",
  title: "Count Islands",
  level: "data",
  minutes: 25,
  fn: "countIslands",
  noMutate: true,
  signatureJS: `function countIslands(grid)`,
  signatureTS: `function countIslands(grid: number[][]): number`,
  description: `<code>grid</code> is a matrix of 1 (land) and 0 (water). An island is a group of 1s connected horizontally or vertically.
Return the number of islands. Do not mutate the input.`,
  examples: [["[[1,1,0],[0,1,0],[1,0,1]]","3"]],
  hint: `BFS/DFS desde cada 1 no visitado, con un Set o matriz de visitados (no modifiques grid).`,
  solution: `function countIslands(grid) {
  const R = grid.length, C = R ? grid[0].length : 0;
  const seen = Array.from({ length: R }, () => Array(C).fill(false));
  let count = 0;
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    if (grid[r][c] !== 1 || seen[r][c]) continue;
    count++;
    const stack = [[r, c]]; seen[r][c] = true;
    while (stack.length) {
      const [y, x] = stack.pop();
      for (const [dy, dx] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const ny = y + dy, nx = x + dx;
        if (ny >= 0 && ny < R && nx >= 0 && nx < C && grid[ny][nx] === 1 && !seen[ny][nx]) { seen[ny][nx] = true; stack.push([ny, nx]); }
      }
    }
  }
  return count;
}`,
  visible: [
    { args: [[[1,1,0],[0,1,0],[1,0,1]]], expected: 3 },
    { args: [[]], expected: 0 },
  ],
  hidden: [
    { args: [[[0,0],[0,0]]], expected: 0 },
    { args: [[[1,1,1],[1,1,1]]], expected: 1 },
    { args: [[[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]]], expected: 8 },
    { args: [[[1,1,0,0,0],[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1]]], expected: 3 },
  ],
};

export default challenge;
