import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Globe, AlertCircle, Github, Linkedin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  attachedEstimate?: string;
}

export const Contact: React.FC<ContactProps> = ({ attachedEstimate = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill attached scope estimate if present
  useEffect(() => {
    if (attachedEstimate) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n\n${attachedEstimate}` : attachedEstimate
      }));
    }
  }, [attachedEstimate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter your message.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Launch Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-50 dark:bg-[#050e0d] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#20938a]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Let's Build Something <span className="text-[#0d9488] dark:text-[#2cc1b5]">Extraordinary</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 text-base sm:text-lg">
            Have a project concept, architectural challenge, or advisory opportunity? Reach out directly and let's talk.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Direct Contact Cards */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 space-y-6 shadow-xl shadow-slate-200/50 dark:shadow-xl min-w-0 w-full overflow-hidden">
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-[#20938a]/20 pb-4">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 min-w-0 w-full">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 rounded-2xl border border-slate-200 dark:border-[#20938a]/20 bg-slate-50 dark:bg-[#081716] hover:border-[#0d9488]/50 dark:hover:border-[#20938a]/50 transition-all group min-w-0 w-full overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest block font-semibold truncate">Email Address</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors truncate block w-full" title={PERSONAL_INFO.email}>{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 rounded-2xl border border-slate-200 dark:border-[#20938a]/20 bg-slate-50 dark:bg-[#081716] hover:border-[#0d9488]/50 dark:hover:border-[#20938a]/50 transition-all group min-w-0 w-full overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest block font-semibold truncate">Direct Phone</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors truncate block w-full" title={PERSONAL_INFO.phone}>{PERSONAL_INFO.phone}</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 rounded-2xl border border-slate-200 dark:border-[#20938a]/20 bg-slate-50 dark:bg-[#081716] hover:border-[#0d9488]/50 dark:hover:border-[#20938a]/50 transition-all group min-w-0 w-full overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest block font-semibold truncate">GitHub Profile</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors truncate block w-full" title={PERSONAL_INFO.socials.github}>{PERSONAL_INFO.socials.github}</span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 sm:gap-4 p-3.5 rounded-2xl border border-slate-200 dark:border-[#20938a]/20 bg-slate-50 dark:bg-[#081716] hover:border-[#0d9488]/50 dark:hover:border-[#20938a]/50 transition-all group min-w-0 w-full overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest block font-semibold truncate">LinkedIn Profile</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#0d9488] dark:group-hover:text-[#2cc1b5] transition-colors truncate block w-full" title={PERSONAL_INFO.socials.linkedin}>{PERSONAL_INFO.socials.linkedin}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 rounded-2xl border border-slate-200 dark:border-[#20938a]/20 bg-slate-50 dark:bg-[#081716] min-w-0 w-full overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-[#0c2120] border border-teal-200 dark:border-[#20938a]/30 text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-widest block font-semibold truncate">Location</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white truncate block w-full" title={PERSONAL_INFO.location}>{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0e171a]/95 shadow-2xl shadow-slate-200/50 dark:shadow-2xl">
              
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-[#081716] border-2 border-[#0d9488] dark:border-[#20938a] text-[#0d9488] dark:text-[#2cc1b5] flex items-center justify-center shadow-2xl shadow-teal-500/20 dark:shadow-[#20938a]/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>

                  <p className="text-slate-600 dark:text-gray-300 text-sm max-w-md leading-relaxed">
                    Thank you for reaching out, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. I have received your message and will get back to you shortly.
                  </p>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'Project Inquiry',
                        message: ''
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-[#20938a]/40 bg-slate-50 dark:bg-[#081716] text-[#0d9488] dark:text-[#2cc1b5] hover:text-slate-900 dark:hover:text-white font-mono text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-1">
                      Get In Touch
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Fill in your details below for a prompt response.</p>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-700 dark:text-gray-300 block mb-2 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Elena Rostova"
                        className="w-full bg-slate-50 dark:bg-[#050e0d] border border-slate-300 dark:border-[#20938a]/30 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#0d9488] dark:focus:border-[#20938a] transition-colors"
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-500 dark:text-red-400 font-mono mt-1 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-700 dark:text-gray-300 block mb-2 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="elena@company.com"
                        className="w-full bg-slate-50 dark:bg-[#050e0d] border border-slate-300 dark:border-[#20938a]/30 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#0d9488] dark:focus:border-[#20938a] transition-colors"
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-500 dark:text-red-400 font-mono mt-1 flex items-center gap-1 font-semibold">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-mono text-slate-700 dark:text-gray-300 block mb-2 font-semibold">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your message or ideas..."
                      className="w-full bg-slate-50 dark:bg-[#050e0d] border border-slate-300 dark:border-[#20938a]/30 rounded-xl p-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:border-[#0d9488] dark:focus:border-[#20938a] transition-colors"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-500 dark:text-red-400 font-mono mt-1 flex items-center gap-1 font-semibold">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#0d9488] dark:bg-[#20938a] hover:bg-[#0f766e] text-white font-bold text-sm shadow-xl shadow-teal-500/20 dark:shadow-[#20938a]/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
