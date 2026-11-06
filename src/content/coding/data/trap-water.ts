import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "trap-water",
  title: "Trapping Rain Water",
  level: "data",
  minutes: 30,
  fn: "trapWater",
  noMutate: true,
  signatureJS: `function trapWater(heights)`,
  signatureTS: `function trapWater(heights: number[]): number`,
  description: `<code>heights[i]</code> is the height of the bar at position <code>i</code> (width 1). After raining, return how many units of water
stay trapped between the bars.`,
  examples: [["[0,1,0,2,1,0,1,3,2,1,2,1]","6"]],
  hint: "Fíjate en una sola barra: ¿de qué dos cosas depende cuánta agua se acumula encima? Si lo resuelves por barra, piensa cómo conocer esos dos datos sin recalcularlos cada vez.",
  solution: `function trapWater(heights) {
  let lo = 0, hi = heights.length - 1;
  let maxL = 0, maxR = 0, water = 0;
  while (lo < hi) {
    if (heights[lo] < heights[hi]) {
      maxL = Math.max(maxL, heights[lo]);
      water += maxL - heights[lo];
      lo++;
    } else {
      maxR = Math.max(maxR, heights[hi]);
      water += maxR - heights[hi];
      hi--;
    }
  }
  return water;
}`,
  visible: [
    { args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 },
    { args: [[4,2,0,3,2,5]], expected: 9 },
  ],
  hidden: [
    { args: [[]], expected: 0 },
    { args: [[3]], expected: 0 },
    { args: [[1,2,3]], expected: 0 },
    { args: [[2,0,2]], expected: 2 },
    { args: [[5,4,1,2]], expected: 1 },
    { args: [[3,0,0,2,0,4]], expected: 10 },
  ],
};

export default challenge;
