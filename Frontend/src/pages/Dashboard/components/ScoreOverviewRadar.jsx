import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';

const radarData = [
  { metric: 'Eye Contact', value: 80, fullMark: 100 },
  { metric: 'Facial Expressions', value: 75, fullMark: 100 },
  { metric: 'Communication', value: 85, fullMark: 100 },
  { metric: 'Speaking Pace', value: 70, fullMark: 100 },
  { metric: 'Confidence', value: 78, fullMark: 100 },
];

export function ScoreOverviewRadar({ data = radarData }) {
  return (
    <Card className="h-full border border-[#ede3f0] flex flex-col justify-between">
      <CardHeader className="mb-2">
        <CardTitle>Score Overview</CardTitle>
      </CardHeader>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#ede3f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: '#6e5975', fontSize: 11, fontWeight: 600 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#a08ba7', fontSize: 9 }}
              axisLine={false}
            />
            <Radar
              name="Candidate Score"
              dataKey="value"
              stroke="#8c60a2"
              strokeWidth={2.5}
              fill="#8c60a2"
              fillOpacity={0.28}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-3 border-t border-[#ede3f0] flex items-center justify-between text-xs text-[#6e5975] font-medium">
        <span>Average Index: <strong className="text-[#6e4876] font-bold">77.6%</strong></span>
        <span>Based on 8 sessions</span>
      </div>
    </Card>
  );
}

export default ScoreOverviewRadar;
