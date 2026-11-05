'use client';

import { STUDY_PLAN } from '@/config/studyPlan';
import { useProgress } from '@/lib/hooks/useProgress';
import { Card, ProgressBar } from '@/components/ui';

export function ProgressStats({ challengeIds }: { challengeIds: string[] }) {
  const { scores, quiz, checks } = useProgress();
  const solved = challengeIds.filter(id => scores[id] === 100).length;
  const last = quiz.slice(-5);
  const quizAvg = last.length ? Math.round(last.reduce((s, h) => s + h.percent, 0) / last.length) : null;
  const totalChecks = STUDY_PLAN.reduce((s, d) => s + d.tasks.length, 0);
  const doneChecks = Object.values(checks).filter(Boolean).length;
  return (
    <div className="grid g3">
      <Card>
        <div className="muted small">Retos de código al 100%</div>
        <div className="kpi">{solved}/{challengeIds.length}</div>
        <ProgressBar value={(solved / challengeIds.length) * 100} label="Retos resueltos" />
      </Card>
      <Card>
        <div className="muted small">Promedio de los últimos quizzes</div>
        <div className="kpi">{quizAvg == null ? '—' : `${quizAvg}%`}</div>
        <div className="muted small">{quiz.length} quizzes hechos</div>
      </Card>
      <Card>
        <div className="muted small">Plan de estudio</div>
        <div className="kpi">{doneChecks}/{totalChecks}</div>
        <ProgressBar value={(doneChecks / totalChecks) * 100} label="Plan de estudio" />
      </Card>
    </div>
  );
}
