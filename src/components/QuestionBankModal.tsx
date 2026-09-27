import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  EyeOff,
  Code2,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Difficulty, Question, Subject } from '../types/interview';
import { SAMPLE_QUESTIONS } from '../data/sampleQuestions';

interface QuestionBankProps {
  onStartWithConfig: (subject: Subject, difficulty: Difficulty, count: number) => void;
}

export const QuestionBank: React.FC<QuestionBankProps> = ({ onStartWithConfig }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredQuestions = useMemo(() => {
    return SAMPLE_QUESTIONS.filter((q) => {
      if (selectedSubject !== 'All' && q.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inAnswer = q.answer.toLowerCase().includes(query);
        const inTopic = q.topic.toLowerCase().includes(query);
        if (!inQuestion && !inAnswer && !inTopic) return false;
      }
      return true;
    });
  }, [selectedSubject, selectedDifficulty, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Complete Interview Question Bank
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse, filter, and study 50+ curated technical and HR interview questions.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredQuestions.length}</span> of {SAMPLE_QUESTIONS.length} questions
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, topic, or question (e.g. JVM, pointers, decorator, STAR)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(['All', 'Java', 'C', 'Python', 'HR'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No questions match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or switching subject/difficulty filters.
            </p>
            <button
              onClick={() => {
                setSelectedSubject('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-blue-700">{q.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-600">{q.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{q.topic}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <span className="text-xs font-semibold text-blue-600 hidden sm:inline">
                      {isExpanded ? 'Hide' : 'Answer'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-slate-50/60 border-t border-slate-200 space-y-4 text-sm">
                    {/* Model Answer */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block">
                        Detailed Answer &amp; Explanation
                      </span>
                      <p className="text-slate-800 leading-relaxed text-sm">
                        {q.answer}
                      </p>
                    </div>

                    {/* Key Concepts */}
                    {q.keyPoints.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                          Key Evaluation Points:
                        </span>
                        <ul className="space-y-1 text-slate-600 text-xs sm:text-sm">
                          {q.keyPoints.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Reference Code */}
                    {q.codeSnippet && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                          Reference Code:
                        </span>
                        <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto">
                          <code>{q.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Tips */}
                    {q.interviewTips && (
                      <div className="text-xs text-blue-900 bg-blue-50/80 p-3 rounded-xl border border-blue-200 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Interviewer Tip:</span> {q.interviewTips}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartWithConfig(q.subject, q.difficulty, 5);
                        }}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Practice {q.subject} {q.difficulty} Questions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
