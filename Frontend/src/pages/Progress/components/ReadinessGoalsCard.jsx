import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Target, CheckCircle2, Flame, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export function ReadinessGoalsCard() {
  return (
    <Card className="border border-[#ede3f0] flex flex-col justify-between space-y-6">
      <CardHeader className="mb-1">
        <div className="flex items-center justify-between w-full">
          <CardTitle>Interview Readiness Index</CardTitle>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Cohort Top 10%
          </span>
        </div>
      </CardHeader>

      {/* Main Readiness Gauge Meter */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#fa846e] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#8c60a2]/25 shrink-0">
            86%
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2b1d30]">
              Ready for Real-World Tech Interviews
            </h4>
            <p className="text-xs text-[#6e5975] mt-0.5">
              Based on gaze focus, technical structuring, and low hesitation latency.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Goal Tracker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#2b1d30]">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#fa846e] fill-[#fa846e]" />
            <span>Weekly Consistency Goal</span>
          </div>
          <span className="text-[#6e4876]">3 / 4 Sessions Done (75%)</span>
        </div>

        <div className="w-full bg-[#faf8fb] h-2.5 rounded-full overflow-hidden border border-[#ede3f0]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#8c60a2] via-[#cd6775] to-[#fa846e] w-[75%]" />
        </div>

        <p className="text-[11px] text-[#6e5975] font-medium">
          Complete 1 more session by Sunday to maintain your 4-week practice streak!
        </p>
      </div>

      {/* Milestones Checklist */}
      <div className="space-y-2 pt-1 border-t border-[#ede3f0]/80">
        <div className="flex items-center justify-between text-xs font-medium text-[#6e5975]">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Over 80% Eye Contact in 3 Consecutive Sessions</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Unlocked</span>
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-[#6e5975]">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Under 3 Filler Words in System Design Track</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Unlocked</span>
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-[#6e5975]">
          <span className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#8c60a2]" />
            <span>Score 90+ on Senior Architecture Track</span>
          </span>
          <span className="text-[10px] font-bold text-[#8c60a2] bg-[#8c60a2]/10 px-2 py-0.5 rounded-full">In Progress</span>
        </div>
      </div>

      <Link to={ROUTES.INTERVIEW_SETUP}>
        <Button size="md" className="w-full shadow-md" rightIcon={ArrowRight}>
          Continue Practice Track
        </Button>
      </Link>
    </Card>
  );
}

export default ReadinessGoalsCard;
