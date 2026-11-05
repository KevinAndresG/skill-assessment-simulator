import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "sort-records",
  title: "Multi-column Table Sort",
  level: "data",
  minutes: 25,
  fn: "sortRecords",
  noMutate: true,
  signatureJS: `function sortRecords(records, spec)`,
  signatureTS: `type SortSpec = { key: string; dir: 'asc' | 'desc' };
function sortRecords<T extends Record<string, string | number>>(records: T[], spec: SortSpec[]): T[]`,
  description: `Data-grid sorting for a B2B portal. Sort <code>records</code> by the keys in <code>spec</code>, in priority order
(first key wins, next keys break ties). Values are numbers or strings, compared with <code>&lt;</code>/<code>&gt;</code>.
The sort must be stable and must NOT mutate the input array.`,
  examples: [["[{n:\"b\",v:2},{n:\"a\",v:2},{n:\"c\",v:1}], [{key:\"v\",dir:\"desc\"},{key:\"n\",dir:\"asc\"}]","[{n:\"a\",v:2},{n:\"b\",v:2},{n:\"c\",v:1}]"]],
  hint: `[...records].sort(comparator) — el comparador recorre spec y devuelve el primer resultado distinto de 0.`,
  solution: `function sortRecords(records, spec) {
  return [...records].sort((a, b) => {
    for (const { key, dir } of spec) {
      if (a[key] < b[key]) return dir === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return dir === 'asc' ? 1 : -1;
    }
    return 0;
  });
}`,
  visible: [
    { args: [[{"n":"b","v":2},{"n":"a","v":2},{"n":"c","v":1}], [{"key":"v","dir":"desc"},{"key":"n","dir":"asc"}]], expected: [{"n":"a","v":2},{"n":"b","v":2},{"n":"c","v":1}] },
  ],
  hidden: [
    { args: [[], [{"key":"x","dir":"asc"}]], expected: [] },
    { args: [[{"id":1,"t":"x"},{"id":2,"t":"x"},{"id":3,"t":"a"}], [{"key":"t","dir":"asc"}]], expected: [{"id":3,"t":"a"},{"id":1,"t":"x"},{"id":2,"t":"x"}] },
    { args: [[{"client":"Acme","mrr":500,"tier":"gold"},{"client":"Beta","mrr":900,"tier":"silver"},{"client":"Core","mrr":500,"tier":"gold"},{"client":"Delta","mrr":120,"tier":"bronze"}], [{"key":"tier","dir":"desc"},{"key":"mrr","dir":"desc"},{"key":"client","dir":"asc"}]], expected: [{"client":"Beta","mrr":900,"tier":"silver"},{"client":"Acme","mrr":500,"tier":"gold"},{"client":"Core","mrr":500,"tier":"gold"},{"client":"Delta","mrr":120,"tier":"bronze"}] },
    { args: [[{"a":3},{"a":1},{"a":2}], []], expected: [{"a":3},{"a":1},{"a":2}] },
  ],
};

export default challenge;
