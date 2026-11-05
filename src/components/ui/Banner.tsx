import type { ReactNode } from 'react';

export type BannerTone = 'good' | 'bad' | 'warn' | 'info';

export function Banner({ tone, children }: { tone: BannerTone; children: ReactNode }) {
  return (
    <div className={`banner ${tone}`} role={tone === 'bad' ? 'alert' : 'status'}>
      {children}
    </div>
  );
}
