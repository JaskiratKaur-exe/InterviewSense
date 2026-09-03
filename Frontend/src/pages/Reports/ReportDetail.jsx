import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Calendar, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ScoreDonutCard from './components/ScoreDonutCard';
import MetricBreakdownBars from './components/MetricBreakdownBars';
import AIAnalysisSummary from './components/AIAnalysisSummary';
import Button from '../../components/ui/Button';

export function ReportDetail() {
  const { reportId } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <DashboardLayout
      title="Performance Report"
      subtitle="Comprehensive multi-modal post-interview analysis and behavioral evaluation."
    >
      <div className="space-y-6 max-w-[1550px] w-full mx-auto">
        
        {/* Top Navigation & Action Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#ede3f0] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          
          <div className="flex items-center gap-3.5">
            <Link
              to={ROUTES.REPORTS}
              className="p-2.5 rounded-2xl bg-[#faf8fb] border border-[#ede3f0] text-[#6e5975] hover:text-[#2b1d30] hover:bg-white transition cursor-pointer"
              title="Back to Reports"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                  Software Engineer - Technical & System Design
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#6e5975] mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#a08ba7]" />
                  12 May 2025 • 10:30 AM
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#a08ba7]" />
                  15 mins duration • 5 Questions
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {downloadSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PDF Downloaded!
              </span>
            )}

            <Button
              onClick={handleDownloadPDF}
              isLoading={isDownloading}
              leftIcon={Download}
              size="md"
              className="shadow-md"
            >
              Download PDF Report
            </Button>
          </div>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (5-6 cols): Overall Score Donut + Metric Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <ScoreDonutCard score={85} rating="Excellent Performance" />
            <MetricBreakdownBars />
          </div>

          {/* Right Column (6-7 cols): Post-Interview AI Analysis & Question Breakdowns */}
          <div className="lg:col-span-7 space-y-6">
            <AIAnalysisSummary />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ReportDetail;
