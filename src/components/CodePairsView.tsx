import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Play,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { CODE_PAIRS, CodePair } from '../data/codePairs';

interface CodePairsViewProps {
  onSendToScanner: (code: string) => void;
}

export const CodePairsView: React.FC<CodePairsViewProps> = ({ onSendToScanner }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentPair: CodePair = CODE_PAIRS[selectedPairIndex];

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
          <span>Defensive Architecture</span>
          <span>·</span>
          <span>Before & After Analysis</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Five Insecure vs. Secure Defensive Code Pairs
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
          Side-by-side comparative analysis of common web vulnerabilities and their hardened defensive replacements. Each pair highlights the exact mechanism of vulnerability and the architectural reason why the defensive pattern remains secure.
        </p>
      </div>

      {/* Pair Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {CODE_PAIRS.map((pair, index) => {
          const isSelected = selectedPairIndex === index;
          return (
            <button
              key={pair.id}
              onClick={() => setSelectedPairIndex(index)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-all text-left ${
                isSelected
                  ? 'border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-400 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
                Pair {pair.pairNumber}
              </div>
              <div className="font-semibold">{pair.topic}</div>
            </button>
          );
        })}
      </div>

      {/* Main Pair Details Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
        {/* Pair Header & Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Pair {currentPair.pairNumber}: {currentPair.title}
              </span>
              <span>·</span>
              <span className="font-mono text-sky-600 dark:text-sky-400">{currentPair.cwe}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
              {currentPair.topic}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {currentPair.owaspCategory}
            </span>
          </div>
        </div>

        {/* Risk Summary Banner */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-slate-100">Risk Profile: </span>
          {currentPair.riskSummary}
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Insecure Code */}
          <div className="border border-rose-200 dark:border-rose-900/60 rounded-xl overflow-hidden bg-rose-50/20 dark:bg-rose-950/10 space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                <ShieldAlert className="h-4 w-4" />
                <span>Insecure Pattern (Do Not Use)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentPair.insecureCode, `insecure-${currentPair.id}`)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  {copiedKey === `insecure-${currentPair.id}` ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => onSendToScanner(currentPair.insecureCode)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-400 hover:underline"
                  title="Send to Heuristic Scanner"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Test in Scanner</span>
                </button>
              </div>
            </div>

            <pre className="p-3.5 rounded-lg bg-slate-950 text-rose-200 text-xs font-mono overflow-x-auto leading-relaxed border border-rose-950">
              <code>{currentPair.insecureCode}</code>
            </pre>

            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-rose-800 dark:text-rose-300">
                Why this is vulnerable:
              </span>
              <p className="leading-relaxed">{currentPair.insecureExplanation}</p>
            </div>
          </div>

          {/* Right: Secure Code */}
          <div className="border border-emerald-200 dark:border-emerald-900/60 rounded-xl overflow-hidden bg-emerald-50/20 dark:bg-emerald-950/10 space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Defensive Pattern (Safe)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(currentPair.secureCode, `secure-${currentPair.id}`)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  {copiedKey === `secure-${currentPair.id}` ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => onSendToScanner(currentPair.secureCode)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                  title="Send to Heuristic Scanner"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Test in Scanner</span>
                </button>
              </div>
            </div>

            <pre className="p-3.5 rounded-lg bg-slate-950 text-emerald-300 text-xs font-mono overflow-x-auto leading-relaxed border border-emerald-950">
              <code>{currentPair.secureCode}</code>
            </pre>

            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                Why this is secure:
              </span>
              <p className="leading-relaxed">{currentPair.secureExplanation}</p>
            </div>
          </div>
        </div>

        {/* Core Benefit & Verification Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50">
          <div className="text-xs text-sky-900 dark:text-sky-200">
            <span className="font-bold">Architectural Benefit: </span>
            {currentPair.benefit}
          </div>

          <a
            href={currentPair.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline shrink-0"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Verify in {currentPair.verificationSource}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Quick Nav Footer between pairs */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            disabled={selectedPairIndex === 0}
            onClick={() => setSelectedPairIndex((prev) => Math.max(0, prev - 1))}
            className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            ← Previous Pair
          </button>
          <span className="text-slate-400">
            Pair {selectedPairIndex + 1} of {CODE_PAIRS.length}
          </span>
          <button
            disabled={selectedPairIndex === CODE_PAIRS.length - 1}
            onClick={() => setSelectedPairIndex((prev) => Math.min(CODE_PAIRS.length - 1, prev + 1))}
            className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Next Pair →
          </button>
        </div>
      </div>
    </div>
  );
};
