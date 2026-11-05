import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

export type TagTone = 'neutral' | 'entry' | 'intermediate' | 'data' | 'ok' | 'ko';

export function Tag({ tone = 'neutral', children }: { tone?: TagTone; children: ReactNode }) {
  return <span className={cx('tag', tone !== 'neutral' && tone)}>{children}</span>;
}
