import React from 'react';
import { Sparkles } from 'lucide-react';

export function PageLoader({ message = 'Loading InterviewSense...' }) {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute w-20 h-20 rounded-full bg-cyan-500/20 animate-ping" />

        {/* Spinning Ring */}
        <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />

        {/* Center AI Icon */}
        <div className="absolute w-8 h-8 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-slate-400 tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}

export default PageLoader;
