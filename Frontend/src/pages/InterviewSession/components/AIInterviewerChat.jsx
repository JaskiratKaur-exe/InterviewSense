import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Send, Mic, Volume2, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../utils/cn';

const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    number: 'Question 1 of 5',
    question: 'Can you introduce yourself, your engineering background, and summarize a complex project you recently built?',
    candidateAnswer: 'Sure, I am John Doe. I am a Computer Engineering student in my final year. I have built full-stack web applications with React and Flask, and worked on real-time computer vision systems.',
    time: 'Recorded',
  },
  {
    id: 2,
    number: 'Question 2 of 5',
    question: 'What are your primary technical strengths, and how do you approach debugging a distributed system bottleneck under tight deadlines?',
    candidateAnswer: 'I start by isolating the bottleneck using APM logs, measuring database query execution times, and evaluating whether caching with Redis or query indexing provides the optimal latency reduction.',
    time: 'Recorded',
  },
  {
    id: 3,
    number: 'Question 3 of 5',
    question: 'Explain the architectural differences between SQL and NoSQL database models. In what scenario would you choose PostgreSQL over MongoDB?',
    candidateAnswer: null, // Currently active question
    time: 'Current Question',
  },
];

export function AIInterviewerChat() {
  const { user } = useAuth();
  const candidateName = user?.name || 'John Doe';
  const [questions, setQuestions] = useState(INTERVIEW_QUESTIONS);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(2);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [questions, activeQuestionIdx]);

  const handleSaveAnswer = (e) => {
    e?.preventDefault();
    if (!currentAnswer.trim()) return;

    const updated = [...questions];
    updated[activeQuestionIdx] = {
      ...updated[activeQuestionIdx],
      candidateAnswer: currentAnswer,
      time: 'Recorded',
    };

    // Add next predefined question if available
    if (activeQuestionIdx < 4) {
      if (activeQuestionIdx === 2) {
        updated.push({
          id: 4,
          number: 'Question 4 of 5',
          question: 'How do you handle error boundaries, state persistence, and optimistic UI updates in modern frontend architectures?',
          candidateAnswer: null,
          time: 'Current Question',
        });
      } else if (activeQuestionIdx === 3) {
        updated.push({
          id: 5,
          number: 'Question 5 of 5',
          question: 'Describe a situation where you had a disagreement with a team member on technical design. How did you reach a consensus?',
          candidateAnswer: null,
          time: 'Current Question',
        });
      }
      setActiveQuestionIdx(activeQuestionIdx + 1);
    }

    setQuestions(updated);
    setCurrentAnswer('');
    setIsListening(false);
  };

  const toggleSpeechInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setCurrentAnswer('I evaluate ACID transactions vs schema flexibility. For structured relational data with high foreign-key integrity, PostgreSQL is preferred...');
    }
  };

  return (
    <Card className="h-full border border-[#ede3f0] flex flex-col justify-between p-4 sm:p-5">
      {/* Header: Interview Questions Flow */}
      <CardHeader className="mb-2 pb-3 border-b border-[#ede3f0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6e4876] via-[#8c60a2] to-[#fa846e] flex items-center justify-center text-white shadow-md shadow-[#8c60a2]/20 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-base">Interview Question Flow</CardTitle>
            <p className="text-[11px] text-[#6e5975]">
              Predefined Questions • Recorded for Post-Interview AI Analysis
            </p>
          </div>
        </div>

        <button
          className="p-1.5 rounded-lg text-[#6e5975] hover:text-[#2b1d30] hover:bg-[#faf8fb]"
          title="Read Aloud Question"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </CardHeader>

      {/* Questions & Candidate Recorded Responses Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 my-3 min-h-[300px] max-h-[480px]">
        {questions.map((item, idx) => {
          const isActive = idx === activeQuestionIdx;

          return (
            <div key={item.id} className="space-y-2">
              {/* Question Prompter Box */}
              <div className="p-3.5 rounded-2xl bg-[#faf8fb] border border-[#ede3f0] text-[#2b1d30] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#8c60a2] uppercase tracking-wider">
                  <span>{item.number}</span>
                  <span className="text-[#a08ba7] font-medium">{item.time}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                  "{item.question}"
                </p>
              </div>

              {/* Candidate Recorded Response Box (if submitted) */}
              {item.candidateAnswer && (
                <div className="flex flex-col items-end">
                  <div className="max-w-[90%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed bg-gradient-to-r from-[#8c60a2] via-[#cd6775] to-[#fa846e] text-white rounded-tr-xs shadow-md shadow-[#8c60a2]/15">
                    {item.candidateAnswer}
                  </div>
                  <span className="text-[10px] text-[#a08ba7] mt-1 px-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Response Recorded for AI Analysis
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Post-Interview AI Processing Notice */}
        <div className="p-2.5 rounded-xl bg-[#8c60a2]/10 border border-[#ce93cb]/30 text-center">
          <p className="text-[11px] text-[#6e4876] font-medium">
            🎯 Responses and video metrics will be analyzed by AI after session submission.
          </p>
        </div>

        <div ref={chatBottomRef} />
      </div>

      {/* Bottom Answer Input & Speech Recording Bar */}
      <form onSubmit={handleSaveAnswer} className="pt-3 border-t border-[#ede3f0]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder={isListening ? 'Transcribing your spoken answer...' : 'Type or speak your answer...'}
            className={cn(
              'w-full border text-[#2b1d30] text-xs sm:text-sm rounded-2xl pl-4 pr-24 py-3 transition-all',
              'placeholder:text-[#a08ba7] focus:outline-none focus:ring-2 focus:ring-[#8c60a2]/30 focus:border-[#8c60a2] bg-white',
              isListening ? 'border-[#fa846e] ring-2 ring-[#fa846e]/20' : 'border-[#ede3f0]'
            )}
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {/* Mic Speech-to-Text Button */}
            <button
              type="button"
              onClick={toggleSpeechInput}
              className={cn(
                'p-2 rounded-xl transition cursor-pointer',
                isListening
                  ? 'bg-[#fa846e] text-white animate-pulse'
                  : 'text-[#a08ba7] hover:text-[#6e4876] hover:bg-[#faf8fb]'
              )}
              title="Speak Answer (Transcribe)"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Next Question / Record Button */}
            <button
              type="submit"
              disabled={!currentAnswer.trim()}
              className="p-2 rounded-xl bg-gradient-to-tr from-[#8c60a2] to-[#fa846e] text-white hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs cursor-pointer flex items-center gap-1 text-xs font-bold px-2.5"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default AIInterviewerChat;
