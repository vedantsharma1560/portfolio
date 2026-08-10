/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TerminalOverlay } from './components/TerminalOverlay';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isCursorEnabled, setIsCursorEnabled] = useState(true);
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
    const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    
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

  const navigateToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050e0d] text-slate-900 dark:text-white transition-colors duration-300 selection:bg-[#20938a]/30 selection:text-[#0d9488] dark:selection:text-[#7ee2db] relative overflow-x-hidden font-sans">
      
      {/* Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Magnetizing Cursor */}
      <CustomCursor enabled={isCursorEnabled} />

      {/* Sticky Minimal Navbar */}
      <Navbar
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        isCursorEnabled={isCursorEnabled}
        onToggleCursor={() => setIsCursorEnabled(!isCursorEnabled)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          isDarkMode={isDarkMode}
          onOpenResume={() => setIsResumeOpen(true)}
          onNavigateToContact={navigateToContact}
        />

        <About />

        <Skills />

        <Experience />

        <Projects />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Terminal CLI Overlay */}
      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigateToContact={navigateToContact}
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

    </div>
  );
}
