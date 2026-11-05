import { codingChallenges } from '@/content/coding';
import { debugChallenges } from '@/content/debugging';
import { quizQuestions } from '@/content/quiz';
import type { ContentRepository } from './types';

export const localContentRepository: ContentRepository = {
  async listCoding(level) {
    return level ? codingChallenges.filter(c => c.level === level) : codingChallenges;
  },
  async getCoding(id) {
    return codingChallenges.find(c => c.id === id) ?? null;
  },
  async listDebug() {
    return debugChallenges;
  },
  async getDebug(id) {
    return debugChallenges.find(c => c.id === id) ?? null;
  },
  async listQuiz(categories) {
    return categories?.length ? quizQuestions.filter(q => categories.includes(q.category)) : quizQuestions;
  },
};
