/**
 * Data structures for AI Interview Question Generator.
 * Structured cleanly using Java-compatible OOP concepts (Classes, Enums, ArrayList-style lists).
 */

export type Subject = 'Java' | 'C' | 'Python' | 'HR';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type EvaluationRating = 'correct' | 'partial' | 'incorrect' | 'unanswered';

export type AppMode = 'practice' | 'interview';

export interface Question {
  id: string;
  subject: Subject;
  difficulty: Difficulty;
  topic: string;
  question: string;
  answer: string;
  keyPoints: string[];
  codeSnippet?: string;
  interviewTips?: string;
}

export interface UserAnswerRecord {
  questionId: string;
  userText: string;
  revealedAnswer: boolean;
  evaluation: EvaluationRating;
  timeSpentSeconds: number;
}

export interface CandidateDetails {
  candidateName: string;
  targetRole: string;
  interviewerName: string;
  interviewDate: string;
}

export interface InterviewerAnswerRecord {
  questionId: string;
  candidateAnswer: string;
  interviewerNotes: string;
  rating: number; // 0 = unrated, 1..5
  timeSpentSeconds: number;
}

export interface GeneratorConfig {
  subject: Subject | 'All';
  difficulty: Difficulty | 'All';
  questionCount: number; // 5, 10, 15
}

export interface SessionResult {
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  partialCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  performanceGrade: 'Excellent' | 'Good' | 'Fair' | 'Needs Practice';
  performanceMessage: string;
  subject: Subject | 'All';
  difficulty: Difficulty | 'All';
}

export interface InterviewEvaluationReport {
  candidate: CandidateDetails;
  subject: Subject | 'All';
  difficulty: Difficulty | 'All';
  totalQuestions: number;
  ratedQuestionsCount: number;
  totalScore: number; // sum of ratings (out of totalQuestions * 5)
  maxPossibleScore: number; // totalQuestions * 5
  averageRating: number; // out of 5.0
  scorePercentage: number;
  recommendation: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Needs Further Review' | 'Do Not Hire';
  strengths: string[];
  areasForImprovement: string[];
  timeTakenSeconds: number;
  completedAt: string;
}
