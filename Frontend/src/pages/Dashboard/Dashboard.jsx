import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCards from './components/StatsCards';
import ScoreOverviewRadar from './components/ScoreOverviewRadar';
import RecentInterviewCard from './components/RecentInterviewCard';
import TipsCard from './components/TipsCard';
import Button from '../../components/ui/Button';

export function Dashboard() {
  const { user } = useAuth();
  const candidateName = user?.name || 'John';

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`Welcome back, ${candidateName.split(' ')[0]} 👋 Track your progress and improve your interview skills.`}
    >
      <div className="space-y-6">

        {/* Quick Launch Banner for Mock Interview */}
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Ready for your next mock interview?
              </h3>
              <p className="text-xs text-slate-500">
                Target Role: <strong className="text-purple-700 font-semibold">{user?.targetRole || 'Software Engineer'}</strong>
              </p>
            </div>
          </div>

          <Link to={ROUTES.MOCK_INTERVIEW}>
            <Button size="sm" rightIcon={ArrowRight}>
              Start Mock Interview
            </Button>
          </Link>
        </div>

        {/* 1. Top 3 Stats KPI Cards */}
        <StatsCards />

        {/* 2. Middle Grid: Score Radar (Left) + Recent Interview & Tips (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Radar Chart */}
          <div className="w-full h-full min-h-[380px]">
            <ScoreOverviewRadar />
          </div>

          {/* Right Column: Recent Interview + Tips for You */}
          <div className="space-y-6">
            <RecentInterviewCard />
            <TipsCard />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;