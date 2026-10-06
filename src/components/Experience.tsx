import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle, Sparkles } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="experience" className="relative py-24 bg-slate-100/70 dark:bg-[#081716]/80 border-t border-b border-slate-200 dark:border-[#20938a]/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#20938a]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Work Experience & <span className="text-[#0d9488] dark:text-[#2cc1b5]">Engineering Roles</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 text-base sm:text-lg">
            A chronicle of software engineering roles, microservices architecture, and enterprise project deliverables.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l border-slate-300 dark:border-[#20938a]/30 space-y-10">
          {EXPERIENCES.map((exp) => {
            const isExpanded = expandedId === exp.id;

            return (
              <div key={exp.id} className="relative group">
                
                {/* Timeline Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-6 h-6 rounded-full bg-slate-50 dark:bg-[#050e0d] border-2 border-[#0d9488] dark:border-[#20938a] flex items-center justify-center group-hover:scale-125 group-hover:border-[#0d9488] dark:group-hover:border-[#2cc1b5] transition-all duration-300 shadow-[0_0_12px_rgba(13,148,136,0.3)] dark:shadow-[0_0_12px_#20938a]">
                  <div className="w-2 h-2 rounded-full bg-[#0d9488] dark:bg-[#20938a] group-hover:bg-[#0d9488] dark:group-hover:bg-[#2cc1b5]" />
                </div>

                {/* Experience Card */}
                <div
                  className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 bg-white dark:bg-[#0e171a]/95 ${
                    isExpanded
                      ? 'shadow-xl shadow-teal-500/10 dark:shadow-2xl dark:shadow-[#20938a]/20'
                      : 'shadow-md shadow-slate-200/50 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-xl hover:bg-slate-50 dark:hover:bg-[#121f23]'
                  }`}
                >
                  
                  {/* Card Header */}
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-4">
                      {/* Logo Icon */}
                      <div className={`w-12 h-12 rounded-2xl bg-[#0d9488] dark:bg-[#20938a] p-[1px] shadow-lg flex-shrink-0`}>
                        <div className="w-full h-full bg-teal-50 dark:bg-[#081716] rounded-[15px] flex items-center justify-center text-[#0d9488] dark:text-[#2cc1b5] font-extrabold text-sm font-mono">
                          {exp.logoText}
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors">
                            {exp.role}
                          </h3>
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-[#081716] text-[#0d9488] dark:text-[#2cc1b5] font-semibold">
                            {exp.type}
                          </span>
                        </div>

                        <p className="text-slate-700 dark:text-gray-300 font-medium text-sm mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-slate-500 dark:text-gray-400">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="flex items-center gap-1 text-[#0d9488] dark:text-[#2cc1b5] font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 dark:text-gray-500 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>

                      <button
                        className="p-2 rounded-xl bg-slate-100 dark:bg-[#081716] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        aria-label="Toggle Details"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-[#0d9488] dark:text-[#2cc1b5]" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                  </div>

                  {/* Summary Description */}
                  <p className="text-slate-700 dark:text-gray-300 text-sm mt-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Expandable Details Content */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-[#20938a]/20 space-y-4 animate-fade-in">
                      
                      {/* Key Highlights */}
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 font-semibold">
                          <Sparkles className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
                          Key Architectural Accomplishments
                        </h4>
                        <ul className="space-y-2">
                          {exp.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                              <CheckCircle className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Used */}
                      <div className="pt-2">
                        <h4 className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-2 font-semibold">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
