import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'INITIALIZING AZHAR_OS v2.026 KERNEL...',
  'ALLOCATING VRAM & SHADER COMPILERS... [OK]',
  'MOUNTING BRAINWARE UNIV (CSE-AIML) PROFILE... [OK]',
  'LOADING PYTHON, SCIKIT-LEARN & ML KERNELS... [OK]',
  'VERIFYING ARDENT INDUSTRIAL CREDENTIALS... [VALIDATED]',
  'SYNCHRONIZING SECCOM ESPORTS TACTICAL DATA... [READY]',
  'ALL SYSTEMS NOMINAL. ENTERING HUD MATRIX...',
];

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Progressive boot bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          sound.playUnlock();
          return 100;
        }
        const next = Math.min(prev + Math.floor(Math.random() * 12) + 4, 100);
        sound.playKeypress();
        return next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Progressive logs reveal
    const step = 100 / BOOT_LOGS.length;
    const currentIdx = Math.min(Math.floor(progress / step), BOOT_LOGS.length - 1);
    setLogIndex(currentIdx);
  }, [progress]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleEnter();
      }
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady]);

  const handleEnter = () => {
    sound.playSelect();
    onComplete();
  };

  // Render ASCII loading bar
  const totalBlocks = 24;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050811] text-cyan-400 font-mono select-none px-4"
      >
        {/* Top skip button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => {
              sound.playSelect();
              onComplete();
            }}
            className="flex items-center gap-2 px-4 py-2 border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-500/20 text-xs font-mono text-cyan-300 hover:text-white transition-all uppercase tracking-wider rounded group"
          >
            <span>{"[ SKIP BOOT >> ]"}</span>
            <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-bounce" />
          </button>
        </div>

        {/* Central Terminal Console Box */}
        <div className="w-full max-w-2xl border border-cyan-500/30 bg-[#0a0f1d]/90 p-6 md:p-8 rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="font-orbitron font-bold text-sm tracking-widest text-white">
                AZHAR_OS <span className="text-cyan-400 text-xs">v2.026</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-silkscreen">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                BOOTING
              </span>
              <span>PORTFOLIO.EXE</span>
            </div>
          </div>

          {/* Terminal Logs Window */}
          <div className="space-y-2 mb-6 min-h-[160px] text-xs md:text-sm">
            {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2"
              >
                <span className="text-cyan-500 select-none">»</span>
                <span
                  className={
                    idx === logIndex
                      ? 'text-white font-medium drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress Section */}
          <div className="border-t border-cyan-500/20 pt-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-silkscreen text-cyan-300">SYSTEM INITIALIZATION</span>
              <span className="font-orbitron text-cyan-400 font-bold">{progress}%</span>
            </div>

            {/* ASCII / Graphical Bar */}
            <div className="font-mono text-cyan-400 tracking-tighter text-sm md:text-base select-none overflow-hidden">
              [{asciiBar}]
            </div>

            {/* Sub Status */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>PLAYER: MD AZHAR MEHEMUD MOLLA</span>
              <span>CSE (AI & ML) // LEVEL 04</span>
            </div>
          </div>

          {/* Start Action Trigger */}
          <div className="mt-8 text-center">
            {isReady ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [1, 1.03, 1], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={handleEnter}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 text-black font-orbitron font-extrabold text-sm md:text-base tracking-widest rounded shadow-[0_0_25px_rgba(0,240,255,0.7)] hover:shadow-[0_0_35px_rgba(0,240,255,1)] transition-all uppercase flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-black" />
                <span>SYSTEM READY // CLICK TO ENTER</span>
              </motion.button>
            ) : (
              <div className="text-xs text-slate-500 font-mono tracking-wider animate-pulse">
                INITIALIZING NEURAL INTERFACE... PLEASE STAND BY
              </div>
            )}
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="mt-4 text-[11px] text-slate-500 font-mono">
          PRESS <span className="text-cyan-400 font-bold">[ENTER]</span> OR CLICK TO LAUNCH • ESC TO SKIP
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
