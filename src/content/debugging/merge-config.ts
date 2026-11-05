import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-merge-config",
  title: "Merge Config (deep)",
  level: "intermediate",
  minutes: 15,
  fn: "mergeConfig",
  noMutate: true,
  requirements: `<code>mergeConfig(defaults, overrides)</code> returns a NEW config: values in <code>overrides</code> win,
plain nested objects are merged recursively, arrays and other values are replaced. Neither argument may be mutated.`,
  buggyCode: `function mergeConfig(defaults, overrides) {
  return Object.assign(defaults, overrides);
}`,
  solution: `function mergeConfig(defaults, overrides) {
  const isObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
  const out = { ...defaults };
  for (const key of Object.keys(overrides)) {
    out[key] = isObj(out[key]) && isObj(overrides[key]) ? mergeConfig(out[key], overrides[key]) : overrides[key];
  }
  return out;
}`,
  bugs: ["Object.assign muta defaults (y devuelve la misma referencia)","La mezcla es superficial: un objeto anidado en overrides reemplaza todo el objeto de defaults en vez de combinarse"],
  visible: [
    { args: [{"a":1,"b":{"c":2,"d":3}},{"b":{"c":9}}], expected: {"a":1,"b":{"c":9,"d":3}} },
  ],
  hidden: [
    { args: [{"a":1},{}], expected: {"a":1} },
    { args: [{"list":[1,2]},{"list":[3]}], expected: {"list":[3]} },
    { args: [{"x":{"y":1}},{"x":null}], expected: {"x":null} },
    { args: [{"a":{"b":{"c":1,"d":2}}},{"a":{"b":{"d":5},"e":7}}], expected: {"a":{"b":{"c":1,"d":5},"e":7}} },
  ],
};

export default challenge;
