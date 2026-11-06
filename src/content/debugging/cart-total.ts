import type { DebugChallenge } from '@/content/types';

const challenge: DebugChallenge = {
  kind: 'debug',
  level: "entry",
  id: "dbg-cart-total",
  title: "Cart Total",
  minutes: 10,
  fn: "cartTotal",
  requirements: `<code>cartTotal(items)</code> must return a NUMBER: the sum of <code>price * qty</code>, rounded to 2 decimals.
<code>price</code> may arrive as a number or a numeric string (from an API). An empty cart returns <code>0</code>.`,
  buggyCode: `function cartTotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.qty).toFixed(2);
}`,
  solution: `function cartTotal(items) {
  const total = items.reduce((sum, it) => sum + Number(it.price) * it.qty, 0);
  return Math.round(total * 100) / 100;
}`,
  hint: "Revisa con qué valor empieza el acumulador del reduce y qué tipo devuelve el método de redondeo.",
  bugs: ["reduce sin valor inicial: el acumulador empieza siendo el primer objeto (y con [] lanza TypeError)","toFixed devuelve string","convertir price con Number()"],
  visible: [
    { args: [[{"price":10,"qty":2},{"price":"5.5","qty":1}]], expected: 25.5 },
    { args: [[]], expected: 0 },
  ],
  hidden: [
    { args: [[{"price":0.1,"qty":3}]], expected: 0.3 },
    { args: [[{"price":"19.99","qty":2},{"price":5,"qty":0}]], expected: 39.98 },
    { args: [[{"price":1.005,"qty":1}]], expected: 1 },
  ],
};

export default challenge;
