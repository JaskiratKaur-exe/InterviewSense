import React from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const EXTRACTED_SKILLS = [
  'React.js',
  'JavaScript (ES6+)',
  'Python',
  'Flask API',
  'PostgreSQL',
  'MediaPipe / OpenCV',
  'HTML5 / Tailwind CSS',
  'Data Structures & Algorithms',
  'Git / GitHub',
  'RESTful Architecture',
];

const RECOMMENDED_TOPICS = [
  'Redis Distributed Caching',
  'Database Sharding & Replication',
  'Microservices Architecture',
];

export function SkillAlignmentCard() {
  return (
    <Card className="border border-[#ede3f0] space-y-6">
      <CardHeader className="mb-1">
        <div>
          <CardTitle>AI Skill Extraction & Role Alignment</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Keywords extracted from your uploaded resume mapped against industry benchmarks.
          </p>
        </div>
      </CardHeader>

      {/* Role Match Index Gauge Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#fa846e] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#8c60a2]/25 shrink-0">
            88%
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2b1d30]">
              Strong Match for Software Engineer
            </h4>
            <p className="text-xs text-[#6e5975] mt-0.5">
              10 core technical keywords validated from your resume.
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Skills Chips */}
      <div>
        <label className="block text-xs font-bold text-[#2b1d30] mb-2.5">
          Validated Skills from Resume:
        </label>
        <div className="flex flex-wrap gap-2">
          {EXTRACTED_SKILLS.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold px-3 py-1 rounded-xl bg-white border border-[#ede3f0] text-[#6e4876] shadow-2xs hover:border-[#8c60a2] transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Suggested Topics to Practice */}
      <div className="pt-2 border-t border-[#ede3f0]/80 space-y-2">
        <label className="block text-xs font-bold text-[#2b1d30]">
          Recommended Topics to Strengthen:
        </label>
        <div className="space-y-1.5">
          {RECOMMENDED_TOPICS.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8fb] border border-[#ede3f0] text-xs font-medium text-[#6e5975]"
            >
              <span className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-[#fa846e]" />
                <span>{topic}</span>
              </span>
              <span className="text-[10px] font-bold text-[#8c60a2]">Suggested Track</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default SkillAlignmentCard;
