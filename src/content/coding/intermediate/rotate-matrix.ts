import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "rotate-matrix",
  title: "Rotate Matrix 90°",
  level: "intermediate",
  minutes: 15,
  fn: "rotateMatrix",
  noMutate: true,
  signatureJS: `function rotateMatrix(matrix)`,
  signatureTS: `function rotateMatrix<T>(matrix: T[][]): T[][]`,
  description: `Return a NEW matrix with <code>matrix</code> rotated 90° clockwise. The matrix may be rectangular (R×C becomes C×R).
An empty matrix returns <code>[]</code>. Do not mutate the input.`,
  examples: [["[[1,2],[3,4]]","[[3,1],[4,2]]"]],
  hint: `La fila r de la salida es la columna r de la entrada leída de abajo hacia arriba.`,
  solution: `function rotateMatrix(matrix) {
  if (!matrix.length) return [];
  return matrix[0].map((_, c) => matrix.map(row => row[c]).reverse());
}`,
  visible: [
    { args: [[[1,2],[3,4]]], expected: [[3,1],[4,2]] },
    { args: [[[1,2,3],[4,5,6]]], expected: [[4,1],[5,2],[6,3]] },
  ],
  hidden: [
    { args: [[[1]]], expected: [[1]] },
    { args: [[]], expected: [] },
    { args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] },
    { args: [[["a"],["b"],["c"]]], expected: [["c","b","a"]] },
  ],
};

export default challenge;
