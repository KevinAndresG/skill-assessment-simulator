import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "merge-intervals",
  title: "Merge Intervals",
  level: "intermediate",
  minutes: 20,
  fn: "mergeIntervals",
  noMutate: true,
  signatureJS: `function mergeIntervals(intervals)`,
  signatureTS: `function mergeIntervals(intervals: [number, number][]): [number, number][]`,
  description: `Merge all overlapping intervals and return them sorted by start. Touching intervals (e.g. [1,3] and [3,5]) also merge.
The input may be unsorted.`,
  examples: [["[[1,3],[8,10],[2,6],[15,18]]","[[1,6],[8,10],[15,18]]"],["[[1,4],[4,5]]","[[1,5]]"]],
  hint: "Si los intervalos estuvieran ordenados, ¿cómo sabrías si el siguiente se solapa con el anterior? Ordena una copia, no el original.",
  solution: `function mergeIntervals(intervals) {
  const sorted = intervals.map(i => [...i]).sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const cur of sorted) {
    const last = out[out.length - 1];
    if (last && cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
    else out.push(cur);
  }
  return out;
}`,
  visible: [
    { args: [[[1,3],[8,10],[2,6],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
    { args: [[[1,4],[4,5]]], expected: [[1,5]] },
  ],
  hidden: [
    { args: [[]], expected: [] },
    { args: [[[5,7]]], expected: [[5,7]] },
    { args: [[[1,10],[2,3],[4,5]]], expected: [[1,10]] },
    { args: [[[6,8],[1,9],[2,4],[4,7]]], expected: [[1,9]] },
    { args: [[[10,12],[1,2],[3,4]]], expected: [[1,2],[3,4],[10,12]] },
  ],
};

export default challenge;
