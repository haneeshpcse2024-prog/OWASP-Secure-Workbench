import React from 'react';
import { X, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { OWASP_TOP_10 } from '../data/owaspGuide';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                OWASP Top 10:2021 — Beginner Cheat Sheet
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ten risk categories · Simple meaning · Defensive habit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/aistudio/owasp-top10-cheat-sheet_bb15785c.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Printable Card Style */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OWASP_TOP_10.map((cat) => (
              <div
                key={cat.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {cat.code} {cat.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {cat.cheatSheetSummary.habit}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  Risk: {cat.cheatSheetSummary.meaning}
                </p>
              </div>
            ))}
          </div>

          {/* Golden Core Principles Box */}
          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 text-xs text-sky-950 dark:text-sky-200 space-y-2">
            <div className="font-bold text-sky-900 dark:text-sky-100 uppercase tracking-wider text-[11px]">
              Remember: Defensive Coding Constitution
            </div>
            <p className="leading-relaxed">
              Validate on the server · Authorize every request · Parameterize queries · Encode output · Protect secrets outside Git · Update dependencies · Log events safely · Verify AI advice against official standards.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              Practice only on systems you own or approved training labs (e.g., OWASP Juice Shop / DVWA). AI output is a draft: verify against OWASP, NIST, MDN, and official framework documentation. Edition: OWASP Top 10:2021.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
