import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Award, Terminal, Gamepad2, Utensils, Globe, Sparkles, Brain, Code } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const AboutPlayer: React.FC = () => {
  const profile = PORTFOLIO_DATA.profile;

  const statCards = [
    { label: 'MISSIONS LAUNCHED', val: '04', icon: Terminal, color: 'text-cyan-400', border: 'border-cyan-500/30' },
    { label: 'CORE TECHNOLOGIES', val: '10+', icon: Code, color: 'text-purple-400', border: 'border-purple-500/30' },
    { label: 'INDUSTRIAL INTERNSHIPS', val: '02', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { label: 'ACHIEVEMENTS UNLOCKED', val: '06+', icon: Award, color: 'text-amber-400', border: 'border-amber-500/30' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-silkscreen mb-3">
          <User className="w-3.5 h-3.5" />
          <span>PLAYER DOSSIER // CLASSIFIED</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          ABOUT <span className="text-cyan-400 text-glow-cyan">THE PLAYER</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-2 max-w-lg">
          Detailed character specs, technical attributes, academic standing, and tactical abilities.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Game Profile Character Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 bg-[#0a0f1d] border border-cyan-500/30 rounded-lg p-6 sm:p-7 shadow-[0_0_30px_rgba(0,240,255,0.08)] relative overflow-hidden"
        >
          {/* Top Card HUD Tag */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs text-cyan-400">P1-PROFILE</span>
              <span className="text-[10px] font-mono text-slate-400">// ID: 2002-AZHAR</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-silkscreen px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>

          {/* Character Avatar Box */}
          <div className="relative mb-6 flex flex-col items-center">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-xl p-1 border-2 border-cyan-400/60 bg-gradient-to-b from-cyan-500/20 to-purple-500/10 overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.3)] group">
              {/* Cyber Frame Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white z-10" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white z-10" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white z-10" />

              {/* Hologram Avatar Graphic */}
              <div className="w-full h-full rounded-lg bg-[#0d1627] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Visual Representation of Azhar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 flex items-center justify-center border-2 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                  <span className="font-orbitron font-black text-2xl text-white tracking-wider">
                    AM
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-orbitron font-bold text-xs text-white">AZHAR MOLLA</div>
                  <div className="text-[10px] font-mono text-cyan-400">CSE (AI & ML)</div>
                </div>

                {/* Subtle Scan beam */}
                <div className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scanline pointer-events-none" />
              </div>
            </div>

            {/* Level & XP Gauge */}
            <div className="w-full mt-4 bg-[#060a14] border border-white/10 p-3 rounded">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-cyan-300 font-orbitron font-bold">LEVEL 04 [AIML]</span>
                <span className="text-purple-300">14,500 / 15,000 XP</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 rounded-full"
                  style={{ width: '92%' }}
                />
              </div>
            </div>
          </div>

          {/* Quick Specs List */}
          <div className="space-y-2.5 font-mono text-xs border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span className="text-slate-400">NAME:</span>
              <span className="text-white font-medium">{profile.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ROLE:</span>
              <span className="text-cyan-300 font-medium">AI & ML / Full-Stack</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">UNIVERSITY:</span>
              <span className="text-white font-medium">{profile.university}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">LOCATION:</span>
              <span className="text-slate-300 font-medium">West Bengal, India</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">STATUS:</span>
              <span className="text-emerald-400 font-medium">OPEN FOR ROLES</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative, Stat Counters, Skills Attributes, Hobbies (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Narrative Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0a0f1d]/80 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400 mb-3">
              <Brain className="w-4 h-4" />
              <span>PROFESSIONAL MISSION STATEMENT</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-space mb-4">
              {profile.summary}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-space">
              With hands-on experience through two industrial internships at <span className="text-cyan-300 font-semibold">ARDENT Computech</span> (Android App Development & PHP/MySQL Database Architecture), combined with applied academic projects in <span className="text-cyan-300 font-semibold">Machine Learning</span> and autonomous AI drone systems at Brainware University, I bridge practical software engineering with cutting-edge artificial intelligence.
            </p>
          </motion.div>

          {/* Animated Stat Cards (Spring Animation) */}
          <div className="grid grid-cols-2 gap-4">
            {statCards.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 180, damping: 15, delay: idx * 0.1 }}
                onMouseEnter={() => sound.playHover()}
                className={`p-5 bg-[#0a0f1d] border ${stat.border} rounded-lg hover:border-cyan-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] group`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-silkscreen text-slate-400 tracking-wider">
                    {stat.label}
                  </span>
                  <stat.icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className={`font-orbitron font-black text-2xl sm:text-3xl ${stat.color}`}>
                  {stat.val}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages & Tactical Attributes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#0a0f1d]/70 border border-white/10 rounded-lg p-6"
          >
            {/* Languages */}
            <div>
              <div className="flex items-center gap-2 text-xs font-orbitron text-cyan-400 mb-3">
                <Globe className="w-4 h-4" />
                <span>LINGUISTIC PROTOCOLS</span>
              </div>
              <div className="space-y-2.5">
                {profile.languages.map((lang, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white">{lang.name}</span>
                      <span className="text-slate-400">{lang.proficiency}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Hobbies / Passions */}
            <div>
              <div className="flex items-center gap-2 text-xs font-orbitron text-purple-400 mb-3">
                <Sparkles className="w-4 h-4" />
                <span>OFF-DUTY DISCIPLINES</span>
              </div>
              <div className="space-y-3">
                {profile.hobbies.map((hobby, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-orbitron text-white">
                      {idx === 0 ? (
                        <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{hobby.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono leading-tight">
                      {hobby.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
