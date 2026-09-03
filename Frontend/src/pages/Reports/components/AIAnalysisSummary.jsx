import React, { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

const STRENGTHS = [
  'Consistent direct eye contact maintained during 80% of the session.',
  'Excellent speaking rate (142 WPM) with natural phrasing and clear articulation.',
  'Strong technical structuring using the STAR framework on system design trade-offs.',
];

const IMPROVEMENTS = [
  'Reduce hesitation pauses when formulating answers to architectural scalability questions.',
  'Minimize subtle head movement when reading long scenario prompts on screen.',
];

const QUESTION_EVALUATIONS = [
  {
    qNum: 'Question 1',
    question: 'Can you introduce yourself and summarize a complex project you recently built?',
    candidateAnswer: 'Sure, I am John Doe. I am a Computer Engineering student in my final year. I have built full-stack web applications with React and Flask, and worked on real-time computer vision systems.',
    feedback: 'Clear, concise introduction. Good posture and natural tone. Highlighted both frontend and backend competencies effectively.',
    score: '88/100',
  },
  {
    qNum: 'Question 2',
    question: 'What are your primary technical strengths, and how do you approach debugging a distributed system bottleneck under tight deadlines?',
    candidateAnswer: 'I start by isolating the bottleneck using APM logs, measuring database query execution times, and evaluating whether caching with Redis or query indexing provides the optimal latency reduction.',
    feedback: 'Solid analytical thinking. Accurately mentioned APM logs, query profiling, and Redis caching. Highly structured delivery.',
    score: '85/100',
  },
  {
    qNum: 'Question 3',
    question: 'Explain the architectural differences between SQL and NoSQL database models. In what scenario would you choose PostgreSQL over MongoDB?',
    candidateAnswer: 'I evaluate ACID transactions vs schema flexibility. For structured relational data with high foreign-key integrity, PostgreSQL is preferred. For high-velocity unstructured data, MongoDB scales horizontally.',
    feedback: 'Accurate architectural comparison of relational integrity vs document-based horizontal scaling. Very low filler word count.',
    score: '82/100',
  },
];

export function AIAnalysisSummary() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <Card className="border border-[#ede3f0] space-y-6">
      {/* Top Banner: Post-Interview AI Synthesis */}
      <CardHeader className="mb-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8c60a2] via-[#cd6775] to-[#fa846e] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <CardTitle>Post-Interview AI Analysis & Feedback</CardTitle>
            <p className="text-xs text-[#6e5975]">
              Synthesized by MediaPipe Vision, Whisper Speech, and Gemini LLM.
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Strengths & Improvements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Strengths</span>
          </div>
          <ul className="space-y-2 text-xs text-emerald-950/80">
            {STRENGTHS.map((str, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Areas for Improvement</span>
          </div>
          <ul className="space-y-2 text-xs text-amber-950/80">
            {IMPROVEMENTS.map((imp, i) => (
              <li key={i} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Evaluation Accordion */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-[#2b1d30] uppercase tracking-wider">
          Question-by-Question AI Evaluation Breakdown
        </h4>

        <div className="space-y-2.5">
          {QUESTION_EVALUATIONS.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#ede3f0] bg-[#faf8fb]/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#ede3f0] text-[#6e4876]">
                      {item.qNum}
                    </span>
                    <span className="text-xs font-bold text-[#2b1d30] line-clamp-1">
                      {item.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-extrabold text-[#8c60a2]">
                      {item.score}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#a08ba7]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#a08ba7]" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-[#ede3f0] space-y-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#a08ba7] uppercase tracking-wider block mb-1">
                        Candidate Answer Transcript
                      </span>
                      <p className="text-[#2b1d30] italic bg-[#faf8fb] p-3 rounded-xl border border-[#ede3f0]/80">
                        "{item.candidateAnswer}"
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#8c60a2] uppercase tracking-wider block mb-1">
                        AI Evaluator Feedback
                      </span>
                      <p className="text-[#6e5975] leading-relaxed">
                        {item.feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default AIAnalysisSummary;
