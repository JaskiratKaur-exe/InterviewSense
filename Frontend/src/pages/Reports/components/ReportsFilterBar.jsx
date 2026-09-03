import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../../utils/cn';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Interviews' },
  { id: 'software-engineer', label: 'Software Engineer' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'behavioral', label: 'Behavioral' },
];

export function ReportsFilterBar({ search, setSearch, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#ede3f0] shadow-2xs">
      
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap',
                isActive
                  ? 'bg-gradient-to-r from-[#8c60a2] via-[#cd6775] to-[#fa846e] text-white shadow-xs'
                  : 'bg-[#faf8fb] text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#ede3f0]/60'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative min-w-[240px] sm:min-w-[280px]">
        <Search className="w-4 h-4 text-[#a08ba7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by role, date, or score..."
          className="w-full bg-[#faf8fb] border border-[#ede3f0] text-[#2b1d30] text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] transition"
        />
      </div>

    </div>
  );
}

export default ReportsFilterBar;
