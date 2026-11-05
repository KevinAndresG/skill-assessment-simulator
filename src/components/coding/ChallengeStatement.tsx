import type { Challenge } from '@/content/types';
import { LEVEL_LABEL } from '@/content/types';
import { RichText, Tag } from '@/components/ui';
import type { ReactNode } from 'react';

export function ChallengeStatement({ challenge, aside }: { challenge: Challenge; aside?: ReactNode }) {
  return (
    <>
      <div className="row">
        <h2 style={{ margin: 0 }}>{challenge.title}</h2>
        {challenge.kind === 'coding' ? <Tag tone={challenge.level}>{LEVEL_LABEL[challenge.level]}</Tag> : <Tag tone="intermediate">Debugging</Tag>}
        <Tag>{challenge.minutes} min</Tag>
        <span className="sp" />
        {aside}
      </div>
      <RichText className="desc" html={challenge.kind === 'coding' ? challenge.description : challenge.requirements} />
      {challenge.kind === 'coding' && challenge.examples.length > 0 && (
        <div className="examples">
          <table>
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {challenge.examples.map(([input, output], i) => (
                <tr key={i}>
                  <td><code>{input}</code></td>
                  <td><code>{output}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
