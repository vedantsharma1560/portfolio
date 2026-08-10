import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, MousePointer, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isCursorEnabled: boolean;
  onToggleCursor: () => void;
  onOpenTerminal: () => void;
}

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isDarkMode,
  onToggleTheme,
  isCursorEnabled,
  onToggleCursor,
  onOpenTerminal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      
      if (currentY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentY > lastScrollY && currentY > 200) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'py-3 border-b border-slate-200/80 dark:border-[#20938a]/20 bg-white/90 dark:bg-[#050e0d]/90 backdrop-blur-md shadow-sm dark:shadow-lg dark:shadow-[#050e0d]/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo - Name and title only without VS avatar box */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="group flex flex-col font-heading focus:outline-none"
        >
          <span className="text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors font-bold text-base leading-tight">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-[10px] text-[#0d9488] dark:text-[#20938a] font-mono tracking-wider uppercase font-semibold">
            Full Stack Developer
          </span>
        </a>

        {/* Minimal Header Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative py-1 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#0d9488] dark:text-[#2cc1b5] font-semibold'
                    : 'text-slate-600 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0d9488] dark:bg-[#20938a] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Toggles */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Terminal button */}
          <button
            onClick={() => onOpenTerminal()}
            title="Open Developer Terminal (CLI)"
            className="p-2 rounded-xl text-slate-700 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-all text-xs flex items-center gap-1.5 font-mono bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 hover:border-[#0d9488]/40 dark:hover:border-[#20938a]/60"
          >
            <Terminal className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
            <span className="hidden xl:inline text-[11px]">CLI</span>
          </button>

          {/* Cursor toggle */}
          <button
            onClick={() => onToggleCursor()}
            title={isCursorEnabled ? 'Disable Custom Cursor' : 'Enable Custom Cursor'}
            className={`p-2 rounded-xl transition-all hidden md:block border border-slate-200 dark:border-[#20938a]/30 ${
              isCursorEnabled ? 'text-[#0d9488] dark:text-[#2cc1b5] bg-teal-50 dark:bg-[#20938a]/20 border-teal-300 dark:border-[#20938a]/50' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#0c2120]/80'
            }`}
          >
            <MousePointer className="w-4 h-4" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => onToggleTheme()}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-2 rounded-xl text-slate-700 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-all bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#2cc1b5]" /> : <Moon className="w-4 h-4 text-[#0d9488]" />}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onToggleTheme()}
            className="p-2 rounded-xl text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#2cc1b5]" /> : <Moon className="w-4 h-4 text-[#0d9488]" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-gray-200 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-colors bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white/95 dark:bg-[#050e0d]/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 lg:hidden animate-fade-in border-t border-slate-200 dark:border-[#20938a]/20">
          <div className="flex flex-col gap-3 mt-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left text-lg font-heading font-medium px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-teal-50 dark:bg-[#20938a]/20 text-[#0d9488] dark:text-[#2cc1b5] font-semibold border border-teal-200 dark:border-[#20938a]/40'
                      : 'text-slate-700 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:bg-slate-100 dark:hover:bg-[#0c2120]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-slate-200 dark:border-[#20938a]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="p-3 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] border border-slate-200 dark:border-[#20938a]/30 flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Terminal CLI
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5]">
              <span>Status: Available for hire</span>
              <span className="w-2 h-2 rounded-full bg-[#0d9488] dark:bg-[#20938a] animate-ping" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
