import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';

const COMPARISON_DATA = [
  { metric: 'Eye Contact', initial: 58, current: 84, fullMark: 100 },
  { metric: 'Speaking Pace', initial: 60, current: 78, fullMark: 100 },
  { metric: 'Head Posture', initial: 65, current: 85, fullMark: 100 },
  { metric: 'Technical Depth', initial: 62, current: 82, fullMark: 100 },
  { metric: 'STAR Structure', initial: 55, current: 88, fullMark: 100 },
  { metric: 'Confidence Tone', initial: 60, current: 80, fullMark: 100 },
];

export function SkillGrowthRadar() {
  return (
    <Card className="h-full border border-[#ede3f0] flex flex-col justify-between">
      <CardHeader className="mb-1">
        <div>
          <CardTitle>Skill Growth Baseline</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Initial baseline vs current performance across 6 competency axes.
          </p>
        </div>
      </CardHeader>

      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="72%" data={COMPARISON_DATA}>
            <PolarGrid stroke="#ede3f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#6e5975', fontSize: 10.5, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#a08ba7', fontSize: 9 }}
              axisLine={false}
            />
            <Radar
              name="Initial Baseline (Apr 2025)"
              dataKey="initial"
              stroke="#ce93cb"
              strokeWidth={1.5}
              fill="#ce93cb"
              fillOpacity={0.2}
            />
            <Radar
              name="Current Level (May 2025)"
              dataKey="current"
              stroke="#8c60a2"
              strokeWidth={2.5}
              fill="#8c60a2"
              fillOpacity={0.35}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-3 border-t border-[#ede3f0] flex items-center justify-between text-xs text-[#6e5975] font-medium">
        <span>Greatest Gain: <strong className="text-[#8c60a2]">STAR Structure (+33%)</strong></span>
        <span>6 Core Axes</span>
      </div>
    </Card>
  );
}

export default SkillGrowthRadar;
