import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Timer as TimerIcon,
  Award,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  User,
  Briefcase,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Code2,
  Lightbulb,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import {
  CandidateDetails,
  InterviewerAnswerRecord,
  Question,
} from '../types/interview';
import { InterviewService } from '../services/interviewService';

interface InterviewConductSessionProps {
  candidate: CandidateDetails;
  questions: Question[];
  interviewerAnswers: Record<string, InterviewerAnswerRecord>;
  onUpdateAnswer: (questionId: string, answerText: string) => void;
  onUpdateNotes: (questionId: string, notesText: string) => void;
  onRateQuestion: (questionId: string, rating: number) => void;
  onFinishInterview: (totalSeconds: number) => void;
  onExitInterview: () => void;
  enableTimer: boolean;
}

export const InterviewConductSession: React.FC<InterviewConductSessionProps> = ({
  candidate,
  questions,
  interviewerAnswers,
  onUpdateAnswer,
  onUpdateNotes,
  onRateQuestion,
  onFinishInterview,
  onExitInterview,
  enableTimer,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [showBenchmarkAnswer, setShowBenchmarkAnswer] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];
  const currentRecord = currentQuestion ? interviewerAnswers[currentQuestion.id] : undefined;
  const candidateAnswer = currentRecord?.candidateAnswer || '';
  const interviewerNotes = currentRecord?.interviewerNotes || '';
  const currentRating = currentRecord?.rating || 0;

  // Live timer
  useEffect(() => {
    if (!enableTimer) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [enableTimer]);

  // Clean up any ongoing speech synthesis on slide change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No questions available in this interview session.</p>
        <button
          onClick={onExitInterview}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          Return to Generator
        </button>
      </div>
    );
  }

  // Audio voice feature for reading the question
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowBenchmarkAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowBenchmarkAnswer(false);
    }
  };

  // Rating labels for 1-5
  const ratingLevels: { level: number; label: string; desc: string; color: string }[] = [
    { level: 1, label: 'Unsatisfactory', desc: 'Significant conceptual gaps', color: 'border-rose-300 text-rose-700 hover:bg-rose-50' },
    { level: 2, label: 'Below Average', desc: 'Partial grasp with misconceptions', color: 'border-amber-300 text-amber-700 hover:bg-amber-50' },
    { level: 3, label: 'Meets Standard', desc: 'Solid fundamental understanding', color: 'border-blue-300 text-blue-700 hover:bg-blue-50' },
    { level: 4, label: 'Exceeds Standard', desc: 'Thorough & articulate answer', color: 'border-indigo-300 text-indigo-700 hover:bg-indigo-50' },
    { level: 5, label: 'Outstanding', desc: 'Exceptional depth & edge cases', color: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50' },
  ];

  // Count rated questions
  const ratedCount = Object.values(interviewerAnswers).filter((a) => a.rating > 0).length;

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Interviewer Mode Banner / Candidate Metadata Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Interview Mode (Live Evaluation)
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 font-medium">
                  {currentQuestion.subject} ({currentQuestion.difficulty})
                </span>
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{candidate.candidateName || 'Candidate'}</span>
                {candidate.targetRole && (
                  <span className="text-xs font-normal text-slate-400">
                    &bull; {candidate.targetRole}
                  </span>
                )}
              </h2>
            </div>
          </div>

          {/* Right controls: Timer and Finish */}
          <div className="flex items-center gap-3">
            {enableTimer && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-slate-300 tabular-nums">
                <TimerIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>{InterviewService.formatTime(elapsedSeconds)}</span>
              </div>
            )}

            <button
              onClick={() => onFinishInterview(elapsedSeconds)}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Finish &amp; Generate Report</span>
            </button>
          </div>
        </div>

        {/* Sub-bar: Interviewer info & progress */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {candidate.interviewerName && (
              <span>
                <strong className="text-slate-300">Interviewer:</strong> {candidate.interviewerName}
              </span>
            )}
            {candidate.interviewDate && (
              <span className="hidden sm:inline">
                <strong className="text-slate-300">Date:</strong> {candidate.interviewDate}
              </span>
            )}
          </div>
          <div className="font-medium text-slate-300 tabular-nums">
            Evaluated: <span className="font-bold text-blue-400">{ratedCount}</span> of {questions.length} questions
          </div>
        </div>
      </div>

      {/* Question Map / Navigator */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
          <span>Question Progress Map (Click to Jump)</span>
          <span className="tabular-nums">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const rec = interviewerAnswers[q.id];
            const hasRating = rec && rec.rating > 0;

            let dotClass = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200';
            if (isCurrent) {
              dotClass = 'bg-blue-600 text-white font-bold ring-2 ring-blue-600 ring-offset-1 border-blue-600';
            } else if (hasRating) {
              if (rec.rating >= 4) {
                dotClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold';
              } else if (rec.rating === 3) {
                dotClass = 'bg-blue-100 text-blue-800 border-blue-300 font-semibold';
              } else {
                dotClass = 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
              }
            } else if (rec && rec.candidateAnswer.trim().length > 0) {
              dotClass = 'bg-slate-200 text-slate-800 border-slate-300 font-medium';
            }

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowBenchmarkAnswer(false);
                }}
                className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center border transition-all cursor-pointer tabular-nums ${dotClass}`}
                title={`Q${idx + 1}: ${q.question} ${hasRating ? `(${rec.rating}/5 stars)` : ''}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interview Question & Grading Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Question Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Interview Question {currentIndex + 1} of {questions.length}
              </span>
              <span className="text-slate-300" aria-hidden="true">&bull;</span>
              <span className="text-xs font-medium text-slate-500">
                Topic: {currentQuestion.topic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpeech}
                title={isSpeaking ? 'Mute' : 'Read question aloud'}
                className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowBenchmarkAnswer(!showBenchmarkAnswer)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  showBenchmarkAnswer
                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {showBenchmarkAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showBenchmarkAnswer ? 'Hide Benchmark' : 'Interviewer Benchmark'}</span>
              </button>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Collapsible Benchmark / Answer Rubric for the Interviewer */}
        {showBenchmarkAnswer && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>Benchmark Model Answer (Interviewer Reference)</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentQuestion.difficulty} Level
              </span>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed">
              {currentQuestion.answer}
            </p>

            {currentQuestion.keyPoints.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700">Expectations &amp; Key Points:</span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {currentQuestion.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentQuestion.codeSnippet && (
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            )}
          </div>
        )}

        {/* Candidate's Answer Input Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Candidate&apos;s Answer (Live Transcription / Typed Notes)</span>
            </label>
            <span className="text-xs text-slate-400 tabular-nums">
              {candidateAnswer.length} chars
            </span>
          </div>

          <textarea
            rows={5}
            value={candidateAnswer}
            onChange={(e) => onUpdateAnswer(currentQuestion.id, e.target.value)}
            placeholder="Type or transcribe candidate's spoken response or code logic here..."
            className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans text-sm leading-relaxed"
          />
        </div>

        {/* Interviewer Notes Box */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Interviewer Feedback &amp; Private Notes</span>
            <span className="text-xs font-normal text-slate-400">
              (Will be included in the evaluation report)
            </span>
          </label>

          <textarea
            rows={3}
            value={interviewerNotes}
            onChange={(e) => onUpdateNotes(currentQuestion.id, e.target.value)}
            placeholder="E.g., Clear explanation of memory layout, hesitated on cyclic garbage collection, good communication..."
            className="w-full p-3.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans text-sm leading-relaxed"
          />
        </div>

        {/* 1 to 5 Star Rating Section */}
        <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block">
                Interviewer Score (1 to 5 Rating)
              </span>
              <span className="text-xs text-slate-500">
                Rate candidate&apos;s answer depth, accuracy, and clarity
              </span>
            </div>

            {currentRating > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{currentRating} of 5 Stars</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {ratingLevels.map((lvl) => {
              const isSelected = currentRating === lvl.level;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => onRateQuestion(currentQuestion.id, lvl.level)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-600 ring-offset-1'
                      : `bg-white ${lvl.color}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base flex items-center gap-1">
                      <span>{lvl.level}</span>
                      <Star className={`w-3.5 h-3.5 ${isSelected ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'}`} />
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />}
                  </div>
                  <div className="mt-2">
                    <span className={`block font-bold text-xs ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {lvl.label}
                    </span>
                    <span className={`block text-[11px] leading-tight mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                      {lvl.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons: Previous & Next / Finish */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onFinishInterview(elapsedSeconds)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Complete &amp; Generate Evaluation Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
