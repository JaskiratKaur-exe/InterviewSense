import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Video, Eye, Mic, ShieldCheck, Play } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#8c60a2]/5 via-white to-[#faf8fb]">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#8c60a2]/20 via-[#fa846e]/15 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8c60a2]/10 border border-[#ce93cb]/50 text-[#6e4876] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8c60a2]" />
            <span>Next-Gen Multi-Modal AI Interview Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2b1d30] leading-[1.15] font-['Plus_Jakarta_Sans']">
            Master Your Interviews with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c60a2] via-[#cd6775] to-[#fa846e]">AI Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#6e5975] max-w-2xl mx-auto leading-relaxed">
            Real-time behavioral, voice, and technical analysis. Train with MediaPipe eye-tracking, Whisper speech metrics, and Google Gemini AI feedback.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" rightIcon={ArrowRight} className="w-full sm:w-auto shadow-md">
                Start Free Mock Interview
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="secondary" size="lg" leftIcon={Play} className="w-full sm:w-auto">
                Explore Demo Mode
              </Button>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 flex items-center justify-center gap-8 text-xs font-medium text-[#6e5975] border-t border-[#ede3f0] max-w-md mx-auto">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Feedback</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Video className="w-4 h-4 text-[#8c60a2]" />
              <span>Vision AI HUD</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-[#fa846e]" />
              <span>Whisper Pacing</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto p-3 sm:p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-[#ede3f0] shadow-xl relative">
          <div className="rounded-2xl overflow-hidden bg-[#2b1d30] border border-[#6e4876]/40 p-6 text-white relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#6e4876]/40 gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-purple-100">Live AI Session Preview: Software Engineer</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="lilac" withDot>MediaPipe Active</Badge>
                <Badge variant="coral">Whisper AI Pacing: 142 WPM</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              {/* Simulated Camera Window */}
              <div className="aspect-video rounded-xl bg-[#1e1322] border border-[#6e4876]/40 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-[#8c60a2]/20 border border-[#ce93cb]/40 flex items-center justify-center text-[#ce93cb] mb-3">
                  <Video className="w-8 h-8" />
                </div>
                <p className="text-xs font-semibold text-white">Face Mesh & Eye-Contact HUD</p>
                <p className="text-[11px] text-purple-200/60 mt-1">Gaze Consistency: 94% (Optimal Focus)</p>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                  Confidence: 88%
                </span>
              </div>

              {/* Simulated AI Question & Feedback */}
              <div className="flex flex-col justify-between space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] font-bold text-[#ce93cb] uppercase tracking-wider block mb-1">
                    AI Question Prompter
                  </span>
                  <p className="text-xs sm:text-sm text-purple-100 font-medium">
                    "Explain the difference between SQL and NoSQL databases. In what scenarios would you choose MongoDB over PostgreSQL?"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-[#8c60a2]/20 to-[#fa846e]/20 border border-[#ce93cb]/30">
                  <span className="text-[11px] font-bold text-[#fa846e] uppercase tracking-wider block mb-1">
                    Gemini AI Instant Feedback
                  </span>
                  <p className="text-xs text-purple-100/90">
                    Strong structured response using the STAR technique. Speaking pace was optimal with zero filler words.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
