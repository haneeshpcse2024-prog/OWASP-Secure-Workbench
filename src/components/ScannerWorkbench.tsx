import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  HelpCircle,
  FileCode,
  Sparkles,
} from 'lucide-react';
import {
  PRESET_SNIPPETS,
  SCANNER_RULES,
  runChecklistScan,
  ScanFinding,
  PresetSnippet,
} from '../data/scannerRules';

interface ScannerWorkbenchProps {
  initialCode?: string;
  onJumpToPairs?: () => void;
}

export const ScannerWorkbench: React.FC<ScannerWorkbenchProps> = ({
  initialCode,
  onJumpToPairs,
}) => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('pair1-insecure');
  const [code, setCode] = useState<string>(
    initialCode || PRESET_SNIPPETS[0].code
  );
  const [findings, setFindings] = useState<ScanFinding[]>([]);
  const [hasScanned, setHasScanned] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'rules' | 'pythonScript'>('scan');

  const selectedSnippet = PRESET_SNIPPETS.find((s) => s.id === selectedSnippetId);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setFindings(runChecklistScan(initialCode));
      setHasScanned(true);
    } else {
      handleScan(code);
    }
  }, [initialCode]);

  const handleSelectSnippet = (snippet: PresetSnippet) => {
    setSelectedSnippetId(snippet.id);
    setCode(snippet.code);
    const results = runChecklistScan(snippet.code);
    setFindings(results);
    setHasScanned(true);
  };

  const handleScan = (customCode?: string) => {
    const targetCode = customCode !== undefined ? customCode : code;
    const results = runChecklistScan(targetCode);
    setFindings(results);
    setHasScanned(true);
  };

  const handleReset = () => {
    if (selectedSnippet) {
      setCode(selectedSnippet.code);
      handleScan(selectedSnippet.code);
    } else {
      setCode(PRESET_SNIPPETS[0].code);
      handleScan(PRESET_SNIPPETS[0].code);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
              <span>Capstone 4 Static Heuristic Engine</span>
              <span>·</span>
              <span>Teaching Aid</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Checklist Scanner
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Simulates the Python <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-sky-600 dark:text-sky-400 font-mono">checklist_scan.py</code> script in real time. Test insecure vs. defensive code snippets, inspect regex pattern triggers, and understand why heuristic scans must always be paired with human code review.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('scan')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'scan'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Interactive Scanner
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'rules'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Scanner Rules ({SCANNER_RULES.length})
            </button>
            <button
              onClick={() => setActiveTab('pythonScript')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'pythonScript'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Python Script
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'scan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Preset Selector & Code Editor (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Preset Snippets Picker */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Load Preset Test Case
                </span>
                <span className="text-xs text-slate-500">
                  Select a snippet to test the detector
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_SNIPPETS.map((snippet) => {
                  const isSelected = selectedSnippetId === snippet.id;
                  const isInsecure = snippet.type === 'insecure';
                  return (
                    <button
                      key={snippet.id}
                      onClick={() => handleSelectSnippet(snippet)}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 dark:border-sky-400'
                          : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {snippet.name}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ml-1 ${
                            isInsecure
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}
                        >
                          {isInsecure ? 'Vulnerable' : 'Defensive'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {snippet.category}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Source Code Inspector
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ({lines.length} lines)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors ml-2"
                    title="Reset to default"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    handleScan(e.target.value);
                  }}
                  rows={14}
                  className="w-full p-4 font-mono text-xs sm:text-sm bg-slate-950 text-slate-100 border-none outline-none resize-y leading-relaxed"
                  placeholder="Paste or write your Python / JavaScript / HTML code here to scan..."
                  spellCheck={false}
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedSnippet?.notes}
                </div>
                <button
                  onClick={() => handleScan()}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 rounded-lg transition-colors shrink-0 shadow-sm"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Execute Heuristic Scan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Scan Findings & Analysis (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Scan Status Summary Card */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                findings.length > 0
                  ? 'border-rose-200 bg-rose-50/60 dark:border-rose-900/50 dark:bg-rose-950/30'
                  : 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/50 dark:bg-emerald-950/30'
              }`}
            >
              <div className="flex items-start gap-3">
                {findings.length > 0 ? (
                  <div className="p-2 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-sm font-bold ${
                      findings.length > 0
                        ? 'text-rose-900 dark:text-rose-200'
                        : 'text-emerald-900 dark:text-emerald-200'
                    }`}
                  >
                    {findings.length > 0
                      ? `${findings.length} Suspicious Pattern${findings.length > 1 ? 's' : ''} Detected`
                      : 'No Configured Patterns Detected'}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {findings.length > 0
                      ? 'The scanner detected regex patterns associated with known security risks. Manual review is required.'
                      : 'No configured regex matched. Notice: A clean scan does NOT prove the code is secure (e.g., missing server validation or missing auth checks are logic flaws invisible to regex).'}
                  </p>
                </div>
              </div>
            </div>

            {/* Findings List */}
            {findings.length > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Detected Findings ({findings.length})
                </span>
                {findings.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                          Line {item.lineNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {item.ruleTitle}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">
                        {item.severity} Risk
                      </span>
                    </div>

                    <div className="p-2 rounded bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto">
                      <code>{item.lineContent}</code>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-sky-700 dark:text-sky-400">Remediation:</span>{' '}
                      {item.advice}
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                      Mapped to: <span className="font-medium text-slate-700 dark:text-slate-300">{item.owaspCategory}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-5 text-center space-y-3">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Clean Scan Buffer
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Try loading <span className="font-medium text-slate-700 dark:text-slate-300">Pair 1 (SQL Concatenation)</span> or <span className="font-medium text-slate-700 dark:text-slate-300">Pair 2 (Untrusted innerHTML)</span> from presets above to see the heuristic rule trigger.
                </p>
                {onJumpToPairs && (
                  <button
                    onClick={onJumpToPairs}
                    className="inline-flex items-center text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium"
                  >
                    View side-by-side code pairs →
                  </button>
                )}
              </div>
            )}

            {/* Teaching Limitation Callout */}
            <div className="border border-amber-200 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/20 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                <HelpCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span>Heuristic Scanner Educational Note</span>
              </div>
              <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                Notice how <strong>Pair 3 (Client-only validation)</strong> and <strong>Pair 4 (Unchecked IDOR lookup)</strong> show <em>zero findings</em> on the insecure versions. Why? Because missing business logic cannot be detected by a simple regular expression. Real security requires contextual threat modeling, architecture review, and comprehensive tests.
              </p>
            </div>

            {/* Terminal Command Quick Reference */}
            <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-sky-600" />
                  <span>Run Scanner in Shell</span>
                </span>
                <button
                  onClick={() => copyCommand('python scripts/checklist_scan.py --path snippets')}
                  className="flex items-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                >
                  {copiedCmd ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-2.5 rounded bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto">
                <code>python scripts/checklist_scan.py --path snippets</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Configured Heuristic Detection Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              These 4 rules are implemented in <code className="font-mono text-xs">checklist_scan.py</code>. Each checks for a specific text pattern that often indicates an unsafe defensive pattern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCANNER_RULES.map((rule) => (
              <div
                key={rule.id}
                className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-2.5 bg-slate-50/40 dark:bg-slate-800/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {rule.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    {rule.severity}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 uppercase font-medium">
                    Regular Expression
                  </span>
                  <pre className="p-2 rounded bg-slate-950 text-amber-300 text-xs font-mono overflow-x-auto">
                    <code>{rule.patternString}</code>
                  </pre>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Advice:</span>{' '}
                  {rule.advice}
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                  OWASP: <span className="font-medium text-slate-700 dark:text-slate-300">{rule.owaspCategory}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Python Script Tab */}
      {activeTab === 'pythonScript' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Source: scripts/checklist_scan.py
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Standard library Python 3.9+ script with zero external dependencies.
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`#!/usr/bin/env python3
"""Tiny teaching aid: heuristic checks for a few risky code patterns.
This is NOT a security scanner. It scans text files and may miss issues or
report false positives. Never use its output as proof that code is secure.
"""
import argparse
from pathlib import Path
import re
import sys

RULES = [
    ("SQL string concatenation", re.compile(r"""execute\\s*\\(\\s*["'][^"']*\\s*\\+\\s*[A-Za-z_]""", re.I),
     "Review query construction; use driver-supported parameterized queries."),
    ("Untrusted HTML insertion", re.compile(r"""\\.innerHTML\\s*=""", re.I),
     "For plain text, use textContent; for rich HTML, use a vetted sanitizer."),
    ("Possible hard-coded secret", re.compile(r"""(?i)(password|secret|api[_-]?key)\\s*=\\s*["'][^"']{4,}["']"""),
     "Move secrets to environment configuration or a secret manager."),
    ("Possible eval usage", re.compile(r"""\\beval\\s*\\(""", re.I),
     "Avoid evaluating dynamic strings; use explicit parsing and safe APIs."),
]

EXTENSIONS = {".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".php", ".html"}

def scan_file(path):
    findings = []
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as exc:
        print(f"Could not read {path}: {exc}", file=sys.stderr)
        return findings
    for number, line in enumerate(lines, 1):
        for title, pattern, advice in RULES:
            if pattern.search(line):
                findings.append((path, number, title, advice))
    return findings

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", default=".", help="File or directory to scan")
    args = parser.parse_args()
    target = Path(args.path)
    if not target.exists():
        parser.error(f"path does not exist: {target}")
    files = [target] if target.is_file() else [
        p for p in target.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONS
    ]
    findings = []
    for file in files:
        findings.extend(scan_file(file))
    if findings:
        print("Potential issues (manual review required):")
        for path, line, title, advice in findings:
            print(f"- {path}:{line}: {title}\\n  Advice: {advice}")
    else:
        print("No configured patterns detected. This does NOT mean the code is secure.")
    print("\\nLimitations: pattern-based only; false positives and false negatives are expected.")
    return 1 if findings else 0

if __name__ == "__main__":
    raise SystemExit(main())`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 rounded-lg transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied script' : 'Copy script'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed max-h-[500px]">
{`#!/usr/bin/env python3
"""Tiny teaching aid: heuristic checks for a few risky code patterns.

This is NOT a security scanner. It scans text files and may miss issues or
report false positives. Never use its output as proof that code is secure.
"""
import argparse
from pathlib import Path
import re
import sys

RULES = [
    ("SQL string concatenation", re.compile(r"""execute\\s*\\(\\s*["'][^"']*\\s*\\+\\s*[A-Za-z_]""", re.I),
     "Review query construction; use driver-supported parameterized queries."),
    ("Untrusted HTML insertion", re.compile(r"""\\.innerHTML\\s*=""", re.I),
     "For plain text, use textContent; for rich HTML, use a vetted sanitizer."),
    ("Possible hard-coded secret", re.compile(r"""(?i)(password|secret|api[_-]?key)\\s*=\\s*["'][^"']{4,}["']"""),
     "Move secrets to environment configuration or a secret manager."),
    ("Possible eval usage", re.compile(r"""\\beval\\s*\\(""", re.I),
     "Avoid evaluating dynamic strings; use explicit parsing and safe APIs."),
]

EXTENSIONS = {".py", ".js", ".ts", ".jsx", ".tsx", ".java", ".php", ".html"}

def scan_file(path):
    findings = []
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as exc:
        print(f"Could not read {path}: {exc}", file=sys.stderr)
        return findings
    for number, line in enumerate(lines, 1):
        for title, pattern, advice in RULES:
            if pattern.search(line):
                findings.append((path, number, title, advice))
    return findings

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--path", default=".", help="File or directory to scan")
    args = parser.parse_args()
    target = Path(args.path)
    if not target.exists():
        parser.error(f"path does not exist: {target}")
    files = [target] if target.is_file() else [
        p for p in target.rglob("*") if p.is_file() and p.suffix.lower() in EXTENSIONS
    ]
    findings = []
    for file in files:
        findings.extend(scan_file(file))
    if findings:
        print("Potential issues (manual review required):")
        for path, line, title, advice in findings:
            print(f"- {path}:{line}: {title}\\n  Advice: {advice}")
    else:
        print("No configured patterns detected. This does NOT mean the code is secure.")
    print("\\nLimitations: pattern-based only; false positives and false negatives are expected.")
    return 1 if findings else 0

if __name__ == "__main__":
    raise SystemExit(main())`}
          </pre>
        </div>
      )}
    </div>
  );
};
