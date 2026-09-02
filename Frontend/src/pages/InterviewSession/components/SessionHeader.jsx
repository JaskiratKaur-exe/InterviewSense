import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PhoneOff, AlertTriangle } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';
import Button from '../../../components/ui/Button';

export function SessionHeader({ onEndInterview }) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  // Live Interview Timer Counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackClick = () => {
    setShowExitModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#ede3f0] px-6 py-3.5 flex items-center justify-between shadow-2xs">
        {/* Left: Back Arrow & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackClick}
            className="p-2 rounded-xl text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#faf8fb] transition cursor-pointer"
            title="Leave Session"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
            Interview Session
          </h1>
        </div>

        {/* Center: Live Status & Timer */}
        <div className="flex items-center gap-3 bg-[#faf8fb] px-4 py-1.5 rounded-full border border-[#ede3f0]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-[#2b1d30] hidden sm:inline">
              Interview in Progress
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#6e4876] pl-2 border-l border-[#ede3f0]">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Right: End Interview Action Button */}
        <div>
          <button
            onClick={onEndInterview}
            className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold shadow-xs active:scale-[0.98] transition cursor-pointer flex items-center gap-1.5"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Interview</span>
          </button>
        </div>
      </header>

      {/* Leave Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#ede3f0] shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#2b1d30]">Leave Interview Session?</h3>
            <p className="text-xs text-[#6e5975] leading-relaxed">
              Your current interview progress will not be analyzed if you exit now. Are you sure you want to return to dashboard?
            </p>
            <div className="flex gap-2.5 pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => setShowExitModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                onClick={() => navigate(ROUTES.DASHBOARD)}
              >
                Leave
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SessionHeader;
