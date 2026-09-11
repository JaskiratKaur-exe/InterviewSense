import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

const TREND_DATA = [
  { session: 'Session 1', date: '15 Apr', overall: 62, verbal: 60, nonVerbal: 64 },
  { session: 'Session 2', date: '20 Apr', overall: 66, verbal: 65, nonVerbal: 68 },
  { session: 'Session 3', date: '25 Apr', overall: 70, verbal: 72, nonVerbal: 67 },
  { session: 'Session 4', date: '28 Apr', overall: 64, verbal: 68, nonVerbal: 60 },
  { session: 'Session 5', date: '02 May', overall: 72, verbal: 74, nonVerbal: 70 },
  { session: 'Session 6', date: '05 May', overall: 76, verbal: 78, nonVerbal: 74 },
  { session: 'Session 7', date: '08 May', overall: 78, verbal: 80, nonVerbal: 76 },
  { session: 'Session 8', date: '12 May', overall: 85, verbal: 86, nonVerbal: 84 },
];

export function PerformanceTrendChart() {
  const [activeMetric, setActiveMetric] = useState('overall');

  const metricConfig = {
    overall: { label: 'Overall Score', color: '#8c60a2', gradientId: 'colorOverall' },
    verbal: { label: 'Verbal & Content', color: '#cd6775', gradientId: 'colorVerbal' },
    nonVerbal: { label: 'Vision & Posture', color: '#fa846e', gradientId: 'colorNonVerbal' },
  };

  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
          <div>
            <CardTitle>Historical Score Progression</CardTitle>
            <p className="text-xs text-[#6e5975] mt-0.5">
              Trajectory across your last 8 recorded interview sessions.
            </p>
          </div>

          {/* Metric Filter Switcher */}
          <div className="flex items-center gap-1.5 bg-[#faf8fb] p-1 rounded-xl border border-[#ede3f0] self-start sm:self-auto">
            {Object.keys(metricConfig).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                  activeMetric === key
                    ? 'bg-white text-[#6e4876] shadow-xs'
                    : 'text-[#6e5975] hover:text-[#2b1d30]'
                )}
              >
                {metricConfig[key].label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ede3f0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6e5975', fontSize: 11, fontWeight: 600 }}
              axisLine={{ stroke: '#ede3f0' }}
              tickLine={false}
            />
            <YAxis
              domain={[50, 100]}
              tick={{ fill: '#a08ba7', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                borderColor: '#ede3f0',
                boxShadow: '0 8px 24px -6px rgba(110, 72, 118, 0.15)',
                fontSize: '12px',
                fontWeight: 600,
              }}
              formatter={(val) => [`${val} / 100`, metricConfig[activeMetric].label]}
              labelFormatter={(label) => `Recorded Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={metricConfig[activeMetric].color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#trendGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-3 border-t border-[#ede3f0] flex items-center justify-between text-xs text-[#6e5975]">
        <span>First Session: <strong className="text-[#2b1d30]">62/100</strong></span>
        <span>Latest Session: <strong className="text-[#8c60a2]">85/100 (+23 pts)</strong></span>
      </div>
    </Card>
  );
}

export default PerformanceTrendChart;
