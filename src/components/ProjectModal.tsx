import React, { useState } from 'react';
import { X, ExternalLink, Github, Layers, CheckCircle2, AlertTriangle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  if (!project) return null;

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 dark:bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#050e0d] border border-slate-200 dark:border-[#20938a]/40 rounded-3xl overflow-hidden shadow-2xl my-8 text-left">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-slate-200 dark:border-[#20938a]/30 flex items-center justify-between bg-white/95 dark:bg-[#050e0d]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/40 text-[#0d9488] dark:text-[#2cc1b5] font-mono text-xs font-semibold">
              {project.category}
            </span>
            <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white truncate max-w-md">
              {project.title}
            </h3>
          </div>

          <button
            onClick={() => onClose()}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#0c2120] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#20938a]/30 hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 transition-colors"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Main Screenshot Carousel */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#20938a]/30 bg-slate-900 group">
            <img
              src={project.screenshots[activeImageIdx] || project.image}
              alt={project.title}
              className="w-full h-[320px] sm:h-[450px] object-cover transition-all duration-500"
            />

            {/* Carousel Navigation Arrows */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 dark:bg-[#050e0d]/80 border border-white/20 dark:border-[#20938a]/40 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 dark:bg-[#050e0d]/80 border border-white/20 dark:border-[#20938a]/40 text-white opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Thumbnails Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/70 dark:bg-[#050e0d]/80 border border-white/20 dark:border-[#20938a]/40 px-3 py-1.5 rounded-full">
                  {project.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeImageIdx === idx ? 'w-6 bg-[#0d9488] dark:bg-[#20938a]' : 'w-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-slate-200 dark:border-[#20938a]/30 bg-teal-50/50 dark:bg-[#0c2120]/40">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xs font-mono text-slate-500 dark:text-gray-400 font-medium">{m.label}</span>
                <span className="text-xl font-heading font-extrabold text-[#0d9488] dark:text-[#2cc1b5] mt-0.5">
                  {m.value}
                </span>
              </div>
            ))}
            <div className="flex flex-col">
              <span className="text-xs font-mono text-slate-500 dark:text-gray-400 font-medium">Timeline & Client</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                {project.timeline} {project.client ? `• ${project.client}` : ''}
              </span>
            </div>
          </div>

          {/* Overview & Subtitle */}
          <div>
            <h4 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">
              {project.subtitle}
            </h4>
            <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Architecture & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* System Architecture */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#0e171a]/95">
              <h5 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
                Architectural Highlights
              </h5>
              <ul className="space-y-2.5">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                    <Sparkles className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#0e171a]/95">
              <h5 className="text-base font-heading font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
                Core Features
              </h5>
              <ul className="space-y-2.5">
                {project.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Technical Challenges & Solutions */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#0e171a]/95 space-y-4">
            <h5 className="text-base font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              Technical Challenges & Solutions
            </h5>

            <div className="space-y-4">
              {project.challenges.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-[#20938a]/30 space-y-2">
                  <p className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    Challenge: {c.problem}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                    <span className="text-[#0d9488] dark:text-[#2cc1b5] font-mono font-bold">Solution:</span> {c.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h5 className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3 font-semibold">
              Technologies & Frameworks
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] font-mono text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer CTAs */}
          <div className="pt-6 border-t border-slate-200 dark:border-[#20938a]/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#0d9488] dark:bg-[#20938a] text-white font-semibold text-xs shadow-lg shadow-teal-500/20 dark:shadow-[#20938a]/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-[#0c2120] border border-slate-200 dark:border-[#20938a]/30 text-slate-900 dark:text-white font-medium text-xs hover:border-[#0d9488]/60 dark:hover:border-[#20938a]/60 transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
                GitHub Repository
              </a>
            </div>

            <button
              onClick={() => onClose()}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-[#0c2120] border border-slate-200 dark:border-[#20938a]/30 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-semibold"
            >
              Close Window
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
