import React from 'react';
import { ArrowUp, Github, Linkedin, Phone, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#030908] border-t border-slate-200 dark:border-[#20938a]/20 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-200 dark:border-[#20938a]/20">
          
          {/* Left Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex items-center gap-2.5 font-heading text-lg font-bold text-slate-900 dark:text-white">
              <div className="w-3 h-3 rounded-full bg-[#0d9488] dark:bg-[#20938a]" />
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-gray-400 max-w-sm">
              Architecting high-performance digital experiences, distributed systems, and modern AI platforms.
            </p>
          </div>

          {/* Center Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 transition-all hover:scale-110 shadow-xs"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 transition-all hover:scale-110 shadow-xs"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 transition-all hover:scale-110 shadow-xs"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 transition-all hover:scale-110 shadow-xs"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-2xl border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 hover:scale-105 transition-all flex items-center gap-2 text-xs font-mono cursor-pointer shadow-xs font-semibold"
            aria-label="Scroll Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
          </button>

        </div>

        {/* Bottom Legal & Operational Status Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0d9488] dark:bg-[#20938a] animate-ping" />
            <span>All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
