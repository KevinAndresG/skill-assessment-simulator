'use client';

import { STUDY_PLAN } from '@/config/studyPlan';
import { progressStore } from '@/lib/progress';
import { useProgress } from '@/lib/hooks/useProgress';
import { Card } from '@/components/ui';

export function StudyPlanChecklist() {
  const { checks } = useProgress();
  return (
    <div className="grid g2">
      {STUDY_PLAN.map(day => (
        <Card key={day.id}>
          <h3 style={{ margin: 0 }}>{day.day} · {day.title}</h3>
          {day.tasks.map((task, i) => {
            const key = `${day.id}-${i}`;
            return (
              <div key={key} className="check">
                <input type="checkbox" id={`chk-${key}`} checked={!!checks[key]} onChange={e => progressStore.toggleCheck(key, e.target.checked)} />
                <label htmlFor={`chk-${key}`} className="small">{task}</label>
              </div>
            );
          })}
        </Card>
      ))}
    </div>
  );
}
