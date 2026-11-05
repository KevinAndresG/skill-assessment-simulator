'use client';

import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** true solo después de hidratar en el navegador. */
export function useIsClient(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
