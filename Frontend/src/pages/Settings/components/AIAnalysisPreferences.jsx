import React, { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { Eye, Mic } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function AIAnalysisPreferences() {
  const [gazeStrictness, setGazeStrictness] = useState('balanced');
  const [pacingTarget, setPacingTarget] = useState('standard');
  const [includeModelAnswers, setIncludeModelAnswers] = useState(true);

  return (
    <Card className="border border-[#ede3f0] space-y-5">
      <CardHeader className="mb-1">
        <div>
          <CardTitle>Post-Interview AI Analysis Sensitivity</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Adjust evaluation thresholds applied by MediaPipe, Whisper, and Gemini during report generation.
          </p>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {/* Gaze Strictness */}
        <div>
          <label className="block text-xs font-bold text-[#2b1d30] mb-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#8c60a2]" />
            <span>Eye Contact & Gaze Strictness:</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'lenient', label: 'Lenient', sub: '>65% Target' },
              { id: 'balanced', label: 'Balanced', sub: '>75% Target' },
              { id: 'strict', label: 'Strict', sub: '>85% Target' },
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setGazeStrictness(tier.id)}
                className={cn(
                  'p-2.5 rounded-xl border text-center transition-all cursor-pointer',
                  gazeStrictness === tier.id
                    ? 'border-[#8c60a2] bg-[#8c60a2]/10 text-[#6e4876] font-bold ring-1 ring-[#8c60a2]/30'
                    : 'border-[#ede3f0] bg-[#faf8fb] text-[#6e5975]'
                )}
              >
                <p className="text-xs">{tier.label}</p>
                <p className="text-[10px] text-[#a08ba7]">{tier.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Speaking Pace Target */}
        <div>
          <label className="block text-xs font-bold text-[#2b1d30] mb-2 flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-[#fa846e]" />
            <span>Target Speaking Pace Range:</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'standard', label: '130 - 160 WPM', sub: 'Standard Tech Interview' },
              { id: 'fast', label: '150 - 180 WPM', sub: 'High-Velocity Consulting' },
            ].map((pace) => (
              <button
                key={pace.id}
                type="button"
                onClick={() => setPacingTarget(pace.id)}
                className={cn(
                  'p-2.5 rounded-xl border text-left transition-all cursor-pointer',
                  pacingTarget === pace.id
                    ? 'border-[#8c60a2] bg-[#8c60a2]/10 text-[#6e4876] font-bold ring-1 ring-[#8c60a2]/30'
                    : 'border-[#ede3f0] bg-[#faf8fb] text-[#6e5975]'
                )}
              >
                <p className="text-xs">{pace.label}</p>
                <p className="text-[10px] text-[#a08ba7]">{pace.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Model Answers Toggle */}
        <div className="p-3.5 rounded-2xl bg-[#faf8fb] border border-[#ede3f0] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#2b1d30]">Include AI Model Answers in Report</p>
            <p className="text-[11px] text-[#6e5975]">
              Generate ideal STAR structured reference responses for every question evaluated.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={includeModelAnswers}
              onChange={(e) => setIncludeModelAnswers(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#8c60a2] peer-checked:to-[#fa846e]" />
          </label>
        </div>
      </div>
    </Card>
  );
}

export default AIAnalysisPreferences;
