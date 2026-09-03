import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target is interactive
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.cursor === 'hover' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing animation loop
    let animationFrame: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animationFrame = requestAnimationFrame(updateTrailing);
    };
    animationFrame = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glowing Ring */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/80 transition-all duration-150 ease-out will-change-transform ${
          isHovering
            ? 'w-12 h-12 bg-cyan-500/10 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.8)] scale-110'
            : isClicking
            ? 'w-8 h-8 bg-cyan-400/30 border-cyan-200 scale-95'
            : 'w-7 h-7 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
        }}
      >
        {/* Subtle crosshair lines on hover */}
        {isHovering && (
          <>
            <div className="absolute top-1/2 left-0 w-1.5 h-[1px] bg-cyan-300 -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-1.5 h-[1px] bg-cyan-300 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-[1px] h-1.5 bg-cyan-300 -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-[1px] h-1.5 bg-cyan-300 -translate-x-1/2" />
          </>
        )}
      </div>

      {/* Center Precise Dot */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 transition-all duration-75 will-change-transform ${
          isHovering ? 'w-1.5 h-1.5 bg-white' : 'w-2 h-2 shadow-[0_0_8px_#00f0ff]'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      />
    </div>
  );
};
