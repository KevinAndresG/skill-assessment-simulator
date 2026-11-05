import type { QuizQuestion } from '@/content/types';

export const tsQuestions: QuizQuestion[] = [
  {
    id: 'ts-01',
    category: 'ts',
    question: `What is the key difference between any and unknown?`,
    options: ["No difference","unknown forces you to narrow the type before using it; any disables type checking","any is safer than unknown","unknown only works with objects"],
    answer: 1,
    explanation: `Con unknown tienes que hacer typeof, instanceof o un type guard antes de operar. Es lo ideal para datos externos (respuestas de API, JSON.parse, catch(e)).`,
  },
  {
    id: 'ts-02',
    category: 'ts',
    question: `What is the type of x inside the if block?`,
    code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };

function area(s: Shape) {
  if (s.kind === 'circle') {
    const x = s; // ?
  }
}`,
    options: ["Shape","{ kind: \"circle\"; radius: number }","{ kind: string }","never"],
    answer: 1,
    explanation: `Unión discriminada: comparar el discriminante (kind) estrecha el tipo a la variante correspondiente.`,
  },
  {
    id: 'ts-03',
    category: 'ts',
    question: `What is the purpose of this default branch?`,
    code: `switch (s.kind) {
  case 'circle': return ...;
  case 'square': return ...;
  default:
    const _exhaustive: never = s;
    return _exhaustive;
}`,
    options: ["Runtime validation","Compile-time exhaustiveness check: adding a new variant to Shape produces a type error here","To silence ESLint","It converts s to null"],
    answer: 1,
    explanation: `Si se cubren todos los casos, s es never en default. Si alguien agrega una variante nueva, deja de ser never y TS marca error.`,
  },
  {
    id: 'ts-04',
    category: 'ts',
    question: `Which utility type makes all properties of User optional?`,
    options: ["Required<User>","Partial<User>","Readonly<User>","Pick<User, keyof User>"],
    answer: 1,
    explanation: `Partial<T> marca todas las propiedades con ?. También: Required, Readonly, Pick<T, K>, Omit<T, K>, Record<K, V>.`,
  },
  {
    id: 'ts-05',
    category: 'ts',
    question: `Which type represents a User without its password field?`,
    options: ["Pick<User, \"password\">","Omit<User, \"password\">","Exclude<User, \"password\">","Partial<User>"],
    answer: 1,
    explanation: `Omit quita claves de un tipo objeto. Exclude trabaja sobre uniones: Exclude<"a" | "b", "a"> = "b".`,
  },
  {
    id: 'ts-06',
    category: 'ts',
    question: `What does Record<"admin" | "viewer", boolean> describe?`,
    options: ["An array of booleans","An object that MUST have keys admin and viewer, both boolean","A Map","An object with any string keys"],
    answer: 1,
    explanation: `Record<K, V> construye un tipo objeto con exactamente esas claves. Útil para mapas de permisos o configuraciones.`,
  },
  {
    id: 'ts-07',
    category: 'ts',
    question: `Which feature is available for interface but NOT for type aliases?`,
    options: ["Extending other types","Declaration merging (declaring the same interface twice merges members)","Generics","Optional properties"],
    answer: 1,
    explanation: `Las interfaces con el mismo nombre se fusionan (útil para aumentar tipos de librerías, como Window). Los type aliases no, pero pueden expresar uniones, tuplas y mapped types.`,
  },
  {
    id: 'ts-08',
    category: 'ts',
    question: `What does the constraint do here?`,
    code: `function byId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(i => i.id === id);
}`,
    options: ["T must be exactly { id: string }","T can be any type that has at least an id: string, and the return keeps the full T type","T is converted to string","It disables inference"],
    answer: 1,
    explanation: `extends en genéricos es una restricción: acepta cualquier objeto con id string y conserva el tipo completo (por ejemplo Ticket) en el retorno.`,
  },
  {
    id: 'ts-09',
    category: 'ts',
    question: `What is the type of Role?`,
    code: `const ROLES = ['admin', 'editor', 'viewer'] as const;
type Role = typeof ROLES[number];`,
    options: ["string","string[]","\"admin\" | \"editor\" | \"viewer\"","readonly string[]"],
    answer: 2,
    explanation: `as const vuelve el array readonly con literales. typeof ROLES[number] extrae la unión de sus elementos: así una lista en tiempo de ejecución también es la fuente del tipo.`,
  },
  {
    id: 'ts-10',
    category: 'ts',
    question: `What is the type of K?`,
    code: `const config = { apiUrl: '', timeout: 3000, retries: 2 };
type K = keyof typeof config;`,
    options: ["string","\"apiUrl\" | \"timeout\" | \"retries\"","object","number"],
    answer: 1,
    explanation: `typeof obtiene el tipo del valor y keyof la unión de sus claves.`,
  },
  {
    id: 'ts-11',
    category: 'ts',
    question: `What does the operator satisfies do?`,
    code: `const routes = {
  home: '/',
  tickets: '/tickets',
} satisfies Record<string, string>;`,
    options: ["Casts the value like as","Validates the value against the type while keeping the narrower inferred type (routes.home stays known)","Makes the object readonly","Only works with classes"],
    answer: 1,
    explanation: `satisfies (TS 4.9) valida sin ensanchar el tipo: conservas el autocompletado de las claves concretas. as en cambio puede ocultar errores.`,
  },
  {
    id: 'ts-12',
    category: 'ts',
    question: `Why does this produce an error?`,
    code: `interface Props { title: string }
const p: Props = { title: 'Hi', subtitle: 'x' };`,
    options: ["title must be optional","Excess property check: object literals assigned directly cannot have unknown properties","Interfaces cannot be used with const","subtitle must be a number"],
    answer: 1,
    explanation: `TS es estructural, pero a los literales asignados directamente les aplica la verificación de propiedades extra. Si pasas una variable intermedia, no se reporta.`,
  },
  {
    id: 'ts-13',
    category: 'ts',
    question: `What does the return type "value is Ticket" mean?`,
    code: `function isTicket(value: unknown): value is Ticket {
  return typeof value === 'object' && value !== null && 'id' in value;
}`,
    options: ["It returns a Ticket","It is a user-defined type guard: when it returns true, TS narrows value to Ticket","It throws if value is not a Ticket","It is a generic"],
    answer: 1,
    explanation: `Los type predicates permiten crear tus propias funciones de narrowing, muy útiles con datos unknown de APIs. Ojo: TS confía en tu implementación.`,
  },
  {
    id: 'ts-14',
    category: 'ts',
    question: `What is the type of R?`,
    code: `function getUser() { return { id: 1, name: 'Ana' }; }
type R = ReturnType<typeof getUser>;`,
    options: ["Function","{ id: number; name: string }","unknown","any"],
    answer: 1,
    explanation: `ReturnType<F> extrae el tipo de retorno. Parameters<F> extrae una tupla con los parámetros. Awaited<T> desenvuelve promesas.`,
  },
  {
    id: 'ts-15',
    category: 'ts',
    question: `Best way to type props of a Button component that accepts all native <button> attributes plus a variant prop?`,
    options: ["props: any","type Props = React.ComponentProps<\"button\"> & { variant: \"primary\" | \"ghost\" }","type Props = HTMLButtonElement","type Props = JSX.Element"],
    answer: 1,
    explanation: `React.ComponentProps<"button"> (o ButtonHTMLAttributes<HTMLButtonElement>) incluye onClick, disabled, aria-*, etc. Clave para componentes reutilizables y accesibles de un design system.`,
  },
  {
    id: 'ts-16',
    category: 'ts',
    question: `What is the recommended type for the children prop when it can be text, elements or null?`,
    options: ["JSX.Element","React.ReactNode","string","React.Component"],
    answer: 1,
    explanation: `ReactNode abarca string, number, element, fragment, null, undefined y arrays. JSX.Element solo acepta un elemento.`,
  },
  {
    id: 'ts-17',
    category: 'ts',
    question: `What does the non-null assertion operator (!) do in document.getElementById("app")!?`,
    options: ["Checks at runtime that the element exists","Tells the compiler the value is not null/undefined; no runtime check is added","Converts to boolean","Throws if null"],
    answer: 1,
    explanation: `Es solo una afirmación en tiempo de compilación; si te equivocas falla en runtime. Prefiere chequear o usar ?.`,
  },
  {
    id: 'ts-18',
    category: 'ts',
    question: `Given "strictNullChecks": true, what is wrong here?`,
    code: `function len(s?: string) {
  return s.length;
}`,
    options: ["Nothing","s is string | undefined, so s.length is an error (\"s is possibly undefined\")","Optional params are not allowed","length does not exist on string"],
    answer: 1,
    explanation: `Con strict activado, un parámetro opcional incluye undefined. Usa s?.length ?? 0 o un valor por defecto: s = "".`,
  },
  {
    id: 'ts-19',
    category: 'ts',
    question: `Which is the more idiomatic modern alternative to a string enum for a fixed set of values?`,
    options: ["A class with static fields","A union of string literal types (optionally derived from an as const object)","any","A namespace"],
    answer: 1,
    explanation: `Las uniones de literales no generan código en runtime, se reducen bien y funcionan con el narrowing. Los enums siguen siendo válidos, pero generan un objeto en runtime.`,
  },
  {
    id: 'ts-20',
    category: 'ts',
    question: `What does a mapped type like { readonly [K in keyof T]: T[K] } produce?`,
    options: ["A copy of T where all properties are readonly (same as Readonly<T>)","An array of T keys","A union of values","A function type"],
    answer: 0,
    explanation: `Los mapped types recorren las claves con in keyof y pueden añadir o quitar modificadores (readonly, ?, -readonly, -?). Así se implementan Partial y Readonly.`,
  },
];
