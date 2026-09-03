import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  Calendar,
  Building,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const AcademicsTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'DEGREE' | 'INTERNSHIP'>('ALL');
  const journey = PORTFOLIO_DATA.journey;

  const filteredJourney =
    filter === 'ALL'
      ? journey
      : filter === 'DEGREE'
      ? journey.filter((j) => j.type === 'DEGREE' || j.type === 'DIPLOMA' || j.type === 'SCHOOL')
      : journey.filter((j) => j.type === 'INTERNSHIP');

  return (
    <section id="academics" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-silkscreen mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>PLAYER CHRONOLOGY // EXP HISTORY</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          PLAYER <span className="text-cyan-400 text-glow-cyan">JOURNEY</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-2 max-w-md">
          Academic achievements, applied industrial training at ARDENT Computech, and computer science degrees.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-14">
        {[
          { id: 'ALL', label: 'ALL MILESTONES' },
          { id: 'DEGREE', label: 'EDUCATION & DEGREES' },
          { id: 'INTERNSHIP', label: 'INDUSTRIAL INTERNSHIPS' },
        ].map((tab) => {
          const isSelected = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playSelect();
                setFilter(tab.id as 'ALL' | 'DEGREE' | 'INTERNSHIP');
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded font-orbitron text-xs tracking-wider transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-[#0a0f1d] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Glowing Central Vertical Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Glowing Center Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-500 -translate-x-1/2 shadow-[0_0_12px_rgba(0,240,255,0.6)]" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {filteredJourney.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const isInternship = item.type === 'INTERNSHIP';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => sound.playHover()}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Glowing Node Anchor */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#070b14] border-2 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_15px_#00f0ff] group">
                  {isInternship ? (
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </div>

                {/* Content Box */}
                <div className="w-full md:w-[44%] ml-12 md:ml-0 md:px-4">
                  <div
                    className={`bg-[#0a0f1d] border rounded-lg p-6 relative group transition-all duration-300 hover:-translate-y-1 ${
                      isInternship
                        ? 'border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                        : 'border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    }`}
                  >
                    {/* Period & Status Pill */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-cyan-300">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.period}</span>
                      </div>
                      <span
                        className={`text-[9px] font-silkscreen px-2 py-0.5 rounded border ${
                          item.status === 'CURRENT'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                            : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Title & Institution */}
                    <h3 className="font-orbitron font-bold text-base text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-3">
                      <Building className="w-3.5 h-3.5 text-purple-400" />
                      <span>{item.institution}</span>
                    </div>

                    {/* Score / Credential Banner */}
                    {item.score && (
                      <div className="mb-3 p-2 rounded bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">BENCHMARK / SCORE:</span>
                        <span className="text-cyan-400 font-bold">{item.score}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-400 font-space leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Cyber Notch Accent */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
