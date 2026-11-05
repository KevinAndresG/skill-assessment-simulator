import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-group-by",
  title: "Group By Key",
  level: "intermediate",
  minutes: 12,
  fn: "groupBy",
  noMutate: true,
  requirements: `<code>groupBy(items, key)</code> returns an object where each property is a value of <code>item[key]</code> and
its value is the array of items with that value, in the original order. An empty list returns <code>{}</code>.`,
  buggyCode: `function groupBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]].push(item);
    return acc;
  }, []);
}`,
  solution: `function groupBy(items, key) {
  return items.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}`,
  bugs: ["Nunca se inicializa el grupo: acc[k] es undefined y .push lanza TypeError","El valor inicial del reduce es [] en vez de {} (las claves se pierden al serializar)"],
  visible: [
    { args: [[{"t":"a","n":1},{"t":"b","n":2},{"t":"a","n":3}],"t"], expected: {"a":[{"t":"a","n":1},{"t":"a","n":3}],"b":[{"t":"b","n":2}]} },
  ],
  hidden: [
    { args: [[],"t"], expected: {} },
    { args: [[{"age":20,"name":"x"},{"age":30,"name":"y"},{"age":20,"name":"z"}],"age"], expected: {"20":[{"age":20,"name":"x"},{"age":20,"name":"z"}],"30":[{"age":30,"name":"y"}]} },
    { args: [[{"k":"only"}],"k"], expected: {"only":[{"k":"only"}]} },
  ],
};

export default challenge;
