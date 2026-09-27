import React from 'react';
import { Terminal, BookOpen, Layers, Award, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'generator' | 'practice' | 'interview-session' | 'bank' | 'guide';
  onNavigate: (view: 'home' | 'generator' | 'practice' | 'interview-session' | 'bank' | 'guide') => void;
  hasActivePracticeSession: boolean;
  hasActiveInterviewSession: boolean;
  onStartPractice: () => void;
  onStartInterview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  hasActivePracticeSession,
  hasActiveInterviewSession,
  onStartPractice,
  onStartInterview,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
            AI Interview Question Generator
          </span>
        </button>

        {/* Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'home' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Home
          </button>

          <button
            onClick={onStartPractice}
            className={`flex items-center gap-1.5 transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'practice' || (activeView === 'generator')
                ? 'text-blue-600 font-semibold'
                : ''
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Practice Mode</span>
          </button>

          <button
            onClick={onStartInterview}
            className={`flex items-center gap-1.5 transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'interview-session'
                ? 'text-blue-600 font-semibold'
                : ''
            }`}
          >
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span className="relative">
              Interview Mode
              <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full">
                New
              </span>
            </span>
          </button>

          <button
            onClick={() => onNavigate('bank')}
            className={`flex items-center gap-1.5 transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'bank' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Question Bank</span>
          </button>

          <button
            onClick={() => onNavigate('guide')}
            className={`flex items-center gap-1.5 transition-colors hover:text-blue-600 cursor-pointer ${
              activeView === 'guide' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Study Guide</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {hasActiveInterviewSession && activeView !== 'interview-session' && (
            <button
              onClick={() => onNavigate('interview-session')}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Resume Interview
            </button>
          )}

          {hasActivePracticeSession && activeView !== 'practice' && (
            <button
              onClick={() => onNavigate('practice')}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Resume Practice
            </button>
          )}

          <button
            onClick={onStartInterview}
            className="hidden sm:flex px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Interview Mode</span>
          </button>

          <button
            onClick={onStartPractice}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Start Practice</span>
          </button>
        </div>
      </div>
    </header>
  );
};
