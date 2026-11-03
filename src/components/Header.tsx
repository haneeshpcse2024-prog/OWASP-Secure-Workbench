import React from 'react';
import { Shield, Sun, Moon, Presentation } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  onOpenDemo,
}) => {
  const navItems = [
    { id: 'scanner', label: 'Heuristic Scanner' },
    { id: 'code-pairs', label: 'Code Pairs' },
    { id: 'quiz', label: 'Knowledge Quiz' },
    { id: 'checklist', label: 'Audit Checklist' },
    { id: 'owasp-top10', label: 'OWASP Guide' },
    { id: 'research', label: 'Research & AI' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm dark:bg-sky-500">
            <Shield className="h-5 w-5" />
          </div>
          <button
            onClick={() => setActiveTab('scanner')}
            className="text-left font-bold tracking-tight text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap"
          >
            <span className="text-base sm:text-lg">OWASP Secure Workbench</span>
            <span className="hidden xl:inline text-xs font-normal text-slate-500 dark:text-slate-400 ml-2">
              CSE Capstone 4
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-100 text-sky-700 dark:bg-slate-800 dark:text-sky-400 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 transition-colors shadow-sm whitespace-nowrap shrink-0"
            title="Launch 5-7 min Demo Script & Timer"
          >
            <Presentation className="h-3.5 w-3.5" />
            <span>Demo Mode</span>
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle color theme"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overflow */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200 dark:border-slate-800 px-4 py-2 gap-1.5 bg-slate-50/80 dark:bg-slate-950/80">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
              activeTab === item.id
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
