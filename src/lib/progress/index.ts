import { localProgressStore } from './local';
import type { ProgressStore } from './types';

/** Punto único para cambiar dónde se guarda el progreso. */
export const progressStore: ProgressStore = localProgressStore;

export * from './types';
