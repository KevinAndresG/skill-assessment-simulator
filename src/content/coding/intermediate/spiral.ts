import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "spiral",
  title: "Spiral Matrix",
  level: "intermediate",
  minutes: 20,
  fn: "spiralOrder",
  signatureJS: `function spiralOrder(matrix)`,
  signatureTS: `function spiralOrder(matrix: number[][]): number[]`,
  description: `Return all elements of an m×n matrix in clockwise spiral order, starting at the top-left.`,
  examples: [["[[1,2,3],[4,5,6],[7,8,9]]","[1,2,3,6,9,8,7,4,5]"]],
  hint: "Mantén cuatro límites que se van cerrando. Después de recorrer cada lado, ¿qué pasa si la matriz era de una sola fila o columna? Revisa esos casos antes de volver.",
  solution: `function spiralOrder(matrix) {
  const out = [];
  if (!matrix.length) return out;
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) out.push(matrix[top][j]);
    top++;
    for (let i = top; i <= bottom; i++) out.push(matrix[i][right]);
    right--;
    if (top <= bottom) { for (let j = right; j >= left; j--) out.push(matrix[bottom][j]); bottom--; }
    if (left <= right) { for (let i = bottom; i >= top; i--) out.push(matrix[i][left]); left++; }
  }
  return out;
}`,
  visible: [
    { args: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5] },
    { args: [[]], expected: [] },
  ],
  hidden: [
    { args: [[[1,2,3,4],[5,6,7,8],[9,10,11,12]]], expected: [1,2,3,4,8,12,11,10,9,5,6,7] },
    { args: [[[1],[2],[3]]], expected: [1,2,3] },
    { args: [[[1,2,3]]], expected: [1,2,3] },
    { args: [[[1,2],[3,4]]], expected: [1,2,4,3] },
  ],
};

export default challenge;
