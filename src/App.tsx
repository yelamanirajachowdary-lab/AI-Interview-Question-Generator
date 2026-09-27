import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { GeneratorForm } from './components/GeneratorForm';
import { InterviewSession } from './components/InterviewSession';
import { ScoreSection } from './components/ScoreSection';
import { InterviewConductSession } from './components/InterviewConductSession';
import { InterviewEvaluationReportView } from './components/InterviewEvaluationReportView';
import { QuestionBank } from './components/QuestionBankModal';
import { StudyGuide } from './components/StudyGuide';
import { Footer } from './components/Footer';
import {
  AppMode,
  CandidateDetails,
  Difficulty,
  EvaluationRating,
  GeneratorConfig,
  InterviewEvaluationReport,
  InterviewerAnswerRecord,
  Question,
  SessionResult,
  Subject,
  UserAnswerRecord,
} from './types/interview';
import { InterviewService } from './services/interviewService';

export default function App() {
  const [activeView, setActiveView] = useState<
    | 'home'
    | 'generator'
    | 'practice'
    | 'score'
    | 'interview-session'
    | 'interview-report'
    | 'bank'
    | 'guide'
  >('home');

  // Generator mode preference when opening generator
  const [generatorMode, setGeneratorMode] = useState<AppMode>('practice');

  // Common generator config
  const [currentConfig, setCurrentConfig] = useState<GeneratorConfig>({
    subject: 'Java',
    difficulty: 'Medium',
    questionCount: 5,
  });

  const [enableTimer, setEnableTimer] = useState<boolean>(true);

  // ==========================================
  // 1. PRACTICE MODE STATE (Unchanged)
  // ==========================================
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswerRecord>>({});
  const [practiceSummary, setPracticeSummary] = useState<SessionResult | null>(null);

  // ==========================================
  // 2. INTERVIEW MODE STATE (Separate)
  // ==========================================
  const [interviewQuestions, setInterviewQuestions] = useState<Question[]>([]);
  const [candidateDetails, setCandidateDetails] = useState<CandidateDetails>({
    candidateName: '',
    targetRole: 'Software Engineer',
    interviewerName: '',
    interviewDate: new Date().toISOString().split('T')[0],
  });
  const [interviewerAnswers, setInterviewerAnswers] = useState<
    Record<string, InterviewerAnswerRecord>
  >({});
  const [interviewReport, setInterviewReport] = useState<InterviewEvaluationReport | null>(
    null
  );

  // ==========================================
  // PRACTICE MODE HANDLERS
  // ==========================================
  const handleStartPracticeSession = (config: GeneratorConfig, withTimer: boolean = true) => {
    setCurrentConfig(config);
    setEnableTimer(withTimer);

    const questions = InterviewService.generateQuestions(config);
    setPracticeQuestions(questions);

    const initialRecords: Record<string, UserAnswerRecord> = {};
    questions.forEach((q) => {
      initialRecords[q.id] = {
        questionId: q.id,
        userText: '',
        revealedAnswer: false,
        evaluation: 'unanswered',
        timeSpentSeconds: 0,
      };
    });

    setUserAnswers(initialRecords);
    setPracticeSummary(null);
    setActiveView('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAnswerText = (questionId: string, text: string) => {
    setUserAnswers((prev) => {
      const existing = prev[questionId] || {
        questionId,
        userText: '',
        revealedAnswer: false,
        evaluation: 'unanswered',
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          userText: text,
        },
      };
    });
  };

  const handleRevealAnswer = (questionId: string) => {
    setUserAnswers((prev) => {
      const existing = prev[questionId] || {
        questionId,
        userText: '',
        revealedAnswer: false,
        evaluation: 'unanswered',
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          revealedAnswer: !existing.revealedAnswer,
        },
      };
    });
  };

  const handleRateAnswer = (questionId: string, rating: EvaluationRating) => {
    setUserAnswers((prev) => {
      const existing = prev[questionId] || {
        questionId,
        userText: '',
        revealedAnswer: true,
        evaluation: 'unanswered',
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          revealedAnswer: true,
          evaluation: rating,
        },
      };
    });
  };

  const handleFinishPracticeSession = (totalSeconds: number) => {
    const summary = InterviewService.calculateSessionResult(
      practiceQuestions,
      userAnswers,
      totalSeconds,
      currentConfig.subject,
      currentConfig.difficulty
    );
    setPracticeSummary(summary);
    setActiveView('score');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTryAgainPractice = () => {
    handleStartPracticeSession(currentConfig, enableTimer);
  };

  // ==========================================
  // INTERVIEW MODE HANDLERS
  // ==========================================
  const handleStartInterviewSession = (
    config: GeneratorConfig,
    candidate: CandidateDetails,
    withTimer: boolean = true
  ) => {
    setCurrentConfig(config);
    setCandidateDetails(candidate);
    setEnableTimer(withTimer);

    const questions = InterviewService.generateQuestions(config);
    setInterviewQuestions(questions);

    const initialAnswers: Record<string, InterviewerAnswerRecord> = {};
    questions.forEach((q) => {
      initialAnswers[q.id] = {
        questionId: q.id,
        candidateAnswer: '',
        interviewerNotes: '',
        rating: 0,
        timeSpentSeconds: 0,
      };
    });

    setInterviewerAnswers(initialAnswers);
    setInterviewReport(null);
    setActiveView('interview-session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCandidateAnswer = (questionId: string, answerText: string) => {
    setInterviewerAnswers((prev) => {
      const existing = prev[questionId] || {
        questionId,
        candidateAnswer: '',
        interviewerNotes: '',
        rating: 0,
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          candidateAnswer: answerText,
        },
      };
    });
  };

  const handleUpdateInterviewerNotes = (questionId: string, notesText: string) => {
    setInterviewerAnswers((prev) => {
      const existing = prev[questionId] || {
        questionId,
        candidateAnswer: '',
        interviewerNotes: '',
        rating: 0,
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          interviewerNotes: notesText,
        },
      };
    });
  };

  const handleRateQuestion = (questionId: string, rating: number) => {
    setInterviewerAnswers((prev) => {
      const existing = prev[questionId] || {
        questionId,
        candidateAnswer: '',
        interviewerNotes: '',
        rating: 0,
        timeSpentSeconds: 0,
      };
      return {
        ...prev,
        [questionId]: {
          ...existing,
          rating,
        },
      };
    });
  };

  const handleFinishInterviewSession = (totalSeconds: number) => {
    const report = InterviewService.calculateInterviewEvaluationReport(
      candidateDetails,
      interviewQuestions,
      interviewerAnswers,
      totalSeconds,
      currentConfig.subject,
      currentConfig.difficulty
    );
    setInterviewReport(report);
    setActiveView('interview-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick navigation helpers
  const handleOpenGenerator = (mode: AppMode = 'practice') => {
    setGeneratorMode(mode);
    setActiveView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickStartPractice = (
    subject: Subject,
    difficulty: Difficulty,
    count: number = 5
  ) => {
    handleStartPracticeSession({
      subject,
      difficulty,
      questionCount: count,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        activeView={
          activeView === 'score'
            ? 'practice'
            : activeView === 'interview-report'
            ? 'interview-session'
            : activeView
        }
        onNavigate={(view) => {
          setActiveView(view as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActivePracticeSession={practiceQuestions.length > 0}
        hasActiveInterviewSession={interviewQuestions.length > 0}
        onStartPractice={() => handleOpenGenerator('practice')}
        onStartInterview={() => handleOpenGenerator('interview')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6">
        {/* 1. HOME VIEW */}
        {activeView === 'home' && (
          <HeroHome
            onStartPractice={() => handleOpenGenerator('practice')}
            onStartInterview={() => handleOpenGenerator('interview')}
            onQuickStart={handleQuickStartPractice}
            onExploreBank={() => {
              setActiveView('bank');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 2. GENERATOR FORM (Select Subject, Difficulty, Count, Practice vs Interview Mode) */}
        {activeView === 'generator' && (
          <GeneratorForm
            initialConfig={currentConfig}
            initialMode={generatorMode}
            onGeneratePractice={handleStartPracticeSession}
            onGenerateInterview={handleStartInterviewSession}
            onBackToHome={() => setActiveView('home')}
          />
        )}

        {/* 3. PRACTICE MODE SESSION (Unchanged) */}
        {activeView === 'practice' && (
          <InterviewSession
            questions={practiceQuestions}
            userAnswers={userAnswers}
            onUpdateAnswer={handleUpdateAnswerText}
            onRevealAnswer={handleRevealAnswer}
            onRateAnswer={handleRateAnswer}
            onFinishSession={handleFinishPracticeSession}
            onExitSession={() => setActiveView('generator')}
            enableTimer={enableTimer}
          />
        )}

        {/* 4. PRACTICE MODE SCORE REPORT */}
        {activeView === 'score' && practiceSummary && (
          <ScoreSection
            summary={practiceSummary}
            questions={practiceQuestions}
            userAnswers={userAnswers}
            onTryAgain={handleTryAgainPractice}
            onNewSession={() => handleOpenGenerator('practice')}
            onOpenStudyGuide={() => {
              setActiveView('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 5. INTERVIEW MODE SESSION (New Interviewer Live Cockpit) */}
        {activeView === 'interview-session' && (
          <InterviewConductSession
            candidate={candidateDetails}
            questions={interviewQuestions}
            interviewerAnswers={interviewerAnswers}
            onUpdateAnswer={handleUpdateCandidateAnswer}
            onUpdateNotes={handleUpdateInterviewerNotes}
            onRateQuestion={handleRateQuestion}
            onFinishInterview={handleFinishInterviewSession}
            onExitInterview={() => handleOpenGenerator('interview')}
            enableTimer={enableTimer}
          />
        )}

        {/* 6. INTERVIEW EVALUATION REPORT VIEW */}
        {activeView === 'interview-report' && interviewReport && (
          <InterviewEvaluationReportView
            report={interviewReport}
            questions={interviewQuestions}
            interviewerAnswers={interviewerAnswers}
            onNewInterview={() => handleOpenGenerator('interview')}
            onSwitchToPractice={() => handleOpenGenerator('practice')}
          />
        )}

        {/* 7. QUESTION BANK */}
        {activeView === 'bank' && (
          <QuestionBank onStartWithConfig={handleQuickStartPractice} />
        )}

        {/* 8. STUDY GUIDE */}
        {activeView === 'guide' && (
          <StudyGuide
            onStartSubject={(sub) => {
              handleQuickStartPractice(sub, 'Medium', 5);
            }}
          />
        )}
      </main>

      {/* Clean Footer */}
      <Footer
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartPractice={() => handleOpenGenerator('practice')}
        onStartInterview={() => handleOpenGenerator('interview')}
      />
    </div>
  );
}
