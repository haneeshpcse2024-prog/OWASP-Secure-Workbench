import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScannerWorkbench } from './components/ScannerWorkbench';
import { CodePairsView } from './components/CodePairsView';
import { QuizView } from './components/QuizView';
import { ChecklistAuditView } from './components/ChecklistAuditView';
import { OwaspTop10View } from './components/OwaspTop10View';
import { AiResearchView } from './components/AiResearchView';
import { CheatSheetModal } from './components/CheatSheetModal';
import { DemoPresenterModal } from './components/DemoPresenterModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('scanner');
  const [scannerCodeBuffer, setScannerCodeBuffer] = useState<string | undefined>(undefined);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSendToScanner = (code: string) => {
    setScannerCodeBuffer(code);
    setActiveTab('scanner');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* 3-Zone Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'scanner' && (
          <ScannerWorkbench
            initialCode={scannerCodeBuffer}
            onJumpToPairs={() => setActiveTab('code-pairs')}
          />
        )}

        {activeTab === 'code-pairs' && (
          <CodePairsView onSendToScanner={handleSendToScanner} />
        )}

        {activeTab === 'quiz' && <QuizView />}

        {activeTab === 'checklist' && <ChecklistAuditView />}

        {activeTab === 'owasp-top10' && (
          <OwaspTop10View onOpenCheatSheet={() => setIsCheatSheetOpen(true)} />
        )}

        {activeTab === 'research' && (
          <AiResearchView onOpenDemo={() => setIsDemoModalOpen(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Capstone 4: Secure Coding Guide for Beginners
            </span>
            <span>·</span>
            <span>OWASP Top 10:2021 Defensive Curriculum</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsCheatSheetOpen(true)}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              1-Page Cheat Sheet
            </button>
            <span>·</span>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Demo Script
            </button>
            <span>·</span>
            <a
              href="https://owasp.org/Top10/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              OWASP.org
            </a>
          </div>
        </div>
      </footer>

      {/* Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      {/* Demo Presenter Modal */}
      <DemoPresenterModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
