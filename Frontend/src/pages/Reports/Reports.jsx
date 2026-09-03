import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Sparkles } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ReportsFilterBar from './components/ReportsFilterBar';
import ReportsTable from './components/ReportsTable';
import Button from '../../components/ui/Button';

const INITIAL_REPORTS = [
  {
    id: 'mock_report_01',
    title: 'Software Engineer - Technical & System Design',
    category: 'Core Engineering',
    categoryKey: 'software-engineer',
    date: '12 May 2025 • 10:30 AM',
    duration: '15 mins',
    questions: '5 Questions',
    score: 85,
    badgeVariant: 'excellent',
    badgeText: 'Excellent Performance',
  },
  {
    id: 'mock_report_02',
    title: 'Frontend Developer - React & Web Vitals',
    category: 'Web Architecture',
    categoryKey: 'frontend',
    date: '08 May 2025 • 03:15 PM',
    duration: '20 mins',
    questions: '6 Questions',
    score: 78,
    badgeVariant: 'good',
    badgeText: 'Good Performance',
  },
  {
    id: 'mock_report_03',
    title: 'Backend Engineer - APIs & Concurrency',
    category: 'Server Architecture',
    categoryKey: 'backend',
    date: '02 May 2025 • 11:00 AM',
    duration: '18 mins',
    questions: '5 Questions',
    score: 72,
    badgeVariant: 'good',
    badgeText: 'Good Performance',
  },
  {
    id: 'mock_report_04',
    title: 'HR & Behavioral Leadership (STAR)',
    category: 'Soft Skills & Fit',
    categoryKey: 'behavioral',
    date: '28 Apr 2025 • 04:45 PM',
    duration: '14 mins',
    questions: '4 Questions',
    score: 64,
    badgeVariant: 'needsImprovement',
    badgeText: 'Needs Improvement',
  },
];

export function Reports() {
  const [reports] = useState(INITIAL_REPORTS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredReports = reports.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.categoryKey === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.date.toLowerCase().includes(search.toLowerCase()) ||
      item.score.toString().includes(search);
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout
      title="My Reports"
      subtitle="View, analyze, and compare all your historical AI interview performance reports."
    >
      <div className="space-y-6 max-w-[1550px] w-full mx-auto">
        
        {/* Header CTA Banner */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#8c60a2]/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2b1d30]">
                Historical Performance Scorecards
              </h3>
              <p className="text-xs text-[#6e5975]">
                Downloadable PDF summaries with MediaPipe vision, Whisper acoustics, and Gemini metrics.
              </p>
            </div>
          </div>

          <Link to={ROUTES.INTERVIEW_SETUP}>
            <Button size="sm" leftIcon={Video} className="shadow-md">
              Start New Interview
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <ReportsFilterBar
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Reports Data Table */}
        <ReportsTable reports={filteredReports} />

      </div>
    </DashboardLayout>
  );
}

export default Reports;