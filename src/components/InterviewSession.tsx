import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  CheckCircle,
  HelpCircle,
  XCircle,
  Timer as TimerIcon,
  Flag,
  RotateCcw,
  Sparkles,
  Award,
  Bookmark,
  BookmarkCheck,
  Code2,
  Lightbulb,
} from 'lucide-react';
import {
  EvaluationRating,
  Question,
  UserAnswerRecord,
} from '../types/interview';
import { InterviewService } from '../services/interviewService';

interface InterviewSessionProps {
  questions: Question[];
  userAnswers: Record<string, UserAnswerRecord>;
  onUpdateAnswer: (questionId: string, text: string) => void;
  onRevealAnswer: (questionId: string) => void;
  onRateAnswer: (questionId: string, rating: EvaluationRating) => void;
  onFinishSession: (totalSeconds: number) => void;
  onExitSession: () => void;
  enableTimer: boolean;
}

export const InterviewSession: React.FC<InterviewSessionProps> = ({
  questions,
  userAnswers,
  onUpdateAnswer,
  onRevealAnswer,
  onRateAnswer,
  onFinishSession,
  onExitSession,
  enableTimer,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const currentQuestion = questions[currentIndex];
  const currentRecord = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const isAnswerRevealed = currentRecord?.revealedAnswer || false;
  const userText = currentRecord?.userText || '';
  const currentRating = currentRecord?.evaluation || 'unanswered';

  // Live timer effect
  useEffect(() => {
    if (!enableTimer) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [enableTimer]);

  // Clean up any ongoing speech synthesis on unmount or slide change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentIndex]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No questions available in this session.</p>
        <button
          onClick={onExitSession}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
        >
          Return to Generator
        </button>
      </div>
    );
  }

  // Handle Speech synthesis (Interviewer voice)
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

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Keyword check helper
  const keywordAnalysis = InterviewService.checkKeywordMatch(userText, currentQuestion);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Count answered questions
  const answeredCount = Object.values(userAnswers).filter(
    (a) => a.evaluation !== 'unanswered' || a.revealedAnswer
  ).length;

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-6">
      {/* Top Session Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <span>Question</span>
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {currentIndex + 1}
            </span>
            <span>of</span>
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {questions.length}
            </span>
          </div>

          <span className="text-slate-300" aria-hidden="true">
            /
          </span>

          {/* Clean unboxed metadata */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="font-bold text-blue-700">{currentQuestion.subject}</span>
            <span aria-hidden="true">·</span>
            <span>{currentQuestion.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span className="hidden sm:inline text-slate-400">{currentQuestion.topic}</span>
          </div>
        </div>

        {/* Right side controls: Timer, Audio, Exit, Finish */}
        <div className="flex items-center gap-3">
          {enableTimer && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 tabular-nums">
              <TimerIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>{InterviewService.formatTime(elapsedSeconds)}</span>
            </div>
          )}

          <button
            onClick={handleToggleSpeech}
            title={isSpeaking ? 'Mute Question Voice' : 'Listen to Question (AI Voice)'}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isSpeaking
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-blue-600'
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => toggleBookmark(currentQuestion.id)}
            title="Bookmark Question"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              bookmarkedIds.has(currentQuestion.id)
                ? 'bg-amber-50 text-amber-600 border-amber-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-amber-600'
            }`}
          >
            {bookmarkedIds.has(currentQuestion.id) ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => onFinishSession(elapsedSeconds)}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            Finish & View Score
          </button>
        </div>
      </div>

      {/* Progress Dots / Question Navigator */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
          <span>Session Question Map</span>
          <span className="tabular-nums">
            {answeredCount} of {questions.length} answered
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const rec = userAnswers[q.id];
            const hasAnswered = rec && rec.userText && rec.userText.trim().length > 0;
            const isRated = rec && rec.evaluation !== 'unanswered';

            let dotClass = 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200';
            if (isCurrent) {
              dotClass = 'bg-blue-600 text-white font-bold ring-2 ring-blue-600 ring-offset-1 border-blue-600';
            } else if (isRated) {
              if (rec.evaluation === 'correct') {
                dotClass = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold';
              } else if (rec.evaluation === 'partial') {
                dotClass = 'bg-amber-100 text-amber-800 border-amber-300 font-semibold';
              } else {
                dotClass = 'bg-rose-100 text-rose-800 border-rose-300 font-semibold';
              }
            } else if (hasAnswered) {
              dotClass = 'bg-blue-100 text-blue-800 border-blue-300 font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs flex items-center justify-center border transition-all cursor-pointer tabular-nums ${dotClass}`}
                title={`Question ${idx + 1}: ${q.question}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question & Answer Workspace Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Question Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Technical / HR Question {currentIndex + 1}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ID: {currentQuestion.id}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4. Practice Mode: Text box for answering */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Your Answer (Practice Mode)</span>
              <span className="text-xs font-normal text-slate-400">
                Type your answer before viewing the solution
              </span>
            </label>
            <span className="text-xs text-slate-400 tabular-nums">
              {userText.length} characters
            </span>
          </div>

          <textarea
            rows={5}
            value={userText}
            onChange={(e) => onUpdateAnswer(currentQuestion.id, e.target.value)}
            placeholder="Formulate your explanation here as you would in an interview... (e.g. key definitions, trade-offs, real-world examples)"
            className="w-full p-4 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-sans text-sm leading-relaxed"
          />
        </div>

        {/* Show / Hide Answer Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <button
            onClick={() => onRevealAnswer(currentQuestion.id)}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              isAnswerRevealed
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAnswerRevealed ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide Answer</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show Answer</span>
              </>
            )}
          </button>

          {/* Quick status message */}
          <div className="text-xs text-slate-500">
            {isAnswerRevealed ? (
              <span className="text-blue-600 font-medium">
                Answer revealed. Rate your answer below to update your score!
              </span>
            ) : userText.trim().length > 0 ? (
              <span className="text-emerald-600 font-medium">
                Great! You wrote an answer. Click &quot;Show Answer&quot; to compare.
              </span>
            ) : (
              <span>Write your answer above for the most effective practice.</span>
            )}
          </div>
        </div>

        {/* Revealed Answer Box */}
        {isAnswerRevealed && (
          <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-6 space-y-6">
            {/* Model Answer Prose */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>Model Answer &amp; Explanation</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {currentQuestion.answer}
              </p>
            </div>

            {/* Bulleted Key Points */}
            {currentQuestion.keyPoints && currentQuestion.keyPoints.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-blue-100/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Concepts to Hit in an Interview
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {currentQuestion.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Code Snippet (if available) */}
            {currentQuestion.codeSnippet && (
              <div className="space-y-2 pt-2 border-t border-blue-100/70">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    <span>Reference Code Snippet</span>
                  </span>
                  <span className="font-mono text-slate-400">
                    {currentQuestion.subject}
                  </span>
                </div>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{currentQuestion.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Interviewer Tip */}
            {currentQuestion.interviewTips && (
              <div className="p-3.5 bg-white rounded-xl border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900">Interviewer Perspective:</span>{' '}
                  {currentQuestion.interviewTips}
                </div>
              </div>
            )}

            {/* Keyword hit assistant */}
            {userText.trim().length > 0 && keywordAnalysis.foundKeywords.length > 0 && (
              <div className="text-xs text-slate-600 pt-2 border-t border-blue-100/70 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-800">Keywords Detected:</span>
                {keywordAnalysis.foundKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-mono text-[11px]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {/* Self-Rating / Evaluation Buttons */}
            <div className="pt-4 border-t border-blue-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                How did your answer compare? (Self-Evaluation)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => onRateAnswer(currentQuestion.id, 'correct')}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    currentRating === 'correct'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Got It Right (+100%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRateAnswer(currentQuestion.id, 'partial')}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    currentRating === 'partial'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  <span>Partially Right (+50%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onRateAnswer(currentQuestion.id, 'incorrect')}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    currentRating === 'incorrect'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300 hover:bg-rose-50/50'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Need More Practice (+0%)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons: Previous / Next */}
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
              onClick={() => onFinishSession(elapsedSeconds)}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>Complete Interview</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
