import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "intermediate",
  id: "dbg-binary",
  title: "Binary Search (timeout)",
  minutes: 10,
  fn: "binarySearch",
  requirements: `<code>binarySearch(arr, target)</code>: <code>arr</code> is sorted ascending and unique. Return the index or <code>-1</code>.
The current version sometimes never finishes (the platform reports a timeout and scores 0).`,
  buggyCode: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid;
    else hi = mid - 1;
  }
  return -1;
}`,
  solution: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
  hint: "Traza a mano una búsqueda con 2 elementos. ¿Siempre se achica el rango en cada vuelta? Revisa que los dos extremos usen la misma convención (inclusivo o exclusivo).",
  bugs: ["lo = mid puede no avanzar → bucle infinito","límites inconsistentes: hi = length con hi = mid - 1 se salta elementos"],
  visible: [
    { args: [[1,3,5,7], 5], expected: 2 },
    { args: [[1,3,5,7], 1], expected: 0 },
  ],
  hidden: [
    { args: [[1,3,5,7], 7], expected: 3 },
    { args: [[1,3,5,7], 4], expected: -1 },
    { args: [[], 1], expected: -1 },
    { args: [[2,4], 4], expected: 1 },
    { args: [[1,2,3,4,5,6,7,8,9], 8], expected: 7 },
  ],
};

export default challenge;
