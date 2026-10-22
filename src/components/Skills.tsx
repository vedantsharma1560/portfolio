import React, { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { TechIcon } from './TechIcons';

export interface StackItem {
  id: string;
  name: string;
  category: 'Front-End' | 'Back-End' | 'Databases' | 'DevOps & Cloud' | 'Messaging & Security';
}

export const STACK_ITEMS: StackItem[] = [
  // Front-End
  { id: 'angular', name: 'Angular', category: 'Front-End' },
  { id: 'react', name: 'React', category: 'Front-End' },
  { id: 'typescript', name: 'TypeScript', category: 'Front-End' },
  { id: 'javascript', name: 'JavaScript', category: 'Front-End' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Front-End' },
  { id: 'rxjs', name: 'RxJS', category: 'Front-End' },

  // Back-End
  { id: 'nodejs', name: 'Node.js', category: 'Back-End' },
  { id: 'express', name: 'Express.js', category: 'Back-End' },
  { id: 'springboot', name: 'Spring Boot', category: 'Back-End' },
  { id: 'java', name: 'Java', category: 'Back-End' },
  { id: 'restapi', name: 'REST APIs', category: 'Back-End' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases' },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases' },
  { id: 'oracle', name: 'Oracle DB', category: 'Databases' },
  { id: 'mysql', name: 'MySQL', category: 'Databases' },
  { id: 'redis', name: 'Redis', category: 'Databases' },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', category: 'DevOps & Cloud' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps & Cloud' },
  { id: 'git', name: 'Git & GitHub', category: 'DevOps & Cloud' },
  { id: 'jenkins', name: 'Jenkins', category: 'DevOps & Cloud' },
  { id: 'minio', name: 'MinIO Storage', category: 'DevOps & Cloud' },

  // Messaging & Security
  { id: 'kafka', name: 'Apache Kafka', category: 'Messaging & Security' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Messaging & Security' },
  { id: 'kong', name: 'Kong Gateway', category: 'Messaging & Security' },
  { id: 'keycloak', name: 'Keycloak & JWT', category: 'Messaging & Security' },
  { id: 'websocket', name: 'WebSockets', category: 'Messaging & Security' },
];

const CATEGORIES: ('All' | StackItem['category'])[] = [
  'All',
  'Front-End',
  'Back-End',
  'Databases',
  'DevOps & Cloud',
  'Messaging & Security',
];

const FLOAT_ANIMATION_CLASSES = [
  'animate-float-1',
  'animate-float-2',
  'animate-float-3',
  'animate-float-4',
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | StackItem['category']>('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return STACK_ITEMS;
    return STACK_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="relative py-24 sm:py-28 bg-slate-50 dark:bg-[#050e0d] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[#0d9488]/10 dark:bg-[#20938a]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2cc1b5]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#0d9488] dark:text-[#2cc1b5] uppercase">
            Core Toolkit &amp; Ecosystem
          </span>

          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical <span className="text-[#0d9488] dark:text-[#2cc1b5]">Stack</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            A concise, production-tested inventory of frameworks, distributed services, databases, and cloud infrastructure.
          </p>
        </div>

        {/* Minimal Segmented Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/70 dark:bg-[#0c2120]/60 border border-slate-200/80 dark:border-[#20938a]/30 backdrop-blur-md shadow-xs overflow-x-auto max-w-full no-scrollbar">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0d9488] dark:bg-[#20938a] text-white shadow-sm'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-[#122e2b]/50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Floater Cards Grid (Floating slowly with only icon and name) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4.5 max-w-6xl mx-auto">
          {filteredItems.map((item, index) => {
            const floatClass = FLOAT_ANIMATION_CLASSES[index % FLOAT_ANIMATION_CLASSES.length];
            const floatDelay = `${(index % 8) * 0.35}s`;

            return (
              <div
                key={item.id}
                style={{ animationDelay: floatDelay }}
                className={`group relative flex items-center gap-3 px-4 py-3.5 sm:px-4.5 sm:py-3.5 rounded-2xl bg-white/80 dark:bg-[#0c2120]/65 border border-slate-200/90 dark:border-[#20938a]/25 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-[#0d9488]/15 dark:hover:shadow-[#2cc1b5]/20 hover:border-[#0d9488]/60 dark:hover:border-[#2cc1b5]/70 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 cursor-default select-none ${floatClass} hover:[animation-play-state:paused]`}
              >
                {/* Top frosted glass reflection line */}
                <span className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-[#2cc1b5]/30 to-transparent pointer-events-none" />

                {/* Tech Icon Container */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100/90 dark:bg-[#071716] flex items-center justify-center p-1.5 shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <TechIcon name={item.name} className="w-5 h-5 sm:w-5.5 sm:h-5.5 object-contain" />
                </div>

                {/* Tech Name Only */}
                <span className="font-heading font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors truncate">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Minimal Quiet Footer Footnote */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-[#0c2120]/40 border border-slate-200/60 dark:border-[#20938a]/20 text-slate-500 dark:text-gray-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
            <span>Zero-trust architecture, microservices resilience &amp; real-time event streaming</span>
          </div>
        </div>

      </div>
    </section>
  );
};
