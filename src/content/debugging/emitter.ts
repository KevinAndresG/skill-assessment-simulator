import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-emitter",
  title: "Event Emitter",
  level: "data",
  minutes: 20,
  fn: "runEmitter",
  requirements: `<code>createEmitter()</code> returns <code>{ on, off, once, emit }</code>. <code>on(evt, fn)</code> subscribes,
<code>off(evt, fn)</code> removes only that listener (a no-op for unknown events), <code>once(evt, fn)</code> runs <code>fn</code> a single
time and can also be removed with <code>off(evt, fn)</code>, and <code>emit(evt, ...args)</code> calls the current listeners.
<code>runEmitter</code> is a test helper — do not modify it.`,
  buggyCode: `function createEmitter() {
  const handlers = {};
  return {
    on(evt, fn) {
      (handlers[evt] = handlers[evt] || []).push(fn);
    },
    off(evt, fn) {
      handlers[evt] = handlers[evt].filter(h => h === fn);
    },
    once(evt, fn) {
      this.on(evt, (...args) => {
        fn(...args);
        this.off(evt, fn);
      });
    },
    emit(evt, ...args) {
      (handlers[evt] || []).forEach(h => h(...args));
    },
  };
}

// Do not modify: test helper
function runEmitter(emits) {
  const log = [];
  const e = createEmitter();
  const a = () => log.push('a');
  const b = () => log.push('b');
  e.on('x', a);
  e.once('x', b);
  for (let i = 0; i < emits; i++) e.emit('x');
  e.off('x', a);
  e.emit('x');
  e.off('nope', a);
  return log;
}`,
  solution: `function createEmitter() {
  const handlers = {};
  const api = {
    on(evt, fn) {
      (handlers[evt] = handlers[evt] || []).push(fn);
    },
    off(evt, fn) {
      handlers[evt] = (handlers[evt] || []).filter(h => h !== fn && h.orig !== fn);
    },
    once(evt, fn) {
      const wrapper = (...args) => {
        api.off(evt, wrapper);
        fn(...args);
      };
      wrapper.orig = fn;
      api.on(evt, wrapper);
    },
    emit(evt, ...args) {
      [...(handlers[evt] || [])].forEach(h => h(...args));
    },
  };
  return api;
}

// Do not modify: test helper
function runEmitter(emits) {
  const log = [];
  const e = createEmitter();
  const a = () => log.push('a');
  const b = () => log.push('b');
  e.on('x', a);
  e.once('x', b);
  for (let i = 0; i < emits; i++) e.emit('x');
  e.off('x', a);
  e.emit('x');
  e.off('nope', a);
  return log;
}`,
  hint: "Hay tres fallos distintos: la condición del filtro en off, qué función se registra realmente en once, y qué pasa al quitar un listener de un evento que nunca se registró.",
  bugs: ["off usa === en vez de !==: conserva SOLO el listener a quitar","once se desuscribe con off(evt, fn) pero lo registrado es el wrapper → hay que quitar el wrapper","off lanza TypeError con eventos desconocidos (handlers[evt] es undefined)"],
  visible: [
    { args: [2], expected: ["a","b","a"] },
  ],
  hidden: [
    { args: [0], expected: ["b"] },
    { args: [1], expected: ["a","b"] },
    { args: [3], expected: ["a","b","a","a"] },
  ],
};

export default challenge;
