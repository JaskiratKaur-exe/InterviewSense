import React from 'react';
import { Eye, Mic, Brain, BarChart3, Clock, Award } from 'lucide-react';
import Card from '../../../components/ui/Card';

const features = [
  {
    icon: Eye,
    color: 'text-[#8c60a2] bg-[#8c60a2]/10 border-[#8c60a2]/20',
    title: 'Computer Vision Analysis',
    model: 'MediaPipe & OpenCV',
    description:
      'Tracks eye-contact ratio, facial landmark symmetry, head posture, and nervous micro-expressions in real time.',
  },
  {
    icon: Mic,
    color: 'text-[#fa846e] bg-[#fa846e]/10 border-[#fa846e]/20',
    title: 'Speech & Acoustic Intelligence',
    model: 'OpenAI Whisper & NLP',
    description:
      'Transcribes your spoken answers live, calculates Words-Per-Minute (WPM), and flags filler words like "um", "uh", and "like".',
  },
  {
    icon: Brain,
    color: 'text-[#6e4876] bg-[#6e4876]/10 border-[#6e4876]/20',
    title: 'Contextual AI Evaluation',
    model: 'Google Gemini LLM',
    description:
      'Evaluates technical accuracy, logical structure, and provides ideal model answers tailored to senior engineering standards.',
  },
  {
    icon: BarChart3,
    color: 'text-[#cd6775] bg-[#cd6775]/10 border-[#cd6775]/20',
    title: 'Comprehensive Viva Reports',
    model: 'Multi-Modal Scorecard',
    description:
      'Generates instant downloadable PDF scorecards comparing verbal vs non-verbal performance with radar skill breakdowns.',
  },
  {
    icon: Clock,
    color: 'text-[#8c60a2] bg-[#ce93cb]/20 border-[#ce93cb]/40',
    title: 'Simulated Timed Interviews',
    model: 'Real-World Exam Conditions',
    description:
      'Practice with authentic countdowns and progressive question difficulty ranging from junior to staff engineer levels.',
  },
  {
    icon: Award,
    color: 'text-[#fa846e] bg-[#fa846e]/10 border-[#fa846e]/20',
    title: 'Historical Progress Tracking',
    model: 'Analytics & Skill Growth',
    description:
      'Watch your communication effectiveness and confidence scores increase session over session with visual trend lines.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white border-y border-[#ede3f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8c60a2]">
            Multi-Modal AI Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2b1d30] tracking-tight font-['Plus_Jakarta_Sans']">
            Engineered for Total Interview Readiness
          </h2>
          <p className="text-sm sm:text-base text-[#6e5975]">
            Every layer of your communication is analyzed by specialized AI models to provide instant, constructive guidance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} hover className="border border-[#ede3f0]">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-semibold text-[#8c60a2] block mb-1">
                  {item.model}
                </span>
                <h3 className="text-lg font-bold text-[#2b1d30] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6e5975] leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;
