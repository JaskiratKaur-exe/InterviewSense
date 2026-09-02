import React, { useState, useEffect } from 'react';
import { Camera, Mic, CheckCircle2 } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';

export function HardwareCheckCard() {
  const [audioLevel, setAudioLevel] = useState(65);

  // Simulate audio visualizer pulsing
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioLevel(Math.floor(Math.random() * 40) + 45);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle>Hardware Diagnostics</CardTitle>
            <p className="text-xs text-[#6e5975] mt-0.5">Pre-flight sensor verification</p>
          </div>
          <Badge variant="excellent" withDot>Sensors Active</Badge>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {/* Simulated Camera Window */}
        <div className="aspect-video w-full rounded-2xl bg-[#1e1322] border border-[#6e4876]/30 relative overflow-hidden flex flex-col items-center justify-center text-center p-4 shadow-inner">
          <div className="w-14 h-14 rounded-full bg-[#8c60a2]/20 border border-[#ce93cb]/40 flex items-center justify-center text-[#ce93cb] mb-2 shadow-inner">
            <Camera className="w-7 h-7" />
          </div>
          <p className="text-xs font-bold text-white">Webcam Stream Online</p>
          <p className="text-[10px] text-purple-200/60 mt-0.5">MediaPipe Face Mesh Ready (468 Landmarks)</p>

          <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            720p HD @ 30 FPS
          </span>
        </div>

        {/* Audio Visualizer & Level Meter */}
        <div className="p-3.5 rounded-xl bg-[#faf8fb] border border-[#ede3f0] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#2b1d30]">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#fa846e]" />
              <span>Microphone Sensitivity</span>
            </div>
            <span className="text-[11px] font-mono text-[#6e4876]">{audioLevel}% dB</span>
          </div>

          {/* Equalizer Bar */}
          <div className="flex items-center gap-1 h-3 w-full bg-white p-1 rounded-full border border-[#ede3f0]">
            {Array.from({ length: 24 }).map((_, i) => {
              const active = i < (audioLevel / 100) * 24;
              return (
                <div
                  key={i}
                  className={`flex-1 h-full rounded-full transition-all duration-150 ${active
                      ? i > 18
                        ? 'bg-[#fa846e]'
                        : 'bg-gradient-to-r from-[#8c60a2] to-[#cd6775]'
                      : 'bg-slate-200/50'
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* Diagnostic Checklist */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-medium text-[#6e5975]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Camera Permissions Granted</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Pass</span>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-[#6e5975]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Microphone Feed Operational</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Pass</span>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-[#6e5975]">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Room Lighting Adequate</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Pass</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default HardwareCheckCard;
