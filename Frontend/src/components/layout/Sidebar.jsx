import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Video,
  FileText,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Bot,
  Sparkles,
  Flame,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Mock Interview', path: ROUTES.MOCK_INTERVIEW, icon: Video, badge: 'Live', badgeColor: 'bg-[#fa846e]/15 text-[#fa846e] border-[#fa846e]/30' },
  { name: 'My Reports', path: ROUTES.REPORTS, icon: FileText, badge: '8', badgeColor: 'bg-[#8c60a2]/15 text-[#6e4876] border-[#8c60a2]/30' },
  { name: 'Progress', path: ROUTES.PROGRESS, icon: TrendingUp, badge: '+14%', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Profile', path: ROUTES.PROFILE, icon: User },
  { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
];

export function Sidebar({ className, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside
      className={cn(
        'w-68 h-screen bg-white border-r border-[#ede3f0] flex flex-col justify-between p-5 select-none shrink-0 shadow-xs overflow-y-auto',
        className
      )}
    >
      {/* Top Brand & Navigation */}
      <div className="space-y-5">
        {/* Brand Logo Header */}
        <NavLink to={ROUTES.HOME} className="flex items-center gap-3 px-1 py-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#fa846e] flex items-center justify-center text-white shadow-md shadow-[#8c60a2]/25 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#2b1d30] block leading-tight font-['Plus_Jakarta_Sans']">
              Interview<span className="text-[#8c60a2]">Sense</span>
            </span>
            <span className="text-[11px] text-[#6e5975] font-medium block">
              Behavioral & Tech Analysis
            </span>
          </div>
        </NavLink>

        {/* Candidate Target Track Chip */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/30 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-white text-[#6e4876] flex items-center justify-center shadow-xs shrink-0">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#a08ba7] uppercase tracking-wider">Active Track</p>
              <p className="text-xs font-bold text-[#2b1d30] truncate">{user?.targetRole || 'Software Engineer'}</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                    isActive
                      ? 'bg-[#8c60a2]/12 text-[#6e4876] font-bold shadow-xs'
                      : 'text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#faf8fb]'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', item.badgeColor)}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Middle/Bottom Rich Widgets (Eliminates empty whitespace) */}
      <div className="space-y-4 pt-4 border-t border-[#ede3f0]/80">
        
        {/* Practice Streak Card */}
        <div className="p-3.5 rounded-2xl bg-[#faf8fb] border border-[#ede3f0]">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#fa846e] fill-[#fa846e]" />
              <span className="text-xs font-bold text-[#2b1d30]">3-Day Streak</span>
            </div>
            <span className="text-[10px] font-bold text-[#8c60a2]">8 / 10 Goals</span>
          </div>
          <div className="w-full bg-[#ede3f0] h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#8c60a2] to-[#fa846e] h-full rounded-full w-[80%]" />
          </div>
          <p className="text-[10px] text-[#a08ba7] mt-1.5 font-medium">2 more interviews to hit weekly target!</p>
        </div>

        {/* Motivational Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#8c60a2]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 text-center relative overflow-hidden">
          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-[#8c60a2] to-[#fa846e] text-white mb-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-xs font-bold text-[#2b1d30]">Keep Practicing!</h4>
          <p className="text-[10px] text-[#6e5975] leading-tight mt-0.5">
            Consistency is the key to viva & interview success.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#6e5975] hover:text-[#cd6775] hover:bg-rose-50/70 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
