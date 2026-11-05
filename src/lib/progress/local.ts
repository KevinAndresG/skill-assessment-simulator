import { EMPTY_PROGRESS, type ProgressSnapshot, type ProgressStore } from './types';

const KEY = 'skill-assessment:progress:v1';

function createLocalProgressStore(): ProgressStore {
  let state: ProgressSnapshot = EMPTY_PROGRESS;
  let loaded = false;
  const listeners = new Set<() => void>();

  const load = () => {
    if (loaded || typeof window === 'undefined') return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) state = { ...EMPTY_PROGRESS, ...JSON.parse(raw) };
    } catch {
      /* storage no disponible */
    }
  };

  const update = (fn: (s: ProgressSnapshot) => ProgressSnapshot) => {
    load();
    state = fn(state);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* cuota llena o modo privado */
    }
    listeners.forEach(l => l());
  };

  return {
    getSnapshot() {
      load();
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (e: StorageEvent) => {
        if (e.key === KEY) {
          loaded = false;
          load();
          listener();
        }
      };
      window.addEventListener('storage', onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener('storage', onStorage);
      };
    },
    recordScore(id, score) {
      update(s => ({ ...s, scores: { ...s.scores, [id]: Math.max(s.scores[id] ?? 0, score) } }));
    },
    saveDraft(id, lang, code) {
      update(s => ({ ...s, drafts: { ...s.drafts, [`${id}:${lang}`]: code } }));
    },
    setLanguage(language) {
      update(s => ({ ...s, language }));
    },
    toggleCheck(key, value) {
      update(s => ({ ...s, checks: { ...s.checks, [key]: value } }));
    },
    addQuizAttempt(attempt) {
      update(s => ({ ...s, quiz: [...s.quiz, attempt].slice(-50) }));
    },
    addSimulation(attempt) {
      update(s => ({ ...s, simulations: [...s.simulations, attempt].slice(-50) }));
    },
    reset() {
      update(() => EMPTY_PROGRESS);
    },
  };
}

export const localProgressStore = createLocalProgressStore();
