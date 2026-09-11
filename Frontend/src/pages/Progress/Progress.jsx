import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProgressStatsCards from './components/ProgressStatsCards';
import PerformanceTrendChart from './components/PerformanceTrendChart';
import SkillGrowthRadar from './components/SkillGrowthRadar';
import FluencyAcousticsCard from './components/FluencyAcousticsCard';
import ReadinessGoalsCard from './components/ReadinessGoalsCard';
import { Sparkles } from 'lucide-react';

export function Progress() {
  return (
    <DashboardLayout
      title="Progress & Skills Analytics"
      subtitle="Longitudinal performance metrics, gaze stabilization trends, and readiness tracking over time."
    >
      <div className="space-y-7 max-w-[1550px] w-full mx-auto">
        
        {/* Top Workflow Banner */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8c60a2]/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2b1d30]">
                Continuous Skill Acquisition & Analytics
              </h3>
              <p className="text-xs text-[#6e5975]">
                Track your non-verbal confidence, speech pacing, and technical answer precision across all interview sessions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#6e4876] bg-white px-3.5 py-1.5 rounded-full border border-[#ede3f0] shadow-2xs self-start sm:self-auto">
            <span>🔥 4-Week Practice Streak Active</span>
          </div>
        </div>

        {/* 1. Top 4 High-Level KPI Cards */}
        <ProgressStatsCards />

        {/* 2. Middle Row: Historical Trend Area Chart (Left 7 cols) + Comparative Radar (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <PerformanceTrendChart />
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <SkillGrowthRadar />
          </div>
        </div>

        {/* 3. Bottom Row: Speech & Fluency Card (Left 6 cols) + Readiness Goals (Right 6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 flex flex-col">
            <FluencyAcousticsCard />
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <ReadinessGoalsCard />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Progress;