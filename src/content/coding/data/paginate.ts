import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "paginate",
  title: "Paginate Results",
  level: "data",
  minutes: 15,
  fn: "paginate",
  signatureJS: `function paginate(items, page, pageSize)`,
  signatureTS: `function paginate<T>(items: T[], page: number, pageSize: number): {
  data: T[]; page: number; pageSize: number; total: number; totalPages: number;
}`,
  description: `Return <code>{ data, page, pageSize, total, totalPages }</code>. <code>page</code> is 1-based.
<code>totalPages = Math.ceil(total / pageSize)</code>. If <code>page</code> is out of range, <code>data</code> is <code>[]</code> (other fields still filled).`,
  examples: [["[1..5], 2, 2","{data:[3,4],page:2,pageSize:2,total:5,totalPages:3}"]],
  hint: `start = (page - 1) * pageSize; slice(start, start + pageSize). page < 1 → [].`,
  solution: `function paginate(items, page, pageSize) {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const data = page >= 1 && page <= totalPages ? items.slice((page - 1) * pageSize, page * pageSize) : [];
  return { data, page, pageSize, total, totalPages };
}`,
  visible: [
    { args: [[1,2,3,4,5], 2, 2], expected: {"data":[3,4],"page":2,"pageSize":2,"total":5,"totalPages":3} },
  ],
  hidden: [
    { args: [[1,2,3,4,5], 3, 2], expected: {"data":[5],"page":3,"pageSize":2,"total":5,"totalPages":3} },
    { args: [[1,2,3], 4, 2], expected: {"data":[],"page":4,"pageSize":2,"total":3,"totalPages":2} },
    { args: [[], 1, 10], expected: {"data":[],"page":1,"pageSize":10,"total":0,"totalPages":0} },
    { args: [[1,2,3], 0, 2], expected: {"data":[],"page":0,"pageSize":2,"total":3,"totalPages":2} },
    { args: [["a","b","c","d"], 1, 10], expected: {"data":["a","b","c","d"],"page":1,"pageSize":10,"total":4,"totalPages":1} },
  ],
};

export default challenge;
