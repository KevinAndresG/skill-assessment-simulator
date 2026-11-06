import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "intermediate",
  id: "dbg-this",
  title: "Formatter this binding",
  minutes: 10,
  fn: "formatAll",
  requirements: `<code>formatAll(names)</code> must return each name prefixed with <code>formatter.prefix</code> and a space, e.g. <code>"Mr. Lee"</code>.`,
  buggyCode: `const formatter = {
  prefix: 'Mr.',
  format(names) {
    return names.map(function (n) {
      return this.prefix + ' ' + n;
    });
  },
};

function formatAll(names) {
  return formatter.format(names);
}`,
  solution: `const formatter = {
  prefix: 'Mr.',
  format(names) {
    return names.map(n => this.prefix + ' ' + n);
  },
};

function formatAll(names) {
  return formatter.format(names);
}`,
  hint: "Dentro del callback de map, ¿a qué apunta this? Compara cómo se comportan una función normal y una flecha respecto al this.",
  bugs: ["una function normal dentro de map pierde el this del objeto → arrow function (o pasar thisArg)"],
  visible: [
    { args: [["Lee","Kim"]], expected: ["Mr. Lee","Mr. Kim"] },
  ],
  hidden: [
    { args: [[]], expected: [] },
    { args: [["García"]], expected: ["Mr. García"] },
  ],
};

export default challenge;
