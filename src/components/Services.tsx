import React, { useState } from 'react';
import { Code, Box, Bot, Palette, ArrowRight, CheckCircle, Calculator, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';
import { ProjectEstimatorModal } from './ProjectEstimatorModal';

// Icon Map
const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Box,
  Bot,
  Palette,
};

interface ServicesProps {
  onAttachEstimateToContact: (summary: string) => void;
  onNavigateToContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onAttachEstimateToContact, onNavigateToContact }) => {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);

  return (
    <section id="services" className="relative py-24 bg-[#08100c]/80 border-t border-b border-emerald-950/40 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Glass panel badge above heading REMOVED */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Specialized Engineering <span className="text-emerald-400">Services</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            High-value technical engagement models tailored for enterprises, startups, and innovation labs.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {SERVICES.map((serv) => {
            const IconComponent = ICON_MAP[serv.iconName] || Code;

            return (
              <div
                key={serv.id}
                className="group p-8 rounded-3xl border border-emerald-950/40 bg-[#09120e]/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-xl"
              >
                <div>
                  
                  {/* Service Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs text-gray-500 block">Starting at</span>
                      <span className="text-lg font-bold text-emerald-400 font-heading">
                        {serv.startingPrice}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {serv.title}
                  </h3>

                  <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                    {serv.fullDesc}
                  </p>

                  {/* Features Checklist */}
                  <div className="mt-6 pt-6 border-t border-emerald-950/50 space-y-2.5">
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
                      Key Scope Capabilities
                    </p>
                    {serv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Footer */}
                <div className="mt-8 pt-6 border-t border-emerald-950/40 flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">
                    Est. Timeline: <strong className="text-white">{serv.estimatedDays}</strong>
                  </span>

                  <button
                    onClick={() => onNavigateToContact()}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group/btn"
                  >
                    Inquire Scope
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Estimator Banner Callout */}
        <div className="p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-green-950/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Calculator className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Need a Custom Estimate & Scope Proposal?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Use our instant interactive estimator tool to select deliverables and budget preferences.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEstimatorOpen(true)}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-xl shadow-emerald-950/40 hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Estimator</span>
          </button>
        </div>

      </div>

      {/* Estimator Modal */}
      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onAttachEstimateToContact={(summary) => {
          onAttachEstimateToContact(summary);
          onNavigateToContact();
        }}
      />
    </section>
  );
};
