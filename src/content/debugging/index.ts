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
import average from './average';
import countWords from './count-words';
import leapYear from './leap-year';
import groupBy from './group-by';
import mergeConfig from './merge-config';
import retry from './retry';
import flattenDepth from './flatten-depth';
import memoize from './memoize';
import emitter from './emitter';

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
  average,
  countWords,
  leapYear,
  groupBy,
  mergeConfig,
  retry,
  flattenDepth,
  memoize,
  emitter,
];
