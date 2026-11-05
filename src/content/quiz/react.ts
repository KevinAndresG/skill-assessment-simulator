import type { QuizQuestion } from '@/content/types';

export const reactQuestions: QuizQuestion[] = [
  {
    id: 'react-01',
    category: 'react',
    question: `What will be rendered after clicking the button once?`,
    code: `function Counter() {
  const [count, setCount] = useState(0);
  const handle = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
  return <button onClick={handle}>{count}</button>;
}`,
    options: ["3","1","0","It throws an error"],
    answer: 1,
    explanation: `Las tres llamadas leen el mismo valor capturado (count = 0) en ese render; todas programan 0 + 1. Con la forma funcional setCount(c => c + 1) el resultado sería 3.`,
  },
  {
    id: 'react-02',
    category: 'react',
    question: `Same component, but the handler uses setCount(c => c + 1) three times. What is rendered after one click?`,
    options: ["1","3","2","0"],
    answer: 1,
    explanation: `El updater funcional recibe el estado más reciente de la cola, así que las tres actualizaciones se encadenan: 0→1→2→3.`,
  },
  {
    id: 'react-03',
    category: 'react',
    question: `What does this log every second?`,
    code: `function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{count}</p>;
}`,
    options: ["0, 1, 2, 3...","0, 0, 0... and the UI stays at 1","undefined","It never logs"],
    answer: 1,
    explanation: `Stale closure: el efecto corre una vez y su closure captura count = 0 para siempre. Arreglos: setCount(c => c + 1) o añadir count a las dependencias.`,
  },
  {
    id: 'react-04',
    category: 'react',
    question: `When does the cleanup function returned by useEffect run?`,
    options: ["Only when the component unmounts","Before the effect re-runs (dependencies changed) and when the component unmounts","Right after every render, before the effect","Never, unless called manually"],
    answer: 1,
    explanation: `React ejecuta la limpieza antes de volver a correr el efecto y al desmontar. En StrictMode (desarrollo) además hace montar → limpiar → montar para detectar efectos sin limpieza.`,
  },
  {
    id: 'react-05',
    category: 'react',
    question: `Why is using the array index as key a problem in a list where items can be reordered or removed?`,
    options: ["Keys must be strings","React may reuse the wrong component instance, mixing up state such as input values","It is slower to render","Index keys trigger a runtime error"],
    answer: 1,
    explanation: `La key identifica a cada hijo entre renders. Si la posición cambia, la key "0" pasa a apuntar a otro dato y React conserva el estado (inputs, foco) en el elemento equivocado. Usa un id estable.`,
  },
  {
    id: 'react-06',
    category: 'react',
    question: `Which statement about useRef is correct?`,
    options: ["Updating ref.current triggers a re-render","ref.current persists between renders and changing it does NOT trigger a re-render","useRef can only hold DOM nodes","useRef resets on every render"],
    answer: 1,
    explanation: `useRef devuelve el mismo objeto mutable durante toda la vida del componente. Sirve para nodos del DOM, ids de timers, valores previos, etc., sin provocar renders.`,
  },
  {
    id: 'react-07',
    category: 'react',
    question: `Child is wrapped in React.memo. Why does it still re-render every time Parent renders?`,
    code: `const Child = React.memo(({ options, onSelect }) => { /* ... */ });

function Parent() {
  const [q, setQ] = useState('');
  return <Child options={{ sort: 'asc' }} onSelect={() => setQ('x')} />;
}`,
    options: ["React.memo only works with class components","A new object and a new function are created on every render, so the shallow comparison fails","Because Child uses props destructuring","Because setQ is called"],
    answer: 1,
    explanation: `React.memo compara props de forma superficial (Object.is). Un objeto literal y una arrow function nuevos en cada render son referencias distintas. Usa useMemo para el objeto y useCallback para la función (o sácalos del componente).`,
  },
  {
    id: 'react-08',
    category: 'react',
    question: `What is the difference between useMemo and useCallback?`,
    options: ["None, they are aliases","useMemo memoizes the result of a function; useCallback memoizes the function itself","useCallback runs after paint and useMemo before paint","useMemo is for async values only"],
    answer: 1,
    explanation: `useCallback(fn, deps) equivale a useMemo(() => fn, deps).`,
  },
  {
    id: 'react-09',
    category: 'react',
    question: `Which hook runs synchronously after DOM mutations but BEFORE the browser paints, useful for measuring layout?`,
    options: ["useEffect","useLayoutEffect","useInsertionEffect","useTransition"],
    answer: 1,
    explanation: `useLayoutEffect bloquea el pintado, por eso sirve para medir y reposicionar (tooltips) sin parpadeo. Úsalo con moderación.`,
  },
  {
    id: 'react-10',
    category: 'react',
    question: `Which code violates the Rules of Hooks?`,
    options: ["Calling useState at the top level of a custom hook","Calling useEffect inside an if statement","Calling several useState in the same component","Calling a custom hook from another custom hook"],
    answer: 1,
    explanation: `Los hooks deben llamarse siempre en el mismo orden: nada de condicionales, loops ni returns tempranos antes de ellos. React identifica cada hook por su orden de llamada.`,
  },
  {
    id: 'react-11',
    category: 'react',
    question: `Two components both call the same custom hook useForm(). What happens to the state?`,
    options: ["They share the same state","Each component gets its own independent state","The second call throws","State is shared only if they are siblings"],
    answer: 1,
    explanation: `Un custom hook reutiliza lógica, no estado. Para compartir estado usa Context, levanta el estado o usa un store (Zustand, Redux).`,
  },
  {
    id: 'react-12',
    category: 'react',
    question: `A Context provider passes value={{ user, setUser }}. What is the performance implication?`,
    options: ["None","Every render of the provider creates a new object, re-rendering ALL consumers even if user did not change","Consumers never re-render","Only the first consumer re-renders"],
    answer: 1,
    explanation: `Los consumidores se vuelven a renderizar cuando cambia la referencia de value. Memoiza con useMemo(() => ({ user, setUser }), [user]) o separa los contextos de estado y acciones.`,
  },
  {
    id: 'react-13',
    category: 'react',
    question: `Which errors does an Error Boundary catch?`,
    options: ["Errors in event handlers","Errors in async code (setTimeout, promises)","Errors thrown during rendering, in lifecycle methods and constructors of the tree below","Errors in the boundary itself"],
    answer: 2,
    explanation: `Los Error Boundaries (clase con getDerivedStateFromError / componentDidCatch, o react-error-boundary) solo capturan errores de render. Los de handlers y async se manejan con try/catch.`,
  },
  {
    id: 'react-14',
    category: 'react',
    question: `An input has value={name} but no onChange. What happens?`,
    options: ["It works like an uncontrolled input","It is read-only: React warns and the user cannot type","It throws an error","It updates name automatically"],
    answer: 1,
    explanation: `Un input controlado necesita value + onChange. Para no controlado usa defaultValue con una ref, o readOnly si es intencional.`,
  },
  {
    id: 'react-15',
    category: 'react',
    question: `In React 18+, how many re-renders happen here when the promise resolves?`,
    code: `fetchData().then(() => {
  setLoading(false);
  setData(result);
  setError(null);
});`,
    options: ["3","1 (automatic batching)","0","2"],
    answer: 1,
    explanation: `Desde React 18 createRoot agrupa automáticamente las actualizaciones también dentro de promesas, timeouts y eventos nativos. Antes solo se agrupaban en los event handlers de React.`,
  },
  {
    id: 'react-16',
    category: 'react',
    question: `What is the main purpose of useTransition?`,
    options: ["Animate CSS transitions","Mark a state update as non-urgent so urgent updates (typing) stay responsive","Delay effects until the next frame","Replace Suspense"],
    answer: 1,
    explanation: `startTransition marca actualizaciones de baja prioridad (filtrar una lista grande) e isPending permite mostrar un indicador. useDeferredValue es la contraparte para valores.`,
  },
  {
    id: 'react-17',
    category: 'react',
    question: `How do you code-split a heavy route component in React?`,
    options: ["import Heavy from \"./Heavy\" inside useEffect","const Heavy = React.lazy(() => import(\"./Heavy\")) rendered inside <Suspense fallback>","React.memo(Heavy)","useMemo(() => Heavy, [])"],
    answer: 1,
    explanation: `React.lazy + import() dinámico genera un chunk aparte y Suspense muestra el fallback mientras carga. Es la base del lazy loading de rutas y remotos.`,
  },
  {
    id: 'react-18',
    category: 'react',
    question: `Storing fullName in state and syncing it with useEffect from firstName and lastName is considered:`,
    options: ["The recommended pattern","An anti-pattern: derive it during render instead","Required for performance","Required when using TypeScript"],
    answer: 1,
    explanation: `Si se puede calcular a partir de props o estado, calcúlalo en el render (useMemo si es costoso). Duplicar estado causa renders extra y desincronización.`,
  },
  {
    id: 'react-19',
    category: 'react',
    question: `A component renders {isAdmin ? <AdminForm /> : <UserForm />}. Both are different components with internal input state. What happens to the state when isAdmin toggles?`,
    options: ["It is preserved","The previous component unmounts and its state is lost","React merges both states","It throws a key warning"],
    answer: 1,
    explanation: `Si cambia el tipo de componente en la misma posición, React desmonta el subárbol y monta uno nuevo. Al revés, el mismo tipo en la misma posición conserva el estado (puedes forzar el reset cambiando la key).`,
  },
  {
    id: 'react-20',
    category: 'react',
    question: `Events from a component rendered with createPortal into document.body:`,
    options: ["Do not bubble at all","Bubble through the React tree (to React ancestors), not only the DOM tree","Only bubble in the DOM tree","Must be re-attached manually"],
    answer: 1,
    explanation: `Los portales cambian la ubicación en el DOM, pero el árbol de React se conserva: el contexto y la propagación de eventos sintéticos siguen al padre en React. Muy usado para modales y tooltips.`,
  },
  {
    id: 'react-21',
    category: 'react',
    question: `Which hook should you use to generate stable ids for linking a <label htmlFor> with an input, safe with SSR?`,
    options: ["Math.random() in useState","useId","useRef with a counter","crypto.randomUUID in render"],
    answer: 1,
    explanation: `useId produce ids estables entre servidor y cliente, ideales para htmlFor, aria-describedby y aria-labelledby.`,
  },
  {
    id: 'react-22',
    category: 'react',
    question: `Which pattern is shown: <Tabs><Tabs.List><Tabs.Tab/></Tabs.List><Tabs.Panel/></Tabs> sharing state through context?`,
    options: ["Higher-Order Component","Render props","Compound components","Container/Presentational"],
    answer: 2,
    explanation: `Los compound components exponen subcomponentes que comparten estado implícito por Context. Patrón típico de design systems (Radix, Reach).`,
  },
  {
    id: 'react-23',
    category: 'react',
    question: `When is useReducer generally preferred over useState?`,
    options: ["Never; it is deprecated","When the next state depends on complex logic or several sub-values change together","Only with Redux installed","For primitive values only"],
    answer: 1,
    explanation: `useReducer centraliza transiciones complejas en una función pura y testeable, y dispatch es estable (no necesita useCallback).`,
  },
  {
    id: 'react-24',
    category: 'react',
    question: `Inside useEffect you fetch data for a userId that can change quickly. What prevents a race condition (old response overwriting new)?`,
    options: ["Adding async to the useEffect callback","Using an AbortController (or an \"ignore\" flag) and cleaning it up in the effect cleanup","Wrapping fetch in useMemo","Using useLayoutEffect"],
    answer: 1,
    explanation: `En la limpieza llama controller.abort() o pon ignore = true para descartar respuestas viejas. Librerías como TanStack Query lo resuelven por ti.`,
  },
  {
    id: 'react-25',
    category: 'react',
    question: `In React 19, how can a function component receive a ref from its parent?`,
    options: ["It cannot","ref can be read as a regular prop; forwardRef is no longer required","Only through useImperativeHandle without forwardRef","Through context"],
    answer: 1,
    explanation: `En React 19 ref es una prop normal para function components; forwardRef sigue funcionando pero ya no es necesario. En React 18 se necesita forwardRef.`,
  },
];
