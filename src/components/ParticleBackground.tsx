import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  crtEnabled: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ crtEnabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles system
    const count = Math.min(Math.floor((width * height) / 18000), 75);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseAlpha: number;
    }

    const colors = ['#00f0ff', '#a855f7', '#00ff66', '#ffffff'];
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: Math.random() * 0.5 + 0.2,
    }));

    // Draw loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with subtle cyber constellation line
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Render each particle
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#050811]">
      {/* Dynamic Ambient Radial Gradients */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-cyan-600/10 via-purple-600/5 to-transparent blur-[120px]" />
      <div className="absolute top-[40%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-purple-600/10 via-cyan-600/5 to-transparent blur-[140px]" />
      <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-t from-cyan-950/20 via-emerald-950/10 to-transparent blur-[120px]" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-60" />

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-70" />

      {/* Optional CRT Scanlines & Screen Arc */}
      {crtEnabled && (
        <div className="absolute inset-0 crt-overlay opacity-50 transition-opacity duration-300">
          {/* Subtle CRT sweep beam */}
          <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-crt-beam pointer-events-none" />
        </div>
      )}

      {/* Vignette edge shading */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
    </div>
  );
};
