import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bot } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export function SessionSummaryCard({ selectedTrack, level, mode }) {
  const navigate = useNavigate();

  const handleLaunchSession = () => {
    // Navigate to Live Session Room with state
    navigate(ROUTES.LIVE_SESSION, {
      state: {
        track: selectedTrack,
        level,
        mode,
        startedAt: new Date().toISOString(),
      },
    });
  };

  return (
    <Card className="border border-[#ede3f0] bg-gradient-to-br from-white via-[#faf8fb] to-white flex flex-col justify-between">
      <CardHeader className="mb-3">
        <CardTitle>Session Launch Summary</CardTitle>
      </CardHeader>

      <div className="space-y-4 mb-6">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="w-4 h-4 text-[#8c60a2]" />
            <span className="text-xs font-bold text-[#2b1d30]">Active AI Multi-Modal Engine:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#6e4876] border border-[#ede3f0]">
              MediaPipe Vision
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#fa846e] border border-[#ede3f0]">
              Whisper Audio
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#8c60a2] border border-[#ede3f0]">
              Gemini LLM
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-[#ede3f0]/60">
            <span className="text-[#6e5975]">Selected Track:</span>
            <span className="font-bold text-[#2b1d30] capitalize">{selectedTrack.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#ede3f0]/60">
            <span className="text-[#6e5975]">Difficulty Level:</span>
            <span className="font-bold text-[#2b1d30] capitalize">{level}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#ede3f0]/60">
            <span className="text-[#6e5975]">Expected Questions:</span>
            <span className="font-bold text-[#6e4876]">5 - 6 Questions</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#6e5975]">Estimated Duration:</span>
            <span className="font-bold text-[#fa846e]">~15 Minutes</span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleLaunchSession}
        size="lg"
        className="w-full shadow-lg shadow-[#8c60a2]/25"
        rightIcon={ArrowRight}
      >
        Launch AI Live Session
      </Button>
    </Card>
  );
}

export default SessionSummaryCard;
