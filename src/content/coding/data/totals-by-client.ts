import type { CodingChallenge } from '@/content/types';

const challenge: CodingChallenge = {
  kind: 'coding',
  id: "totals-by-client",
  title: "Revenue by Client",
  level: "data",
  minutes: 20,
  fn: "totalsByClient",
  signatureJS: `function totalsByClient(invoices)`,
  signatureTS: `type Invoice = { client: string; amount: number; status: 'paid' | 'pending' | 'void' };
function totalsByClient(invoices: Invoice[]): { client: string; total: number }[]`,
  description: `Sum the <code>amount</code> of invoices with <code>status === "paid"</code> per client. Round each total to 2 decimals
(<code>Math.round(x * 100) / 100</code>). Return <code>[{client, total}]</code> sorted by total descending, then client ascending.
Clients with no paid invoices are not included.`,
  examples: [["[{client:\"A\",amount:10.1,status:\"paid\"},{client:\"B\",amount:5,status:\"pending\"},{client:\"A\",amount:0.2,status:\"paid\"}]","[{client:\"A\",total:10.3}]"]],
  hint: "Primero agrupa y acumula por cliente, luego convierte a lista y ordena con dos criterios. Piensa en qué momento conviene redondear para no arrastrar errores.",
  solution: `function totalsByClient(invoices) {
  const sums = {};
  for (const inv of invoices) if (inv.status === 'paid') sums[inv.client] = (sums[inv.client] || 0) + inv.amount;
  return Object.entries(sums)
    .map(([client, t]) => ({ client, total: Math.round(t * 100) / 100 }))
    .sort((a, b) => b.total - a.total || (a.client < b.client ? -1 : a.client > b.client ? 1 : 0));
}`,
  visible: [
    { args: [[{"client":"A","amount":10.1,"status":"paid"},{"client":"B","amount":5,"status":"pending"},{"client":"A","amount":0.2,"status":"paid"}]], expected: [{"client":"A","total":10.3}] },
  ],
  hidden: [
    { args: [[]], expected: [] },
    { args: [[{"client":"Zeta","amount":100,"status":"paid"},{"client":"Alfa","amount":100,"status":"paid"},{"client":"Beta","amount":250.555,"status":"paid"},{"client":"Alfa","amount":3,"status":"void"}]], expected: [{"client":"Beta","total":250.56},{"client":"Alfa","total":100},{"client":"Zeta","total":100}] },
    { args: [[{"client":"X","amount":0.1,"status":"paid"},{"client":"X","amount":0.2,"status":"paid"},{"client":"Y","amount":0.3,"status":"paid"}]], expected: [{"client":"X","total":0.3},{"client":"Y","total":0.3}] },
  ],
};

export default challenge;
