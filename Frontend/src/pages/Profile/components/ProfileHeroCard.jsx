import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Mail, Calendar, Briefcase, ShieldCheck } from 'lucide-react';

export function ProfileHeroCard() {
  const { user } = useAuth();
  const name = user?.name || 'John Doe';
  const email = user?.email || 'john.doe@interviewsense.ai';
  const targetRole = user?.targetRole || 'Software Engineer';
  const initials = user?.initials || 'JD';

  return (
    <Card className="border border-[#ede3f0] p-6 bg-white relative overflow-hidden">
      {/* Background Decorative Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6e4876] via-[#8c60a2] to-[#fa846e]" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-1">

        {/* Left: Avatar & Candidate Info */}
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#fa846e] text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-[#8c60a2]/25 ring-4 ring-white shrink-0">
            {initials}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                {name}
              </h2>
              <Badge variant="good" withDot>Active Candidate</Badge>
            </div>

            <p className="text-xs text-[#6e5975] flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-[#a08ba7]" />
              <span>{email}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#a08ba7] pt-1">
              <span className="flex items-center gap-1 text-[#6e4876] font-semibold">
                <Briefcase className="w-3.5 h-3.5" />
                {targetRole}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Member since May 2025
              </span>
            </div>
          </div>
        </div>

        {/* Right: Summary Badges */}
        <div className="flex sm:flex-col items-end gap-2 text-right self-stretch sm:self-auto justify-between sm:justify-center border-t sm:border-t-0 border-[#ede3f0] pt-3 sm:pt-0">
          <div>
            <span className="text-[10px] text-[#a08ba7] font-semibold uppercase tracking-wider block">
              Interviews Completed
            </span>
            <span className="text-2xl font-black text-[#2b1d30] font-['Plus_Jakarta_Sans']">
              8 Sessions
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Verified Profile</span>
          </div>
        </div>

      </div>
    </Card>
  );
}

export default ProfileHeroCard;
