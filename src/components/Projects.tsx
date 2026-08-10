import React, { useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const displayProjects = PROJECTS.slice(0, 4);

  return (
    <section id="projects" className="relative py-24 bg-slate-50 dark:bg-[#050e0d] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#20938a]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14645e]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Projects & <span className="text-[#0d9488] dark:text-[#2cc1b5]">Enterprise Systems</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 text-base sm:text-lg">
            Explore web portals, authorization vaults, peripheral engines, and real-time streaming architectures.
          </p>
        </div>

        {/* Projects Grid (2x2 Layout for 4 projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 hover:border-[#0d9488]/60 dark:hover:border-[#2cc1b5]/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 shadow-xl shadow-slate-200/50 dark:shadow-xl"
            >
              
              <div>
                {/* Project Image Box with Fit Content */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900 flex items-center justify-center p-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="max-h-full max-w-full w-auto object-contain group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100 rounded-lg"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#0e171a] via-black/20 to-transparent opacity-80" />

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-xs">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="px-4 py-2 rounded-xl bg-[#0d9488] dark:bg-[#20938a] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6">
                  
                  {/* Category & Title */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-[#0d9488] dark:text-[#2cc1b5] uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-gray-500">
                      {project.timeline}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-gray-400 text-xs mt-2 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-[10px] font-mono text-[#0d9488] dark:text-[#2cc1b5] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-[#081716] text-[10px] font-mono text-slate-500 dark:text-gray-400 font-semibold">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-[#20938a]/20 flex items-center justify-between">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] hover:text-slate-900 dark:hover:text-white font-semibold flex items-center gap-1 group/btn"
                >
                  View Details
                  <span className="group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg text-slate-500 dark:text-gray-400 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:bg-slate-100 dark:hover:bg-[#081716] transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Fullscreen Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
