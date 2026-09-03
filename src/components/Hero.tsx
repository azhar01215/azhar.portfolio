import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, ArrowUpRight, Send, Cpu, Activity, Compass, Database } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [coords, setCoords] = useState({ lat: '22.1953° N', lng: '88.2045° E' }); // Diamond Harbour coordinates
  const heroRef = useRef<HTMLDivElement | null>(null);

  const roles = PORTFOLIO_DATA.profile.titles;

  // Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic role rotator
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  // Minor coordinate jitter for cyber HUD feel
  useEffect(() => {
    const jitter = setInterval(() => {
      const randLat = (22.1953 + (Math.random() - 0.5) * 0.002).toFixed(4);
      const randLng = (88.2045 + (Math.random() - 0.5) * 0.002).toFixed(4);
      setCoords({ lat: `${randLat}° N`, lng: `${randLng}° E` });
    }, 3000);
    return () => clearInterval(jitter);
  }, []);

  const scrollToMissions = () => {
    sound.playSelect();
    document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle Parallax HUD Elements */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0)`,
        }}
      >
        {/* Top-left HUD Coordinates */}
        <div className="absolute top-28 left-6 md:left-12 hidden md:block font-mono text-[11px] text-cyan-500/70 border-l-2 border-cyan-500/40 pl-3 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '14s' }} />
            <span>GEO-NODE // WEST BENGAL</span>
          </div>
          <div>LAT: {coords.lat}</div>
          <div>LNG: {coords.lng}</div>
          <div className="text-[10px] text-slate-500">SECTOR: DIAMOND HARBOUR</div>
        </div>

        {/* Top-right HUD Telemetry */}
        <div className="absolute top-28 right-6 md:right-12 hidden md:block font-mono text-[11px] text-right border-r-2 border-purple-500/40 pr-3 space-y-1">
          <div className="flex items-center justify-end gap-1.5 text-purple-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>AI CORE: ONLINE</span>
          </div>
          <div className="text-slate-400">SYSTEM LOAD: 87%</div>
          <div className="text-slate-400">BUILD: 2026.04-LTS</div>
          <div className="text-[10px] text-emerald-400">NEURAL KERNEL: ACTIVE</div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top HUD Status Ticker */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 sm:gap-4 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-[#0b1222]/80 backdrop-blur-md mb-6 text-[10px] sm:text-xs font-silkscreen tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ● SYSTEM ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">PLAYER 01</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-400">PORTFOLIO.EXE</span>
        </motion.div>

        {/* Name Heading with Sci-Fi Glitch & Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mb-3 group select-none"
        >
          <h1 className="font-orbitron font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white drop-shadow-[0_0_25px_rgba(0,240,255,0.35)]">
            MD AZHAR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
              MEHEMUD MOLLA
            </span>
          </h1>

          {/* Underline HUD bar */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-2 h-2 rotate-45 border border-cyan-400 bg-cyan-400/20" />
            <div className="h-[2px] w-24 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            <div className="w-2 h-2 rotate-45 border border-cyan-400 bg-cyan-400/20" />
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>
        </motion.div>

        {/* Dynamic Rotating Subtitle Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="min-h-[36px] flex items-center justify-center mb-6"
        >
          <div className="font-orbitron font-bold text-sm sm:text-lg md:text-xl tracking-widest text-cyan-300/90 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="transition-all duration-300 key={activeRoleIndex}">
              {roles[activeRoleIndex]}
            </span>
            <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse ml-0.5" />
          </div>
        </motion.div>

        {/* Terminal Boot Quote Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-xl mx-auto mb-8 border border-cyan-500/25 bg-[#090e1b]/85 p-4 rounded-md shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-left font-mono text-xs sm:text-sm text-slate-300 relative overflow-hidden backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-2 mb-3 text-[11px] text-cyan-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>TERMINAL_INIT.LOG</span>
            </div>
            <span className="text-emerald-400 font-silkscreen text-[10px]">READY</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400">
            <p className="text-cyan-300">
              « Initializing developer profile...
            </p>
            <p>
              Loading Machine Learning pipelines: <span className="text-white font-semibold">Python • Scikit-learn • Pandas</span>
            </p>
            <p>
              Deploying systems & architectures: <span className="text-white font-semibold">Node.js • JavaScript • Android</span>
            </p>
            <p className="text-emerald-400 font-semibold">
              STATUS: READY FOR MISSIONS & INTERNSHIPS »
            </p>
          </div>
        </motion.div>

        {/* Introduction Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl text-sm sm:text-base text-slate-300 mb-10 leading-relaxed font-space"
        >
          Building intelligent machine learning systems, interactive web applications, and robust software architectures.
          Pursuing B.Tech in Computer Science & Engineering (AI & ML) at <span className="text-cyan-300 font-medium">Brainware University</span>.
        </motion.p>

        {/* Premium Game UI CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Button 1: SELECT MISSION */}
          <button
            onClick={scrollToMissions}
            onMouseEnter={() => sound.playHover()}
            className="relative group px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-orbitron font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded-sm shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:shadow-[0_0_35px_rgba(0,240,255,0.9)] transition-all transform active:scale-95 cursor-pointer flex items-center gap-2.5"
          >
            <Shield className="w-4 h-4 text-black" />
            <span>[ SELECT MISSION ]</span>
            <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          {/* Button 2: ESTABLISH CONTACT */}
          <button
            onClick={() => {
              sound.playSelect();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => sound.playHover()}
            className="relative group px-8 py-4 bg-[#0a1122]/90 hover:bg-cyan-950/40 border border-cyan-400/60 hover:border-cyan-300 text-cyan-300 hover:text-white font-orbitron font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform active:scale-95 cursor-pointer flex items-center gap-2.5 backdrop-blur-sm"
          >
            <Send className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            <span>[ ESTABLISH CONTACT ]</span>
          </button>
        </motion.div>

        {/* Bottom Floating Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl"
        >
          {[
            { label: 'B.TECH AIML CGPA', val: '7.67', icon: Cpu, color: 'text-cyan-400' },
            { label: 'DIPLOMA CST CGPA', val: '8.10', icon: Database, color: 'text-purple-400' },
            { label: '12TH VOCATIONAL', val: '88%', icon: Shield, color: 'text-emerald-400' },
            { label: 'ESPORTS RANK', val: 'SEMI-FINALIST', icon: Activity, color: 'text-amber-400' },
          ].map((stat, i) => (
            <div
              key={i}
              onMouseEnter={() => sound.playHover()}
              className="p-3 border border-white/10 bg-[#0c1222]/60 rounded backdrop-blur-sm text-left hover:border-cyan-500/40 transition-colors group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-silkscreen text-slate-400 tracking-wider">
                  {stat.label}
                </span>
                <stat.icon className={`w-3.5 h-3.5 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className={`font-orbitron font-bold text-sm sm:text-base ${stat.color}`}>
                {stat.val}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
