import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { ROUTES } from '../../../constants/routes';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight font-['Plus_Jakarta_Sans']">
                Interview<span className="text-purple-600">Sense</span>
              </span>
              <span className="text-xs text-slate-400">Behavioral & Technical AI Analysis</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <Link to={ROUTES.LOGIN} className="hover:text-purple-600 transition">Candidate Login</Link>
            <Link to={ROUTES.REGISTER} className="hover:text-purple-600 transition">Register</Link>
            <a href="#features" className="hover:text-purple-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-purple-600 transition">How It Works</a>
          </div>
        </div>

        {/* Bottom copyright and AI stack info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InterviewSense. All rights reserved. Final Year Project.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">React + Vite</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Flask API</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">MediaPipe</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Whisper</span>
            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
