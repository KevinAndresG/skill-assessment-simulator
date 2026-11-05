import type { Language } from '@/content/types';

/**
 * Convierte el código del usuario a JS ejecutable.
 * TypeScript se transpila con sucrase (solo quita tipos, no hace type-check).
 */
export async function toRunnableJS(code: string, lang: Language): Promise<string> {
  if (lang === 'js') return code;
  const { transform } = await import('sucrase');
  return transform(code, { transforms: ['typescript'], disableESTransforms: true }).code;
}
