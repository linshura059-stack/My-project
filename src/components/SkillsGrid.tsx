import React, { useRef, useState } from 'react';
import { SKILL_ITEMS } from '../data/portfolioData';
import { SkillItem } from '../types';

export const SkillsGrid: React.FC = () => {
  return (
    <div className="mt-12 md:mt-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-7">
        {SKILL_ITEMS.map((skill, index) => (
          <SkillCardItem key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

interface SkillCardItemProps {
  skill: SkillItem;
  index: number;
}

const SkillCardItem: React.FC<SkillCardItemProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isSpinning, setIsSpinning] = useState(false);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    setIsHovered(true);
    triggerLogoSpin(360, 1000);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const cell = e.currentTarget;
    const r = cell.getBoundingClientRect();
    if (!r.width || !r.height) return;

    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    const targetRY = px * 28;
    const targetRX = -py * 28;
    const targetMX = px * 10;
    const targetMY = py * 10;

    const gx = `${((px + 0.5) * 100).toFixed(1)}%`;
    const gy = `${((py + 0.5) * 100).toFixed(1)}%`;

    setTiltStyle({
      '--rx': `${targetRX.toFixed(2)}deg`,
      '--ry': `${targetRY.toFixed(2)}deg`,
      '--mx': `${targetMX.toFixed(2)}px`,
      '--my': `${targetMY.toFixed(2)}px`,
      '--gx': gx,
      '--gy': gy,
    } as React.CSSProperties);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTiltStyle({});
  };

  const triggerLogoSpin = (degrees: number, duration: number) => {
    if (!logoRef.current || isSpinning) return;
    setIsSpinning(true);
    const anim = logoRef.current.animate(
      [
        { transform: 'translateZ(48px) rotateY(0deg)' },
        { transform: `translateZ(48px) rotateY(${degrees}deg)` },
      ],
      { duration, easing: 'cubic-bezier(0.45, 0.05, 0.2, 1)' }
    );
    anim.onfinish = anim.oncancel = () => {
      setIsSpinning(false);
    };
  };

  const handleClick = () => {
    triggerLogoSpin(720, 1100);
  };

  const particles = [0, 1, 2, 3, 4];

  return (
    <div
      className="skill-cell group block cursor-pointer select-none"
      style={{ perspective: 1100 }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <div
        ref={cardRef}
        className={`skill-card ${isHovered ? 'is-hover' : ''}`}
        style={
          {
            '--c': skill.color,
            '--i': index,
            ...tiltStyle,
          } as React.CSSProperties
        }
      >
        {/* Travelling Neon Border Comet */}
        <span className="nb" aria-hidden="true">
          <i />
        </span>

        {/* 3D Orbiting Ring with Satellites */}
        <div className="skill-orbit" />

        {/* Floating micro-particles */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          {particles.map((p) => {
            const left = `${10 + ((p * 37 + index * 11) % 80)}%`;
            const top = `${10 + ((p * 53 + index * 7) % 78)}%`;
            const px = `${(-15 + ((p * 17) % 30)).toFixed(1)}px`;
            const py = `${(-20 - ((p * 13) % 25)).toFixed(1)}px`;
            const pd = `${(2.2 + ((p * 7) % 18) / 10).toFixed(2)}s`;
            const delay = `${(-((p * 31 + index * 13) % 30) / 10).toFixed(2)}s`;

            return (
              <i
                key={p}
                className="skill-particle"
                style={
                  {
                    left,
                    top,
                    '--px': px,
                    '--py': py,
                    '--pd': pd,
                    '--delay': delay,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>

        {/* Shine Sweep Overlay */}
        <div className="skill-shine" />

        {/* Logo Icon */}
        <svg
          ref={logoRef}
          viewBox="0 0 24 24"
          className="relative z-[5] w-[clamp(34px,4.2vw,56px)] h-auto aspect-square transition-all duration-400 group-hover:scale-115"
          style={{ transform: 'translateZ(48px)', transformStyle: 'preserve-3d' }}
          dangerouslySetInnerHTML={{ __html: skill.svg }}
          aria-hidden="true"
        />

        {/* Skill Title */}
        <span
          className="relative z-[5] flex flex-col items-center gap-0.5 text-center"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span
            className="font-medium text-[clamp(0.8rem,1.2vw,1rem)] text-white tracking-wide transition-all duration-300"
            style={{ textShadow: `0 4px 8px rgba(0,0,0,0.7), 0 0 10px ${skill.color}` }}
          >
            {skill.name}
          </span>
          {skill.category && (
            <span className="text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.14em] text-white/55">
              {skill.category}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
