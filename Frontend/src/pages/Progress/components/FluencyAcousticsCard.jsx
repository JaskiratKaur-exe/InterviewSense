import React from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { Mic, Activity, ArrowDownRight, TrendingDown } from 'lucide-react';

const FILLER_HISTORY = [
  { session: 'S1', count: 9, label: 'Early' },
  { session: 'S2', count: 8, label: '' },
  { session: 'S3', count: 6, label: '' },
  { session: 'S4', count: 7, label: '' },
  { session: 'S5', count: 4, label: '' },
  { session: 'S6', count: 3, label: '' },
  { session: 'S7', count: 3, label: '' },
  { session: 'S8', count: 2, label: 'Latest' },
];

export function FluencyAcousticsCard() {
  return (
    <Card className="border border-[#ede3f0] space-y-5">
      <CardHeader className="mb-1">
        <div>
          <CardTitle>Speech & Acoustic Fluency Trends</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Whisper NLP filler word reduction and cadence consistency over time.
          </p>
        </div>
      </CardHeader>

      {/* Speaking Cadence Range Indicator */}
      <div className="p-4 rounded-2xl bg-[#faf8fb] border border-[#ede3f0] space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#2b1d30]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#8c60a2]" />
            <span>Speaking Pace Stability</span>
          </div>
          <span className="text-[#6e4876] font-mono">142 WPM (Optimal)</span>
        </div>

        {/* WPM Scale Graphic */}
        <div className="relative pt-3 pb-1">
          <div className="w-full bg-[#ede3f0] h-2 rounded-full relative overflow-hidden">
            {/* Optimal Zone Highlight */}
            <div className="absolute left-[35%] right-[25%] top-0 bottom-0 bg-emerald-300/80 rounded-full" />
            {/* Current Candidate Pointer */}
            <div className="absolute left-[55%] -top-1 w-4 h-4 rounded-full bg-gradient-to-tr from-[#8c60a2] to-[#fa846e] border-2 border-white shadow-xs" />
          </div>

          <div className="flex justify-between text-[10px] text-[#a08ba7] font-semibold pt-2">
            <span>Slow (&lt;120)</span>
            <span className="text-emerald-700 font-bold">Ideal (130 - 160 WPM)</span>
            <span>Fast (&gt;170)</span>
          </div>
        </div>
      </div>

      {/* Filler Words Reduction Bar Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-[#fa846e]" />
            <span className="font-bold text-[#2b1d30]">Filler Words Elimination Trend</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-0.5">
            <TrendingDown className="w-3.5 h-3.5" /> -77% Reduction
          </span>
        </div>

        <div className="grid grid-cols-8 gap-2 items-end pt-2 pb-1">
          {FILLER_HISTORY.map((item, i) => {
            const heightPct = (item.count / 10) * 100;
            const isLatest = i === FILLER_HISTORY.length - 1;

            return (
              <div key={i} className="flex flex-col items-center gap-1.5 group">
                <span className="text-[10px] font-bold text-[#6e4876] group-hover:scale-110 transition">
                  {item.count}
                </span>

                <div className="w-full bg-[#faf8fb] h-20 rounded-xl overflow-hidden flex items-end p-1 border border-[#ede3f0]">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-lg transition-all duration-300 ${isLatest
                        ? 'bg-gradient-to-t from-[#8c60a2] to-[#fa846e]'
                        : 'bg-[#ce93cb]/50 hover:bg-[#8c60a2]/70'
                      }`}
                  />
                </div>

                <span className="text-[10px] font-bold text-[#a08ba7]">{item.session}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-[#6e5975] text-center font-medium">
          Decreased from 9 fillers (Session 1) to only 2 fillers (Session 8).
        </p>
      </div>
    </Card>
  );
}

export default FluencyAcousticsCard;
