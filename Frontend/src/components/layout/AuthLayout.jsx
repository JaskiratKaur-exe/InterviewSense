import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Video, BarChart2 } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[#faf8fb] text-[#2b1d30] flex">
      {/* Left Marketing / AI Showcase Column (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-[#ede3f0] overflow-hidden bg-gradient-to-b from-[#2b1d30] via-[#3d2746] to-[#2b1d30] text-white">

        {/* Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#8c60a2]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#fa846e]/20 blur-[130px] rounded-full pointer-events-none" />

        {/* Top Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shadow-lg shadow-[#8c60a2]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
            Interview<span className="text-[#ce93cb]">Sense</span>
          </span>
        </Link>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 space-y-8 my-auto max-w-lg">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ce93cb]/20 border border-[#ce93cb]/40 text-[#ce93cb] inline-block">
              Multi-Modal AI Analysis
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
              Master your technical and behavioral interviews with real-time feedback.
            </h2>
            <p className="text-purple-100/70 text-sm leading-relaxed">
              Combining MediaPipe facial landmark tracking, Whisper speech analysis, and Google Gemini AI evaluation for instant actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2 rounded-lg bg-[#ce93cb]/20 text-[#ce93cb] shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Vision Analysis</h4>
                <p className="text-[11px] text-purple-200/70">Eye-contact ratio, posture stability & head pose metrics</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2 rounded-lg bg-[#fa846e]/20 text-[#fa846e] shrink-0">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Speech & Voice Metrics</h4>
                <p className="text-[11px] text-purple-200/70">Pace (WPM), filler words count & tone clarity score</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="p-2 rounded-lg bg-[#cd6775]/20 text-[#cd6775] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Gemini LLM Scoring</h4>
                <p className="text-[11px] text-purple-200/70">Contextual answers evaluation & model answer recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-xs text-purple-200/50 relative z-10">
          © {new Date().getFullYear()} InterviewSense. Designed for high-performance software engineering preparation.
        </p>
      </div>

      {/* Right Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#2b1d30] font-['Plus_Jakarta_Sans']">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-[#6e5975]">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
