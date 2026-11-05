import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-retry",
  title: "Retry Async Call",
  level: "intermediate",
  minutes: 15,
  fn: "runRetry",
  requirements: `<code>retry(fn, times)</code> calls the async function <code>fn</code> up to <code>times</code> attempts in total and
resolves with the first successful result. If every attempt fails it rejects. <code>runRetry</code> is a test helper — do not modify it.`,
  buggyCode: `async function retry(fn, times) {
  for (let i = 0; i < times; i++) {
    try {
      return fn();
    } catch (e) {
      // try again
    }
  }
  throw new Error('failed');
}

// Do not modify: test helper
async function runRetry(failures, times) {
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls <= failures) throw new Error('boom');
    return 'ok';
  };
  try {
    return [await retry(fn, times), calls];
  } catch (e) {
    return ['failed', calls];
  }
}`,
  solution: `async function retry(fn, times) {
  let lastError;
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('failed');
}

// Do not modify: test helper
async function runRetry(failures, times) {
  let calls = 0;
  const fn = async () => {
    calls++;
    if (calls <= failures) throw new Error('boom');
    return 'ok';
  };
  try {
    return [await retry(fn, times), calls];
  } catch (e) {
    return ['failed', calls];
  }
}`,
  bugs: ["return fn() devuelve la promesa sin esperarla: el rechazo ocurre fuera del try/catch y nunca se reintenta → return await fn()"],
  visible: [
    { args: [2,3], expected: ["ok",3] },
  ],
  hidden: [
    { args: [0,3], expected: ["ok",1] },
    { args: [5,3], expected: ["failed",3] },
    { args: [3,3], expected: ["failed",3] },
    { args: [1,1], expected: ["failed",1] },
    { args: [4,5], expected: ["ok",5] },
  ],
};

export default challenge;
