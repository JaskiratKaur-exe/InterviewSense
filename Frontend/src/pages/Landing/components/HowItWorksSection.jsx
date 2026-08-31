import React from 'react';
import { UserCheck, Video, FileBarChart2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Configure Your Role',
    description: 'Select your target engineering job role (Frontend, Backend, Full Stack) and choose interview difficulty.',
  },
  {
    step: '02',
    icon: Video,
    title: 'Take the AI Interview',
    description: 'Answer questions while our multi-modal AI engine analyzes your webcam video feed and spoken responses live.',
  },
  {
    step: '03',
    icon: FileBarChart2,
    title: 'Review In-Depth Reports',
    description: 'Receive an instant multi-modal scorecard with radar charts, pacing graphs, and Gemini model answers.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
            How InterviewSense Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From setup to comprehensive performance breakdown in under 15 minutes.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-100 card-shadow card-shadow-hover relative flex flex-col items-start"
              >
                <span className="text-4xl font-black text-purple-100 font-mono absolute top-6 right-6">
                  {item.step}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;
