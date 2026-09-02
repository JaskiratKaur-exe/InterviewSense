import React from 'react';
import { Sparkles, Sliders, Clock, HelpCircle, Check } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

const LEVELS = [
  {
    id: 'junior',
    name: 'Junior / Entry Level',
    sub: '0 - 2 Years Experience',
    desc: 'Foundational concepts, problem solving syntax, and basic behavioral questions.',
    questions: '5 Questions',
    time: '15 Mins',
  },
  {
    id: 'mid',
    name: 'Mid-Level Engineer',
    sub: '2 - 5 Years Experience',
    desc: 'Practical system implementation, architecture trade-offs, and STAR leadership.',
    questions: '6 Questions',
    time: '20 Mins',
  },
  {
    id: 'senior',
    name: 'Senior / Staff Lead',
    sub: '5+ Years Experience',
    desc: 'Complex system design, high-concurrency scaling, and organizational impact.',
    questions: '8 Questions',
    time: '25 Mins',
  },
];

const MODES = [
  { id: 'mixed', label: 'Technical + Behavioral (Recommended)', desc: 'Balanced assessment of code logic and STAR communication.' },
  { id: 'technical', label: 'Pure Technical Deep-Dive', desc: 'Focus strictly on algorithms, code architecture, and syntax.' },
  { id: 'behavioral', label: 'Pure Behavioral (STAR Method)', desc: 'Focus strictly on leadership, teamwork, and past project impact.' },
];

export function DifficultyConfig({ level, setLevel, mode, setMode }) {
  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div>
          <CardTitle>2. Experience Level & Interview Format</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Tailor the AI question difficulty and pacing to your target career milestone.
          </p>
        </div>
      </CardHeader>

      <div className="space-y-6">
        {/* Experience Tier Selector */}
        <div>
          <label className="block text-xs font-bold text-[#2b1d30] mb-2.5">
            Candidate Experience Level:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {LEVELS.map((lvl) => {
              const isSelected = level === lvl.id;
              return (
                <div
                  key={lvl.id}
                  onClick={() => setLevel(lvl.id)}
                  className={cn(
                    'p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative',
                    isSelected
                      ? 'border-[#8c60a2] bg-[#8c60a2]/10 ring-2 ring-[#8c60a2]/20 shadow-xs'
                      : 'border-[#ede3f0] bg-[#faf8fb]/60 hover:bg-white hover:border-[#ce93cb]'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-[#2b1d30]">{lvl.name}</h4>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#8c60a2]" />}
                    </div>
                    <span className="text-[10px] font-bold text-[#a08ba7] block mb-2">{lvl.sub}</span>
                    <p className="text-[11px] text-[#6e5975] leading-relaxed mb-3">{lvl.desc}</p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold text-[#6e4876] pt-2 border-t border-[#ede3f0]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lvl.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      {lvl.questions}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interview Mode Selector */}
        <div>
          <label className="block text-xs font-bold text-[#2b1d30] mb-2.5">
            Interview Question Mode:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MODES.map((m) => {
              const isSelected = mode === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer',
                    isSelected
                      ? 'border-[#8c60a2] bg-[#8c60a2]/10 text-[#2b1d30] font-semibold ring-1 ring-[#8c60a2]/30'
                      : 'border-[#ede3f0] bg-white text-[#6e5975] hover:border-[#ce93cb]'
                  )}
                >
                  <p className="text-xs font-bold text-[#2b1d30] mb-1">{m.label}</p>
                  <p className="text-[10px] text-[#6e5975] leading-tight">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default DifficultyConfig;
