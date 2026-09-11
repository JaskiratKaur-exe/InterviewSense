import React, { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Camera, Mic, Play } from 'lucide-react';

export function DeviceSettingsCard() {
  const [selectedCamera, setSelectedCamera] = useState('Integrated Webcam (720p HD)');
  const [selectedMic, setSelectedMic] = useState('Default Internal Microphone Array');
  const [resolution, setResolution] = useState('720p');
  const [isTesting, setIsTesting] = useState(false);

  const handleTestHardware = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 2000);
  };

  return (
    <Card className="border border-[#ede3f0] space-y-5">
      <CardHeader className="mb-1">
        <div>
          <CardTitle>Hardware Devices & Stream Quality</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Configure default camera, microphone sources, and video capture frame rate.
          </p>
        </div>
      </CardHeader>

      <div className="space-y-4">
        {/* Camera Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#2b1d30]">
            Primary Camera Source
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08ba7] pointer-events-none">
              <Camera className="w-4 h-4" />
            </div>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full bg-white border border-[#ede3f0] text-[#2b1d30] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] transition font-medium"
            >
              <option value="Integrated Webcam (720p HD)">Integrated Webcam (720p HD)</option>
              <option value="External USB Camera (1080p FHD)">External USB Camera (1080p FHD)</option>
              <option value="OBS Virtual Camera">OBS Virtual Camera</option>
            </select>
          </div>
        </div>

        {/* Microphone Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#2b1d30]">
            Primary Microphone Input
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08ba7] pointer-events-none">
              <Mic className="w-4 h-4" />
            </div>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-full bg-white border border-[#ede3f0] text-[#2b1d30] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] transition font-medium"
            >
              <option value="Default Internal Microphone Array">Default Internal Microphone Array</option>
              <option value="Headset Microphone (Realtek Audio)">Headset Microphone (Realtek Audio)</option>
              <option value="USB Podcast Condenser Mic">USB Podcast Condenser Mic</option>
            </select>
          </div>
        </div>

        {/* Video Quality Resolution */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#2b1d30]">
            Recording Resolution & Frame Rate
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setResolution('720p')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                resolution === '720p'
                  ? 'border-[#8c60a2] bg-[#8c60a2]/10 ring-1 ring-[#8c60a2]/30'
                  : 'border-[#ede3f0] bg-[#faf8fb]'
              }`}
            >
              <p className="text-xs font-bold text-[#2b1d30]">720p HD @ 30 FPS</p>
              <p className="text-[10px] text-[#6e5975] mt-0.5">Optimal for all bandwidths (Recommended)</p>
            </button>

            <button
              type="button"
              onClick={() => setResolution('1080p')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                resolution === '1080p'
                  ? 'border-[#8c60a2] bg-[#8c60a2]/10 ring-1 ring-[#8c60a2]/30'
                  : 'border-[#ede3f0] bg-[#faf8fb]'
              }`}
            >
              <p className="text-xs font-bold text-[#2b1d30]">1080p FHD @ 30 FPS</p>
              <p className="text-[10px] text-[#6e5975] mt-0.5">High clarity for landmark tracking</p>
            </button>
          </div>
        </div>

        {/* Hardware Test Action */}
        <div className="pt-2 border-t border-[#ede3f0]/80 flex items-center justify-between">
          <span className="text-xs text-[#a08ba7] font-medium">
            Status: <strong className="text-emerald-600">Devices Connected</strong>
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTestHardware}
            isLoading={isTesting}
            leftIcon={Play}
          >
            Test Hardware Stream
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DeviceSettingsCard;
