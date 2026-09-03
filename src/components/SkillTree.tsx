import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Code2,
  Cpu,
  Database,
  Layout,
  Server,
  FileCode2,
  FileJson,
  GitBranch,
  Smartphone,
  DatabaseBackup,
  Terminal,
  Sparkles,
  Info,
} from 'lucide-react';
import { PORTFOLIO_DATA, type SkillNode } from '../data/portfolioData';
import { sound } from '../utils/audio';

// Map icon strings to Lucide components
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Brain,
  Cpu,
  Database,
  FileCode2,
  Layout,
  FileJson,
  Server,
  GitBranch,
  Smartphone,
  DatabaseBackup,
  Terminal,
};

export const SkillTree: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'web' | 'tools'>('all');
  const [activeNode, setActiveNode] = useState<SkillNode | null>(PORTFOLIO_DATA.skills[0]);

  const skills = PORTFOLIO_DATA.skills;
  const filteredSkills =
    selectedCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'ALL MODULES', count: skills.length },
    { id: 'ai', label: 'AI & MACHINE LEARNING', count: skills.filter((s) => s.category === 'ai').length },
    { id: 'web', label: 'WEB ARCHITECTURE', count: skills.filter((s) => s.category === 'web').length },
    { id: 'tools', label: 'DEVELOPER ARSENAL', count: skills.filter((s) => s.category === 'tools').length },
  ];

  const handleNodeHover = (node: SkillNode) => {
    sound.playHover();
    setActiveNode(node);
  };

  const handleNodeClick = (node: SkillNode) => {
    sound.playSelect();
    setActiveNode(node);
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-400 text-xs font-silkscreen mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>CYBERNETIC SKILL TREE // V2.6</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          NEURAL <span className="text-purple-400 text-glow-purple">SKILL TREE</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-2 max-w-md">
          Explore interactive capability nodes. Select any module to inspect synaptic connections and real-world implementations.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playSelect();
                setSelectedCategory(cat.id as 'all' | 'ai' | 'web' | 'tools');
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded font-orbitron text-xs tracking-wider transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                  : 'bg-[#0a0f1d] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-purple-400/30 text-purple-200' : 'bg-white/5 text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skill Tree Grid & Synaptic Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Nodes Grid (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((node) => {
              const isSelected = activeNode?.id === node.id;
              const isConnected = activeNode?.connections.includes(node.id);
              const IconComponent = ICON_MAP[node.icon] || Cpu;

              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => handleNodeHover(node)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#12192e] border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.35)] -translate-y-1'
                      : isConnected
                      ? 'bg-[#0d1424] border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'bg-[#0a0f1d] border-white/10 hover:border-cyan-500/40 hover:bg-[#0d1324]'
                  }`}
                >
                  {/* Subtle Node Status Dot */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded border ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : isConnected
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                          : 'bg-white/5 border-white/10 text-slate-300 group-hover:text-cyan-400'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <span
                      className={`text-[9px] font-silkscreen px-1.5 py-0.5 rounded ${
                        node.tier === 'MASTER'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : node.tier === 'EXPERT'
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {node.tier}
                    </span>
                  </div>

                  {/* Node Title */}
                  <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {node.name}
                  </h3>

                  {/* Level Meter */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>SYNC:</span>
                      <span className="text-cyan-400 font-bold">{node.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${node.level}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>

                  {/* Corner cyber notch accent */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 rotate-45 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Neural Synapse Inspector Panel (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-[#0a0f1d] border border-cyan-500/40 rounded-lg p-6 shadow-[0_0_30px_rgba(0,240,255,0.1)] relative overflow-hidden">
            {/* Top HUD bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
              <div className="flex items-center gap-2 text-cyan-400 font-silkscreen text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SYNAPSE INSPECTOR</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
            </div>

            {activeNode ? (
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] font-silkscreen text-purple-400 tracking-wider mb-1">
                    SELECTED MODULE // {activeNode.category.toUpperCase()}
                  </div>
                  <h4 className="font-orbitron font-black text-xl text-white">
                    {activeNode.name}
                  </h4>
                </div>

                {/* Big Proficiency Gauge */}
                <div className="p-4 bg-black/40 border border-white/10 rounded-md">
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="text-slate-400">MASTERY LEVEL</span>
                    <span className="text-cyan-300 font-orbitron font-bold text-sm">
                      {activeNode.level} / 100
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 rounded-full"
                      style={{ width: `${activeNode.level}%` }}
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-[10px] font-silkscreen text-amber-400">
                      RANK: {activeNode.tier}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-orbitron text-slate-300 mb-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CAPABILITY BRIEF</span>
                  </div>
                  <p className="text-xs text-slate-300 font-space leading-relaxed">
                    {activeNode.description}
                  </p>
                </div>

                {/* Linked Neural Synapses */}
                {activeNode.connections.length > 0 && (
                  <div>
                    <div className="text-xs font-orbitron text-slate-300 mb-2">
                      LINKED SYNAPSES:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNode.connections.map((connId) => {
                        const targetNode = skills.find((s) => s.id === connId);
                        if (!targetNode) return null;
                        return (
                          <button
                            key={connId}
                            onClick={() => handleNodeClick(targetNode)}
                            className="px-2.5 py-1 rounded bg-purple-500/15 border border-purple-400/40 text-purple-300 hover:bg-purple-500/30 text-[11px] font-mono transition-colors"
                          >
                            + {targetNode.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                SELECT A SKILL NODE TO INSPECT NEURAL ATTRIBUTES
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
