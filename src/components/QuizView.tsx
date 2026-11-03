import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';

export const QuizView: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showReviewAll, setShowReviewAll] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQ.id];
  const isAnswered = selectedAnswer !== undefined;

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;

  const score = Object.entries(userAnswers).reduce((acc, [qId, ans]) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === Number(qId));
    return question && question.correctAnswer === ans ? acc + 1 : acc;
  }, 0);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return; // Prevent changing after answer
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowReviewAll(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <span>Knowledge Check</span>
              <span>·</span>
              <span>10 Assessment Questions</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              OWASP Top 10 Security Assessment
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Evaluate your understanding of defensive web application security, SQL injection prevention, safe output encoding, authentication vs. authorization, and AI verification ethics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-500">Progress Score</div>
              <div className="text-lg font-bold font-mono text-sky-600 dark:text-sky-400 tabular-nums">
                {score} / {answeredCount} ({totalQuestions} Total)
              </div>
            </div>
            <button
              onClick={handleResetQuiz}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              title="Reset Quiz"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-sky-600 dark:bg-sky-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Question Dots */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-2">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const answered = userAnswers[q.id];
            const isCorrect = answered && answered === q.correctAnswer;
            const isWrong = answered && answered !== q.correctAnswer;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestionIndex(idx);
                  setShowReviewAll(false);
                }}
                className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'ring-2 ring-sky-500 font-bold'
                    : ''
                } ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : isWrong
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    : answered
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-800'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {q.id}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowReviewAll(!showReviewAll)}
          className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline whitespace-nowrap shrink-0"
        >
          {showReviewAll ? 'Show Single Question' : 'View All 10 Questions'}
        </button>
      </div>

      {/* Single Question Mode */}
      {!showReviewAll ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Question {currentQ.id} of {totalQuestions}
            </span>
            <span className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {currentQ.owaspCategory}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option.key;
              const isCorrectOption = option.key === currentQ.correctAnswer;

              let optionClasses =
                'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700';

              if (isAnswered) {
                if (isCorrectOption) {
                  optionClasses =
                    'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500 font-medium';
                } else if (isSelected) {
                  optionClasses =
                    'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
                } else {
                  optionClasses = 'border-slate-200 dark:border-slate-800 opacity-60';
                }
              }

              return (
                <button
                  key={option.key}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option.key)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${optionClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {option.key}
                    </span>
                    <span className="text-sm font-medium">{option.text}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isCorrectOption ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Visible once answered) */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 transition-all ${
                selectedAnswer === currentQ.correctAnswer
                  ? 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200'
                  : 'border-rose-200 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/20 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Correct! Correct answer is {currentQ.correctAnswer}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span>Incorrect. The correct answer is {currentQ.correctAnswer}</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed opacity-90 pl-6">{currentQ.explanation}</p>
            </div>
          )}

          {/* Question Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {answeredCount === totalQuestions && (
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Award className="h-4 w-4" />
                <span>Quiz Complete! Final Score: {score} / 10 ({Math.round((score / 10) * 100)}%)</span>
              </div>
            )}

            <button
              disabled={currentQuestionIndex === totalQuestions - 1}
              onClick={() => setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span>Next Question</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Review All Mode */
        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q) => {
            const answered = userAnswers[q.id];
            const isCorrect = answered && answered === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {q.id}. {q.question}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {q.owaspCategory}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`p-2.5 rounded-lg border ${
                        opt.key === q.correctAnswer
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-medium'
                          : answered === opt.key
                          ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30 text-rose-800'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{opt.key}.</span>
                      {opt.text}
                      {opt.key === q.correctAnswer && ' (Correct Answer)'}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Rationale: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
