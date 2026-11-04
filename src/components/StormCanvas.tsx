import React, { useEffect, useRef } from 'react';

interface StormCanvasProps {
  onLightningTriggerRef?: React.MutableRefObject<((x?: number) => void) | null>;
}

interface Drop {
  x: number;
  y: number;
  l: number;
  v: number;
  b: number;
}

interface PathItem {
  pts: [number, number][];
  w: number;
  at: number;
}

interface Bolt {
  paths: PathItem[];
  t0: number;
  lead: number;
  life: number;
  x: number;
  ex: number;
  ey: number;
}

export const StormCanvas: React.FC<StormCanvasProps> = ({ onLightningTriggerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const drops: Drop[] = [];
    const bolts: Bolt[] = [];
    let lastStrike = 0;
    let raf = 0;
    let last = performance.now();
    let nextStrike = last + 800;
    const timeouts = new Set<ReturnType<typeof setTimeout>>();

    const RAIN_TIERS: [string, number][] = [
      ['rgba(215,232,246,0.3)', 0.9],
      ['rgba(222,238,250,0.55)', 1.2],
      ['rgba(235,246,255,0.9)', 1.5],
    ];

    const newDrop = (scatter = false): Drop => ({
      x: Math.random() * (W + 80) - 40,
      y: scatter ? Math.random() * H : -30,
      l: 14 + Math.random() * 22,
      v: 760 + Math.random() * 640,
      b: Math.floor(Math.random() * 3),
    });

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetDropCount = Math.min(300, Math.round((W * H) / 8000));
      while (drops.length < targetDropCount) drops.push(newDrop(true));
      drops.length = targetDropCount;
    };

    const boltPath = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      spread: number,
      iters: number
    ): [number, number][] => {
      let pts: [number, number][] = [
        [x0, y0],
        [x1, y1],
      ];
      let d = spread;
      for (let i = 0; i < iters; i++) {
        const out: [number, number][] = [pts[0]];
        for (let j = 1; j < pts.length; j++) {
          const a = pts[j - 1];
          const b = pts[j];
          const dx = b[0] - a[0];
          const dy = b[1] - a[1];
          const len = Math.hypot(dx, dy) || 1;
          const off = (Math.random() - 0.5) * 2 * d;
          out.push(
            [(a[0] + b[0]) / 2 + (-dy / len) * off, (a[1] + b[1]) / 2 + (dx / len) * off],
            b
          );
        }
        pts = out;
        d *= 0.55;
      }
      return pts;
    };

    const triggerStrike = (targetX?: number) => {
      const now = performance.now();
      if (now - lastStrike < 120) return;
      lastStrike = now;

      const x = targetX ?? W * (0.12 + Math.random() * 0.76);
      const y1 = H * (0.55 + Math.random() * 0.45);
      const x1 = x + (Math.random() - 0.5) * W * 0.2;
      const main = boltPath(x, -10, x1, y1, H * 0.13, 6);
      const paths: PathItem[] = [{ pts: main, w: 11, at: 0 }];

      const nb = 5 + Math.floor(Math.random() * 3);
      for (let i = 0; i < nb; i++) {
        const kf = 0.08 + Math.random() * 0.7;
        const k = Math.floor(main.length * kf);
        const [bx, by] = main[k] || [x, 0];
        const dir = Math.random() < 0.5 ? -1 : 1;
        const bl = H * (0.14 + Math.random() * 0.3);
        const bp = boltPath(
          bx,
          by,
          bx + dir * bl * (0.45 + Math.random() * 0.9),
          by + bl * (0.5 + Math.random() * 0.7),
          bl * 0.24,
          5
        );
        paths.push({ pts: bp, w: 3.4 + Math.random() * 1.2, at: kf });

        if (Math.random() < 0.55) {
          const sIdx = Math.floor(bp.length * (0.25 + Math.random() * 0.5));
          const [sx, sy] = bp[sIdx] || [bx, by];
          const d2 = Math.random() < 0.5 ? -1 : 1;
          const sl = bl * (0.3 + Math.random() * 0.4);
          paths.push({
            pts: boltPath(sx, sy, sx + d2 * sl * 0.8, sy + sl * 0.9, sl * 0.25, 4),
            w: 2,
            at: Math.min(0.95, kf + 0.04),
          });
        }
      }

      const lead = 60 + Math.random() * 30;
      bolts.push({
        paths,
        t0: now,
        lead,
        life: lead + 1150 + Math.random() * 300,
        x,
        ex: x1,
        ey: y1,
      });
    };

    if (onLightningTriggerRef) {
      onLightningTriggerRef.current = triggerStrike;
    }

    const tracePath = (pts: [number, number][], frac: number) => {
      const n = Math.max(2, Math.floor(frac * (pts.length - 1)) + 1);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < n; i++) {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
    };

    const drawBolt = (b: Bolt, now: number): boolean => {
      const el = now - b.t0;
      if (el >= b.life) return false;

      let reveal = 1;
      let a: number | null = 1;
      let wf = 1;
      let mix = 0;
      let boost = 0;

      if (el < b.lead) {
        // 1) Stepped leader
        reveal = Math.pow(el / b.lead, 0.85);
        a = 0.6 + Math.random() * 0.3;
        wf = 0.3;
        mix = 1;
      } else {
        const e = el - b.lead;
        const T = b.life - b.lead;
        if (e < 55) {
          a = 1;
          boost = 1;
        } else if (e < 105) {
          a = 0.3;
        } else if (e < 185) {
          a = 1;
          boost = 0.8;
        } else if (e < 235) {
          a = 0.4;
        } else {
          a = null;
        }

        if (a === null) {
          // 3) Afterglow
          const d = (e - 235) / (T - 235);
          a = Math.pow(Math.max(0, 1 - d), 1.7) * (0.7 + Math.random() * 0.3);
          if (Math.random() < 0.12) a *= 0.35;
          wf = 1 - 0.68 * d;
          mix = Math.min(1, 0.25 + d);
        } else {
          wf = 1;
          mix = 0;
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      if (boost > 0 && a !== null) {
        // Sky radial gradient illumination
        const g = ctx.createRadialGradient(b.x, 0, 0, b.x, 0, H * 1.05);
        g.addColorStop(0, `rgba(185,215,255,${0.38 * boost * a})`);
        g.addColorStop(0.45, `rgba(110,160,235,${0.08 * boost * a})`);
        g.addColorStop(1, 'rgba(110,160,235,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = `rgba(120,160,225,${0.05 * boost * a})`;
        ctx.fillRect(0, 0, W, H);

        // Ground flare
        const r = 140 + 90 * boost;
        const g2 = ctx.createRadialGradient(b.ex, b.ey, 0, b.ex, b.ey, r);
        g2.addColorStop(0, `rgba(235,246,255,${0.55 * a})`);
        g2.addColorStop(1, 'rgba(120,170,255,0)');
        ctx.fillStyle = g2;
        ctx.fillRect(b.ex - r, b.ey - r, r * 2, r * 2);
      }

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const cr = Math.round(255 + (150 - 255) * mix);
      const cg = Math.round(255 + (225 - 255) * mix);
      const cb = 255;
      const alpha = a ?? 0;

      for (const p of b.paths) {
        const f = p.at === 0 ? reveal : Math.min(1, Math.max(0, (reveal - p.at) / 0.25));
        if (f <= 0) continue;
        tracePath(p.pts, f);
        const w = p.w * wf;

        const passes: [number, string, number][] = [
          [4.0, '70,130,255', 0.1],
          [2.2, '100,165,255', 0.2],
          [1.3, '150,205,255', 0.4],
          [0.7, `${cr},${cg},${cb}`, 0.9],
          [0.38, '255,255,255', 1],
        ];

        for (const [m, col, al] of passes) {
          ctx.strokeStyle = `rgba(${col},${(alpha * al).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.8, w * m);
          ctx.stroke();
        }
      }

      ctx.restore();
      return true;
    };

    const drawRain = () => {
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      RAIN_TIERS.forEach(([col, lw], b) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.beginPath();
        for (const d of drops) {
          if (d.b === b) {
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d.x + d.l * 0.04, d.y + d.l);
          }
        }
        ctx.stroke();
      });
    };

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, W, H);

      // Rain animation
      for (const d of drops) {
        d.y += d.v * dt;
        if (d.y > H + 30) {
          d.y = -30;
          d.x = Math.random() * (W + 80) - 40;
        }
      }
      drawRain();

      // Bolts animation
      for (let i = bolts.length - 1; i >= 0; i--) {
        if (!drawBolt(bolts[i], now)) {
          bolts.splice(i, 1);
        }
      }

      // Auto lightning scheduler
      if (now > nextStrike) {
        triggerStrike();
        if (Math.random() < 0.35) {
          const t = setTimeout(() => {
            timeouts.delete(t);
            triggerStrike();
          }, 140);
          timeouts.add(t);
        }
        nextStrike = now + 1400 + Math.random() * 2600;
      }

      raf = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(animate);

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('a, button, input, textarea, select, label, iframe, .project-card, .skill-card')) {
        triggerStrike(e.clientX);
      }
    };
    window.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handlePointerDown);
      cancelAnimationFrame(raf);
      timeouts.forEach(clearTimeout);
      if (onLightningTriggerRef && onLightningTriggerRef.current === triggerStrike) {
        onLightningTriggerRef.current = null;
      }
    };
  }, [onLightningTriggerRef]);

  return (
    <>
      <div className="sky-layer" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        id="storm"
        className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
        aria-hidden="true"
      />
    </>
  );
};
