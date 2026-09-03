import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Tv, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME', code: '01' },
  { id: 'about', label: 'ABOUT', code: '02' },
  { id: 'skills', label: 'SKILLS', code: '03' },
  { id: 'missions', label: 'PROJECTS', code: '04' },
  { id: 'achievements', label: 'ACHIEVEMENTS', code: '05' },
  { id: 'academics', label: 'JOURNEY', code: '06' },
  { id: 'contact', label: 'CONTACT', code: '07' },
];

export const Navbar: React.FC<NavbarProps> = ({
  crtEnabled,
  onToggleCrt,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(sound.isMuted);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Active section detection
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    sound.playSelect();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newMuted = sound.toggleMute();
    setIsSoundMuted(newMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060913]/90 backdrop-blur-md border-b border-cyan-500/25 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#060913]/90 via-[#060913]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Player Identity Badge */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-center overflow-hidden group-hover:border-cyan-300 transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            <span className="font-pixel text-[11px] text-cyan-400 font-bold group-hover:scale-110 transition-transform">
              AM
            </span>
            <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                AZHAR.EXE
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                AI/ML
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-silkscreen tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0b1120]/70 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-3.5 py-1.5 text-xs font-orbitron tracking-wider transition-all rounded-full flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cyan-300 font-semibold bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-[9px] font-mono opacity-60 text-cyan-500">{item.code}.</span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_6px_#00f0ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & CV Button */}
        <div className="flex items-center gap-2.5">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            title={isSoundMuted ? 'Unmute 8-Bit Audio FX' : 'Mute Audio FX'}
            className={`p-2 rounded border text-xs transition-all flex items-center justify-center ${
              !isSoundMuted
                ? 'border-cyan-400 text-cyan-300 bg-cyan-500/15 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'border-slate-800 text-slate-500 hover:text-slate-300 bg-slate-900/50'
            }`}
          >
            {!isSoundMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* CRT Overlay Toggle */}
          <button
            onClick={() => {
              sound.playSelect();
              onToggleCrt();
            }}
            onMouseEnter={() => sound.playHover()}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-2 rounded border text-xs transition-all flex items-center justify-center ${
              crtEnabled
                ? 'border-purple-400 text-purple-300 bg-purple-500/15 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                : 'border-slate-800 text-slate-500 hover:text-slate-300 bg-slate-900/50'
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Quick Connect Action */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono rounded tracking-wider transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)] group"
          >
            <span className="font-orbitron font-medium text-[11px]">CONNECT</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playSelect();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded border border-slate-800 bg-slate-900/80 text-cyan-400"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d]/98 border-b border-cyan-500/30 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between py-2.5 px-4 rounded text-left font-orbitron text-sm ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-cyan-400/60">0{item.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
