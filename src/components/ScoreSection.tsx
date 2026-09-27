import React, { useState } from 'react';
import {
  Award,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Copy,
  Check,
  Download,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react';
import {
  Question,
  SessionResult,
  UserAnswerRecord,
} from '../types/interview';
import { InterviewService } from '../services/interviewService';

interface ScoreSectionProps {
  summary: SessionResult;
  questions: Question[];
  userAnswers: Record<string, UserAnswerRecord>;
  onTryAgain: () => void;
  onNewSession: () => void;
  onOpenStudyGuide: () => void;
}

export const ScoreSection: React.FC<ScoreSectionProps> = ({
  summary,
  questions,
  userAnswers,
  onTryAgain,
  onNewSession,
  onOpenStudyGuide,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopyReport = () => {
    const text = InterviewService.generateExportText(summary, questions, userAnswers);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const text = InterviewService.generateExportText(summary, questions, userAnswers);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview-score-report-${summary.subject.toLowerCase()}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Grade color theme
  let gradeBg = 'bg-blue-50 text-blue-700 border-blue-200';
  let gaugeColor = 'stroke-blue-600';

  if (summary.scorePercentage >= 85) {
    gradeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    gaugeColor = 'stroke-emerald-600';
  } else if (summary.scorePercentage >= 70) {
    gradeBg = 'bg-blue-50 text-blue-700 border-blue-200';
    gaugeColor = 'stroke-blue-600';
  } else if (summary.scorePercentage >= 50) {
    gradeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    gaugeColor = 'stroke-amber-500';
  } else {
    gradeBg = 'bg-rose-50 text-rose-700 border-rose-200';
    gaugeColor = 'stroke-rose-500';
  }

  // Circular gauge math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (summary.scorePercentage / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Main Score Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Practice Session Completed</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Interview Performance Report
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            {summary.performanceMessage}
          </p>
        </div>

        {/* Central Circular Gauge & Metric Tallies */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          {/* Circular Score Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-2">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="stroke-slate-100"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className={`${gaugeColor} transition-all duration-1000 ease-out`}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 tabular-nums">
                  {summary.scorePercentage}%
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {summary.performanceGrade}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Total Time: {InterviewService.formatTime(summary.timeTakenSeconds)}
              </span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block">
                Total Questions
              </span>
              <span className="text-2xl font-bold text-slate-900 tabular-nums">
                {summary.totalQuestions}
              </span>
              <span className="text-xs text-slate-500 block mt-1">
                {summary.subject} · {summary.difficulty}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-800">
                  Correct Answers
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-emerald-900 tabular-nums">
                {summary.correctCount}
              </span>
              <span className="text-xs text-emerald-700 block mt-1">
                Full marks (+100%)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-amber-800">
                  Partially Correct
                </span>
                <HelpCircle className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-2xl font-bold text-amber-900 tabular-nums">
                {summary.partialCount}
              </span>
              <span className="text-xs text-amber-700 block mt-1">
                Partial credit (+50%)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-rose-800">
                  Needs Review
                </span>
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <span className="text-2xl font-bold text-rose-900 tabular-nums">
                {summary.incorrectCount + summary.unansweredCount}
              </span>
              <span className="text-xs text-rose-700 block mt-1">
                Missed / unattempted
              </span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons: Try Again & New Session */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={onTryAgain}
            className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again (Same Settings)</span>
          </button>

          <button
            onClick={onNewSession}
            className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Change Subject / Difficulty</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyReport}
            className="w-full sm:w-auto px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadReport}
            className="w-full sm:w-auto p-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center cursor-pointer"
            title="Download Report File"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detailed Question Review Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Detailed Question Breakdown
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Click any question to view model solution &amp; notes
          </span>
        </div>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const rec = userAnswers[q.id];
            const isExpanded = expandedId === q.id;
            const evalStatus = rec?.evaluation || 'unanswered';

            let statusLabel = 'Unanswered';
            let statusBadge = 'text-slate-600 bg-slate-100';
            if (evalStatus === 'correct') {
              statusLabel = 'Got It Right (100%)';
              statusBadge = 'text-emerald-700 bg-emerald-50 border border-emerald-200';
            } else if (evalStatus === 'partial') {
              statusLabel = 'Partially Right (50%)';
              statusBadge = 'text-amber-700 bg-amber-50 border border-amber-200';
            } else if (evalStatus === 'incorrect') {
              statusLabel = 'Needs Practice (0%)';
              statusBadge = 'text-rose-700 bg-rose-50 border border-rose-200';
            }

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-slate-700">Q{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{q.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span>{q.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-400">{q.topic}</span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${statusBadge}`}>
                      {statusLabel}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-slate-50/50 border-t border-slate-200 space-y-5 text-sm">
                    {/* User's response */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Your Practice Answer:
                      </span>
                      <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap font-sans text-xs sm:text-sm">
                        {rec?.userText && rec.userText.trim().length > 0 ? (
                          rec.userText
                        ) : (
                          <span className="text-slate-400 italic">
                            (No answer typed in practice mode)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Model solution */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                        Model Answer &amp; Explanation:
                      </span>
                      <p className="text-slate-800 leading-relaxed">
                        {q.answer}
                      </p>
                    </div>

                    {/* Key points */}
                    {q.keyPoints.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
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

                    {/* Code snippet */}
                    {q.codeSnippet && (
                      <pre className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    {/* Tips */}
                    {q.interviewTips && (
                      <div className="text-xs text-blue-900 bg-blue-50 p-3 rounded-xl border border-blue-200">
                        <span className="font-bold">Interviewer Tip:</span> {q.interviewTips}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
