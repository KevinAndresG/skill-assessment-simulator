import type { QuizQuestion } from '@/content/types';

export const jsQuestions: QuizQuestion[] = [
  {
    id: 'js-01',
    category: 'js',
    question: `What is the console output order?`,
    code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
    options: ["A B C D","A D C B","A D B C","A C D B"],
    answer: 1,
    explanation: `Primero el código síncrono (A, D), luego la cola de microtareas (promesas: C) y por último las macrotareas (setTimeout: B).`,
  },
  {
    id: 'js-02',
    category: 'js',
    question: `What does this log?`,
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ["0 1 2","3 3 3","undefined x3","2 2 2"],
    answer: 1,
    explanation: `var tiene scope de función, así que hay un solo i, que vale 3 cuando corren los callbacks. Con let cada iteración tiene su propio binding y se imprime 0 1 2.`,
  },
  {
    id: 'js-03',
    category: 'js',
    question: `What is the result of [1, 2, 3].map(parseInt)?`,
    options: ["[1, 2, 3]","[1, NaN, NaN]","[NaN, NaN, NaN]","TypeError"],
    answer: 1,
    explanation: `map pasa (valor, índice): parseInt("1", 0) → 1, parseInt("2", 1) → NaN (base 1 inválida), parseInt("3", 2) → NaN. Usa .map(Number).`,
  },
  {
    id: 'js-04',
    category: 'js',
    question: `What does [10, 9, 1, 100].sort() return?`,
    options: ["[1, 9, 10, 100]","[1, 10, 100, 9]","[100, 10, 9, 1]","[9, 1, 10, 100]"],
    answer: 1,
    explanation: `Sin comparador, sort convierte a string y ordena lexicográficamente. Además muta el array. Usa [...arr].sort((a, b) => a - b) o toSorted().`,
  },
  {
    id: 'js-05',
    category: 'js',
    question: `What is typeof null?`,
    options: ["\"null\"","\"object\"","\"undefined\"","\"number\""],
    answer: 1,
    explanation: `Es un bug histórico de JS. Para detectar null usa value === null.`,
  },
  {
    id: 'js-06',
    category: 'js',
    question: `What does this log?`,
    code: `console.log(a);
var a = 1;
console.log(b);
let b = 2;`,
    options: ["undefined, then ReferenceError","1, 2","undefined, undefined","ReferenceError, then 2"],
    answer: 0,
    explanation: `var se eleva (hoisting) e inicializa como undefined. let/const también se elevan pero quedan en la Temporal Dead Zone hasta su declaración, así que acceder antes lanza ReferenceError.`,
  },
  {
    id: 'js-07',
    category: 'js',
    question: `What are the values of x and y?`,
    code: `const x = 0 || 5;
const y = 0 ?? 5;`,
    options: ["x = 5, y = 0","x = 0, y = 5","x = 5, y = 5","x = 0, y = 0"],
    answer: 0,
    explanation: `|| devuelve el lado derecho para cualquier falsy (0, "", false). ?? solo para null/undefined. Importante en formularios donde 0 es un valor válido.`,
  },
  {
    id: 'js-08',
    category: 'js',
    question: `What is logged?`,
    code: `const user = {
  name: 'Ana',
  greet: () => console.log(this.name),
  hello() { console.log(this.name); },
};
user.greet();
user.hello();`,
    options: ["Ana, Ana","undefined, Ana","Ana, undefined","TypeError"],
    answer: 1,
    explanation: `Las arrow functions no tienen this propio (toman el del scope léxico, aquí el módulo). Los métodos con sintaxis corta reciben this = user al llamarse como user.hello().`,
  },
  {
    id: 'js-09',
    category: 'js',
    question: `What does 0.1 + 0.2 === 0.3 evaluate to?`,
    options: ["true","false","NaN","TypeError"],
    answer: 1,
    explanation: `Punto flotante IEEE 754: 0.1 + 0.2 = 0.30000000000000004. Para dinero trabaja en centavos (enteros) o redondea: Math.round(x * 100) / 100.`,
  },
  {
    id: 'js-10',
    category: 'js',
    question: `After this code, what is original.address.city?`,
    code: `const original = { name: 'A', address: { city: 'Bogotá' } };
const copy = { ...original };
copy.address.city = 'Medellín';`,
    options: ["\"Bogotá\"","\"Medellín\"","undefined","TypeError"],
    answer: 1,
    explanation: `El spread hace una copia superficial: address sigue siendo la misma referencia. Para copia profunda usa structuredClone(original) o copia cada nivel.`,
  },
  {
    id: 'js-11',
    category: 'js',
    question: `How does Promise.all behave if one of the promises rejects?`,
    options: ["Waits for all and returns the successful ones","Rejects immediately with that reason (fail-fast)","Ignores the rejection","Retries the failed promise"],
    answer: 1,
    explanation: `Promise.all falla rápido. Promise.allSettled espera todas y devuelve {status, value | reason}. Promise.any resuelve con la primera exitosa. Promise.race con la primera que termine.`,
  },
  {
    id: 'js-12',
    category: 'js',
    question: `What does this function return?`,
    code: `async function getIds(items) {
  const ids = [];
  items.forEach(async (it) => {
    const r = await fetchId(it);
    ids.push(r);
  });
  return ids;
}`,
    options: ["All ids in order","An empty array (forEach does not await async callbacks)","A rejected promise","undefined"],
    answer: 1,
    explanation: `forEach ignora las promesas que devuelve el callback. Usa await Promise.all(items.map(fetchId)) (en paralelo) o for...of con await (en secuencia).`,
  },
  {
    id: 'js-13',
    category: 'js',
    question: `What is the result of NaN === NaN and the correct way to check for NaN?`,
    options: ["true; x === NaN","false; Number.isNaN(x)","false; x == NaN","true; isNaN(x) always"],
    answer: 1,
    explanation: `NaN es el único valor que no es igual a sí mismo. Number.isNaN no hace coerción (el isNaN global sí: isNaN("abc") da true).`,
  },
  {
    id: 'js-14',
    category: 'js',
    question: `Which is true about const arr = [1, 2]; arr.push(3);?`,
    options: ["TypeError: assignment to constant","It works: const prevents reassignment, not mutation","arr becomes [3]","Only works in non-strict mode"],
    answer: 1,
    explanation: `const fija el binding, no el valor. Para inmutabilidad superficial usa Object.freeze o tipos readonly en TS.`,
  },
  {
    id: 'js-15',
    category: 'js',
    question: `Which is the main advantage of Map over a plain object as a dictionary?`,
    options: ["Faster JSON serialization","Keys can be any type (objects included), it keeps insertion order and has .size","It uses less memory always","It is immutable"],
    answer: 1,
    explanation: `Map acepta claves no string, itera en orden de inserción y no tiene claves heredadas del prototype. WeakMap permite claves de objeto sin impedir el garbage collection.`,
  },
  {
    id: 'js-16',
    category: 'js',
    question: `A search input should call the API only after the user STOPS typing for 300ms. Which technique?`,
    options: ["Throttle","Debounce","Memoization","Polling"],
    answer: 1,
    explanation: `Debounce reinicia el timer con cada evento y ejecuta al final. Throttle ejecuta como máximo una vez cada N ms (scroll, resize).`,
  },
  {
    id: 'js-17',
    category: 'js',
    question: `What does [] == false evaluate to?`,
    options: ["true","false","TypeError","undefined"],
    answer: 0,
    explanation: `Coerción de ==: [] → "" → 0 y false → 0, así que da true. Por eso se usa siempre ===.`,
  },
  {
    id: 'js-18',
    category: 'js',
    question: `What does structuredClone NOT support?`,
    options: ["Nested objects","Dates and Maps","Functions and DOM nodes","Arrays"],
    answer: 2,
    explanation: `structuredClone copia en profundidad objetos, arrays, Date, Map, Set y RegExp, y maneja referencias circulares, pero lanza DataCloneError con funciones y nodos del DOM.`,
  },
  {
    id: 'js-19',
    category: 'js',
    question: `Which array methods do NOT mutate the original array?`,
    options: ["sort, reverse, splice","map, filter, slice, toSorted","push, pop, shift","fill, copyWithin"],
    answer: 1,
    explanation: `Inmutables: map, filter, reduce, slice, concat y las de ES2023 toSorted, toReversed, toSpliced y with. Clave para el estado de React.`,
  },
];
