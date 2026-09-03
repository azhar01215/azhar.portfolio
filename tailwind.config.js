/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#060913',
          surface: '#0b1120',
          card: '#0f172a',
          glass: 'rgba(15, 23, 42, 0.75)',
          cyan: '#00f0ff',
          'cyan-dim': 'rgba(0, 240, 255, 0.15)',
          purple: '#a855f7',
          'purple-dim': 'rgba(168, 85, 247, 0.15)',
          magenta: '#ff007f',
          'magenta-dim': 'rgba(255, 0, 127, 0.15)',
          green: '#00ff66',
          'green-dim': 'rgba(0, 255, 102, 0.15)',
          amber: '#ffb700',
          'amber-dim': 'rgba(255, 183, 0, 0.15)',
          border: 'rgba(0, 240, 255, 0.25)',
          'border-muted': 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        silkscreen: ['"Silkscreen"', 'monospace'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.5), 0 0 30px rgba(168, 85, 247, 0.2)',
        'neon-green': '0 0 15px rgba(0, 255, 102, 0.5), 0 0 30px rgba(0, 255, 102, 0.2)',
        'neon-magenta': '0 0 15px rgba(255, 0, 127, 0.5), 0 0 30px rgba(255, 0, 127, 0.2)',
        'hud': 'inset 0 0 15px rgba(0, 240, 255, 0.05), 0 0 20px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'radar': 'radarSweep 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 18px rgba(0,240,255,0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }
    },
  },
  plugins: [],
}
