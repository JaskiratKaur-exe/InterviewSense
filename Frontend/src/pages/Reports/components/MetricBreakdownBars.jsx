import React from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { Eye, Smile, UserCheck, Mic, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const METRICS = [
  {
    id: 'eye-contact',
    label: 'Eye Contact Ratio',
    score: 80,
    unit: '%',
    benchmark: 'Optimal (>75%)',
    icon: Eye,
    color: 'from-[#8c60a2] to-[#cd6775]',
    status: 'High Gaze Consistency',
  },
  {
    id: 'facial-expression',
    label: 'Facial Expressions & Positivity',
    score: 75,
    unit: '%',
    benchmark: 'Normal (70-85%)',
    icon: Smile,
    color: 'from-[#cd6775] to-[#fa846e]',
    status: 'Engaged & Calm',
  },
  {
    id: 'head-pose',
    label: 'Head Pose & Posture Alignment',
    score: 85,
    unit: '%',
    benchmark: 'Centered (>80%)',
    icon: UserCheck,
    color: 'from-[#6e4876] to-[#8c60a2]',
    status: 'Stable Head Center',
  },
  {
    id: 'speaking-pace',
    label: 'Speaking Pace',
    score: 70,
    unit: ' WPM',
    rawVal: '142',
    benchmark: 'Target: 130-160 WPM',
    icon: Clock,
    color: 'from-[#8c60a2] to-[#fa846e]',
    status: 'Optimal Pacing',
  },
  {
    id: 'filler-words',
    label: 'Filler Words Frequency',
    score: 90,
    unit: '% Clarity',
    rawVal: '3 Fillers',
    benchmark: 'Low (<5 instances)',
    icon: Mic,
    color: 'from-[#cd6775] to-[#fa846e]',
    status: 'Clean Fluency',
  },
  {
    id: 'communication',
    label: 'Communication Effectiveness',
    score: 82,
    unit: '%',
    benchmark: 'Strong (>80%)',
    icon: MessageSquare,
    color: 'from-[#6e4876] to-[#cd6775]',
    status: 'STAR Technique Followed',
  },
];

export function MetricBreakdownBars() {
  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div>
          <CardTitle>Detailed Metric Breakdown</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Individual behavioral & acoustic parameters evaluated by post-session AI algorithms.
          </p>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="space-y-1.5 p-3 rounded-2xl bg-[#faf8fb]/60 border border-[#ede3f0]/80">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white border border-[#ede3f0] text-[#6e4876] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#2b1d30]">{metric.label}</span>
                    <span className="text-[10px] text-[#a08ba7] ml-2 hidden sm:inline">{metric.benchmark}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-[#2b1d30] text-sm font-['Plus_Jakarta_Sans']">
                    {metric.rawVal ? metric.rawVal : `${metric.score}${metric.unit}`}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#ede3f0]">
                <div
                  style={{ width: `${metric.score}%` }}
                  className={cn(
                    'h-full rounded-full bg-gradient-to-r transition-all duration-500',
                    metric.color
                  )}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-semibold text-[#6e5975] pt-0.5">
                <span className="text-[#8c60a2]">{metric.status}</span>
                <span className="text-[#a08ba7]">Score: {metric.score}/100</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default MetricBreakdownBars;
