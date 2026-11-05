import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "throttle-events",
  title: "Throttle Event Timestamps",
  level: "intermediate",
  minutes: 15,
  fn: "throttleEvents",
  signatureJS: `function throttleEvents(timestamps, wait)`,
  signatureTS: `function throttleEvents(timestamps: number[], wait: number): number[]`,
  description: `Simulate a throttle: given ascending timestamps (ms), keep the first event and then keep an event only if at least
<code>wait</code> ms have passed since the last KEPT event. Return the kept timestamps.`,
  examples: [["[0,50,100,120,250,260], 100","[0,100,250]"]],
  hint: `Compara contra el último conservado, no contra el anterior.`,
  solution: `function throttleEvents(timestamps, wait) {
  const out = [];
  for (const t of timestamps) if (!out.length || t - out[out.length - 1] >= wait) out.push(t);
  return out;
}`,
  visible: [
    { args: [[0,50,100,120,250,260], 100], expected: [0,100,250] },
    { args: [[], 10], expected: [] },
  ],
  hidden: [
    { args: [[5], 100], expected: [5] },
    { args: [[0,10,20,30,40], 10], expected: [0,10,20,30,40] },
    { args: [[0,99,198,297], 100], expected: [0,198] },
  ],
};

export default challenge;
