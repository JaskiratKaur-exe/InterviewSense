import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import Card from '../../../components/ui/Card';

export function StatsCards({ stats }) {
  const defaultStats = {
    overallScore: 72,
    scoreRating: 'Good Performance',
    interviewsTaken: 8,
    weeklyIncrease: '+2 this week',
    highestScore: 85,
    highestScoreDate: 'On 12 May 2025',
    ...stats,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 1. Amethyst-Plum-Rose Gradient Wave Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#6e4876] via-[#8c60a2] to-[#cd6775] text-white shadow-lg shadow-[#6e4876]/20 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        {/* Subtle Wave SVG in background */}
        <svg
          className="absolute bottom-0 right-0 w-36 h-20 text-white/10 pointer-events-none"
          viewBox="0 0 1440 320"
          fill="none"
        >
          <path
            fill="currentColor"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        <div>
          <p className="text-xs font-medium text-purple-100/90 uppercase tracking-wider">
            Overall Average Score
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-['Plus_Jakarta_Sans']">
              {defaultStats.overallScore}
            </span>
            <span className="text-sm font-semibold text-purple-200">/ 100</span>
          </div>
        </div>

        <p className="text-xs font-semibold text-purple-100 mt-3 flex items-center gap-1.5">
          <span>{defaultStats.scoreRating}</span>
        </p>
      </div>

      {/* 2. Interviews Taken Card */}
      <Card className="flex flex-col justify-between min-h-[140px] border border-[#ede3f0]">
        <div>
          <p className="text-xs font-semibold text-[#6e5975] uppercase tracking-wider">
            Interviews Taken
          </p>
          <div className="mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
              {defaultStats.interviewsTaken}
            </span>
          </div>
        </div>

        <p className="text-xs font-semibold text-[#fa846e] flex items-center gap-1 mt-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{defaultStats.weeklyIncrease}</span>
        </p>
      </Card>

      {/* 3. Highest Score Card with Trophy */}
      <Card className="flex flex-col justify-between min-h-[140px] border border-[#ede3f0] relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6e5975] uppercase tracking-wider">
              Highest Score
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                {defaultStats.highestScore}
              </span>
              <span className="text-sm font-semibold text-[#a08ba7]">/ 100</span>
            </div>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-[#fa846e]/15 text-[#fa846e] flex items-center justify-center shadow-xs">
            <Trophy className="w-5 h-5 fill-[#fa846e]" />
          </div>
        </div>

        <p className="text-xs text-[#a08ba7] mt-3 font-medium">
          {defaultStats.highestScoreDate}
        </p>
      </Card>
    </div>
  );
}

export default StatsCards;
