import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { DEMO_PLAN_STEPS } from '../data/promptsAndVerification';

interface DemoPresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string) => void;
}

export const DemoPresenterModal: React.FC<DemoPresenterModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && isOpen) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isOpen]);

  if (!isOpen) return null;

  const currentStep = DEMO_PLAN_STEPS[currentStepIndex];

  const formatTime = (totalSec: number): string => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTargetTabForStep = (stepNumber: number): string => {
    switch (stepNumber) {
      case 1:
        return 'research';
      case 2:
        return 'owasp-top10';
      case 3:
        return 'code-pairs';
      case 4:
        return 'scanner';
      case 5:
        return 'checklist';
      case 6:
        return 'research';
      default:
        return 'scanner';
    }
  };

  const handleGoToFeature = () => {
    const target = getTargetTabForStep(currentStep.step);
    onNavigateTab(target);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Capstone Demo Mode (5–7 Minutes)
              </h2>
              <span className="text-xs text-slate-500">
                Step {currentStep.step} of {DEMO_PLAN_STEPS.length} · Target: {currentStep.duration}
              </span>
            </div>
          </div>

          {/* Live Timer Controls */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-sm font-bold text-sky-600 dark:text-sky-400 tabular-nums">
              {formatTime(secondsElapsed)}
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
              title={isTimerRunning ? 'Pause timer' : 'Start timer'}
            >
              {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
            </button>

            <button
              onClick={() => {
                setSecondsElapsed(0);
                setIsTimerRunning(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Demo Talking Point
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {currentStep.title}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentStep.script}
          </div>

          <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-xs text-sky-900 dark:text-sky-300">
            <strong>Key Evaluator Takeaway: </strong>
            {currentStep.keyAction}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleGoToFeature}
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>Jump to this feature tab in workbench</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-1">
            {DEMO_PLAN_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentStepIndex === idx
                    ? 'bg-sky-600 w-6'
                    : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentStepIndex === DEMO_PLAN_STEPS.length - 1}
            onClick={() =>
              setCurrentStepIndex((prev) => Math.min(DEMO_PLAN_STEPS.length - 1, prev + 1))
            }
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
