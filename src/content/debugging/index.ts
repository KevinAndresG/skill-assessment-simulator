import type { DebugChallenge } from '@/content/types';
import sumEven from './sum-even';
import sortScores from './sort-scores';
import uniqueUsers from './unique-users';
import asyncLoad from './async-load';
import closure from './closure';
import cartTotal from './cart-total';
import thisBinding from './this-binding';
import reducer from './reducer';
import binary from './binary';
import query from './query';

/** Para agregar un reto de debugging: crea un archivo aquí y agrégalo a esta lista. */
export const debugChallenges: DebugChallenge[] = [
  sumEven,
  sortScores,
  uniqueUsers,
  asyncLoad,
  closure,
  cartTotal,
  thisBinding,
  reducer,
  binary,
  query,
];
