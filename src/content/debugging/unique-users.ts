import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "entry",
  id: "dbg-unique-users",
  title: "Unique Users by id",
  minutes: 10,
  fn: "uniqueUsers",
  requirements: `<code>uniqueUsers(users)</code> must remove users with a repeated <code>id</code>, keeping the FIRST occurrence and the original order.`,
  buggyCode: `function uniqueUsers(users) {
  const seen = [];
  return users.filter(u => {
    if (seen.includes(u)) return false;
    seen.push(u);
    return true;
  });
}`,
  solution: `function uniqueUsers(users) {
  const seen = new Set();
  return users.filter(u => {
    if (seen.has(u.id)) return false;
    seen.add(u.id);
    return true;
  });
}`,
  bugs: ["includes compara objetos por referencia, no por id","(mejor) usar Set para O(1)"],
  visible: [
    { args: [[{"id":1,"n":"a"},{"id":2,"n":"b"},{"id":1,"n":"c"}]], expected: [{"id":1,"n":"a"},{"id":2,"n":"b"}] },
  ],
  hidden: [
    { args: [[]], expected: [] },
    { args: [[{"id":3},{"id":3},{"id":3}]], expected: [{"id":3}] },
    { args: [[{"id":"x","r":1},{"id":"y","r":2},{"id":"x","r":3},{"id":"z","r":4},{"id":"y","r":5}]], expected: [{"id":"x","r":1},{"id":"y","r":2},{"id":"z","r":4}] },
  ],
};

export default challenge;
