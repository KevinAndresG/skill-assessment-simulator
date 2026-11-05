import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  id: "dbg-query",
  title: "Parse Query String",
  minutes: 15,
  fn: "parseQuery",
  requirements: `<code>parseQuery(qs)</code> parses a query string (with or without a leading <code>?</code>):
<br>• values are URI-decoded (also keys) and <code>+</code> means space
<br>• a key without <code>=</code> gets <code>""</code>
<br>• repeated keys produce an array of values in order
<br>• an empty string (or just <code>"?"</code>) returns <code>{}</code>`,
  buggyCode: `function parseQuery(qs) {
  const result = {};
  qs.replace('?', '').split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    result[key] = value;
  });
  return result;
}`,
  solution: `function parseQuery(qs) {
  const result = {};
  const body = qs.startsWith('?') ? qs.slice(1) : qs;
  if (!body) return result;
  const dec = s => decodeURIComponent(s.replace(/\\+/g, ' '));
  for (const pair of body.split('&')) {
    if (!pair) continue;
    const i = pair.indexOf('=');
    const key = dec(i === -1 ? pair : pair.slice(0, i));
    const value = i === -1 ? '' : dec(pair.slice(i + 1));
    if (key in result) result[key] = [].concat(result[key], value);
    else result[key] = value;
  }
  return result;
}`,
  bugs: ["\"\" genera la clave vacía {\"\": undefined}","no decodifica %20 ni +","las claves repetidas se sobrescriben","clave sin = queda undefined","split(\"=\") corta valores que contienen ="],
  visible: [
    { args: ["?a=1&b=hello%20world"], expected: {"a":"1","b":"hello world"} },
    { args: [""], expected: {} },
  ],
  hidden: [
    { args: ["?"], expected: {} },
    { args: ["tag=a&tag=b&tag=c"], expected: {"tag":["a","b","c"]} },
    { args: ["flag&q=react+hooks"], expected: {"flag":"","q":"react hooks"} },
    { args: ["token=abc%3D%3D&x=1=2"], expected: {"token":"abc==","x":"1=2"} },
    { args: ["name=Kevin%20Andr%C3%A9s"], expected: {"name":"Kevin Andrés"} },
  ],
};

export default challenge;
