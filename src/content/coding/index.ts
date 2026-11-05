import type { CodingChallenge } from '@/content/types';
import { entryChallenges } from './entry';
import { intermediateChallenges } from './intermediate';
import { dataChallenges } from './data';

/** Para agregar un reto: crea un archivo en la carpeta del nivel y regístralo en su index.ts. */
export const codingChallenges: CodingChallenge[] = [
  ...entryChallenges,
  ...intermediateChallenges,
  ...dataChallenges,
];
