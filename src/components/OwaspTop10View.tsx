import React, { useState } from 'react';
import {
  FileText,
  Search,
  ExternalLink,
  Shield,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { OWASP_TOP_10, OwaspCategory } from '../data/owaspGuide';

interface OwaspTop10ViewProps {
  onOpenCheatSheet: () => void;
}

export const OwaspTop10View: React.FC<OwaspTop10ViewProps> = ({ onOpenCheatSheet }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('a01');

  const filteredCategories = OWASP_TOP_10.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.oneLiner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCategory =
    OWASP_TOP_10.find((c) => c.id === selectedCategoryId) || OWASP_TOP_10[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <span>Beginner Framework Guide</span>
              <span>·</span>
              <span>OWASP Top 10:2021</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              A Beginner's Guide to Safer Web Coding
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Web applications accept information, store data, and interface with external systems. Explore the 10 core vulnerability categories, common beginner pitfalls, and practical defensive remedies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenCheatSheet}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors shadow-xs"
            >
              <FileText className="h-4 w-4" />
              <span>Open 1-Page Cheat Sheet</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search risks (e.g. SQL, access, passwords, ssrf)..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* 2-Column Explorer: List on Left (4 cols), Expanded Reading on Right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Categories List */}
        <div className="lg:col-span-4 space-y-2">
          {filteredCategories.map((cat) => {
            const isSelected = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 dark:border-sky-400 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                    {cat.code}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mt-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {cat.oneLiner}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Category Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                  {activeCategory.code}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {activeCategory.title}
                </h2>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                  {activeCategory.oneLiner}
                </p>
              </div>

              <a
                href="https://owasp.org/Top10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-sky-600 hover:underline shrink-0"
              >
                <span>OWASP Top 10</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Explanation Prose */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Detailed Guide & Technical Mechanics
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeCategory.summary}
              </p>
            </div>

            {/* Pitfall vs Defensive Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-rose-800 dark:text-rose-300">
                  <AlertTriangle className="h-4 w-4" />
                  <span>The Common Beginner Pitfall</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeCategory.commonMistake}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Defensive Habit & Prevention Rule</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeCategory.defensiveHabit}
                </p>
              </div>
            </div>

            {/* Golden Rule Callout */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
              <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  Golden Rule for {activeCategory.code}
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  "{activeCategory.keyRule}"
                </p>
              </div>
            </div>

            {/* Practical Learning Approach Box */}
            <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sky-900 dark:text-sky-300">
                <Lightbulb className="h-4 w-4 text-sky-600" />
                <span>How to practice responsibly</span>
              </div>
              <p className="leading-relaxed">
                Run examples only in local applications you own or in sanctioned educational training environments such as OWASP Juice Shop or DVWA. Never test public systems, classmates' accounts, or college networks without formal written authorization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
