# Skill Assessment Simulator

Simulador local para preparar las pruebas: algoritmos y debugging en JS/TS con tests ocultos, quiz de opción múltiple (React, TypeScript, JavaScript, WCAG, microfrontends, auth) y simulacros cronometrados.

Stack: **Next.js 16 (App Router) · React 19 · TypeScript**. Sin base de datos todavía: el contenido vive en archivos TS y el progreso en `localStorage`, ambos detrás de interfaces para conectar una base de datos después.

## Empezar

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Para qué |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run validate` | Valida el contenido: las soluciones pasan sus tests y los retos de debugging fallan con su código con bugs |
| `npm run typecheck` | Genera los tipos de rutas y corre `tsc` |
| `npm run check` | validate + typecheck + lint (córrelo antes de hacer commit) |
| `npm run build && npm start` | Build de producción |

## Estructura

```
src/
├─ app/                      Rutas (App Router)
│  ├─ page.tsx               Plan de estudio y progreso
│  ├─ algoritmos/            layout con sidebar + [id] por reto (rutas estáticas)
│  ├─ debugging/             igual que algoritmos
│  ├─ quiz/                  quiz configurable (práctica / examen)
│  └─ simulacro/             simulacros por etapas
├─ content/                  ← CONTENIDO (aquí se agregan retos y preguntas)
│  ├─ types.ts               Modelo: CodingChallenge, DebugChallenge, QuizQuestion
│  ├─ coding/{entry,intermediate,data}/   un archivo por reto + index.ts
│  ├─ debugging/             un archivo por reto + index.ts
│  └─ quiz/                  un archivo por categoría
├─ config/                   Navegación, simulacros y plan de estudio
├─ lib/
│  ├─ repository/            ContentRepository (interfaz) + implementación local
│  ├─ progress/              ProgressStore (interfaz) + implementación localStorage
│  ├─ runner/                Ejecuta el código en un Web Worker con timeout y calcula la nota
│  └─ hooks/                 useProgress, useCountdown, useIsClient
└─ components/
   ├─ ui/                    Button, Card, Tag, Banner, ProgressBar, TimerBadge…
   ├─ coding/                CodingWorkspace, CodeEditor, TestResults, ChallengeSidebar…
   ├─ quiz/                  QuizSetup, QuizRunner, QuestionCard, QuizReview…
   ├─ simulation/            SimulationPicker, SimulationRunner
   └─ plan/                  Secciones de la página de inicio
scripts/validate-content.ts  Validador de contenido
```

## Cómo agregar contenido

### Un reto de algoritmos
1. Copia un archivo existente, por ejemplo `src/content/coding/entry/two-sum.ts`, en la carpeta del nivel (`entry`, `intermediate` o `data`).
2. Cambia `id` (kebab-case, se usa en la URL), `fn`, las firmas, `description`, `examples`, `hint` y `solution` (en JavaScript).
3. Escribe los tests: `visible` (los que el usuario puede ejecutar) y `hidden` (los que definen la nota). `expected` se compara en profundidad.
4. Regístralo en el `index.ts` de la carpeta.
5. Corre `npm run validate`.

Usa `noMutate: true` si la función no debe modificar sus argumentos.

### Un reto de debugging
Igual que el anterior, en `src/content/debugging/`, con `requirements`, `buggyCode` (debe fallar al menos un test), `solution` y `bugs` (se muestran al pedir la solución).

### Preguntas del quiz
Agrégalas al archivo de su categoría en `src/content/quiz/` con un `id` único y `answer` = índice de la opción correcta. Para crear una categoría nueva, añádela a `QuizCategory` y a `QUIZ_CATEGORY_LABEL` en `content/types.ts`, crea su archivo y súmala en `quiz/index.ts`.

### Un simulacro
Agrega un objeto a `SIMULATIONS` en `src/config/simulations.ts`.

## Conectar una base de datos (por ejemplo Supabase)

La UI nunca importa el contenido directamente: siempre pasa por dos interfaces.

1. **Contenido:** implementa `ContentRepository` (`src/lib/repository/types.ts`), por ejemplo en `src/lib/repository/supabase.ts`, y cámbialo en `src/lib/repository/index.ts`. Las páginas ya son Server Components async, así que las consultas corren en el servidor.
   - Tablas sugeridas: `challenges` (con `kind`, `level` y campos de texto), `test_cases` (`challenge_id`, `args jsonb`, `expected jsonb`, `hidden bool`), `quiz_questions` (`options text[]`, `answer int`).
   - Para migrar, recorre `codingChallenges`, `debugChallenges` y `quizQuestions` con un script de seed.
2. **Progreso por usuario:** implementa `ProgressStore` (`src/lib/progress/types.ts`) con auth y cámbialo en `src/lib/progress/index.ts`. Una opción simple es mantener el estado en memoria y sincronizarlo en segundo plano con la base de datos.
3. Si el contenido se vuelve editable por terceros, sanitiza el HTML que renderiza `RichText` (por ejemplo con DOMPurify).

## Notas técnicas
- **Runner:** el código del usuario corre en un Web Worker creado desde un Blob, con timeout de 4 s. Replica las reglas de la evaluación real: la nota es el % de casos que pasan, pero una excepción o un timeout dan 0%.
- **TypeScript:** se transpila con `sucrase` (solo quita los tipos, no valida tipos), así funciona sin internet.
- **Editor:** es un `textarea` (`components/coding/CodeEditor.tsx`). Se puede reemplazar por Monaco o CodeMirror sin tocar el resto.
