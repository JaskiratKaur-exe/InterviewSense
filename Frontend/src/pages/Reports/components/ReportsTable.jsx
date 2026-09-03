import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { FileText, ArrowRight, Clock, Calendar } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

export function ReportsTable({ reports }) {
  if (reports.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-[#ede3f0] space-y-3">
        <FileText className="w-12 h-12 text-[#a08ba7] mx-auto" />
        <h4 className="text-sm font-bold text-[#2b1d30]">No Interview Reports Found</h4>
        <p className="text-xs text-[#6e5975]">
          Try changing your search keywords or start a new interview session to generate your first AI report.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-[#ede3f0] overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#ede3f0] bg-[#faf8fb]/80 text-[11px] font-bold text-[#6e5975] uppercase tracking-wider">
              <th className="py-4 px-6">Interview Session</th>
              <th className="py-4 px-6">Date & Time</th>
              <th className="py-4 px-6">Duration & Questions</th>
              <th className="py-4 px-6 text-center">Score</th>
              <th className="py-4 px-6">Performance</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ede3f0]/80 text-xs">
            {reports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-[#faf8fb]/60 transition-colors group"
              >
                {/* Role Title */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8c60a2]/15 to-[#fa846e]/15 text-[#6e4876] flex items-center justify-center font-bold text-xs border border-[#ce93cb]/30 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[#2b1d30] block text-sm group-hover:text-[#8c60a2] transition">
                        {report.title}
                      </span>
                      <span className="text-[11px] text-[#a08ba7]">{report.category}</span>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-4 px-6 text-[#6e5975]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#a08ba7]" />
                    <span>{report.date}</span>
                  </div>
                </td>

                {/* Duration */}
                <td className="py-4 px-6 text-[#6e5975]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#a08ba7]" />
                    <span>{report.duration} • {report.questions}</span>
                  </div>
                </td>

                {/* Score */}
                <td className="py-4 px-6 text-center">
                  <span className="text-base font-extrabold text-[#2b1d30] font-['Plus_Jakarta_Sans']">
                    {report.score}
                  </span>
                  <span className="text-[10px] text-[#a08ba7] font-semibold">/100</span>
                </td>

                {/* Badge */}
                <td className="py-4 px-6">
                  <Badge variant={report.badgeVariant} withDot>
                    {report.badgeText}
                  </Badge>
                </td>

                {/* Action */}
                <td className="py-4 px-6 text-right">
                  <Link to={ROUTES.REPORT_DETAIL(report.id)}>
                    <Button variant="outline" size="sm" rightIcon={ArrowRight}>
                      View Report
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsTable;
