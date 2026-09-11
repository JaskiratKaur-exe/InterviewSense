import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { User, Mail, Briefcase, Building, Save, CheckCircle2 } from 'lucide-react';

const TARGET_ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Engineer',
  'Data Scientist / AI Engineer',
  'Product Manager',
  'System Design Lead',
];

const EXPERIENCE_TIERS = [
  'Entry / College Graduate (0-2 yrs)',
  'Mid-Level Engineer (2-5 yrs)',
  'Senior Engineer (5+ yrs)',
];

export function ProfileSettingsForm() {
  const { user, updateTargetRole } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@interviewsense.ai',
    targetRole: user?.targetRole || 'Software Engineer',
    experienceTier: 'Entry / College Graduate (0-2 yrs)',
    targetCompany: 'Tier 1 Product Companies & Startups',
    bio: 'Final-year Computer Engineering student passionate about full-stack engineering, scalable APIs, and real-time computer vision systems.',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      if (updateTargetRole) {
        updateTargetRole(formData.targetRole);
      }
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 800);
  };

  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div>
          <CardTitle>Candidate Preferences & Target Focus</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Personalize your target interview domain, difficulty level, and career aspirations.
          </p>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            leftIcon={User}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            leftIcon={Mail}
            disabled
            className="bg-slate-50 cursor-not-allowed opacity-80"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Target Role Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#2b1d30]">
              Target Job Role
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08ba7] pointer-events-none">
                <Briefcase className="w-4 h-4" />
              </div>
              <select
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                className="w-full bg-white border border-[#ede3f0] text-[#2b1d30] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] transition font-medium"
              >
                {TARGET_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Experience Tier Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#2b1d30]">
              Experience Milestone
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a08ba7] pointer-events-none">
                <Building className="w-4 h-4" />
              </div>
              <select
                name="experienceTier"
                value={formData.experienceTier}
                onChange={handleChange}
                className="w-full bg-white border border-[#ede3f0] text-[#2b1d30] text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] transition font-medium"
              >
                {EXPERIENCE_TIERS.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bio / Summary */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#2b1d30]">
            Candidate Summary / Bio
          </label>
          <textarea
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            className="w-full bg-white border border-[#ede3f0] text-[#2b1d30] text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] transition leading-relaxed font-medium"
          />
        </div>

        {/* Action Button & Success Toast */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Profile preferences updated!
              </span>
            )}
          </div>

          <Button
            type="submit"
            isLoading={isSaving}
            leftIcon={Save}
            size="md"
            className="shadow-md"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ProfileSettingsForm;
