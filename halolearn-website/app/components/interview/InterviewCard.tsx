'use client';

import { InterviewQuestion } from '../../data/interviewQuestions';

interface InterviewCardProps {
  question: InterviewQuestion;
  isFree: boolean;
  isRevealed: boolean;
  onToggle: () => void;
  index: number;
}

export default function InterviewCard({
  question,
  isFree,
  isRevealed,
  onToggle,
  index,
}: InterviewCardProps) {
  const typeColors: Record<InterviewQuestion['type'], string> = {
    'Opening': 'bg-blue-100 text-blue-700',
    'Behavioral': 'bg-green-100 text-green-700',
    'Situational': 'bg-orange-100 text-orange-700',
    'Technical': 'bg-red-100 text-red-700',
    'Competency': 'bg-purple-100 text-purple-700',
  };

  const difficultyColors: Record<InterviewQuestion['difficulty'], string> = {
    'Mudah': 'bg-green-50 text-green-700',
    'Sedang': 'bg-yellow-50 text-yellow-700',
    'Sulit': 'bg-red-50 text-red-700',
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition">
      {/* Question Header */}
      <div
        className="p-6 cursor-pointer hover:bg-slate-50 transition bg-white"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Q{index + 1}
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColors[question.type]}`}>
                {question.type}
              </span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColors[question.difficulty]}`}>
                {question.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {question.question}
            </h3>
          </div>
          <div className="flex-shrink-0 text-2xl">
            {isFree ? (
              <span className="text-green-600">✓</span>
            ) : (
              <span className="text-slate-400">🔒</span>
            )}
          </div>
        </div>

        {/* Reveal Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`text-sm font-medium px-4 py-2 rounded-lg transition ${
            isRevealed
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isRevealed ? '✓ Sembunyikan' : '👁 Lihat Jawaban'}
        </button>
      </div>

      {/* Answer Section - revealed with smooth animation */}
      {isRevealed && (
        <div className="border-t border-slate-200 bg-slate-50 p-6 animate-in fade-in slide-in-from-top-2">
          {/* Model Answer */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Jawaban Model
            </h4>
            <p className="text-slate-700 leading-relaxed">
              {question.modelAnswer}
            </p>
          </div>

          {/* Strategy */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Penjelasan Strategi
            </h4>
            <p className="text-slate-700 leading-relaxed text-sm">
              {question.strategy}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
