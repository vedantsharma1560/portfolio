import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  enabled: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [enabled, isVisible]);

  // Smooth ring lag effect
  useEffect(() => {
    if (!enabled) return;
    let request: number;
    const follow = () => {
      setRingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      request = requestAnimationFrame(follow);
    };
    request = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(request);
  }, [position, enabled]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-emerald-400 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#10b981] ${
          isClicked ? 'scale-150 bg-teal-400' : isHovered ? 'scale-0' : 'scale-100'
        }`}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />

      {/* Outer Magnetizing Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-emerald-400/60 transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px] ${
          isHovered
            ? 'w-12 h-12 border-emerald-400 bg-emerald-400/10 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            : isClicked
            ? 'w-8 h-8 border-teal-400 scale-90 bg-teal-500/20'
            : 'w-8 h-8'
        }`}
        style={{ transform: `translate3d(${ringPosition.x}px, ${ringPosition.y}px, 0)` }}
      />
    </div>
  );
};
