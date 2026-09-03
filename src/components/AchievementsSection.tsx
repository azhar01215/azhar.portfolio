import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Lock,
  Unlock,
  Smartphone,
  Cpu,
  Zap,
  Gamepad2,
  Database,
  Award,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA, type Achievement } from '../data/portfolioData';
import { sound } from '../utils/audio';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Smartphone,
  Cpu,
  Zap,
  Gamepad2,
  Database,
  Award,
};

export const AchievementsSection: React.FC = () => {
  const [unlockedMap, setUnlockedMap] = useState<Record<string, boolean>>({});
  const achievements = PORTFOLIO_DATA.achievements;

  const triggerUnlock = (id: string) => {
    if (!unlockedMap[id]) {
      sound.playUnlock();
      setUnlockedMap((prev) => ({ ...prev, [id]: true }));

      // Cyber particle burst
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00f0ff', '#a855f7', '#ffb700', '#00ff66'],
      });
    }
  };

  const handleCardClick = (ach: Achievement) => {
    triggerUnlock(ach.id);
  };

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-400 text-xs font-silkscreen mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>ARCADE TROPHY CABINET // VERIFIED</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          ACHIEVEMENTS <span className="text-amber-400 text-glow-magenta">UNLOCKED</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-2 max-w-lg">
          Recognitions, competitive gaming ranks, and industrial certifications earned across AI, engineering, and campus championships.
        </p>
      </div>

      {/* Grid of Achievement Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach, idx) => {
          const isUnlocked = !!unlockedMap[ach.id];
          const IconComponent = ICON_MAP[ach.icon] || Award;

          // Rarity colors
          const rarityStyles = {
            LEGENDARY: {
              border: 'border-amber-400/80',
              glow: 'shadow-[0_0_25px_rgba(255,183,0,0.3)]',
              badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
              textGlow: 'text-amber-400',
            },
            EPIC: {
              border: 'border-purple-400/80',
              glow: 'shadow-[0_0_25px_rgba(168,85,247,0.3)]',
              badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
              textGlow: 'text-purple-400',
            },
            RARE: {
              border: 'border-cyan-400/80',
              glow: 'shadow-[0_0_25px_rgba(0,240,255,0.3)]',
              badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
              textGlow: 'text-cyan-400',
            },
            COMMON: {
              border: 'border-slate-600',
              glow: '',
              badge: 'bg-slate-700 text-slate-300',
              textGlow: 'text-slate-300',
            },
          }[ach.rarity];

          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              onViewportEnter={() => {
                // Auto-unlock on scroll into view with slight stagger
                setTimeout(() => triggerUnlock(ach.id), idx * 180);
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => handleCardClick(ach)}
              onMouseEnter={() => sound.playHover()}
              className={`p-6 rounded-xl border bg-[#0a0f1d] flex flex-col justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                isUnlocked
                  ? `${rarityStyles.border} ${rarityStyles.glow} hover:-translate-y-1`
                  : 'border-white/10 opacity-75'
              }`}
            >
              <div>
                {/* Top Rarity & Status Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span
                    className={`text-[9px] font-silkscreen px-2 py-0.5 rounded border ${rarityStyles.badge}`}
                  >
                    {ach.rarity}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Unlock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-silkscreen">UNLOCKED</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-500">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-silkscreen">LOCKED</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Trophy Icon + XP Badge */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${
                      isUnlocked
                        ? `${rarityStyles.badge} group-hover:scale-110 shadow-lg`
                        : 'bg-white/5 border-white/10 text-slate-600'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-slate-400">{ach.category}</div>
                    <div className="flex items-center gap-1 text-xs font-orbitron font-bold text-amber-400">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>+{ach.xp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-orbitron font-bold text-base text-white group-hover:text-amber-300 transition-colors mb-2">
                  {ach.title}
                </h3>

                <p className="text-xs text-slate-300 font-space leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Organization & Credential Metadata */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-1 text-[11px] font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>ORG:</span>
                  <span className="text-slate-200">{ach.organization}</span>
                </div>
                {ach.credentialId && (
                  <div className="flex justify-between text-cyan-400">
                    <span>CREDENTIAL ID:</span>
                    <span className="font-semibold">{ach.credentialId}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>RECORDED:</span>
                  <span>{ach.date}</span>
                </div>
              </div>

              {/* Glowing Corner Badge */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                <div
                  className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${
                    isUnlocked ? 'border-amber-400' : 'border-slate-700'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
