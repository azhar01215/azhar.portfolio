import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Terminal,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Radio,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const profile = PORTFOLIO_DATA.profile;

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Terminal CLI state
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState<Array<{ text: string; isCmd?: boolean; isError?: boolean }>>([
    { text: 'AZHAR_OS v2.026 TERMINAL INTERFACE INITIALIZED.' },
    { text: 'Type "help" to view available neural commands.' },
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playSelect();
    setIsSubmitting(true);

    // Simulated cyberpunk transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sound.playUnlock();

      // Log in terminal
      setCliHistory((prev) => [
        ...prev,
        { text: `> TRANSMISSION ENCRYPTED & TRANSMITTED BY ${formData.name.toUpperCase()}`, isCmd: true },
        { text: 'STATUS: 200 OK // PACKET DELIVERED TO AZHAR2002MOLLA@GMAIL.COM' },
      ]);
    }, 1200);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playKeypress();
    const newLogs = [...cliHistory, { text: `> ${cliInput}`, isCmd: true }];

    switch (cmd) {
      case 'help':
        newLogs.push(
          { text: 'AVAILABLE COMMANDS:' },
          { text: '  about     - View candidate player summary' },
          { text: '  skills    - List primary technical capabilities' },
          { text: '  missions  - List featured projects' },
          { text: '  contact   - Display communication endpoints' },
          { text: '  clear     - Wipe terminal screen' }
        );
        break;
      case 'about':
        newLogs.push(
          { text: `PLAYER: ${profile.fullName}` },
          { text: `UNIVERSITY: ${profile.university} (B.Tech CSE-AIML)` },
          { text: `CGPA: ${profile.stats.cgpaBTech}` },
          { text: `INTERNSHIPS: ARDENT Android Dev & PHP/MySQL Database` }
        );
        break;
      case 'skills':
        newLogs.push(
          { text: 'AI & ML: Python, Scikit-learn, Pandas, NumPy, Jupyter' },
          { text: 'WEB: HTML5, CSS3, JavaScript, Node.js' },
          { text: 'MOBILE & TOOLS: Android Studio, Git, GitHub, MySQL, VS Code' }
        );
        break;
      case 'missions':
        newLogs.push(
          { text: '1. Fake News Detection ML (Brainware Univ Project)' },
          { text: '2. Budget Expense Tracker Android App (ARDENT Internship)' },
          { text: '3. Fly Smart AI Drone Prototype' },
          { text: '4. Enterprise Web Database & Server Backend' }
        );
        break;
      case 'contact':
        newLogs.push(
          { text: `EMAIL: ${profile.email}` },
          { text: `PHONE: ${profile.phone}` },
          { text: `LOCATION: ${profile.location}` }
        );
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        newLogs.push({
          text: `Command not recognized: "${cmd}". Type "help" for command list.`,
          isError: true,
        });
    }

    setCliHistory(newLogs);
    setCliInput('');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-silkscreen mb-3">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>QUANTUM COMM CONDUIT</span>
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide">
          ESTABLISH <span className="text-cyan-400 text-glow-cyan">CONNECTION</span>
        </h2>
        <p className="font-mono text-xs text-slate-400 mt-2 max-w-md">
          Direct communication channels open for internship opportunities, project collaborations, and hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Coordinates & Interactive CLI Terminal (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`mailto:${profile.email}`}
              onMouseEnter={() => sound.playHover()}
              className="p-4 bg-[#0a0f1d] border border-cyan-500/25 rounded-lg hover:border-cyan-400 transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span>ELECTRONIC MAIL</span>
              </div>
              <div className="font-mono text-xs text-white group-hover:text-cyan-300 truncate">
                {profile.email}
              </div>
            </a>

            <a
              href={`tel:${profile.phone}`}
              onMouseEnter={() => sound.playHover()}
              className="p-4 bg-[#0a0f1d] border border-purple-500/25 rounded-lg hover:border-purple-400 transition-all group"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                <Phone className="w-3.5 h-3.5" />
                <span>COMM LINK</span>
              </div>
              <div className="font-mono text-xs text-white group-hover:text-purple-300">
                {profile.phone}
              </div>
            </a>

            <div className="p-4 bg-[#0a0f1d] border border-white/10 rounded-lg sm:col-span-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>SECTOR BASE</span>
              </div>
              <div className="font-space text-xs text-slate-300">
                {profile.location}
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="flex gap-4">
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex-1 py-3 px-4 bg-[#0a0f1d] border border-white/10 hover:border-cyan-400 rounded-lg flex items-center justify-center gap-2 font-orbitron text-xs text-white hover:text-cyan-300 transition-all group shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB</span>
            </a>

            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex-1 py-3 px-4 bg-[#0a0f1d] border border-white/10 hover:border-purple-400 rounded-lg flex items-center justify-center gap-2 font-orbitron text-xs text-white hover:text-purple-300 transition-all group shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
          </div>

          {/* Interactive Terminal Emulator */}
          <div className="bg-black/80 border border-cyan-500/40 rounded-lg p-4 font-mono text-xs shadow-[0_0_25px_rgba(0,240,255,0.1)]">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-3 text-[11px] text-cyan-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>AZHAR_CLI // V2.026</span>
              </div>
              <span className="text-[10px] text-emerald-400">SESSION OPEN</span>
            </div>

            <div className="h-44 overflow-y-auto space-y-1 text-slate-300 pr-1 scrollbar-thin">
              {cliHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    item.isCmd
                      ? 'text-cyan-400 font-bold'
                      : item.isError
                      ? 'text-red-400'
                      : 'text-slate-400'
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleCliSubmit} className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2">
              <span className="text-cyan-400 font-bold">»</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="type 'help', 'skills', 'about'..."
                className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono placeholder:text-slate-600"
              />
            </form>
          </div>
        </div>

        {/* Right Column: Transmission Form (6 cols) */}
        <div className="lg:col-span-6 bg-[#0a0f1d] border border-cyan-500/30 rounded-lg p-6 sm:p-8 shadow-[0_0_30px_rgba(0,240,255,0.08)] relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2 text-cyan-400 font-orbitron text-xs">
              <Sparkles className="w-4 h-4" />
              <span>TRANSMISSION DISPATCH</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">ENCRYPTION: 256-BIT</span>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(0,255,102,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-orbitron font-bold text-xl text-white">
                TRANSMISSION SENT ✓
              </h3>

              <p className="text-xs text-slate-300 font-space max-w-sm mx-auto leading-relaxed">
                Your message has been encoded and forwarded to Azhar's inbox. Expect a response shortly!
              </p>

              <button
                onClick={() => {
                  sound.playSelect();
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="mt-4 px-6 py-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30 font-orbitron text-xs tracking-wider transition-all"
              >
                TRANSMIT ANOTHER MESSAGE
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  CALLSIGN / SENDER NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Recruiters / Engineering Team"
                  className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white font-space text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  COMMUNICATION FREQUENCY (EMAIL)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white font-space text-xs focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  TRANSMISSION PAYLOAD (MESSAGE)
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquire about internship positions, technical roles, or project collaborations..."
                  className="w-full px-3.5 py-2.5 rounded bg-black/50 border border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white font-space text-xs focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-orbitron font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING ENCRYPTED PACKET...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>[ SEND TRANSMISSION ]</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
