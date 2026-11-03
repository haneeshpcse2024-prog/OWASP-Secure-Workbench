import React, { useState } from 'react';
import {
  CheckSquare,
  AlertCircle,
  MinusCircle,
  Copy,
  Check,
  Download,
  Filter,
} from 'lucide-react';
import { CHECKLIST_ITEMS, ChecklistItem, ChecklistStatus } from '../data/checklistData';

export const ChecklistAuditView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [itemStatuses, setItemStatuses] = useState<Record<string, ChecklistStatus>>(() => {
    // Default initial mock statuses representing an active student audit
    const initial: Record<string, ChecklistStatus> = {};
    CHECKLIST_ITEMS.forEach((item, index) => {
      if (index < 6) initial[item.id] = 'pass';
      else if (index === 6 || index === 11) initial[item.id] = 'needs-work';
      else initial[item.id] = 'unreviewed';
    });
    return initial;
  });

  const [evidenceNotes, setEvidenceNotes] = useState<Record<string, string>>({
    'ac-1': 'Verified in Express authMiddleware.ts lines 24-40; rejects unauthenticated tokens with 401.',
    'ac-3': 'Enforced tenant filter owner_id = req.user.id on all queries.',
    'io-1': 'All SQL queries use pg / psycopg2 parameterized statements.',
    'io-3': 'Audited client code; removed all .innerHTML assignments in favor of textContent.',
  });

  const [copied, setCopied] = useState<boolean>(false);

  const categories = [
    'all',
    'Access control and identity',
    'Input, output, and data',
    'Configuration and dependencies',
    'Integrity, logging, and outbound requests',
    'Process and AI verification',
  ];

  const filteredItems = CHECKLIST_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleStatusChange = (id: string, status: ChecklistStatus) => {
    setItemStatuses((prev) => ({ ...prev, [id]: status }));
  };

  const handleNoteChange = (id: string, note: string) => {
    setEvidenceNotes((prev) => ({ ...prev, [id]: note }));
  };

  const passCount = Object.values(itemStatuses).filter((s) => s === 'pass').length;
  const needsWorkCount = Object.values(itemStatuses).filter((s) => s === 'needs-work').length;
  const naCount = Object.values(itemStatuses).filter((s) => s === 'na').length;
  const totalCount = CHECKLIST_ITEMS.length;
  const completionPercentage = Math.round(
    ((passCount + needsWorkCount + naCount) / totalCount) * 100
  );

  const generateMarkdownReport = (): string => {
    let md = `# Secure-Coding Audit Report\n\n`;
    md += `**Audit Summary:** ${passCount} Passed, ${needsWorkCount} Needs Work, ${naCount} N/A out of ${totalCount} criteria (${completionPercentage}% reviewed).\n\n`;

    categories
      .filter((c) => c !== 'all')
      .forEach((cat) => {
        md += `## ${cat}\n\n`;
        const items = CHECKLIST_ITEMS.filter((i) => i.category === cat);
        items.forEach((item) => {
          const status = itemStatuses[item.id] || 'unreviewed';
          const icon = status === 'pass' ? '[x] PASS' : status === 'needs-work' ? '[!] NEEDS WORK' : status === 'na' ? '[-] N/A' : '[ ] UNREVIEWED';
          const note = evidenceNotes[item.id] ? ` — Note: ${evidenceNotes[item.id]}` : '';
          md += `- ${icon}: ${item.criterion} (${item.owaspMapping})${note}\n`;
        });
        md += `\n`;
      });

    return md;
  };

  const copyReport = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdownReport()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'secure-coding-checklist-audit.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <span>Security Engineering Process</span>
              <span>·</span>
              <span>24 Verification Criteria</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Secure-Coding Checklist
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Use this checklist during architecture design, coding, pull request reviews, and capstone presentation preparation. Mark each item as Pass, Needs Work, or N/A and record verification evidence.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyReport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy Audit Report'}</span>
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Audit Metrics Strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div className="text-[11px] text-slate-500 font-medium">Review Progress</div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
              {completionPercentage}%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Passed</div>
            <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300 font-mono">
              {passCount} / {totalCount}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
            <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Needs Work</div>
            <div className="text-lg font-bold text-amber-800 dark:text-amber-300 font-mono">
              {needsWorkCount}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div className="text-[11px] text-slate-500 font-medium">Not Applicable</div>
            <div className="text-lg font-bold text-slate-700 dark:text-slate-300 font-mono">
              {naCount}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 text-slate-400 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            {cat === 'all' ? 'All 24 Criteria' : cat}
          </button>
        ))}
      </div>

      {/* Checklist Items Table / Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const status = itemStatuses[item.id] || 'unreviewed';
          const note = evidenceNotes[item.id] || '';

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs text-slate-500">{item.owaspMapping}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.criterion}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.guidance}
                  </p>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-start">
                  <button
                    onClick={() => handleStatusChange(item.id, 'pass')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                      status === 'pass'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <CheckSquare className="h-3.5 w-3.5" />
                    <span>Pass</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(item.id, 'needs-work')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                      status === 'needs-work'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>Needs Work</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(item.id, 'na')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                      status === 'na'
                        ? 'bg-slate-700 text-white border-slate-700'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <MinusCircle className="h-3.5 w-3.5" />
                    <span>N/A</span>
                  </button>
                </div>
              </div>

              {/* Evidence & Verification Notes input */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                  placeholder="Record evidence / commit hash / test link for this audit item..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
