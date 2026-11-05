'use client';

import { useSyncExternalStore } from 'react';
import { EMPTY_PROGRESS, progressStore, type ProgressSnapshot } from '@/lib/progress';

/** Lee el progreso de forma reactiva. En el servidor devuelve el estado vacío. */
export function useProgress(): ProgressSnapshot {
  return useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot, () => EMPTY_PROGRESS);
}

export { progressStore };
