import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DeviceSettingsCard from './components/DeviceSettingsCard';
import AIAnalysisPreferences from './components/AIAnalysisPreferences';
import AccountSecurityCard from './components/AccountSecurityCard';

export function Settings() {
  return (
    <DashboardLayout
      title="Settings & Hardware Preferences"
      subtitle="Calibrate audio/video devices, AI sensitivity thresholds, and manage account security."
    >
      <div className="space-y-6 max-w-[1550px] w-full mx-auto">
        
        {/* Main 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (6-7 cols): Hardware Device Settings + AI Sensitivity Preferences */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <DeviceSettingsCard />
            <AIAnalysisPreferences />
          </div>

          {/* Right Column (6-7 cols): Account Security & Notification Settings */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <AccountSecurityCard />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;