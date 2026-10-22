import React, { useEffect, useRef } from 'react';

interface HeroParticleCanvasProps {
  isDarkMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  isAccent: boolean;
}

export const HeroParticleCanvas: React.FC<HeroParticleCanvasProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates relative to Hero parent container
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let particles: Particle[] = [];

    const initParticles = (w: number, h: number) => {
      // Calculate responsive particle count (subtle, airy density)
      const area = w * h;
      const count = Math.min(Math.max(Math.floor(area / 18000), 28), 68);

      particles = [];
      for (let i = 0; i < count; i++) {
        const isAccent = i % 7 === 0;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.12 + Math.random() * 0.22;

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed,
          radius: isAccent ? 2.4 + Math.random() * 0.8 : 1.2 + Math.random() * 1.0,
          alpha: 0.25 + Math.random() * 0.45,
          pulseSpeed: 0.015 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          isAccent,
        });
      }
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize particles if empty or significantly resized
      if (particles.length === 0) {
        initParticles(width, height);
      } else {
        // Keep particles in bounds
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Attach listeners
    parent.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial sizing
    handleResize();

    // Max proximity connection distances
    const maxConnectionDist = 115;
    const maxConnectionDistSq = maxConnectionDist * maxConnectionDist;
    const mouseInfluenceRadius = 150;
    const mouseInfluenceRadiusSq = mouseInfluenceRadius * mouseInfluenceRadius;

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Soft interactive mouse glow aura
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const auraGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseInfluenceRadius
        );
        auraGradient.addColorStop(
          0,
          isDarkMode ? 'rgba(44, 193, 181, 0.09)' : 'rgba(13, 148, 136, 0.07)'
        );
        auraGradient.addColorStop(
          0.6,
          isDarkMode ? 'rgba(32, 147, 138, 0.03)' : 'rgba(13, 148, 136, 0.02)'
        );
        auraGradient.addColorStop(1, 'rgba(44, 193, 181, 0)');

        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseInfluenceRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and draw particles & mouse interaction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse phase for organic breathing
        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.12;
        const clampedAlpha = Math.max(0.12, Math.min(currentAlpha, 0.85));

        // Mouse reaction: gentle elastic repulsion + interactive connection
        if (mouse.active) {
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

          if (distMouseSq < mouseInfluenceRadiusSq && distMouseSq > 0.01) {
            const distMouse = Math.sqrt(distMouseSq);
            const force = (1 - distMouse / mouseInfluenceRadius) * 1.6;

            p.vx += (dxMouse / distMouse) * force * 0.35;
            p.vy += (dyMouse / distMouse) * force * 0.35;

            // Interactive connection line from cursor to particle
            const lineAlpha = (1 - distMouse / mouseInfluenceRadius) * (isDarkMode ? 0.3 : 0.22);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = isDarkMode
              ? `rgba(44, 193, 181, ${lineAlpha})`
              : `rgba(13, 148, 136, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Apply gentle damping to push velocities
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Position update (base constant drift + smooth velocity)
        p.x += p.baseVx + p.vx;
        p.y += p.baseVy + p.vy;

        // Wrap around screen boundaries with margin
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? `rgba(${p.isAccent ? '44, 193, 181' : '32, 147, 138'}, ${clampedAlpha})`
          : `rgba(13, 148, 136, ${clampedAlpha})`;
        ctx.fill();

        // Extra subtle luminous ring on accent particles
        if (p.isAccent) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode
            ? `rgba(44, 193, 181, ${clampedAlpha * 0.15})`
            : `rgba(13, 148, 136, ${clampedAlpha * 0.12})`;
          ctx.fill();
        }

        // 3. Connect nearby particle pairs with faint constellation links
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectionDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectionDist) * (isDarkMode ? 0.15 : 0.1);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDarkMode
              ? `rgba(44, 193, 181, ${lineAlpha})`
              : `rgba(13, 148, 136, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
