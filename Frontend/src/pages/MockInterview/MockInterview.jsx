import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import RoleTrackSelector from './components/RoleTrackSelector';
import DifficultyConfig from './components/DifficultyConfig';
import HardwareCheckCard from './components/HardwareCheckCard';
import SessionSummaryCard from './components/SessionSummaryCard';
import { Sparkles, Sliders, Video, ShieldCheck } from 'lucide-react';

export function MockInterview() {
  const { user } = useAuth();

  // Staging Configuration States
  const [selectedTrack, setSelectedTrack] = useState('software-engineer');
  const [level, setLevel] = useState('mid');
  const [mode, setMode] = useState('mixed');

  return (
    <DashboardLayout
      title="Mock Interview Setup"
      subtitle="Configure your AI evaluation track, experience tier, and verify camera/mic hardware."
    >
      <div className="space-y-6 max-w-[1550px] w-full mx-auto">

        {/* Top Workflow Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8c60a2]/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#2b1d30]">
                Pre-Flight Interview Staging Room
              </h3>
              <p className="text-xs text-[#6e5975]">
                Candidate: <strong className="text-[#6e4876]">{user?.name || 'John Doe'}</strong> • Multi-Modal Sensor Diagnostics Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#6e4876] bg-white px-3.5 py-1.5 rounded-full border border-[#ede3f0] shadow-2xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Ready • 0ms Latency Pipeline</span>
          </div>
        </div>

        {/* Main 2-Column Responsive Layout (Consumes full dashboard width) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column (7-8 cols): Role Track + Difficulty Setup */}
          <div className="lg:col-span-8 space-y-6">
            <RoleTrackSelector
              selectedTrack={selectedTrack}
              onSelectTrack={setSelectedTrack}
            />

            <DifficultyConfig
              level={level}
              setLevel={setLevel}
              mode={mode}
              setMode={setMode}
            />
          </div>

          {/* Right Column (4-5 cols): Hardware Diagnostics + Summary Launch CTA */}
          <div className="lg:col-span-4 space-y-6 sticky top-20">
            <HardwareCheckCard />

            <SessionSummaryCard
              selectedTrack={selectedTrack}
              level={level}
              mode={mode}
            />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default MockInterview;