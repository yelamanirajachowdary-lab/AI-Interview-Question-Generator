import React from 'react';
import { Terminal, Award, BookOpen, Layers, UserCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: any) => void;
  onStartPractice: () => void;
  onStartInterview: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onStartPractice,
  onStartInterview,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 block">
              AI Interview Question Generator
            </span>
            <span className="text-xs text-slate-500">
              Practice. Prepare. Succeed.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={onStartPractice}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Practice Mode
          </button>
          <button
            onClick={onStartInterview}
            className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Interview Mode</span>
          </button>
          <button
            onClick={() => onNavigate('bank')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Question Bank
          </button>
          <button
            onClick={() => onNavigate('guide')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Study Guide
          </button>
        </div>

        <div className="text-xs text-slate-400">
          Built for students, job seekers &amp; interviewers.
        </div>
      </div>
    </footer>
  );
};
