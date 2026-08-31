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
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { name: 'Mock Interview', path: ROUTES.MOCK_INTERVIEW, icon: Video },
  { name: 'My Reports', path: ROUTES.REPORTS, icon: FileText },
  { name: 'Progress', path: ROUTES.PROGRESS, icon: TrendingUp },
  { name: 'Profile', path: ROUTES.PROFILE, icon: User },
  { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
];

export function Sidebar({ className, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <aside
      className={cn(
        'w-64 h-screen bg-white border-r border-slate-100 flex flex-col justify-between p-5 select-none shrink-0 shadow-sm',
        className
      )}
    >
      {/* Top Brand & Navigation */}
      <div className="space-y-7">
        {/* Brand Logo Header */}
        <NavLink to={ROUTES.HOME} className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight font-['Plus_Jakarta_Sans']">
              Interview<span className="text-purple-600">Sense</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium block">
              Behavioral Interview Analysis
            </span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-semibold shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  )
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 transition-all duration-150 cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Bottom Motivation Card */}
      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100/80 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white mb-2 shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-bold text-slate-800 mb-1">Keep Practicing!</h4>
        <p className="text-[11px] text-slate-500 leading-tight">
          Consistency is the key to success.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
