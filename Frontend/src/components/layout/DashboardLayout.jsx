import React, { useState } from 'react';
import { Menu, Bell, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';

export function DashboardLayout({ children, title, subtitle }) {
  const { user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8fb] flex text-[#2b1d30]">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#2b1d30]/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Slide-in Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 transform transition-transform duration-300 lg:hidden ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <Sidebar onClose={() => setMobileSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#ede3f0] px-6 py-4 flex items-center justify-between">
          {/* Left Title / Greeting or Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-xl text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#faf8fb] transition"
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              {title && <h1 className="text-xl font-bold text-[#2b1d30] font-['Plus_Jakarta_Sans']">{title}</h1>}
              {subtitle && <p className="text-xs text-[#6e5975]">{subtitle}</p>}
            </div>
          </div>

          {/* Right User & Notification Controls */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#faf8fb] transition cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#fa846e] ring-2 ring-white" />
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-3 pl-2 border-l border-[#ede3f0]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-[#ce93cb]/40">
                {user?.initials || 'JD'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#2b1d30] leading-none">{user?.name || 'John Doe'}</p>
                <p className="text-[11px] text-[#6e5975] font-medium mt-0.5">{user?.role || 'Candidate'}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
