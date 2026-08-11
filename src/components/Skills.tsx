import React, { useState } from 'react';
import { 
  Cpu, Sparkles, Code, Server, Bot, Cloud, Database, Layers, 
  FileCode, Box, Palette, Terminal, Network, Zap, HardDrive, GitBranch, 
  Wrench, Layout, Shield, Grid, LayoutList
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillCategory } from '../types';

// Map icon strings to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  FileCode,
  Box,
  Palette,
  Sparkles,
  Server,
  Terminal,
  Network,
  Bot,
  Database,
  Cpu,
  Cloud,
  Zap,
  Layers,
  HardDrive,
  GitBranch,
  Wrench,
  Layout,
  Shield,
};

// Core featured technologies for quick spotlight
const CORE_SPOTLIGHT = [
  { name: 'Angular', category: 'Front-End', icon: Code, desc: 'Enterprise RXJS modules & RBAC' },
  { name: 'Node.js', category: 'Back-End', icon: Server, desc: 'High-throughput REST APIs & Auth' },
  { name: 'Spring Boot', category: 'Back-End', icon: Cpu, desc: 'Microservices & Validation' },
  { name: 'PostgreSQL', category: 'Databases', icon: HardDrive, desc: 'Relational data modeling & ACID' },
  { name: 'Apache Kafka', category: 'Messaging', icon: Network, desc: 'Event-driven stream processing' },
  { name: 'Kong API', category: 'Security', icon: Shield, desc: 'Gateway proxy & OAuth rate limits' },
];

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'compact' | 'cards'>('compact');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.name)];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    if (selectedCategory !== 'All' && cat.name !== selectedCategory) {
      return { ...cat, skills: [] };
    }
    return cat;
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="relative py-20 bg-slate-50 dark:bg-[#050e0d] overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#20938a]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Technical Stack & <span className="text-[#0d9488] dark:text-[#2cc1b5]">Capabilities</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            A clean, organized inventory of frameworks, databases, and microservices applied in high-security enterprise projects.
          </p>
        </div>

        {/* Core Spotlight Bar (Only visible when All selected) */}
        {selectedCategory === 'All' && (
          <div className="mb-12 p-6 rounded-3xl border border-slate-200 dark:border-[#20938a]/30 bg-white/80 dark:bg-[#0a1817]/80 backdrop-blur-md shadow-xl shadow-slate-200/50 dark:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-bold text-[#0d9488] dark:text-[#2cc1b5] uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0d9488] dark:text-[#2cc1b5]" />
                Primary Stack Spotlight
              </h3>
              <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400 font-semibold">3.5+ Years Core Focus</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CORE_SPOTLIGHT.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-2xl bg-slate-100 dark:bg-[#0c2120] border border-slate-200 dark:border-[#20938a]/30 hover:border-[#0d9488] dark:hover:border-[#2cc1b5] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-gray-500">{item.category}</span>
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-xs font-heading group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Controls: Category Filter & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0d9488] dark:bg-[#20938a] text-white border-[#0d9488] dark:border-[#20938a] shadow-lg shadow-teal-500/20 dark:shadow-[#20938a]/30'
                      : 'bg-white dark:bg-[#0c2120] text-slate-700 dark:text-gray-300 hover:text-[#0d9488] dark:hover:text-[#2cc1b5] hover:bg-slate-100 dark:hover:bg-[#112d2b] border-slate-200 dark:border-[#20938a]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center self-end sm:self-auto p-1 rounded-xl bg-white dark:bg-[#0c2120] border border-slate-200 dark:border-[#20938a]/30 shadow-sm">
            <button
              onClick={() => setViewMode('compact')}
              title="Compact Badges View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-[#0d9488] dark:bg-[#20938a] text-white shadow-sm'
                  : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              title="Cards Matrix View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-[#0d9488] dark:bg-[#20938a] text-white shadow-sm'
                  : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Skills Display Area */}
        <div className="space-y-10 min-h-[260px]">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120]/60 rounded-3xl">
              <p className="text-slate-600 dark:text-gray-400 text-sm font-mono">No technical skills found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-3 text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] hover:underline cursor-pointer"
              >
                Reset filter
              </button>
            </div>
          ) : (
            filteredCategories.map((category: SkillCategory) => (
              <div key={category.name} className="space-y-4">
                
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#20938a]/20 pb-2.5">
                  <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0d9488] dark:bg-[#2cc1b5]" />
                    {category.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400 font-semibold">
                    {category.skills.length} item{category.skills.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* COMPACT BADGES VIEW */}
                {viewMode === 'compact' ? (
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => {
                      const IconComponent = ICON_MAP[skill.iconName] || Code;
                      return (
                        <div
                          key={skill.name}
                          className="group px-3.5 py-3 rounded-2xl border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0e171a]/95 flex flex-col justify-between gap-2.5 shadow-md shadow-slate-200/50 dark:shadow-md min-w-[150px] sm:min-w-[170px] flex-1 max-w-[240px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0d9488]/10 dark:hover:shadow-[#2cc1b5]/20 hover:border-[#0d9488]/60 dark:hover:border-[#2cc1b5]/60 hover:bg-slate-50/90 dark:hover:bg-[#112425]"
                        >
                          <div className="flex items-center justify-between gap-1.5 min-w-0 w-full">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <IconComponent className="w-3.5 h-3.5" />
                              </div>
                              <span
                                className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm font-heading truncate group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors"
                                title={skill.name}
                              >
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#0d9488] dark:text-[#2cc1b5] shrink-0">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Enhanced Proficiency Progress Bar with Fade Glow & Border */}
                          <div className="w-full bg-slate-100 dark:bg-[#051313] h-2 rounded-full p-[1px] border border-slate-200/80 dark:border-[#20938a]/40 shadow-inner">
                            <div
                              className="bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#2cc1b5] dark:from-[#0d9488]/80 dark:via-[#2cc1b5] dark:to-[#5eead4] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(44,193,181,0.4)] dark:shadow-[0_0_10px_rgba(44,193,181,0.6)] group-hover:brightness-110"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* CARDS MATRIX VIEW */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.skills.map((skill) => {
                      const IconComponent = ICON_MAP[skill.iconName] || Code;
                      return (
                        <div
                          key={skill.name}
                          className="group p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 flex flex-col justify-between gap-3 shadow-lg shadow-slate-200/50 dark:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0d9488]/10 dark:hover:shadow-[#2cc1b5]/20 hover:border-[#0d9488]/60 dark:hover:border-[#2cc1b5]/60 hover:bg-slate-50/90 dark:hover:bg-[#112425]"
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <h4 className="text-slate-900 dark:text-white font-bold text-sm font-heading group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors">
                                {skill.name}
                              </h4>
                            </div>

                            <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 my-2">
                              {skill.description}
                            </p>
                          </div>

                          {/* Enhanced Proficiency Progress Bar */}
                          <div className="pt-2 border-t border-slate-200 dark:border-[#20938a]/15 space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] font-mono font-medium">
                              <span className="text-slate-500 dark:text-gray-400">Proficiency</span>
                              <span className="text-[#0d9488] dark:text-[#2cc1b5] font-bold">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-[#051313] h-2 rounded-full p-[1px] border border-slate-200/80 dark:border-[#20938a]/40 shadow-inner">
                              <div
                                className="bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#2cc1b5] dark:from-[#0d9488]/80 dark:via-[#2cc1b5] dark:to-[#5eead4] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(44,193,181,0.4)] dark:shadow-[0_0_10px_rgba(44,193,181,0.6)] group-hover:brightness-110"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>

    </section>
  );
};

