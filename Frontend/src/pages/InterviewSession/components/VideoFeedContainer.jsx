import React, { useRef, useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function VideoFeedContainer({ onToggleCaptions, isCaptionsOpen }) {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isMicActive, setIsMicActive] = useState(true);
  const [audioMeter, setAudioMeter] = useState([4, 8, 12, 16, 12, 8, 4]);

  // Request actual user webcam stream
  useEffect(() => {
    let stream = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn('Camera access unavailable or denied, falling back to simulated HUD preview:', err);
        setIsCameraActive(false);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulate audio equalizer fluctuation
  useEffect(() => {
    if (!isMicActive) {
      setAudioMeter([2, 2, 2, 2, 2, 2, 2]);
      return;
    }

    const interval = setInterval(() => {
      setAudioMeter([
        Math.floor(Math.random() * 8) + 3,
        Math.floor(Math.random() * 14) + 4,
        Math.floor(Math.random() * 18) + 6,
        Math.floor(Math.random() * 14) + 4,
        Math.floor(Math.random() * 10) + 4,
        Math.floor(Math.random() * 6) + 3,
      ]);
    }, 150);

    return () => clearInterval(interval);
  }, [isMicActive]);

  const toggleCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getVideoTracks();
      tracks.forEach((t) => (t.enabled = !isCameraActive));
    }
    setIsCameraActive(!isCameraActive);
  };

  const toggleMic = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getAudioTracks();
      tracks.forEach((t) => (t.enabled = !isMicActive));
    }
    setIsMicActive(!isMicActive);
  };

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] rounded-3xl bg-[#1a121e] border border-[#6e4876]/30 overflow-hidden flex flex-col justify-between p-5 shadow-lg shadow-[#6e4876]/10">

      {/* Background Video Stream or Simulated Candidate Avatar */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-b from-[#2b1d30] via-[#1a121e] to-[#2b1d30]">
        {isCameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover mirror scale-x-[-1]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shadow-xl shadow-[#8c60a2]/30">
              <User className="w-12 h-12" />
            </div>
            <p className="text-sm font-bold text-white">Camera is turned off</p>
            <p className="text-xs text-purple-200/60 max-w-xs">
              Toggle the camera button below or grant browser permissions to enable real-time MediaPipe facial analysis.
            </p>
          </div>
        )}

        {/* MediaPipe Vision HUD Landmark Wireframe (Subtle simulated overlay) */}
        {isCameraActive && (
          <div className="absolute inset-0 pointer-events-none border-2 border-[#ce93cb]/20 m-6 rounded-2xl flex items-center justify-center">
            {/* Center Face Bounding Box */}
            <div className="w-64 h-72 border border-dashed border-[#8c60a2]/50 rounded-3xl relative flex items-center justify-center">
              <span className="absolute top-2 left-2 text-[9px] font-mono font-bold bg-[#8c60a2]/80 text-white px-1.5 py-0.5 rounded">
                MediaPipe: Face Centered
              </span>
              <span className="absolute bottom-2 right-2 text-[9px] font-mono font-bold bg-[#fa846e]/80 text-white px-1.5 py-0.5 rounded">
                Gaze: 94% Focus
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top Left: Recording Live Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fa846e] animate-pulse" />
          <span>Recording</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-emerald-300 text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>AI Vision Active</span>
        </div>
      </div>

      {/* Bottom Floating Bar: Audio Waveform (Left) & Controls (Center) */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Audio Waveform Meter matching user screenshot: "You [||||||]" */}
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-xs">
          <span>You</span>
          <div className="flex items-center gap-1 h-4">
            {audioMeter.map((height, i) => (
              <div
                key={i}
                style={{ height: `${height}px` }}
                className={cn(
                  'w-1 rounded-full transition-all duration-100',
                  isMicActive ? 'bg-emerald-400' : 'bg-slate-500'
                )}
              />
            ))}
          </div>
        </div>

        {/* Center Floating Media Controls */}
        <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-lg">
          {/* Mic Toggle */}
          <button
            onClick={toggleMic}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs',
              isMicActive
                ? 'bg-white/15 text-white hover:bg-white/25'
                : 'bg-rose-500 text-white hover:bg-rose-600'
            )}
            title={isMicActive ? 'Mute Microphone' : 'Unmute Microphone'}
          >
            {isMicActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Camera Toggle */}
          <button
            onClick={toggleCamera}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs',
              isCameraActive
                ? 'bg-white/15 text-white hover:bg-white/25'
                : 'bg-rose-500 text-white hover:bg-rose-600'
            )}
            title={isCameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
          >
            {isCameraActive ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* Chat / Transcript Toggle */}
          <button
            onClick={onToggleCaptions}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs',
              isCaptionsOpen
                ? 'bg-gradient-to-tr from-[#8c60a2] to-[#fa846e] text-white'
                : 'bg-white/15 text-white hover:bg-white/25'
            )}
            title="Toggle Live Chat & Captions"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Empty placeholder for balance */}
        <div className="hidden sm:block w-20" />
      </div>

    </div>
  );
}

export default VideoFeedContainer;
