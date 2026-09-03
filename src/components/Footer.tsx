import React, { useState, useEffect } from 'react';
import { ChevronUp, Radio } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const profile = PORTFOLIO_DATA.profile;
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cyan-500/20 bg-[#04060c] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="font-orbitron font-extrabold text-sm sm:text-base text-white tracking-wider">
              {profile.fullName}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              AIML
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            © 2026 — BUILT WITH CODE, MACHINE LEARNING & CURIOSITY
          </p>
        </div>

        {/* Center Live Ticker */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 font-silkscreen text-[10px]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SYSTEM STATUS: ONLINE</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-slate-400 text-[11px]">{timeStr}</div>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.playHover()}
          className="p-2.5 rounded-lg border border-cyan-500/30 bg-[#0a0f1d] text-cyan-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 text-xs font-mono cursor-pointer"
        >
          <span>TOP OF MATRIX</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
