import type { RegexChallenge } from '@/content/types';
import { basicRegex } from './basic';
import { intermediateRegex } from './intermediate';
import { advancedRegex } from './advanced';

/** Para agregar un reto: añádelo al arreglo de su nivel (id único con prefijo `rx-`). */
export const regexChallenges: RegexChallenge[] = [...basicRegex, ...intermediateRegex, ...advancedRegex];
