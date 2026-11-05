import type { HTMLAttributes } from 'react';
import { cx } from '@/lib/utils';

export function Card({ tight, className, ...props }: HTMLAttributes<HTMLDivElement> & { tight?: boolean }) {
  return <div className={cx('card', tight && 'tight', className)} {...props} />;
}
