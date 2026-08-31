import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export function RecentInterviewCard({ session }) {
  const defaultSession = {
    id: 'mock_report_01',
    role: 'Software Engineer - Mock',
    date: '12 May 2025 • 10:30 AM',
    score: 85,
    ...session,
  };

  return (
    <Card className="border border-slate-100">
      <CardHeader className="mb-2">
        <CardTitle>Recent Interview</CardTitle>
      </CardHeader>

      <div className="flex items-center justify-between py-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{defaultSession.role}</h4>
          <p className="text-xs text-slate-400 font-medium mt-0.5">{defaultSession.date}</p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-slate-400 font-medium block">Score</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-slate-900 font-['Plus_Jakarta_Sans']">
              {defaultSession.score}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/100</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex justify-end">
        <Link to={ROUTES.REPORT_DETAIL(defaultSession.id)}>
          <Button variant="outline" size="sm">
            View Report
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default RecentInterviewCard;
