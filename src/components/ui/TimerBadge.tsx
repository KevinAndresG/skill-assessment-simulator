import { cx, mmss } from '@/lib/utils';

/** Solo muestra el tiempo; la lógica vive en el hook useCountdown. */
export function TimerBadge({ seconds }: { seconds: number }) {
  return (
    <span className={cx('timer', seconds <= 60 && 'low')} aria-label={`Tiempo restante ${mmss(seconds)}`}>
      ⏱ {mmss(seconds)}
    </span>
  );
}
