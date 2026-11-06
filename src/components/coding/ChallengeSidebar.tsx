'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { CodingLevel } from '@/content/types';
import { LEVEL_LABEL } from '@/content/types';
import { useProgress } from '@/lib/hooks/useProgress';
import { cx } from '@/lib/utils';
import { Tag } from '@/components/ui';

export interface ChallengeListItem {
  id: string;
  title: string;
  minutes?: number;
  level?: CodingLevel;
}

export function ChallengeSidebar({ items, basePath, showLevelFilter }: { items: ChallengeListItem[]; basePath: string; showLevelFilter?: boolean }) {
  const pathname = usePathname();
  const { scores } = useProgress();
  const [level, setLevel] = useState<CodingLevel | ''>('');
  const filtered = level ? items.filter(i => i.level === level) : items;

  return (
    <aside>
      {showLevelFilter && (
        <div className="row" style={{ marginBottom: 8 }}>
          <select aria-label="Filtrar nivel" value={level} onChange={e => setLevel(e.target.value as CodingLevel | '')}>
            <option value="">Todos los niveles</option>
            {(Object.keys(LEVEL_LABEL) as CodingLevel[]).map(l => (
              <option key={l} value={l}>{LEVEL_LABEL[l]}</option>
            ))}
          </select>
          <span className="small muted">{filtered.length} retos</span>
        </div>
      )}
      <ul className="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {filtered.map(item => {
          const href = `${basePath}/${item.id}`;
          const score = scores[item.id];
          return (
            <li key={item.id}>
              <Link href={href} className={cx('item', pathname === href && 'on')} aria-current={pathname === href ? 'page' : undefined} style={{ textDecoration: 'none' }}>
                {item.title}
                <span className="sc">
                  {score == null ? (item.minutes ? <Tag>{item.minutes}′</Tag> : null) : <Tag tone={score === 100 ? 'ok' : 'ko'}>{score}%</Tag>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
