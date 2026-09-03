import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Award, Zap, Video, Mic } from 'lucide-react';

const SPLIT_DATA = [
  { name: 'Verbal & Content', value: 55, color: '#8c60a2' },
  { name: 'Non-Verbal & Vision', value: 45, color: '#fa846e' },
];

export function ScoreDonutCard({ score = 78, rating = 'Good Performance' }) {
  return (
    <Card className="border border-[#ede3f0] flex flex-col justify-between">
      <CardHeader className="mb-2">
        <div className="flex items-center justify-between w-full">
          <CardTitle>Overall Performance Score</CardTitle>
          <Badge variant="good" withDot>{rating}</Badge>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center py-2">
        
        {/* Left: Overall Circular Score Metric */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-br from-[#8c60a2]/10 via-[#faf8fb] to-[#fa846e]/10 border border-[#ce93cb]/30 text-center relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#cd6775] text-white flex flex-col items-center justify-center shadow-lg shadow-[#8c60a2]/25 mb-3 ring-4 ring-white">
            <span className="text-3xl font-black font-['Plus_Jakarta_Sans'] leading-none">
              {score}
            </span>
            <span className="text-[10px] text-purple-200 font-semibold mt-0.5">/ 100</span>
          </div>
          <span className="text-xs font-bold text-[#2b1d30]">Multi-Modal Synthesis</span>
          <p className="text-[11px] text-[#6e5975] mt-0.5">Top 15% in Engineering Cohort</p>
        </div>

        {/* Right: Verbal vs Non-Verbal Ratio Donut Chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-36 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SPLIT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={58}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SPLIT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    borderColor: '#ede3f0',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-[#2b1d30]">Split</span>
              <span className="text-[10px] text-[#a08ba7]">Ratio</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8c60a2]" />
              <span className="text-[#6e5975]">Verbal: <strong>55%</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#fa846e]" />
              <span className="text-[#6e5975]">Vision: <strong>45%</strong></span>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-3 border-t border-[#ede3f0] flex flex-wrap items-center justify-between text-xs text-[#a08ba7] font-medium gap-2">
        <span>Analyzed via MediaPipe & Whisper</span>
        <span>Candidate: John Doe</span>
      </div>
    </Card>
  );
}

export default ScoreDonutCard;
