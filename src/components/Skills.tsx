import React, { useState } from 'react';
import { 
  Cpu, Sparkles, Code, Server, Bot, Cloud, Database, Layers, 
  FileCode, Box, Palette, Terminal, Network, Zap, HardDrive, GitBranch, 
  Wrench, Layout, Shield, Grid, LayoutList, X, CheckCircle2, ArrowUpRight
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

// Helper for proficiency tier based on level
const getProficiencyBadge = (level: number) => {
  if (level >= 95) return { label: 'Expert', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (level >= 90) return { label: 'Advanced', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' };
  return { label: 'Proficient', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' };
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

interface SkillDetail {
  name: string;
  level: number;
  iconName: string;
  description: string;
  yearsOfExperience: number;
  categoryName: string;
}

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'compact' | 'cards'>('compact');
  const [activeSkillModal, setActiveSkillModal] = useState<SkillDetail | null>(null);

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
              <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400 font-semibold">3+ Years Core Focus</span>
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

                {/* COMPACT BADGES VIEW (Ultra-clean, modern, highly scannable) */}
                {viewMode === 'compact' ? (
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => {
                      const IconComponent = ICON_MAP[skill.iconName] || Code;
                      const badge = getProficiencyBadge(skill.level);
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setActiveSkillModal({ ...skill, categoryName: category.name })}
                          className="group px-3.5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 hover:border-[#0d9488] dark:hover:border-[#2cc1b5] hover:bg-slate-50 dark:hover:bg-[#122223] transition-all duration-200 flex items-center gap-3 cursor-pointer shadow-md shadow-slate-200/50 dark:shadow-md hover:-translate-y-0.5"
                        >
                          <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-900 dark:text-white font-bold text-xs font-heading group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors">
                                {skill.name}
                              </span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-md border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono block">
                              {skill.yearsOfExperience} Yrs Exp • Click for info
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* CARDS MATRIX VIEW (Clean cards without heavy text blocks) */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.skills.map((skill) => {
                      const IconComponent = ICON_MAP[skill.iconName] || Code;
                      const badge = getProficiencyBadge(skill.level);
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setActiveSkillModal({ ...skill, categoryName: category.name })}
                          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 hover:border-[#0d9488] dark:hover:border-[#2cc1b5] hover:bg-slate-50 dark:hover:bg-[#122223] transition-all duration-300 group flex flex-col justify-between shadow-lg shadow-slate-200/50 dark:shadow-lg cursor-pointer hover:-translate-y-1"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-[#081716] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center group-hover:scale-105 transition-transform">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-slate-900 dark:text-white font-bold text-sm font-heading group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors">
                                    {skill.name}
                                  </h4>
                                  <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono">
                                    {skill.yearsOfExperience} Years Experience
                                  </span>
                                </div>
                              </div>

                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>

                            <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 my-2">
                              {skill.description}
                            </p>
                          </div>

                          <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-[#20938a]/15 text-[11px] font-mono text-[#0d9488] dark:text-[#2cc1b5]">
                            <span>View details & projects</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

      {/* Lightweight Interactive Skill Info Modal */}
      {activeSkillModal && (
        <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#081716] border border-slate-200 dark:border-[#20938a]/40 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#20938a]/30 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/40 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center">
                  {React.createElement(ICON_MAP[activeSkillModal.iconName] || Code, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                    {activeSkillModal.name}
                  </h3>
                  <span className="text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] font-semibold">
                    {activeSkillModal.categoryName}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveSkillModal(null)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-[#0c2120] text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#20938a]/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-gray-300">
              <p className="leading-relaxed bg-slate-50 dark:bg-[#0c2120]/60 p-3 rounded-xl border border-slate-200 dark:border-[#20938a]/20">
                {activeSkillModal.description}
              </p>

              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c2120] border border-slate-200 dark:border-[#20938a]/20">
                  <span className="text-slate-500 dark:text-gray-400 block text-[10px]">PROFICIENCY TIER</span>
                  <span className="text-slate-900 dark:text-white font-bold text-xs">
                    {getProficiencyBadge(activeSkillModal.level).label} ({activeSkillModal.level}%)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c2120] border border-slate-200 dark:border-[#20938a]/20">
                  <span className="text-slate-500 dark:text-gray-400 block text-[10px]">EXPERIENCE</span>
                  <span className="text-slate-900 dark:text-white font-bold text-xs">
                    {activeSkillModal.yearsOfExperience}+ Years Production
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1 font-semibold">Key Enterprise Usage</span>
                <ul className="space-y-1 text-slate-700 dark:text-gray-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
                    <span>Applied in live client microservices at Cubastion Consulting</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveSkillModal(null)}
                className="w-full py-2.5 rounded-xl bg-[#0d9488] dark:bg-[#20938a] hover:bg-[#0f766e] dark:hover:bg-[#2cc1b5] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

