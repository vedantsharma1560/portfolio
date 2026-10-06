import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Phone, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import developerHeroAvatar from '../assets/images/avatar.png';
import { downloadResumeDirectly } from '../utils/downloadResume';

interface HeroProps {
  isDarkMode: boolean;
  onOpenResume: () => void;
  onNavigateToContact: () => void;
}

const DYNAMIC_TITLES = [
  'Full Stack Web Developer',
  'Angular & React Specialist',
  'Node.js & Spring Boot Architect',
  'Event Streaming & Database Engineer'
];

export const Hero: React.FC<HeroProps> = ({ isDarkMode, onOpenResume, onNavigateToContact }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  // Dynamic title rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % DYNAMIC_TITLES.length);
        setFadeState(true);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-28 sm:pt-36 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Ambient Radial Soft Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#20938a]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#14645e]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Availability Status Badge */}
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/40 text-[#0d9488] dark:text-[#2cc1b5] text-xs font-mono w-fit shadow-sm dark:shadow-lg dark:shadow-[#050e0d]/50 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d9488] dark:bg-[#20938a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d9488] dark:bg-[#20938a]"></span>
              </span>
              <span>{PERSONAL_INFO.availability}</span>
            </div> */}

            {/* Clean Minimal Integrated Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug sm:leading-tight">
                HELLO, WORLD! I AM A{' '}
                <span
                  className={`font-mono text-[#0d9488] dark:text-[#2cc1b5] text-xl sm:text-2xl transition-all duration-300 inline-block ${
                    fadeState ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  }`}
                >
                  {DYNAMIC_TITLES[titleIndex]}
                  <span className="animate-pulse ml-1 text-[#0d9488] dark:text-[#4fe3d7] font-bold">|</span>
                </span>
              </h1>
            </div>

            {/* Main Subtitle */}
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-700 dark:text-gray-200 leading-snug">
              Engineering <span className="text-gradient font-extrabold">Enterprise Scalable Systems</span> & High-Performance Web Applications
            </h2>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateToContact()}
                className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0d9488] via-[#0f766e] to-[#115e59] text-white font-semibold text-sm shadow-lg shadow-teal-500/20 dark:shadow-[#20938a]/10 hover:shadow-teal-500/30 dark:hover:shadow-[#20938a]/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get In Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <button
                onClick={downloadResumeDirectly}
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-[#0c2120] text-slate-900 dark:text-white font-medium text-sm border border-slate-300 dark:border-[#20938a]/40 hover:border-[#0d9488] dark:hover:border-[#20938a] hover:bg-slate-100 dark:hover:bg-[#112d2b] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group cursor-pointer shadow-sm dark:shadow-none"
              >
                <Download className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5] group-hover:translate-y-0.5 transition-transform" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-[#20938a]/20">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0d9488] dark:text-[#2cc1b5]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mr-2 font-semibold">Connect:</span>
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] border border-slate-200 dark:border-[#20938a]/20 hover:border-[#0d9488]/40 dark:hover:border-[#20938a]/50 transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] border border-slate-200 dark:border-[#20938a]/20 hover:border-[#0d9488]/40 dark:hover:border-[#20938a]/50 transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] border border-slate-200 dark:border-[#20938a]/20 hover:border-[#0d9488]/40 dark:hover:border-[#20938a]/50 transition-all hover:scale-110"
                aria-label="Phone Direct"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-slate-600 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] border border-slate-200 dark:border-[#20938a]/20 hover:border-[#0d9488]/40 dark:hover:border-[#20938a]/50 transition-all hover:scale-110"
                aria-label="Email Direct"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Seamless 3D Character standing natively on Hero background (matching reference screenshot) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-end min-h-[420px] sm:min-h-[500px] lg:min-h-[560px]">
            {/* Ambient Teal Backlight Glow matching reference screenshot */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-[#20938a]/30 rounded-full blur-[130px] pointer-events-none -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-60 h-60 bg-[#2cc1b5]/20 rounded-full blur-[90px] pointer-events-none -z-10 bottom-10 right-10" />

            {/* Seamless Character Image without any card/container frame */}
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] flex flex-col items-center justify-center animate-hero-float">
              <img
                src={developerHeroAvatar}
                alt="3D Developer Avatar"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain max-h-[500px] sm:max-h-[560px] mx-auto filter drop-shadow-[0_25px_45px_rgba(44,193,181,0.22)] transition-opacity duration-300 ease-out"
                style={{
                  background: 'transparent',
                  mixBlendMode: 'normal',
                }}
              />
              {/* Soft ground shadow that anchors the floating effect */}
              <div className="w-44 sm:w-56 h-4 bg-teal-900/20 dark:bg-[#20938a]/25 rounded-[100%] blur-md pointer-events-none -mt-3 scale-90 opacity-70" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
