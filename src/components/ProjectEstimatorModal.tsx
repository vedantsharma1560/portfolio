import React, { useState } from 'react';
import { X, Calculator, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAttachEstimateToContact: (summary: string) => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  onClose,
  onAttachEstimateToContact,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([SERVICES[0].id]);
  const [timelineUrgency, setTimelineUrgency] = useState<'standard' | 'expedited'>('standard');
  const [include3D, setInclude3D] = useState<boolean>(false);
  const [includeAI, setIncludeAI] = useState<boolean>(true);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base calculation
  let basePrice = selectedServices.reduce((acc, serviceId) => {
    const s = SERVICES.find((item) => item.id === serviceId);
    if (!s) return acc;
    const priceNum = parseInt(s.startingPrice.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + priceNum;
  }, 0);

  if (include3D) basePrice += 2500;
  if (includeAI) basePrice += 2000;
  if (timelineUrgency === 'expedited') basePrice = Math.round(basePrice * 1.3);

  const totalDays = Math.max(10, selectedServices.length * 7 + (include3D ? 7 : 0) + (includeAI ? 5 : 0));
  const daysString = timelineUrgency === 'expedited' ? `${Math.round(totalDays * 0.7)} Days (Fast-Track)` : `${totalDays} Days`;

  const handleSendToContact = () => {
    const serviceNames = selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean)
      .join(', ');

    const summaryText = `Project Scope Estimate:\n- Selected Services: ${serviceNames}\n- Custom 3D Features: ${include3D ? 'Yes' : 'No'}\n- AI / Gemini Features: ${includeAI ? 'Yes' : 'No'}\n- Pace: ${timelineUrgency.toUpperCase()}\n- Estimated Range: ~$${basePrice.toLocaleString()} USD (${daysString})`;

    onAttachEstimateToContact(summaryText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#09120e] border border-emerald-950/60 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 text-left my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-emerald-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Interactive Project Estimator
              </h3>
              <p className="text-xs text-gray-400">Configure scope, timeline, and features for an instant budget estimate.</p>
            </div>
          </div>

          <button
            onClick={() => onClose()}
            className="p-2 rounded-xl bg-emerald-950/40 text-gray-400 hover:text-white border border-emerald-950/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="py-6 space-y-6">
          
          {/* Select Core Services */}
          <div>
            <label className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3">
              1. Select Core Services Needed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((serv) => {
                const isSelected = selectedServices.includes(serv.id);
                return (
                  <div
                    key={serv.id}
                    onClick={() => toggleService(serv.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-white'
                        : 'bg-[#060b08] border-emerald-950/40 text-gray-400 hover:border-emerald-500/30'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-white">{serv.title}</p>
                      <p className="text-xs font-mono text-emerald-400 mt-0.5">From {serv.startingPrice}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-emerald-900/40'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add-on Features */}
          <div>
            <label className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3">
              2. Add-on Capabilities
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInclude3D(!include3D)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  include3D ? 'bg-emerald-950/60 border-emerald-500/50 text-white' : 'bg-[#060b08] border-emerald-950/40 text-gray-400'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white">Custom 3D / WebGL Graphics</p>
                  <p className="text-[10px] text-gray-400">+ $2,500 (Interactive canvas / shaders)</p>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${include3D ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-emerald-900/40'}`}>
                  {include3D && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIncludeAI(!includeAI)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  includeAI ? 'bg-emerald-950/60 border-emerald-500/50 text-white' : 'bg-[#060b08] border-emerald-950/40 text-gray-400'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white">AI / Agentic Integration</p>
                  <p className="text-[10px] text-gray-400">+ $2,000 (Multi-modal AI pipelines)</p>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${includeAI ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-emerald-900/40'}`}>
                  {includeAI && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            </div>
          </div>

          {/* Pace & Urgency */}
          <div>
            <label className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3">
              3. Timeline Velocity
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTimelineUrgency('standard')}
                className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                  timelineUrgency === 'standard' ? 'bg-emerald-950/60 border-emerald-400 text-white' : 'bg-[#060b08] border-emerald-950/40 text-gray-400'
                }`}
              >
                Standard Velocity
              </button>
              <button
                type="button"
                onClick={() => setTimelineUrgency('expedited')}
                className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                  timelineUrgency === 'expedited' ? 'bg-emerald-900/40 border-emerald-400 text-emerald-300' : 'bg-[#060b08] border-emerald-950/40 text-gray-400'
                }`}
              >
                Fast-Track Sprint (+30%)
              </button>
            </div>
          </div>

          {/* Calculation Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-green-950/50 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-gray-400">Estimated Project Total</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-heading font-extrabold text-emerald-400">
                  ${basePrice.toLocaleString()} USD
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  • {daysString}
                </span>
              </div>
            </div>

            <button
              onClick={handleSendToContact}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Attach to Contact Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
