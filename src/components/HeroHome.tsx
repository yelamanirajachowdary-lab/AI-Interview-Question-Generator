import React from 'react';
import {
  Code2,
  Cpu,
  BrainCircuit,
  Users2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  BookOpenCheck,
  FileCode2,
  Timer,
  ChevronRight,
  UserCheck,
  Printer,
  Star,
  FileText,
} from 'lucide-react';
import { Subject, Difficulty } from '../types/interview';

interface HeroHomeProps {
  onStartPractice: () => void;
  onStartInterview: () => void;
  onQuickStart: (subject: Subject, difficulty: Difficulty, count: number) => void;
  onExploreBank: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  onStartPractice,
  onStartInterview,
  onQuickStart,
  onExploreBank,
}) => {
  const subjects = [
    {
      id: 'Java' as Subject,
      title: 'Java Programming',
      icon: Code2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      description: 'OOP, JVM Architecture, Collections, Streams, Multithreading & Memory Model.',
      questionCount: '14+ questions',
      sampleTopic: 'JVM Generations, Volatile & HashMaps',
    },
    {
      id: 'C' as Subject,
      title: 'C Language',
      icon: Cpu,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Pointers, Dynamic Memory, Storage Classes, Struct Alignment & Bitwise operations.',
      questionCount: '13+ questions',
      sampleTopic: 'Pointers, Memory Leaks & Macros',
    },
    {
      id: 'Python' as Subject,
      title: 'Python Core',
      icon: FileCode2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      description: 'Generators, Decorators, GIL internals, Mutability, Comprehensions & Metaclasses.',
      questionCount: '13+ questions',
      sampleTopic: 'GIL, Decorators & __slots__',
    },
    {
      id: 'HR' as Subject,
      title: 'HR & Behavioral',
      icon: Users2,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      description: 'STAR Framework, Conflict resolution, Career goals, Salary negotiation & Teamwork.',
      questionCount: '13+ questions',
      sampleTopic: 'STAR Technique & Leadership',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white rounded-3xl border border-blue-100 p-8 sm:p-12 lg:p-16 text-center">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-400/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          {/* Subtitle tag with typographic metadata */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wider uppercase">
            <span>Interview Preparation &amp; Evaluation Platform</span>
            <span aria-hidden="true">&bull;</span>
            <span>Technical &amp; HR Ready</span>
          </div>

          {/* Website Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight text-balance">
            AI Interview Question Generator
          </h1>

          {/* Core Subtitle requested by user */}
          <p className="text-xl sm:text-2xl font-semibold text-blue-600 tracking-tight">
            Practice. Prepare. Succeed.
          </p>

          {/* Brief explanation */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Prepare for technical and HR rounds in self-guided <strong>Practice Mode</strong> or evaluate candidates live in <strong>Interview Mode</strong> with notes, 1–5 ratings, and printable evaluation reports.
          </p>

          {/* Dual Action Buttons (Practice Mode & Interview Mode) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onStartPractice}
              className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>Start Practice Mode</span>
            </button>

            <button
              onClick={onStartInterview}
              className="w-full sm:w-auto px-6 py-3.5 text-base font-semibold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
            >
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Launch Interview Mode</span>
            </button>

            <button
              onClick={onExploreBank}
              className="w-full sm:w-auto px-5 py-3.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpenCheck className="w-4 h-4 text-slate-500" />
              <span>Browse 50+ Questions</span>
            </button>
          </div>

          {/* Quick reassurance list */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Practice &amp; Interview Modes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Java, C, Python &amp; HR Tracks
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Print &amp; Download Evaluation Reports
            </span>
          </div>
        </div>
      </section>

      {/* Two Operating Modes Spotlight Card */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
            Flexible Interview Environments
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Choose How You Want to Run Your Session
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Practice Mode Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1. Practice Mode (Self-Preparation)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ideal for students and job seekers practicing solo. Write your answer first, reveal the solution, check against key evaluation concepts, and score yourself.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Interactive answer text box before seeing solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Bulleted core concepts &amp; syntax snippets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Self-rating (+100%, +50%, +0%) &amp; performance breakdown</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={onStartPractice}
                className="w-full py-2.5 px-4 text-xs font-bold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch Practice Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interview Mode Box */}
          <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-4 flex flex-col justify-between hover:border-blue-300 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Interview Mode (Live Candidate Evaluation)
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-200 text-blue-900 rounded-full">
                  Recruiter / Peer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Conduct structured mock or real candidate interviews. Display questions one-by-one, type candidate responses, record private feedback, and rate 1–5 stars.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Candidate name, target role &amp; interviewer tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Candidate answer box + interviewer notes on every question</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>1–5 Star rating, strengths &amp; gap analysis, Print &amp; Download</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={onStartInterview}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Launch Interview Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Categories */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Select Your Interview Subject
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Choose from core programming languages and essential HR behavioral tracks.
            </p>
          </div>
          <button
            onClick={onStartPractice}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Custom Generator</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((sub) => {
            const Icon = sub.icon;
            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl ${sub.bgColor} ${sub.color} flex items-center justify-center border ${sub.borderColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {sub.questionCount}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-2 text-xs text-slate-500 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Topics:</span>{' '}
                    {sub.sampleTopic}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onQuickStart(sub.id, 'Easy', 5)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Easy (5)
                  </button>
                  <button
                    onClick={() => onQuickStart(sub.id, 'Medium', 5)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Medium (5)
                  </button>
                  <button
                    onClick={() => onQuickStart(sub.id, 'Hard', 5)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Hard (5)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlights Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Interviewer Mode with 1-5 Ratings</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Record candidate answers, write private interviewer feedback notes, assign 1-5 star ratings, and review benchmark rubrics.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Strengths &amp; Improvement Analysis</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Automatic evaluation reports calculate cumulative score, hire recommendations, highlight candidate strengths, and surface areas for improvement.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Printer className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Printable &amp; Downloadable Reports</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            One-click print button formatted for clean paper/PDF records, plus exportable .txt reports for sharing with recruitment teams.
          </p>
        </div>
      </section>
    </div>
  );
};
