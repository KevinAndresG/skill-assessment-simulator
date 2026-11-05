import type { TestCase } from '@/content/types';

const DEEP_EQUAL = `function __eq(a,b){if(Object.is(a,b))return true;if(a===null||b===null||typeof a!=='object'||typeof b!=='object')return false;if(Array.isArray(a)!==Array.isArray(b))return false;const ka=Object.keys(a),kb=Object.keys(b);if(ka.length!==kb.length)return false;return ka.every(k=>Object.prototype.hasOwnProperty.call(b,k)&&__eq(a[k],b[k]));}`;

export const HEADER = `const __logs=[];const __fmt=v=>{if(v===undefined)return 'undefined';if(typeof v==='number'&&isNaN(v))return 'NaN';if(typeof v==='function')return '[Function]';try{return JSON.stringify(v)}catch(e){return String(v)}};
console.log=console.info=console.warn=console.error=(...a)=>{if(__logs.length<200)__logs.push(a.map(x=>typeof x==='string'?x:__fmt(x)).join(' '))};
`;
export const HEADER_LINES = HEADER.split('\n').length - 1;

/** Script completo que corre dentro del Web Worker: código del usuario + tests. */
export function buildWorkerSource(userJs: string, fnName: string, tests: TestCase[], noMutate: boolean): string {
  return `${HEADER}${userJs}
;(async()=>{
${DEEP_EQUAL}
const __tests=${JSON.stringify(tests)};
let __fn; try { __fn = ${fnName}; } catch (e) { postMessage({ status: 'fatal', message: 'No se encontró la función ${fnName}. ¿Cambiaste su nombre?', logs: __logs }); return; }
if (typeof __fn !== 'function') { postMessage({ status: 'fatal', message: '${fnName} no es una función', logs: __logs }); return; }
const __res = [];
for (const t of __tests) {
  const args = JSON.parse(JSON.stringify(t.args)); const before = JSON.stringify(args);
  const t0 = performance.now();
  try {
    let out = __fn(...args); if (out && typeof out.then === 'function') out = await out;
    let norm; try { norm = out === undefined ? undefined : JSON.parse(JSON.stringify(out)); } catch (e) { norm = out; }
    let pass = __eq(norm, t.expected); let note = '';
    if (pass && ${noMutate} && JSON.stringify(args) !== before) { pass = false; note = 'El input fue mutado'; }
    __res.push({ pass, out: __fmt(out), ms: performance.now() - t0, note });
  } catch (e) { __res.push({ pass: false, error: (e && e.name ? e.name + ': ' : '') + (e && e.message || String(e)) }); }
}
postMessage({ status: 'ok', results: __res, logs: __logs });
})();`;
}
