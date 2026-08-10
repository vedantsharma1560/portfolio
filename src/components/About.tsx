import React from 'react';
import { User, ShieldCheck, Zap, Code, Award, Compass, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import me from '../assets/images/me.png';

export const About: React.FC = () => {
  const CORE_VALUES = [
    {
      icon: Code,
      title: 'Full Stack Excellence',
      desc: 'Angular, React, Node.js, Express, and Spring Boot microservices built with strict TypeScript safety and RxJS reactiveness.'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security & RBAC',
      desc: 'Hardware-grade AES encryption vaults, MSAL single sign-on, Keycloak, and fine-grained authorization policies.'
    },
    {
      icon: Zap,
      title: 'Event Streaming & Messaging',
      desc: 'Sub-second real-time notifications and asynchronous pipelines using Apache Kafka, WebSockets, and MinIO object storage.'
    },
    {
      icon: Compass,
      title: 'High-Throughput Databases',
      desc: 'Optimized schema indexing across PostgreSQL, MongoDB, MySQL, Oracle DB, and Elasticsearch wild-card search.'
    }
  ];

  return (
    <section id="about" className="relative py-24 bg-slate-100/70 dark:bg-[#081716]/80 border-t border-b border-slate-200 dark:border-[#20938a]/20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#20938a]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Architecting High-Performance <span className="text-[#0d9488] dark:text-[#2cc1b5]">Enterprise Systems</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 text-base sm:text-lg">
            Engineering resilient microservices, secure authorization layers, and real-time data pipelines for industry leaders.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Frame (Left) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              
              {/* Outer Glowing Animated Border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#20938a] via-[#2cc1b5] to-[#14645e] opacity-75 blur-md group-hover:opacity-100 transition duration-500" />

              {/* Glass Frame Container */}
              <div className="relative rounded-3xl p-4 overflow-hidden border border-slate-200 dark:border-[#20938a]/30 bg-white dark:bg-[#0c2120]/90 shadow-2xl">
                <img
                  src={me}
                  alt="Vedant Sharma"
                  className="w-full h-auto max-h-[520px] sm:max-h-[580px] object-contain mx-auto rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 [backface-visibility:hidden] [transform:translateZ(0)]"
                />

                {/* Overlay Floating HUD Badges */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md border border-slate-200 dark:border-[#20938a]/40 bg-white/90 dark:bg-[#050e0d]/80 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold text-sm font-heading">{PERSONAL_INFO.name}</p>
                      <p className="text-[#0d9488] dark:text-[#2cc1b5] text-xs font-mono font-semibold">{PERSONAL_INFO.location}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/40 text-[#0d9488] dark:text-[#2cc1b5] font-mono text-[11px] font-semibold">
                      <Sparkles className="w-3 h-3 text-[#0d9488] dark:text-[#2cc1b5]" />
                      3+ Yrs Exp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story & Philosophy (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 flex flex-col gap-4 shadow-xl shadow-slate-200/50 dark:shadow-xl hover:border-[#0d9488]/50 dark:hover:border-[#2cc1b5]/50 transition-all">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0d9488] dark:text-[#2cc1b5]" />
                Background & Expertise
              </h3>
              <p className="text-slate-700 dark:text-gray-300 text-base leading-relaxed">
                {PERSONAL_INFO.fullBio}
              </p>
              <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                I specialize in turning complex domain constraints into clean, maintainable microservice architectures. Whether modernizing legacy peripheral engines or securing sensitive national assessment vaults, my focus is always on reliability, speed, and zero data leakage.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CORE_VALUES.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-[#0e171a]/90 hover:border-[#0d9488]/60 dark:hover:border-[#2cc1b5]/60 hover:bg-slate-50 dark:hover:bg-[#121f23] transition-all duration-300 group shadow-md shadow-slate-200/50 dark:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#091114] border border-teal-200 dark:border-slate-700/60 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-base font-heading group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
