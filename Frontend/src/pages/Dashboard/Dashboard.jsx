import React from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  ArrowRight,
  Briefcase,
  Code2,
  Layers,
  MessageSquareCheck,
  Globe2,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCards from './components/StatsCards';
import ScoreOverviewRadar from './components/ScoreOverviewRadar';
import RecentInterviewCard from './components/RecentInterviewCard';
import TipsCard from './components/TipsCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const TARGET_ROLE_OPTIONS = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Engineer',
  'Data Scientist / AI Engineer',
  'Product Manager',
  'System Design Lead',
];

const PRACTICE_TRACKS = [
  {
    title: 'Data Structures & Algorithms',
    description: 'Master array manipulation, trees, dynamic programming, and complexity trade-offs.',
    icon: Code2,
    color: 'from-[#8c60a2] to-[#cd6775]',
    bgTint: 'bg-[#8c60a2]/10 text-[#6e4876]',
    difficulty: 'Medium',
    duration: '15 mins',
    questions: '5 Qs',
  },
  {
    title: 'System Design & Scalability',
    description: 'High-level architecture, caching, microservices, and database partitioning.',
    icon: Layers,
    color: 'from-[#cd6775] to-[#fa846e]',
    bgTint: 'bg-[#fa846e]/10 text-[#fa846e]',
    difficulty: 'Hard',
    duration: '25 mins',
    questions: '3 Qs',
  },
  {
    title: 'Behavioral & STAR Leadership',
    description: 'Conflict resolution, leadership scenarios, and project impact storytelling.',
    icon: MessageSquareCheck,
    color: 'from-[#6e4876] to-[#8c60a2]',
    bgTint: 'bg-[#6e4876]/10 text-[#6e4876]',
    difficulty: 'General',
    duration: '15 mins',
    questions: '4 Qs',
  },
  {
    title: 'Web & API Architecture',
    description: 'RESTful API design, state management, security protocols, and frontend performance.',
    icon: Globe2,
    color: 'from-[#8c60a2] to-[#fa846e]',
    bgTint: 'bg-[#ce93cb]/25 text-[#6e4876]',
    difficulty: 'Medium',
    duration: '20 mins',
    questions: '4 Qs',
  },
];

export function Dashboard() {
  const { user, updateTargetRole } = useAuth();
  const candidateName = user?.name || 'John';
  const currentRole = user?.targetRole || 'Software Engineer';

  const handleRoleChange = (e) => {
    if (updateTargetRole) {
      updateTargetRole(e.target.value);
    }
  };

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle={`Welcome back, ${candidateName.split(' ')[0]} 👋 Track your performance and communication skills.`}
    >
      <div className="space-y-7">

        {/* 1. Quick Launch Banner + Target Job Role Switcher */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8c60a2]/25">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2b1d30]">
                Ready for your next interview session?
              </h3>
              <p className="text-xs text-[#6e5975] mt-0.5">
                Record your responses to structured questions for in-depth post-interview AI analysis.
              </p>
            </div>
          </div>

          {/* Interactive Target Role Switcher & Start CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#ede3f0] shadow-2xs">
              <Briefcase className="w-4 h-4 text-[#8c60a2] shrink-0" />
              <label htmlFor="dashboardTargetRole" className="text-xs font-bold text-[#2b1d30] shrink-0">
                Target Role:
              </label>
              <select
                id="dashboardTargetRole"
                value={currentRole}
                onChange={handleRoleChange}
                className="text-xs font-bold text-[#6e4876] bg-transparent focus:outline-none cursor-pointer pr-2"
              >
                {TARGET_ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <Link to={ROUTES.INTERVIEW_SETUP}>
              <Button size="md" rightIcon={ArrowRight} className="shadow-md">
                Start Interview Session
              </Button>
            </Link>
          </div>
        </div>

        {/* 2. Top 3 Stats KPI Cards */}
        <StatsCards />

        {/* 3. Middle Grid: Score Radar (Left) + Recent Interview & Tips (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Radar Chart (7 cols on wide screens) */}
          <div className="lg:col-span-7 w-full h-full min-h-[400px]">
            <ScoreOverviewRadar />
          </div>

          {/* Right Column: Recent Interview + Tips for You (5 cols on wide screens) */}
          <div className="lg:col-span-5 space-y-6">
            <RecentInterviewCard />
            <TipsCard />
          </div>
        </div>

        {/* 4. Quick Practice Tracks Row */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                Recommended Interview Tracks
              </h3>
              <p className="text-xs text-[#6e5975]">
                Tailored for <strong className="text-[#6e4876]">{currentRole}</strong> candidates.
              </p>
            </div>
            <Link to={ROUTES.INTERVIEW_SETUP} className="text-xs font-bold text-[#8c60a2] hover:text-[#6e4876]">
              View All Tracks →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {PRACTICE_TRACKS.map((track, idx) => {
              const Icon = track.icon;
              return (
                <Card key={idx} hover className="border border-[#ede3f0] flex flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${track.bgTint} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#faf8fb] text-[#6e5975] border border-[#ede3f0]">
                        {track.difficulty}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#2b1d30] mb-1 leading-snug">
                      {track.title}
                    </h4>
                    <p className="text-xs text-[#6e5975] leading-relaxed mb-4">
                      {track.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ede3f0]/80 flex items-center justify-between text-xs text-[#a08ba7]">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {track.duration}
                      </span>
                      <span>•</span>
                      <span className="font-medium">{track.questions}</span>
                    </div>

                    <Link to={ROUTES.INTERVIEW_SETUP}>
                      <span className="font-bold text-[#8c60a2] hover:text-[#fa846e] flex items-center gap-1">
                        Start <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;