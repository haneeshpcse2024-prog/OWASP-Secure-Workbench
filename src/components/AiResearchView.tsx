import React, { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertOctagon,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import {
  PROMPT_LIBRARY,
  VERIFICATION_MATRIX,
  DEMO_PLAN_STEPS,
  PromptItem,
  VerificationMatrixItem,
} from '../data/promptsAndVerification';

interface AiResearchViewProps {
  onOpenDemo: () => void;
}

export const AiResearchView: React.FC<AiResearchViewProps> = ({ onOpenDemo }) => {
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'prompts' | 'verification' | 'methodology' | 'demoPlan'>('prompts');
  const [matrixData, setMatrixData] = useState<VerificationMatrixItem[]>(VERIFICATION_MATRIX);

  const copyPrompt = (prompt: PromptItem) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: 'Pass' | 'Fail' | 'Pending') => {
    setMatrixData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, sampleStatus: newStatus } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <span>Academic Integrity & Governance</span>
              <span>·</span>
              <span>AI Research Hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              AI Prompt Library & Verification Audit
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Ethical AI research workflow for CSE students: Reusable defensive prompts, systematic hallucination and outdated-guidance testing matrix, and the official capstone demo plan.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenDemo}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors shadow-xs"
            >
              <Clock className="h-4 w-4" />
              <span>Launch 5-7 Min Demo</span>
            </button>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-3 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('prompts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'prompts'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Prompt Library (7 Prompts)
          </button>
          <button
            onClick={() => setActiveSubTab('verification')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'verification'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            AI Output Verification Matrix
          </button>
          <button
            onClick={() => setActiveSubTab('methodology')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'methodology'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Research Methodology & Sources
          </button>
          <button
            onClick={() => setActiveSubTab('demoPlan')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'demoPlan'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Capstone Demo Plan (5-7 Min)
          </button>
        </div>
      </div>

      {/* Prompts Tab */}
      {activeSubTab === 'prompts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Engineered prompts designed to guide AI tools toward defensive explanations without producing exploit payloads.
            </span>
            <span>Click any prompt to copy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROMPT_LIBRARY.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">
                      Prompt {prompt.id} · {prompt.category}
                    </span>
                    <button
                      onClick={() => copyPrompt(prompt)}
                      className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
                    >
                      {copiedPromptId === prompt.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedPromptId === prompt.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {prompt.title}
                  </h3>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                    {prompt.promptText}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                  <div className="text-slate-500">
                    <strong className="text-slate-700 dark:text-slate-300">Context:</strong> {prompt.usageContext}
                  </div>
                  <div className="text-sky-700 dark:text-sky-400">
                    <strong>Verification Tip:</strong> {prompt.verificationTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verification Matrix Tab */}
      {activeSubTab === 'verification' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                AI Output Verification Test Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tests conducted on model responses to ensure accuracy, verify primary citations, and confirm defensive safety.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2.5 px-3 font-semibold">Test Name</th>
                  <th className="py-2.5 px-3 font-semibold">What to Look For</th>
                  <th className="py-2.5 px-3 font-semibold">Expected Safe Behavior</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Notes / Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {matrixData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {item.testName}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs">
                      {item.whatToLookFor}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs">
                      {item.expectedSafeBehavior}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStatusChange(item.id, 'Pass')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.sampleStatus === 'Pass'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Fail')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.sampleStatus === 'Fail'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Methodology Tab */}
      {activeSubTab === 'methodology' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Research Methodology & Primary Sources
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Source-first research protocol designed for CSE students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                1. Six-Step Source-First Workflow
              </h3>
              <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-decimal pl-4">
                <li>Read the OWASP Top 10 category description and prevention principles.</li>
                <li>Cross-check secure development lifecycle guidance against NIST SSDF (SP 800-218).</li>
                <li>Check browser/DOM behavior against MDN Web Docs.</li>
                <li>Consult framework-specific documentation (e.g. Django, Express, Flask).</li>
                <li>Query AI tools using defensive prompts for conceptual clarity.</li>
                <li>Verify technical claims and code samples; reject unsupported suggestions.</li>
              </ol>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                2. Reliable Standards Register
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <li className="flex items-center justify-between">
                  <span>OWASP Top 10:2021 Portal</span>
                  <a href="https://owasp.org/Top10/" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                    <span>owasp.org</span> <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>OWASP Cheat Sheet Series</span>
                  <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                    <span>cheatsheets</span> <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>NIST SSDF SP 800-218</span>
                  <a href="https://csrc.nist.gov/pubs/sp/800/218/final" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                    <span>csrc.nist.gov</span> <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li className="flex items-center justify-between">
                  <span>MDN Web Security Standards</span>
                  <a href="https://developer.mozilla.org/en-US/docs/Web/Security" target="_blank" rel="noreferrer" className="text-sky-600 hover:underline flex items-center gap-1">
                    <span>developer.mozilla.org</span> <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Demo Plan Tab */}
      {activeSubTab === 'demoPlan' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Capstone Final Demo Plan (5–7 Minutes)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Structured timeline and speaking cues for presenting the capstone to evaluators.
              </p>
            </div>
            <button
              onClick={onOpenDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Launch Live Presenter Timer</span>
            </button>
          </div>

          <div className="space-y-3">
            {DEMO_PLAN_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    Step {step.step}: {step.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {step.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {step.script}
                </p>
                <div className="text-[11px] text-sky-700 dark:text-sky-400 pt-1">
                  <strong>Key Evaluator Action:</strong> {step.keyAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
