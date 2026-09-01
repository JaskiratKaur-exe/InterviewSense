import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#ede3f0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ede3f0]/80">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6e4876] to-[#8c60a2] flex items-center justify-center text-white shadow-md shadow-[#6e4876]/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#2b1d30] block leading-tight font-['Plus_Jakarta_Sans']">
                Interview<span className="text-[#8c60a2]">Sense</span>
              </span>
              <span className="text-xs text-[#6e5975]">Behavioral & Technical AI Analysis</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#6e5975]">
            <Link to={ROUTES.LOGIN} className="hover:text-[#8c60a2] transition">Candidate Login</Link>
            <Link to={ROUTES.REGISTER} className="hover:text-[#8c60a2] transition">Register</Link>
            <a href="#features" className="hover:text-[#8c60a2] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#8c60a2] transition">How It Works</a>
          </div>
        </div>

        {/* Bottom copyright and AI stack info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a08ba7]">
          <p>© {new Date().getFullYear()} InterviewSense. All rights reserved. Final Year Project.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#faf8fb] text-[#6e5975] border border-[#ede3f0]">React + Vite</span>
            <span className="px-2 py-0.5 rounded bg-[#faf8fb] text-[#6e5975] border border-[#ede3f0]">Flask API</span>
            <span className="px-2 py-0.5 rounded bg-[#faf8fb] text-[#6e5975] border border-[#ede3f0]">MediaPipe</span>
            <span className="px-2 py-0.5 rounded bg-[#faf8fb] text-[#6e5975] border border-[#ede3f0]">Whisper</span>
            <span className="px-2 py-0.5 rounded bg-gradient-to-r from-[#8c60a2]/15 to-[#fa846e]/15 text-[#6e4876] border border-[#ce93cb]/40 font-semibold">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
