import { localContentRepository } from './local';
import type { ContentRepository } from './types';

/** Punto único para cambiar la fuente de contenido (local → base de datos). */
export const contentRepository: ContentRepository = localContentRepository;

export type { ContentRepository };
