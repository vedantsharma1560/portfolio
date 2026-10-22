/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { TerminalOverlay } from './components/TerminalOverlay';
import { ResumeModal } from './components/ResumeModal';
import { AskVedantAI } from './components/AskVedantAI';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle Theme Toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ScrollSpy to detect active section
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050e0d] text-slate-900 dark:text-white transition-colors duration-300 selection:bg-[#20938a]/30 selection:text-[#0d9488] dark:selection:text-[#7ee2db] relative overflow-x-hidden font-sans">
      
      {/* Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Sticky Minimal Navbar */}
      <Navbar
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          isDarkMode={isDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <About />

        <Skills />

        <Experience />

        <Projects />
      </main>

      {/* Footer */}
      <Footer />

      {/* Terminal CLI Overlay */}
      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Ask Vedant AI Floating Assistant */}
      <AskVedantAI />

    </div>
  );
}
