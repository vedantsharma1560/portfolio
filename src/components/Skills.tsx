import React, { useState, useMemo } from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { TechIcon } from './TechIcons';

export interface StackItem {
  id: string;
  name: string;
  category: 'Front-End' | 'Back-End' | 'Databases' | 'DevOps & Cloud' | 'Messaging & Security';
  subtitle?: string;
}

export const STACK_ITEMS: StackItem[] = [
  // Front-End
  { id: 'angular', name: 'Angular', category: 'Front-End', subtitle: 'v14 - v18 / RxJS' },
  { id: 'react', name: 'React', category: 'Front-End', subtitle: 'Hooks & Modern UI' },
  { id: 'typescript', name: 'TypeScript', category: 'Front-End', subtitle: 'Strict Typing' },
  { id: 'javascript', name: 'JavaScript', category: 'Front-End', subtitle: 'ES6+ / Modern JS' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Front-End', subtitle: 'Responsive Design' },
  { id: 'rxjs', name: 'RxJS', category: 'Front-End', subtitle: 'Reactive Streams' },

  // Back-End
  { id: 'nodejs', name: 'Node.js', category: 'Back-End', subtitle: 'High-Throughput APIs' },
  { id: 'express', name: 'Express.js', category: 'Back-End', subtitle: 'RESTful Framework' },
  { id: 'springboot', name: 'Spring Boot', category: 'Back-End', subtitle: 'Java Microservices' },
  { id: 'restapi', name: 'REST APIs', category: 'Back-End', subtitle: 'Payload Specs' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', subtitle: 'Relational & ACID' },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', subtitle: 'Document Store' },
  { id: 'oracle', name: 'Oracle DB', category: 'Databases', subtitle: 'Enterprise SQL' },
  { id: 'mysql', name: 'MySQL', category: 'Databases', subtitle: 'Relational Data' },
  { id: 'redis', name: 'Redis', category: 'Databases', subtitle: 'In-Memory Caching' },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', category: 'DevOps & Cloud', subtitle: 'Containerization' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'DevOps & Cloud', subtitle: 'Pod Orchestration' },
  { id: 'git', name: 'Git & GitHub', category: 'DevOps & Cloud', subtitle: 'Version Control' },
  { id: 'cicd', name: 'Jenkins / CI/CD', category: 'DevOps & Cloud', subtitle: 'Build Pipelines' },
  { id: 'minio', name: 'MinIO Storage', category: 'DevOps & Cloud', subtitle: 'S3 Object Storage' },

  // Messaging & Security
  { id: 'kafka', name: 'Apache Kafka', category: 'Messaging & Security', subtitle: 'Event Streaming' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Messaging & Security', subtitle: 'Lucene Full-Text' },
  { id: 'kong', name: 'Kong Gateway', category: 'Messaging & Security', subtitle: 'API Proxy & Auth' },
  { id: 'keycloak', name: 'Keycloak & JWT', category: 'Messaging & Security', subtitle: 'SSO & RBAC' },
];

const CATEGORIES: ('All' | StackItem['category'])[] = [
  'All',
  'Front-End',
  'Back-End',
  'Databases',
  'DevOps & Cloud',
  'Messaging & Security',
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | StackItem['category']>('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return STACK_ITEMS;
    return STACK_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Group by category if "All" is active
  const groupedCategories = useMemo(() => {
    if (activeCategory !== 'All') {
      return null;
    }
    const groups: { name: StackItem['category']; items: StackItem[] }[] = [];
    const nonAllCategories: StackItem['category'][] = [
      'Front-End',
      'Back-End',
      'Databases',
      'DevOps & Cloud',
      'Messaging & Security',
    ];

    nonAllCategories.forEach((cat) => {
      const items = STACK_ITEMS.filter((i) => i.category === cat);
      if (items.length > 0) {
        groups.push({ name: cat, items });
      }
    });

    return groups;
  }, [activeCategory]);

  return (
    <section id="skills" className="relative py-24 bg-slate-50 dark:bg-[#050e0d] overflow-hidden">
      {/* Ambient background glows matching theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0d9488]/10 dark:bg-[#20938a]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2cc1b5]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#0c2120]/70 border border-slate-200/80 dark:border-[#20938a]/30 backdrop-blur-md text-[#0d9488] dark:text-[#2cc1b5] text-xs font-mono font-semibold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
            <span>CORE TOOLKIT & ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
            Technical <span className="text-[#0d9488] dark:text-[#2cc1b5]">Stack</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            A minimal, production-proven inventory of frameworks, distributed microservices, databases, and DevOps tools.
          </p>
        </div>

        {/* Controls: Centered Glass Filter Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full p-1.5 rounded-2xl bg-white/60 dark:bg-[#0c2120]/45 border border-slate-200/80 dark:border-[#20938a]/20 backdrop-blur-md shadow-sm">
            {CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0d9488] to-[#14b8a6] text-white shadow-md shadow-teal-500/25 scale-[1.02]'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-[#112d2b]/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Display: Grouped Stacks or Filtered Grid */}
        {groupedCategories ? (
          <div className="space-y-12">
            {groupedCategories.map((group) => (
              <div key={group.name} className="space-y-4">
                
                {/* Minimal Stack Section Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70 dark:border-[#20938a]/20">
                  <span className="w-2 h-2 rounded-full bg-[#0d9488] dark:text-[#2cc1b5] shadow-[0_0_8px_#2cc1b5]" />
                  <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white tracking-wide uppercase">
                    {group.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-gray-500 ml-auto">
                    {group.items.length} tools
                  </span>
                </div>

                {/* Glass Finish Icons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                  {group.items.map((item) => (
                    <GlassIconCard key={item.id} item={item} />
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 rounded-3xl bg-white/60 dark:bg-[#0c2120]/40 shadow-lg backdrop-blur-md">
                <p className="text-slate-500 dark:text-gray-400 text-sm font-mono">No tools found in this category.</p>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="mt-3 text-xs font-mono text-[#0d9488] dark:text-[#2cc1b5] hover:underline cursor-pointer"
                >
                  Reset filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {filteredItems.map((item) => (
                  <GlassIconCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom Clean Architecture Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 dark:bg-[#0c2120]/40 border border-slate-200/80 dark:border-[#20938a]/20 backdrop-blur-md text-slate-600 dark:text-gray-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-[#0d9488] dark:text-[#2cc1b5]" />
            <span>Enterprise-hardened with zero-trust architecture, automated testing, and scalable microservices</span>
          </div>
        </div>

      </div>
    </section>
  );
};

interface GlassIconCardProps {
  item: StackItem;
}

const GlassIconCard: React.FC<GlassIconCardProps> = ({ item }) => {
  return (
    <div
      className="group relative p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-[#0c2120]/50 backdrop-blur-xl shadow-md shadow-slate-200/40 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-xl hover:shadow-[#0d9488]/15 dark:hover:shadow-[#2cc1b5]/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-default overflow-hidden"
    >
      {/* Top frosted glass reflection line */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-[#2cc1b5]/40 to-transparent pointer-events-none" />

      {/* Subtle hover background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/0 via-teal-500/0 to-teal-500/5 dark:to-[#2cc1b5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon Capsule with Glass Finish */}
      <div className="relative w-14 h-14 rounded-2xl bg-slate-50/90 dark:bg-[#081716]/90 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(44,193,181,0.3)] transition-all duration-300">
        <TechIcon name={item.name} className="w-8 h-8 transition-transform group-hover:scale-105" />
      </div>

      {/* Tool Label */}
      <div className="text-center w-full z-10">
        <span className="block text-xs sm:text-sm font-heading font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors truncate">
          {item.name}
        </span>
        {item.subtitle && (
          <span className="block text-[10px] font-mono text-slate-400 dark:text-gray-400 truncate mt-0.5">
            {item.subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
