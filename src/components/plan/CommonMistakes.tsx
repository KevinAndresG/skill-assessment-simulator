import { COMMON_MISTAKES } from '@/config/studyPlan';
import { Card, RichText } from '@/components/ui';

export function CommonMistakes() {
  return (
    <Card tight>
      <table>
        <thead><tr><th>Error</th><th>Corrección</th></tr></thead>
        <tbody>
          {COMMON_MISTAKES.map(([mistake, fix]) => (
            <tr key={mistake}>
              <RichText as="td" html={mistake} />
              <RichText as="td" html={fix} />
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
