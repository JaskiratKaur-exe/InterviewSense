import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfileHeroCard from './components/ProfileHeroCard';
import ResumeUploader from './components/ResumeUploader';
import SkillAlignmentCard from './components/SkillAlignmentCard';
import ProfileSettingsForm from './components/ProfileSettingsForm';

export function Profile() {
  return (
    <DashboardLayout
      title="Candidate Profile & Resume Analyzer"
      subtitle="Manage your candidate identity, technical resume, and AI skill extraction mapping."
    >
      <div className="space-y-6 max-w-[1550px] w-full mx-auto">

        {/* 1. Profile Identity Hero Card */}
        <ProfileHeroCard />

        {/* 2. Main 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column (6-7 cols): Resume Uploader + Skill Alignment */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <ResumeUploader />
            <SkillAlignmentCard />
          </div>

          {/* Right Column (6-7 cols): Profile Settings Form */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            <ProfileSettingsForm />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;