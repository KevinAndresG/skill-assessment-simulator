import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "flatten-object",
  title: "Flatten Object Keys",
  level: "intermediate",
  minutes: 20,
  fn: "flattenObject",
  signatureJS: `function flattenObject(obj)`,
  signatureTS: `function flattenObject(obj: Record<string, unknown>): Record<string, unknown>`,
  description: `Flatten nested plain objects into one level using dot-separated keys. Arrays, <code>null</code> and primitives are leaf values
(kept as they are). Empty nested objects produce no keys.`,
  examples: [["{a:1, b:{c:2, d:{e:3}}, f:[1,2]}","{\"a\":1,\"b.c\":2,\"b.d.e\":3,\"f\":[1,2]}"]],
  hint: `Recursión con prefijo. Es objeto "plano" si typeof === "object", no es null y no es array.`,
  solution: `function flattenObject(obj) {
  const out = {};
  const walk = (o, prefix) => {
    for (const [k, v] of Object.entries(o)) {
      const key = prefix ? prefix + '.' + k : k;
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) walk(v, key);
      else out[key] = v;
    }
  };
  walk(obj, '');
  return out;
}`,
  visible: [
    { args: [{"a":1,"b":{"c":2,"d":{"e":3}},"f":[1,2]}], expected: {"a":1,"b.c":2,"b.d.e":3,"f":[1,2]} },
    { args: [{}], expected: {} },
  ],
  hidden: [
    { args: [{"a":{"b":{}}}], expected: {} },
    { args: [{"x":null,"y":{"z":null}}], expected: {"x":null,"y.z":null} },
    { args: [{"user":{"name":"Ana","address":{"city":"Medellín","zip":"050021"}},"roles":["admin"]}], expected: {"user.name":"Ana","user.address.city":"Medellín","user.address.zip":"050021","roles":["admin"]} },
  ],
};

export default challenge;
