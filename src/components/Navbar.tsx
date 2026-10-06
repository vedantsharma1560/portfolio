import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, MousePointer, Terminal, Home, User, Code, Briefcase, FolderGit2, Mail, ArrowRight } from 'lucide-react';
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
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Stack', icon: Code },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Mail },
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

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      
      if (currentY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentY > lastScrollY && currentY > 200 && !mobileMenuOpen) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    // Allow state & overflow cleanup to apply before scrolling
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  };

  const showHeader = isNavVisible || mobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'py-3 border-b border-slate-200/80 dark:border-[#20938a]/20 bg-white/95 dark:bg-[#050e0d]/95 backdrop-blur-md shadow-sm dark:shadow-lg dark:shadow-[#050e0d]/50'
            : 'py-4 sm:py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - Name and title */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group flex flex-col font-heading focus:outline-none cursor-pointer"
          >
            <span className="text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors font-bold text-sm sm:text-base leading-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#0d9488] dark:text-[#20938a] font-mono tracking-wider uppercase font-semibold">
              Full Stack Developer
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative py-1 text-sm font-medium transition-all duration-200 cursor-pointer ${
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

          {/* Desktop Action Controls & Toggles */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => onOpenTerminal()}
              title="Open Developer Terminal (CLI)"
              className="p-2 rounded-xl text-slate-700 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-all text-xs flex items-center gap-1.5 font-mono bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 hover:border-[#0d9488]/40 dark:hover:border-[#20938a]/60 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
              <span className="hidden xl:inline text-[11px]">CLI</span>
            </button>

            <button
              onClick={() => onToggleCursor()}
              title={isCursorEnabled ? 'Disable Custom Cursor' : 'Enable Custom Cursor'}
              className={`p-2 rounded-xl transition-all hidden md:block border border-slate-200 dark:border-[#20938a]/30 cursor-pointer ${
                isCursorEnabled ? 'text-[#0d9488] dark:text-[#2cc1b5] bg-teal-50 dark:bg-[#20938a]/20 border-teal-300 dark:border-[#20938a]/50' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#0c2120]/80'
              }`}
            >
              <MousePointer className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleTheme()}
              title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="p-2 rounded-xl text-slate-700 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-all bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#2cc1b5]" /> : <Moon className="w-4 h-4 text-[#0d9488]" />}
            </button>
          </div>

          {/* Mobile Navigation Header Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onToggleTheme()}
              className="p-2 rounded-xl text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#2cc1b5]" /> : <Moon className="w-4 h-4 text-[#0d9488]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-gray-200 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-colors bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#0d9488] dark:text-[#2cc1b5]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer - Positioned outside <header> to avoid CSS stacking context clipping */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white/98 dark:bg-[#050e0d]/98 backdrop-blur-2xl animate-fade-in overflow-hidden">
          {/* Mobile Drawer Top Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-[#20938a]/20 bg-white dark:bg-[#050e0d]">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="flex flex-col font-heading"
            >
              <span className="text-slate-900 dark:text-white font-bold text-sm sm:text-base leading-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[9px] text-[#0d9488] dark:text-[#20938a] font-mono tracking-wider uppercase font-semibold">
                Full Stack Developer
              </span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleTheme()}
                className="p-2 rounded-xl text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-[#2cc1b5]" /> : <Moon className="w-4 h-4 text-[#0d9488]" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl text-slate-700 dark:text-gray-200 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] transition-colors bg-slate-100 dark:bg-[#0c2120]/80 border border-slate-200 dark:border-[#20938a]/30 cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-[#0d9488] dark:text-[#2cc1b5]" />
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest px-2 mb-1">
                Navigation
              </span>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-left text-base font-heading font-semibold px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-teal-50 dark:bg-[#20938a]/20 text-[#0d9488] dark:text-[#2cc1b5] border border-teal-200 dark:border-[#20938a]/40 shadow-sm'
                        : 'text-slate-700 dark:text-gray-200 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:bg-slate-100 dark:hover:bg-[#0c2120]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-[#0d9488]/10 text-[#0d9488] dark:text-[#2cc1b5]' : 'bg-slate-100 dark:bg-[#081716] text-slate-500 dark:text-gray-400 group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5]'}`}>
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-base sm:text-lg">{link.label}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-[#0d9488] dark:text-[#2cc1b5]' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1 text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions inside Mobile Drawer */}
            <div className="flex flex-col gap-3 pt-5 border-t border-slate-200/80 dark:border-[#20938a]/20">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-xs font-mono font-semibold text-[#0d9488] dark:text-[#2cc1b5] border border-slate-200 dark:border-[#20938a]/30 flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-[#112d2b] cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  Terminal CLI
                </button>

                <button
                  onClick={() => {
                    onToggleCursor();
                  }}
                  className={`p-3.5 rounded-xl text-xs font-mono font-semibold border flex items-center justify-center gap-2 cursor-pointer ${
                    isCursorEnabled
                      ? 'text-[#0d9488] dark:text-[#2cc1b5] bg-teal-50 dark:bg-[#20938a]/20 border-teal-300 dark:border-[#20938a]/50'
                      : 'text-slate-600 dark:text-gray-300 bg-slate-100 dark:bg-[#0c2120] border-slate-200 dark:border-[#20938a]/30'
                  }`}
                >
                  <MousePointer className="w-4 h-4" />
                  Custom Cursor
                </button>
              </div>

              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-teal-50/60 dark:bg-[#081716]/80 border border-teal-100 dark:border-[#20938a]/20 text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d9488] dark:bg-[#2cc1b5] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d9488] dark:bg-[#2cc1b5]"></span>
                  </span>
                  Full-Stack Architect & Engineer
                </span>
                <span className="font-bold font-mono">2026</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


