import React, { useState } from 'react';
import {
  Award,
  Printer,
  Download,
  Copy,
  Check,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Star,
  Clock,
  User,
  Briefcase,
  UserCheck,
  Calendar,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import {
  CandidateDetails,
  InterviewEvaluationReport,
  InterviewerAnswerRecord,
  Question,
} from '../types/interview';
import { InterviewService } from '../services/interviewService';

interface InterviewEvaluationReportViewProps {
  report: InterviewEvaluationReport;
  questions: Question[];
  interviewerAnswers: Record<string, InterviewerAnswerRecord>;
  onNewInterview: () => void;
  onSwitchToPractice: () => void;
  onUpdateRecommendation?: (rec: InterviewEvaluationReport['recommendation']) => void;
}

export const InterviewEvaluationReportView: React.FC<InterviewEvaluationReportViewProps> = ({
  report,
  questions,
  interviewerAnswers,
  onNewInterview,
  onSwitchToPractice,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<InterviewEvaluationReport['recommendation']>(
    report.recommendation
  );
  const [strengths, setStrengths] = useState<string[]>(report.strengths);
  const [areasForImprovement, setAreasForImprovement] = useState<string[]>(
    report.areasForImprovement
  );
  const [newStrengthInput, setNewStrengthInput] = useState<string>('');
  const [newImprovementInput, setNewImprovementInput] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Updated report object for export
  const currentReport: InterviewEvaluationReport = {
    ...report,
    recommendation,
    strengths,
    areasForImprovement,
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const text = InterviewService.generateInterviewReportText(
      currentReport,
      questions,
      interviewerAnswers
    );
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const text = InterviewService.generateInterviewReportText(
      currentReport,
      questions,
      interviewerAnswers
    );
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (report.candidate.candidateName || 'candidate')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `interview-evaluation-${safeName}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAddStrength = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStrengthInput.trim()) {
      setStrengths([...strengths, newStrengthInput.trim()]);
      setNewStrengthInput('');
    }
  };

  const handleRemoveStrength = (index: number) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  const handleAddImprovement = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImprovementInput.trim()) {
      setAreasForImprovement([...areasForImprovement, newImprovementInput.trim()]);
      setNewImprovementInput('');
    }
  };

  const handleRemoveImprovement = (index: number) => {
    setAreasForImprovement(areasForImprovement.filter((_, i) => i !== index));
  };

  // Recommendation Badge style
  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case 'Strong Hire':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Hire':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Lean Hire':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Needs Further Review':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8 print:p-0 print:m-0 print:max-w-none">
      {/* Top Action Header (hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
            Interview Evaluation Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Official Candidate Evaluation Report
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-blue-600" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download (.txt)</span>
          </button>

          <button
            onClick={handleCopyReport}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Official Document Sheet */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header Banner */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Technical &amp; Behavioral Interview Evaluation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {report.candidate.candidateName || 'Candidate Name'}
            </h1>
            <p className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <span>{report.candidate.targetRole || 'Target Role / Position'}</span>
              <span className="text-slate-300" aria-hidden="true">&bull;</span>
              <span className="text-blue-600 font-semibold">{report.subject} ({report.difficulty})</span>
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 text-xs text-slate-500">
            <div><strong className="text-slate-700">Interviewer:</strong> {report.candidate.interviewerName || 'N/A'}</div>
            <div><strong className="text-slate-700">Date:</strong> {report.candidate.interviewDate || report.completedAt}</div>
            <div><strong className="text-slate-700">Duration:</strong> {InterviewService.formatTime(report.timeTakenSeconds)}</div>
          </div>
        </div>

        {/* Executive Score & Recommendation Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Overall Score */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Cumulative Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {report.totalScore}
              </span>
              <span className="text-slate-500 text-sm font-medium">
                / {report.maxPossibleScore} pts
              </span>
              <span className="text-xs font-bold text-blue-600 ml-auto tabular-nums">
                {report.scorePercentage}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-blue-600 h-full rounded-full transition-all"
                style={{ width: `${report.scorePercentage}%` }}
              />
            </div>
          </div>

          {/* 2. Average Rating */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Average Rating
            </span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {report.averageRating.toFixed(1)}
              </span>
              <span className="text-slate-500 text-sm font-medium">/ 5.0</span>
              <div className="flex items-center ml-auto">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.round(report.averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-xs text-slate-500 block pt-1">
              Based on {report.ratedQuestionsCount} of {report.totalQuestions} evaluated questions
            </span>
          </div>

          {/* 3. Final Recommendation */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                Hiring Verdict
              </span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${getRecommendationBadge(
                  recommendation
                )}`}
              >
                {recommendation}
              </span>
            </div>

            {/* Print hidden selector allowing interviewer override */}
            <div className="pt-1 print:hidden">
              <label className="text-[11px] text-slate-500 block">
                Change Verdict:
              </label>
              <select
                value={recommendation}
                onChange={(e) =>
                  setRecommendation(e.target.value as InterviewEvaluationReport['recommendation'])
                }
                className="mt-0.5 w-full text-xs font-semibold p-1 rounded-md border border-slate-300 bg-white text-slate-800"
              >
                <option value="Strong Hire">Strong Hire</option>
                <option value="Hire">Hire</option>
                <option value="Lean Hire">Lean Hire</option>
                <option value="Needs Further Review">Needs Further Review</option>
                <option value="Do Not Hire">Do Not Hire</option>
              </select>
            </div>
          </div>
        </div>

        {/* Strengths & Areas for Improvement Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Strengths */}
          <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Strengths</span>
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                {strengths.length} points
              </span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 group">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{str}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveStrength(idx)}
                    className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 print:hidden transition-opacity cursor-pointer shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Quick Add Strength (print hidden) */}
            <form onSubmit={handleAddStrength} className="pt-2 flex gap-1.5 print:hidden">
              <input
                type="text"
                value={newStrengthInput}
                onChange={(e) => setNewStrengthInput(e.target.value)}
                placeholder="Add custom candidate strength..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Areas for Improvement */}
          <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Areas for Improvement / Gap Analysis</span>
              </span>
              <span className="text-xs font-semibold text-amber-700">
                {areasForImprovement.length} points
              </span>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {areasForImprovement.map((gap, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 group">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{gap}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveImprovement(idx)}
                    className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 print:hidden transition-opacity cursor-pointer shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Quick Add Improvement (print hidden) */}
            <form onSubmit={handleAddImprovement} className="pt-2 flex gap-1.5 print:hidden">
              <input
                type="text"
                value={newImprovementInput}
                onChange={(e) => setNewImprovementInput(e.target.value)}
                placeholder="Add gap or learning recommendation..."
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>

        {/* Detailed Question-by-Question Breakdown */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Individual Question Ratings &amp; Notes
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {questions.length} Questions Evaluated
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const rec = interviewerAnswers[q.id];
              const isExpanded = expandedId === q.id;
              const rating = rec?.rating || 0;

              return (
                <div
                  key={q.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs print:border-slate-300"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-bold text-slate-800">Q{idx + 1}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span className="text-blue-700 font-semibold">{q.subject}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span>{q.difficulty}</span>
                        <span aria-hidden="true">&bull;</span>
                        <span className="text-slate-400">{q.topic}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{rating > 0 ? `${rating} / 5` : 'Unrated'}</span>
                      </div>
                      <div className="print:hidden">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Always visible in print or when expanded */}
                  <div
                    className={`${
                      isExpanded ? 'block' : 'hidden print:block'
                    } p-5 bg-slate-50/60 border-t border-slate-200 space-y-4 text-xs sm:text-sm`}
                  >
                    {/* Candidate's Typed Answer */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Candidate Answer:
                      </span>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap font-sans text-xs">
                        {rec?.candidateAnswer && rec.candidateAnswer.trim().length > 0 ? (
                          rec.candidateAnswer
                        ) : (
                          <span className="text-slate-400 italic">
                            (No answer typed or transcribed)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interviewer Notes */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                        Interviewer Notes &amp; Observations:
                      </span>
                      <div className="p-3 bg-white rounded-xl border border-blue-200 text-blue-950 whitespace-pre-wrap font-sans text-xs">
                        {rec?.interviewerNotes && rec.interviewerNotes.trim().length > 0 ? (
                          rec.interviewerNotes
                        ) : (
                          <span className="text-slate-400 italic">
                            (No notes entered)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Benchmark Reference */}
                    <div className="space-y-1 text-slate-600">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Benchmark Solution:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer in print */}
        <div className="border-t border-slate-200 pt-6 text-xs text-slate-400 flex items-center justify-between">
          <span>AI Interview Question Generator &bull; Candidate Evaluation Report</span>
          <span>Official Confidential Record</span>
        </div>
      </div>

      {/* Bottom Action Controls (hidden in print) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 print:hidden">
        <button
          onClick={onNewInterview}
          className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Conduct Another Interview</span>
        </button>

        <button
          onClick={onSwitchToPractice}
          className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Switch to Self-Practice Mode</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
