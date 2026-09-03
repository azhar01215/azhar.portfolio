import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ExternalLink,
  CheckCircle2,
  X,
  Target,
  Sparkles,
  Layers,
  ArrowRight,
  Cpu,
  Smartphone,
  Globe,
  Award,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const missions = PORTFOLIO_DATA.missions;
  const categories = ['ALL', 'AI / ML', 'Mobile Dev', 'Full-Stack', 'Innovation'];

  const filteredMissions =
    selectedCategory === 'ALL'
      ? missions
      : missions.filter((m) => m.category === selectedCategory);

  const openMissionModal = (project: Project) => {
    sound.playSelect();
    setActiveModalProject(project);
  };

  const closeModal = () => {
    sound.playSelect();
    setActiveModalProject(null);
  };

  return (
    <section id="missions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-silkscreen mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>MISSION CONTROL // ACTIVE OPERATIONS</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          SELECT <span className="text-cyan-400 text-glow-cyan">MISSION</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-2 max-w-lg">
          Explore tactical software projects, applied machine learning architectures, and mobile applications.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playSelect();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded font-orbitron text-xs tracking-wider transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/80 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-[#0a0f1d] text-slate-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredMissions.map((project, idx) => (
          <MissionCard
            key={project.id}
            project={project}
            index={idx}
            onOpenModal={() => openMissionModal(project)}
          />
        ))}
      </div>

      {/* Cinematic Mission Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <MissionDetailModal project={activeModalProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

// 3D Tilt Interactive Mission Card
interface MissionCardProps {
  project: Project;
  index: number;
  onOpenModal: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ project, index, onOpenModal }) => {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotX(rotateX);
    setRotY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  // Category Icon
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'AI / ML':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Mobile Dev':
        return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'Innovation':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Globe className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => sound.playHover()}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="bg-[#0a0f1d] border border-cyan-500/25 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-400/80 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] cursor-pointer"
    >
      {/* Top Mission HUD Banner */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-cyan-400 tracking-wider">
              {project.missionNumber}
            </span>
          </div>
          <span
            className={`text-[9px] font-silkscreen px-2 py-0.5 rounded border ${
              project.status === 'COMPLETED'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : project.status === 'INNOVATION'
                ? 'bg-purple-500/15 border-purple-500/40 text-purple-300'
                : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Category & Title */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
          {getCategoryIcon(project.category)}
          <span>{project.category}</span>
        </div>

        <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
          {project.title}
        </h3>

        <p className="text-xs text-slate-400 font-space leading-relaxed line-clamp-3 mb-4">
          {project.tagline}
        </p>

        {/* Credential / Organization Tag if available */}
        {project.organization && (
          <div className="mb-4 text-[10px] font-mono text-cyan-400/90 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">
            {project.organization}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="text-xs font-orbitron font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
        >
          <span>[ VIEW MISSION ]</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Source Code"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Cyber Corner Accent */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
      </div>
    </motion.div>
  );
};

// Cinematic Modal for Deep Project Inspection
interface MissionDetailModalProps {
  project: Project;
  onClose: () => void;
}

const MissionDetailModal: React.FC<MissionDetailModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0b1120] border-2 border-cyan-400/80 rounded-xl max-w-3xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.3)] relative overflow-hidden my-8"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-xs text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/40">
              {project.missionNumber}
            </span>
            <span className="font-silkscreen text-xs text-slate-400">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-red-400/60 hover:bg-red-500/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Title & Status */}
        <div className="mb-6">
          <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white mb-2">
            {project.title}
          </h3>
          <p className="text-sm font-space text-cyan-300 font-medium">{project.tagline}</p>

          {project.organization && (
            <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{project.organization}</span>
              {project.credentialId && (
                <span className="text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                  ID: {project.credentialId}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Performance Metric Callout */}
        <div className="p-3 bg-gradient-to-r from-cyan-950/40 to-purple-950/40 border border-cyan-500/30 rounded-lg mb-6 flex items-center justify-between">
          <span className="font-silkscreen text-xs text-slate-300">BENCHMARK / KEY METRIC:</span>
          <span className="font-mono text-xs text-cyan-300 font-bold">{project.metrics}</span>
        </div>

        {/* Mission Architecture / Problem & Solution */}
        <div className="space-y-6 mb-8 text-xs sm:text-sm">
          <div>
            <h4 className="font-orbitron font-bold text-slate-200 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>THE CHALLENGE</span>
            </h4>
            <p className="text-slate-300 font-space leading-relaxed bg-black/30 p-3.5 rounded border border-white/5">
              {project.problem}
            </p>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-slate-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>THE ARCHITECTURAL SOLUTION</span>
            </h4>
            <p className="text-slate-300 font-space leading-relaxed bg-black/30 p-3.5 rounded border border-white/5">
              {project.solution}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="font-orbitron font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>MISSION HIGHLIGHTS & CAPABILITIES</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 bg-black/20 rounded border border-white/5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 font-space text-xs">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Tech Stack */}
          <div>
            <h4 className="font-orbitron font-bold text-slate-200 mb-2">TECHNOLOGIES DEPLOYED</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/20 text-white hover:border-cyan-400 rounded text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB REPO</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded text-xs font-mono transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE SYSTEM</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-700 hover:border-slate-500 text-slate-300 font-orbitron text-xs rounded transition-colors"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </motion.div>
    </div>
  );
};
