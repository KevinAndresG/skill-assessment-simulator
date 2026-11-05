import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "entry",
  id: "dbg-sort-scores",
  title: "Sort Scores",
  minutes: 10,
  fn: "sortScores",
  noMutate: true,
  requirements: `<code>sortScores(scores)</code> must return a NEW array with the numbers sorted ascending. The original array must not change.`,
  buggyCode: `function sortScores(scores) {
  return scores.sort();
}`,
  solution: `function sortScores(scores) {
  return [...scores].sort((a, b) => a - b);
}`,
  bugs: ["sort() sin comparador ordena como strings (\"10\" < \"9\")","sort() muta el array original"],
  visible: [
    { args: [[3,1,2]], expected: [1,2,3] },
    { args: [[10,9,1,100]], expected: [1,9,10,100] },
  ],
  hidden: [
    { args: [[]], expected: [] },
    { args: [[-5,-10,0,5]], expected: [-10,-5,0,5] },
    { args: [[2,2,1]], expected: [1,2,2] },
    { args: [[1000,200,30,4]], expected: [4,30,200,1000] },
  ],
};

export default challenge;
