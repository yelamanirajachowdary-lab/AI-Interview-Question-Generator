import {
  CandidateDetails,
  Difficulty,
  GeneratorConfig,
  InterviewEvaluationReport,
  InterviewerAnswerRecord,
  Question,
  SessionResult,
  Subject,
  UserAnswerRecord,
} from '../types/interview';
import { SAMPLE_QUESTIONS } from '../data/sampleQuestions';

/**
 * InterviewService provides core logic for filtering, generating,
 * evaluating, and scoring interview sessions.
 * Designed with Java-compatible algorithms (Fisher-Yates shuffle,
 * list filtering, state calculation) for seamless conceptual mapping.
 */
export class InterviewService {
  /**
   * Retrieves all questions from the repository.
   */
  public static getAllQuestions(): Question[] {
    return [...SAMPLE_QUESTIONS];
  }

  /**
   * Filters and shuffles questions according to user parameters.
   */
  public static generateQuestions(config: GeneratorConfig): Question[] {
    let pool = [...SAMPLE_QUESTIONS];

    // Filter by subject if not 'All'
    if (config.subject !== 'All') {
      pool = pool.filter((q) => q.subject === config.subject);
    }

    // Filter by difficulty if not 'All'
    if (config.difficulty !== 'All') {
      pool = pool.filter((q) => q.difficulty === config.difficulty);
    }

    // Fisher-Yates shuffle algorithm for randomization
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the requested count (or maximum available)
    const count = Math.min(config.questionCount, shuffled.length);
    return shuffled.slice(0, count);
  }

  /**
   * Analyzes student answer text against model answer & key points.
   * Provides quick match feedback to assist with self-evaluation.
   */
  public static checkKeywordMatch(
    userText: string,
    question: Question
  ): { matchRatio: number; foundKeywords: string[]; missingKeywords: string[] } {
    if (!userText || userText.trim().length === 0) {
      return { matchRatio: 0, foundKeywords: [], missingKeywords: [] };
    }

    const normalizedUser = userText.toLowerCase();

    // Extract significant terms from keyPoints
    const rawTokens: string[] = [];
    question.keyPoints.forEach((point) => {
      const words = point
        .replace(/[^a-zA-Z0-9_\s]/g, ' ')
        .split(/\s+/)
        .map((w) => w.trim().toLowerCase())
        .filter(
          (w) =>
            w.length > 3 &&
            ![
              'this', 'that', 'with', 'from', 'when', 'where', 'which', 'have',
              'they', 'their', 'only', 'also', 'than', 'more', 'used', 'into'
            ].includes(w)
        );
      rawTokens.push(...words);
    });

    const uniqueTokens = Array.from(new Set(rawTokens)).slice(0, 8);
    const foundKeywords: string[] = [];
    const missingKeywords: string[] = [];

    uniqueTokens.forEach((token) => {
      if (normalizedUser.includes(token)) {
        foundKeywords.push(token);
      } else {
        missingKeywords.push(token);
      }
    });

    const matchRatio = uniqueTokens.length > 0 ? foundKeywords.length / uniqueTokens.length : 0;
    return { matchRatio, foundKeywords, missingKeywords };
  }

  /**
   * Computes the complete session summary, score percentage, and feedback message.
   */
  public static calculateSessionResult(
    questions: Question[],
    answers: Record<string, UserAnswerRecord>,
    timeTakenSeconds: number,
    subject: Subject | 'All',
    difficulty: Difficulty | 'All'
  ): SessionResult {
    const totalQuestions = questions.length;
    let correctCount = 0;
    let partialCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let attemptedCount = 0;

    questions.forEach((q) => {
      const record = answers[q.id];
      if (!record || record.evaluation === 'unanswered' || !record.userText.trim()) {
        unansweredCount++;
      } else {
        attemptedCount++;
        if (record.evaluation === 'correct') {
          correctCount++;
        } else if (record.evaluation === 'partial') {
          partialCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    // Score calculation: 100% for correct, 50% for partial
    const rawScore = correctCount * 1.0 + partialCount * 0.5;
    const scorePercentage = totalQuestions > 0 ? Math.round((rawScore / totalQuestions) * 100) : 0;

    let performanceGrade: 'Excellent' | 'Good' | 'Fair' | 'Needs Practice' = 'Needs Practice';
    let performanceMessage = '';

    if (scorePercentage >= 85) {
      performanceGrade = 'Excellent';
      performanceMessage =
        'Outstanding job! You demonstrated strong conceptual clarity and comprehensive interview readiness.';
    } else if (scorePercentage >= 70) {
      performanceGrade = 'Good';
      performanceMessage =
        'Great work! You have a solid grasp of core fundamentals. Review the few tricky points to reach perfection.';
    } else if (scorePercentage >= 50) {
      performanceGrade = 'Fair';
      performanceMessage =
        'Good start! You understand several key ideas. Reinforce definitions and sample code before your real interview.';
    } else {
      performanceGrade = 'Needs Practice';
      performanceMessage =
        'Keep practicing! Focus on reviewing the question bank explanations and practice writing answers in your own words.';
    }

    return {
      totalQuestions,
      attemptedCount,
      correctCount,
      partialCount,
      incorrectCount,
      unansweredCount,
      scorePercentage,
      timeTakenSeconds,
      performanceGrade,
      performanceMessage,
      subject,
      difficulty,
    };
  }

  /**
   * Helper to format seconds into mm:ss display
   */
  public static formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Exports practice session summary as formatted text for copying/downloading.
   */
  public static generateExportText(
    summary: SessionResult,
    questions: Question[],
    answers: Record<string, UserAnswerRecord>
  ): string {
    const dateStr = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let output = `==========================================================\n`;
    output += `AI INTERVIEW QUESTION GENERATOR - PRACTICE SUMMARY REPORT\n`;
    output += `Date: ${dateStr}\n`;
    output += `Subject: ${summary.subject} | Difficulty: ${summary.difficulty}\n`;
    output += `Total Questions: ${summary.totalQuestions} | Attempted: ${summary.attemptedCount}\n`;
    output += `Score: ${summary.scorePercentage}% (${summary.performanceGrade})\n`;
    output += `Time Spent: ${this.formatTime(summary.timeTakenSeconds)}\n`;
    output += `Feedback: ${summary.performanceMessage}\n`;
    output += `==========================================================\n\n`;

    questions.forEach((q, idx) => {
      const rec = answers[q.id];
      const status = rec ? rec.evaluation.toUpperCase() : 'UNANSWERED';
      output += `Q${idx + 1} [${q.subject} - ${q.difficulty}]: ${q.question}\n`;
      output += `Topic: ${q.topic}\n`;
      output += `Your Self-Rating: ${status}\n`;
      output += `Your Answer:\n${rec?.userText ? rec.userText : '(No answer typed)'}\n\n`;
      output += `Model Answer:\n${q.answer}\n`;
      if (q.keyPoints.length > 0) {
        output += `Key Points:\n${q.keyPoints.map((p) => `  - ${p}`).join('\n')}\n`;
      }
      if (q.interviewTips) {
        output += `Interview Tip: ${q.interviewTips}\n`;
      }
      output += `----------------------------------------------------------\n\n`;
    });

    return output;
  }

  /**
   * Calculates the complete evaluation report for an interviewer-led Interview Mode session.
   */
  public static calculateInterviewEvaluationReport(
    candidate: CandidateDetails,
    questions: Question[],
    answers: Record<string, InterviewerAnswerRecord>,
    timeTakenSeconds: number,
    subject: Subject | 'All',
    difficulty: Difficulty | 'All'
  ): InterviewEvaluationReport {
    const totalQuestions = questions.length;
    let totalScore = 0;
    let ratedQuestionsCount = 0;
    const strengths: string[] = [];
    const areasForImprovement: string[] = [];

    questions.forEach((q) => {
      const record = answers[q.id];
      if (record && record.rating > 0) {
        ratedQuestionsCount++;
        totalScore += record.rating;

        if (record.rating >= 4) {
          const noteExcerpt = record.interviewerNotes.trim()
            ? ` - "${record.interviewerNotes.trim()}"`
            : '';
          strengths.push(`Strong mastery in ${q.topic} (${q.subject}, Rating: ${record.rating}/5)${noteExcerpt}`);
        } else if (record.rating <= 2) {
          const noteExcerpt = record.interviewerNotes.trim()
            ? ` - "${record.interviewerNotes.trim()}"`
            : '';
          areasForImprovement.push(
            `Needs review on ${q.topic} (${q.subject}, Rating: ${record.rating}/5)${noteExcerpt}`
          );
        } else if (record.rating === 3) {
          // Average rating
          if (record.interviewerNotes.trim()) {
            areasForImprovement.push(
              `${q.topic}: ${record.interviewerNotes.trim()} (Rating: 3/5)`
            );
          }
        }
      } else {
        areasForImprovement.push(`Unrated/Skipped question on ${q.topic} (${q.subject})`);
      }
    });

    const maxPossibleScore = totalQuestions * 5;
    const scorePercentage =
      maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    const averageRating =
      totalQuestions > 0 ? parseFloat((totalScore / totalQuestions).toFixed(1)) : 0;

    // Determine default recommendation based on percentage
    let recommendation: 'Strong Hire' | 'Hire' | 'Lean Hire' | 'Needs Further Review' | 'Do Not Hire' =
      'Needs Further Review';

    if (scorePercentage >= 85) {
      recommendation = 'Strong Hire';
    } else if (scorePercentage >= 70) {
      recommendation = 'Hire';
    } else if (scorePercentage >= 55) {
      recommendation = 'Lean Hire';
    } else if (scorePercentage >= 40) {
      recommendation = 'Needs Further Review';
    } else {
      recommendation = 'Do Not Hire';
    }

    if (strengths.length === 0) {
      strengths.push('Candidate showed consistent effort throughout the interview questions.');
    }
    if (areasForImprovement.length === 0) {
      areasForImprovement.push('No critical gaps identified; candidate met high technical standards.');
    }

    const dateStr = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      candidate,
      subject,
      difficulty,
      totalQuestions,
      ratedQuestionsCount,
      totalScore,
      maxPossibleScore,
      averageRating,
      scorePercentage,
      recommendation,
      strengths,
      areasForImprovement,
      timeTakenSeconds,
      completedAt: dateStr,
    };
  }

  /**
   * Generates a comprehensive plain text export for the Interview Evaluation Report.
   */
  public static generateInterviewReportText(
    report: InterviewEvaluationReport,
    questions: Question[],
    answers: Record<string, InterviewerAnswerRecord>
  ): string {
    let output = `======================================================================\n`;
    output += `OFFICIAL CANDIDATE INTERVIEW EVALUATION REPORT\n`;
    output += `Generated by AI Interview Question Generator\n`;
    output += `======================================================================\n\n`;

    output += `1. CANDIDATE & SESSION DETAILS\n`;
    output += `----------------------------------------------------------------------\n`;
    output += `Candidate Name    : ${report.candidate.candidateName || 'N/A'}\n`;
    output += `Target Role       : ${report.candidate.targetRole || 'N/A'}\n`;
    output += `Interviewer       : ${report.candidate.interviewerName || 'N/A'}\n`;
    output += `Interview Date    : ${report.candidate.interviewDate || report.completedAt}\n`;
    output += `Subject Domain    : ${report.subject} (${report.difficulty})\n`;
    output += `Duration          : ${this.formatTime(report.timeTakenSeconds)}\n\n`;

    output += `2. EVALUATION & SCORING SUMMARY\n`;
    output += `----------------------------------------------------------------------\n`;
    output += `Overall Score     : ${report.totalScore} / ${report.maxPossibleScore} (${report.scorePercentage}%)\n`;
    output += `Average Rating    : ${report.averageRating.toFixed(1)} / 5.0\n`;
    output += `Questions Rated   : ${report.ratedQuestionsCount} of ${report.totalQuestions}\n`;
    output += `Recommendation    : [ ${report.recommendation.toUpperCase()} ]\n\n`;

    output += `3. CANDIDATE STRENGTHS\n`;
    output += `----------------------------------------------------------------------\n`;
    report.strengths.forEach((s, idx) => {
      output += `  ${idx + 1}. ${s}\n`;
    });
    output += `\n`;

    output += `4. AREAS FOR IMPROVEMENT / GAP ANALYSIS\n`;
    output += `----------------------------------------------------------------------\n`;
    report.areasForImprovement.forEach((a, idx) => {
      output += `  ${idx + 1}. ${a}\n`;
    });
    output += `\n`;

    output += `5. DETAILED QUESTION EVALUATION\n`;
    output += `----------------------------------------------------------------------\n`;
    questions.forEach((q, idx) => {
      const rec = answers[q.id];
      const ratingStr = rec && rec.rating > 0 ? `${rec.rating} / 5 Stars` : 'Unrated';
      output += `Question #${idx + 1} [${q.subject} - ${q.difficulty} - ${q.topic}]:\n`;
      output += `"${q.question}"\n\n`;
      output += `Candidate's Response:\n${rec?.candidateAnswer ? rec.candidateAnswer : '(No response recorded)'}\n\n`;
      output += `Interviewer Rating: ${ratingStr}\n`;
      output += `Interviewer Notes :\n${rec?.interviewerNotes ? rec.interviewerNotes : '(No notes entered)'}\n\n`;
      output += `Benchmark Solution Summary:\n${q.answer}\n`;
      output += `----------------------------------------------------------------------\n\n`;
    });

    output += `======================================================================\n`;
    output += `END OF EVALUATION REPORT\n`;
    output += `======================================================================\n`;

    return output;
  }
}
