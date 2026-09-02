import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import SessionHeader from './components/SessionHeader';
import VideoFeedContainer from './components/VideoFeedContainer';
import AIInterviewerChat from './components/AIInterviewerChat';
import { Bot, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../../components/ui/Button';

export function InterviewSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [isCaptionsOpen, setIsCaptionsOpen] = useState(true);

  const sessionState = location.state || {
    track: 'software-engineer',
    level: 'mid',
    mode: 'mixed',
  };

  const handleEndInterview = () => {
    setShowCompleteModal(true);
  };

  const handleGenerateReport = () => {
    // Navigate to generated AI Performance Report
    navigate(ROUTES.REPORT_DETAIL('mock_report_01'));
  };

  return (
    <div className="min-h-screen bg-[#faf8fb] flex flex-col selection:bg-[#ce93cb]/30 selection:text-[#6e4876]">
      {/* 1. Distraction-Free Header */}
      <SessionHeader onEndInterview={handleEndInterview} />

      {/* 2. Main Full-Screen Split View (Consumes 100% space) */}
      <main className="flex-1 w-full max-w-[1750px] mx-auto p-4 sm:p-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">

          {/* Left Panel: Video Feed & Vision HUD (7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-h-[480px] lg:min-h-[580px]">
            <VideoFeedContainer
              isCaptionsOpen={isCaptionsOpen}
              onToggleCaptions={() => setIsCaptionsOpen(!isCaptionsOpen)}
            />
          </div>

          {/* Right Panel: AI Interviewer Chat & Speech Prompter (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col min-h-[480px] lg:min-h-[580px]">
            <AIInterviewerChat />
          </div>

        </div>
      </main>

      {/* Completion & Report Generation Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#ede3f0] shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#8c60a2]/30">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                Interview Session Completed! 🎉
              </h3>
              <p className="text-xs text-[#6e5975] mt-1.5 leading-relaxed">
                Our multi-modal AI engine has synthesized your video, audio, and answer transcript metrics.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf8fb] border border-[#ede3f0] text-left space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#6e5975]">Vision Eye-Contact:</span>
                <span className="font-bold text-emerald-700">92% (High Focus)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6e5975]">Speech Pacing:</span>
                <span className="font-bold text-[#6e4876]">142 WPM (Optimal)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6e5975]">Gemini Evaluation:</span>
                <span className="font-bold text-[#fa846e]">85 / 100 (Strong)</span>
              </div>
            </div>

            <Button
              onClick={handleGenerateReport}
              size="lg"
              className="w-full shadow-lg shadow-[#8c60a2]/25"
            >
              View Full Performance Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewSession;
