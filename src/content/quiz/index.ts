import type { QuizQuestion } from '@/content/types';
import { reactQuestions } from './react';
import { tsQuestions } from './ts';
import { jsQuestions } from './js';
import { a11yQuestions } from './a11y';
import { archQuestions } from './arch';
import { webQuestions } from './web';

/** Para agregar preguntas: añádelas al archivo de su categoría (id único). */
export const quizQuestions: QuizQuestion[] = [
  ...reactQuestions,
  ...tsQuestions,
  ...jsQuestions,
  ...a11yQuestions,
  ...archQuestions,
  ...webQuestions,
];
