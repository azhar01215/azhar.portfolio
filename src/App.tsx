import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { CustomCursor } from './components/CustomCursor';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPlayer } from './components/AboutPlayer';
import { SkillTree } from './components/SkillTree';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { AcademicsTimeline } from './components/AcademicsTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [hasBooted, setHasBooted] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#060913] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Cinematic Boot Screen (first load) */}
      {!hasBooted && <BootScreen onComplete={() => setHasBooted(true)} />}

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Dynamic Animated Starfield & Grid Matrix */}
      <ParticleBackground crtEnabled={crtEnabled} />

      {/* Fixed HUD Navigation */}
      <Navbar
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled((prev) => !prev)}
      />

      {/* Main Content Modules */}
      <main className="relative z-10">
        <Hero />
        <AboutPlayer />
        <SkillTree />
        <ProjectsSection />
        <AchievementsSection />
        <AcademicsTimeline />
        <ContactSection />
      </main>

      {/* Minimal Cyber Footer */}
      <Footer />
    </div>
  );
};

export default App;
