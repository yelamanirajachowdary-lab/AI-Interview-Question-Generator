import React, { useState } from 'react';
import {
  Code2,
  Cpu,
  FileCode2,
  Users2,
  Sparkles,
  Layers,
  Check,
  Timer,
  Play,
  ArrowLeft,
  UserCheck,
  Award,
  User,
  Briefcase,
  Calendar,
} from 'lucide-react';
import { AppMode, CandidateDetails, Difficulty, GeneratorConfig, Subject } from '../types/interview';

interface GeneratorFormProps {
  initialConfig?: GeneratorConfig;
  initialMode?: AppMode;
  onGeneratePractice: (config: GeneratorConfig, enableTimer: boolean) => void;
  onGenerateInterview: (
    config: GeneratorConfig,
    candidate: CandidateDetails,
    enableTimer: boolean
  ) => void;
  onBackToHome: () => void;
}

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  initialConfig,
  initialMode = 'practice',
  onGeneratePractice,
  onGenerateInterview,
  onBackToHome,
}) => {
  const [mode, setMode] = useState<AppMode>(initialMode);

  // Candidate Details state for Interview Mode
  const todayFormatted = new Date().toISOString().split('T')[0];
  const [candidateName, setCandidateName] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('Software Engineer');
  const [interviewerName, setInterviewerName] = useState<string>('');
  const [interviewDate, setInterviewDate] = useState<string>(todayFormatted);

  const [subject, setSubject] = useState<Subject | 'All'>(
    initialConfig?.subject || 'Java'
  );
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>(
    initialConfig?.difficulty || 'Medium'
  );
  const [questionCount, setQuestionCount] = useState<number>(
    initialConfig?.questionCount || 5
  );
  const [enableTimer, setEnableTimer] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const subjects: { id: Subject | 'All'; label: string; icon: any; desc: string }[] = [
    {
      id: 'Java',
      label: 'Java',
      icon: Code2,
      desc: 'OOP, JVM, Collections, Multithreading',
    },
    {
      id: 'C',
      label: 'C',
      icon: Cpu,
      desc: 'Pointers, Memory, Structs, Macros',
    },
    {
      id: 'Python',
      label: 'Python',
      icon: FileCode2,
      desc: 'GIL, Mutability, Generators, Decorators',
    },
    {
      id: 'HR',
      label: 'HR / Behavioral',
      icon: Users2,
      desc: 'STAR Method, Teamwork, Leadership',
    },
    {
      id: 'All',
      label: 'All Subjects (Mix)',
      icon: Layers,
      desc: 'Balanced mix across all subjects',
    },
  ];

  const difficulties: {
    id: Difficulty | 'All';
    label: string;
    sub: string;
  }[] = [
    {
      id: 'Easy',
      label: 'Easy',
      sub: 'Core fundamentals & syntax concepts',
    },
    {
      id: 'Medium',
      label: 'Medium',
      sub: 'Standard interview coding & design logic',
    },
    {
      id: 'Hard',
      label: 'Hard',
      sub: 'Deep systems, concurrency & tricky edge cases',
    },
    {
      id: 'All',
      label: 'All Levels (Mixed)',
      sub: 'Realistic interview with progressive difficulty',
    },
  ];

  const questionCounts = [5, 10, 15];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const config: GeneratorConfig = {
      subject,
      difficulty,
      questionCount,
    };

    setTimeout(() => {
      if (mode === 'interview') {
        const candidate: CandidateDetails = {
          candidateName: candidateName.trim() || 'Candidate',
          targetRole: targetRole.trim() || 'Software Engineer',
          interviewerName: interviewerName.trim() || 'Interviewer',
          interviewDate: interviewDate || todayFormatted,
        };
        onGenerateInterview(config, candidate, enableTimer);
      } else {
        onGeneratePractice(config, enableTimer);
      }
      setIsGenerating(false);
    }, 200);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-6">
      {/* Top back button and title */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs text-slate-500 font-medium">
          {mode === 'interview' ? 'Interview Mode Setup' : 'Practice Mode Setup'}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Configure Your Session
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Select your preferred operating mode, interview subjects, and question settings.
          </p>
        </div>

        {/* Operating Mode Toggle (Practice Mode vs Interview Mode) */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-900">
            Select Operation Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={() => setMode('practice')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                mode === 'practice'
                  ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === 'practice'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">
                    Practice Mode (Self-Prep)
                  </span>
                  {mode === 'practice' && (
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Type answers in practice text box, reveal model solutions, check keywords, and self-score.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('interview')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                mode === 'interview'
                  ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-600 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === 'interview'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">
                    Interview Mode (Interviewer)
                  </span>
                  {mode === 'interview' && (
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Evaluate a candidate 1-by-1, record notes, rate 1–5 stars, and generate official evaluation reports.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Candidate & Interviewer Details (Visible when in Interview Mode) */}
        {mode === 'interview' && (
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Candidate &amp; Interviewer Information</span>
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                These details will appear on the final evaluation report.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Candidate Full Name</span>
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="E.g., Alex Johnson"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Target Role / Position</span>
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="E.g., Java Backend Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Interviewer Name</span>
                </label>
                <input
                  type="text"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  placeholder="E.g., Sarah Miller (Engineering Lead)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Interview Date</span>
                </label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Select Subject */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              1. Select Subject Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjects.map((item) => {
                const Icon = item.icon;
                const isSelected = subject === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSubject(item.id)}
                    className={`relative p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm text-slate-900">
                          {item.label}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Select Difficulty */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              2. Select Difficulty Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {difficulties.map((diff) => {
                const isSelected = difficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setDifficulty(diff.id)}
                    className={`relative p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">
                        {diff.label}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {diff.sub}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Number of Questions */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              3. Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-3">
              {questionCounts.map((count) => {
                const isSelected = questionCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-3.5 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-semibold'
                    }`}
                  >
                    <span className="text-lg block leading-none">{count}</span>
                    <span className="text-xs mt-1 block opacity-80">
                      Questions
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timer setting */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Timer className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-sm font-semibold text-slate-900 block">
                  Interview Pace Timer
                </span>
                <span className="text-xs text-slate-500">
                  Track elapsed time during the round
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={enableTimer}
                onChange={(e) => setEnableTimer(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>

          {/* Launch Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 px-6 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isGenerating ? (
                <span>Preparing Session...</span>
              ) : mode === 'interview' ? (
                <>
                  <UserCheck className="w-5 h-5" />
                  <span>Begin Candidate Interview ({questionCount} Questions)</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Practice ({questionCount} Questions)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
