import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 250); // fast fade out
          }, 80);
          return 100;
        }
        return prev + Math.floor(Math.random() * 30) + 20;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#060b08] flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Soft Glow */}
      <div className="absolute w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
        
        {/* Animated Brand Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-green-600 p-[1.5px] shadow-2xl shadow-emerald-500/20 animate-float">
          <div className="w-full h-full bg-[#060b08] rounded-[14px] flex items-center justify-center text-emerald-400 font-extrabold text-xl font-heading tracking-tight">
            VS
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl font-heading font-bold text-white tracking-tight">
            {PERSONAL_INFO.name}
          </h1>
          <p className="text-xs font-mono text-emerald-400 mt-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            INITIALIZING WORKSPACE
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-2">
          <div className="w-full h-1.5 bg-emerald-950/40 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 rounded-full transition-all duration-150 shadow-[0_0_12px_#10b981]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>Core Engines Loaded</span>
            <span className="text-emerald-400 font-bold">{Math.min(progress, 100)}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
