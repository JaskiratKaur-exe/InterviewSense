import React from 'react';
import { Code2, Server, Layers, Brain, Database, MessageSquareCheck, Check } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

const TRACKS = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Core Engineering',
    icon: Code2,
    skills: ['DSA', 'OOP', 'Problem Solving', 'System Basics'],
    description: 'Data structures, algorithm complexity, clean code, and engineering trade-offs.',
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    category: 'Web & UI Architecture',
    icon: Layers,
    skills: ['React', 'JavaScript', 'CSS/Tailwind', 'Web Vitals'],
    description: 'State management, component lifecycles, responsive layouts, and performance.',
  },
  {
    id: 'backend',
    title: 'Backend Engineer',
    category: 'Server & Databases',
    icon: Server,
    skills: ['Python/Flask', 'REST/GraphQL', 'SQL & NoSQL', 'Security'],
    description: 'API design, database optimization, caching, authentication, and concurrency.',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Engineer',
    category: 'End-to-End Systems',
    icon: Database,
    skills: ['Client + Server', 'CI/CD', 'API Integration', 'Cloud'],
    description: 'Bridging user interfaces with scalable server architectures and databases.',
  },
  {
    id: 'ai-ml',
    title: 'AI & Data Science',
    category: 'Intelligent Systems',
    icon: Brain,
    skills: ['Machine Learning', 'NLP', 'LLMs & Gemini', 'Python'],
    description: 'Model evaluation, prompt engineering, feature engineering, and neural networks.',
  },
  {
    id: 'behavioral',
    title: 'HR & Behavioral',
    category: 'Leadership & Soft Skills',
    icon: MessageSquareCheck,
    skills: ['STAR Method', 'Conflict Resolution', 'Teamwork', 'Impact'],
    description: 'Situation, Task, Action, Result storytelling for leadership and culture fit.',
  },
];

export function RoleTrackSelector({ selectedTrack, onSelectTrack }) {
  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div>
          <CardTitle>1. Select Your Interview Track</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Choose the specific role domain for your upcoming AI evaluation.
          </p>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {TRACKS.map((track) => {
          const Icon = track.icon;
          const isSelected = selectedTrack === track.id;

          return (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className={cn(
                'p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between relative',
                isSelected
                  ? 'border-[#8c60a2] bg-gradient-to-br from-[#8c60a2]/10 via-white to-[#fa846e]/10 shadow-md shadow-[#8c60a2]/10 ring-2 ring-[#8c60a2]/20'
                  : 'border-[#ede3f0] bg-[#faf8fb]/60 hover:bg-white hover:border-[#ce93cb]'
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-tr from-[#8c60a2] to-[#fa846e] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                      isSelected
                        ? 'bg-gradient-to-tr from-[#8c60a2] to-[#fa846e] text-white shadow-xs'
                        : 'bg-white text-[#6e4876] border border-[#ede3f0]'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2b1d30] leading-snug">
                      {track.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-[#a08ba7] block">
                      {track.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#6e5975] leading-relaxed mb-3">
                  {track.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#ede3f0]/60">
                {track.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-[#ede3f0] text-[#6e4876]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default RoleTrackSelector;
