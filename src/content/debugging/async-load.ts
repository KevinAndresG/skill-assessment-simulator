import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "intermediate",
  id: "dbg-async-load",
  title: "Load Users in Order (async)",
  minutes: 15,
  fn: "loadUsers",
  requirements: `<code>loadUsers(ids)</code> must resolve to an array with the result of <code>fakeFetch(id)</code> for every id,
in the SAME order as <code>ids</code>. Requests should run in parallel. <b>Do not modify fakeFetch.</b>`,
  buggyCode: `// Do not modify: simulates an API with variable latency
function fakeFetch(id) {
  return new Promise(resolve => setTimeout(() => resolve({ id, name: 'user-' + id }), (id % 3) * 15));
}

async function loadUsers(ids) {
  const results = [];
  ids.forEach(async id => {
    const user = await fakeFetch(id);
    results.push(user);
  });
  return results;
}`,
  solution: `// Do not modify: simulates an API with variable latency
function fakeFetch(id) {
  return new Promise(resolve => setTimeout(() => resolve({ id, name: 'user-' + id }), (id % 3) * 15));
}

async function loadUsers(ids) {
  return Promise.all(ids.map(id => fakeFetch(id)));
}`,
  hint: "forEach con una función async no espera nada. ¿Qué pasa con el return antes de que lleguen los datos? Y piensa si el orden de llegada es el orden de los ids.",
  bugs: ["forEach no espera callbacks async: devuelve [] antes de que terminen","push en orden de llegada, no en el orden de ids → usar Promise.all + map"],
  visible: [
    { args: [[1,2]], expected: [{"id":1,"name":"user-1"},{"id":2,"name":"user-2"}] },
  ],
  hidden: [
    { args: [[]], expected: [] },
    { args: [[2,1,3]], expected: [{"id":2,"name":"user-2"},{"id":1,"name":"user-1"},{"id":3,"name":"user-3"}] },
    { args: [[5,4,3,2,1]], expected: [{"id":5,"name":"user-5"},{"id":4,"name":"user-4"},{"id":3,"name":"user-3"},{"id":2,"name":"user-2"},{"id":1,"name":"user-1"}] },
  ],
};

export default challenge;
