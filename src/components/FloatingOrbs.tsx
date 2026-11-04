import React, { useEffect, useRef } from 'react';
import { TECH_ORBS } from '../data/portfolioData';

interface OrbState {
  el: HTMLDivElement;
  size: number;
  base: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ph: number;
  fq: number;
}

export const FloatingOrbs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = window.innerWidth;
    let H = window.innerHeight;

    const ptr = { x: -999, y: -999, on: false };
    const orbs: OrbState[] = [];

    // Pointer move listener for cursor glow and orb repulsion
    const onPointerMove = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.on = true;

      if (glow && e.pointerType === 'mouse') {
        glow.style.opacity = '1';
        glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onPointerLeave = () => {
      ptr.on = false;
      if (glow) glow.style.opacity = '0';
    };

    const onPointerUp = (e: PointerEvent) => {
      // Touch/pen have no "leave"; stop repelling once the finger lifts.
      if (e.pointerType !== 'mouse') ptr.on = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onPointerLeave);

    // Create orb elements
    container.innerHTML = '';
    TECH_ORBS.forEach((ic, k) => {
      const d = 0.8 + Math.random() * 0.2;
      const size = Math.round(42 + d * 18);
      const el = document.createElement('div');
      el.className = 'orb-node';

      const bg = ic.bg || `color-mix(in srgb, ${ic.glow} 18%, #050b12)`;
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        --k: ${k};
        --glow: ${ic.glow};
        background: radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.26), transparent 46%), ${bg};
        opacity: ${(0.4 + 0.6 * ((d - 0.6) / 0.6)).toFixed(2)};
      `;
      el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ic.svg}</svg>`;
      container.appendChild(el);

      const base = (10 + Math.random() * 18) * (0.5 + d);
      const ang = Math.random() * Math.PI * 2;
      const x = Math.random() * Math.max(1, W - size);
      const y = Math.random() * Math.max(1, H - size);

      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

      orbs.push({
        el,
        size,
        base,
        x,
        y,
        vx: Math.cos(ang) * base,
        vy: Math.sin(ang) * base,
        ph: Math.random() * 6.28,
        fq: 0.5 + Math.random() * 0.7,
      });
    });

    if (reduced) {
      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      };
    }

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      for (const o of orbs) {
        o.ph += dt * o.fq;
        o.vx += (Math.random() - 0.5) * 8 * dt;
        o.vy += (Math.random() - 0.5) * 8 * dt;

        // Pointer repulsion
        if (ptr.on) {
          const dx = o.x + o.size / 2 - ptr.x;
          const dy = o.y + o.size / 2 - ptr.y;
          const dist = Math.hypot(dx, dy);
          const repulsionRadius = 150;
          if (dist < repulsionRadius && dist > 0.1) {
            const f = 1 - dist / repulsionRadius;
            o.vx += (dx / dist) * f * f * 1500 * dt;
            o.vy += (dy / dist) * f * f * 1500 * dt;
          }
        }

        const sp = Math.hypot(o.vx, o.vy) || 1;
        if (sp > o.base) {
          const k = o.base + (sp - o.base) * Math.pow(0.05, dt);
          o.vx *= k / sp;
          o.vy *= k / sp;
        } else if (sp < o.base * 0.45) {
          o.vx *= 1.05;
          o.vy *= 1.05;
        }

        o.x += o.vx * dt;
        o.y += o.vy * dt;

        // Boundary reflection
        if (o.x < -8) {
          o.x = -8;
          o.vx = Math.abs(o.vx);
        } else if (o.x > W - o.size + 8) {
          o.x = W - o.size + 8;
          o.vx = -Math.abs(o.vx);
        }

        if (o.y < -8) {
          o.y = -8;
          o.vy = Math.abs(o.vy);
        } else if (o.y > H - o.size + 8) {
          o.y = H - o.size + 8;
          o.vy = -Math.abs(o.vy);
        }

        const floatY = o.y + Math.sin(o.ph) * 5;
        o.el.style.transform = `translate3d(${o.x.toFixed(1)}px, ${floatY.toFixed(1)}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient cursor glow */}
      <div
        ref={glowRef}
        id="cursor-glow"
        className="fixed left-0 top-0 w-[440px] h-[440px] -ml-[220px] -mt-[220px] pointer-events-none z-[2] opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(25, 224, 210, 0.11), transparent 62%)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs container */}
      <div
        ref={containerRef}
        id="orbs"
        className="fixed inset-0 pointer-events-none z-[8] overflow-hidden opacity-[0.96] isolate"
        aria-hidden="true"
      />
    </>
  );
};
