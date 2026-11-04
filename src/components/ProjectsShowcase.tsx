import React, { useRef, useState } from 'react';
import { PROJECTS_ITEMS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectScreen } from './ProjectScreens';

interface ProjectsShowcaseProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onSelectProject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {PROJECTS_ITEMS.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onSelectProject?: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelectProject }) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const laptopRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [laptopTilt, setLaptopTilt] = useState<React.CSSProperties>({});

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    const maxTilt = 7;
    const deg = Math.hypot(px, py) * maxTilt * 2;
    const rotateStr = deg < 0.05 ? 'none' : `${(-py).toFixed(3)} ${px.toFixed(3)} 0 ${deg.toFixed(2)}deg`;

    setTiltStyle({
      rotate: rotateStr,
      '--mx': `${((px + 0.5) * 100).toFixed(1)}%`,
      '--my': `${((py + 0.5) * 100).toFixed(1)}%`,
      '--gl': '1',
    } as React.CSSProperties);

    setLaptopTilt({
      transform: `rotateY(${(px * 12).toFixed(2)}deg) rotateX(${(-py * 12).toFixed(2)}deg) translateY(-6px)`,
    });
  };

  const handlePointerLeave = () => {
    setTiltStyle({
      rotate: 'none',
      '--gl': '0',
    } as React.CSSProperties);
    setLaptopTilt({});
  };

  const hasLiveDemo = Boolean(project.url);
  const techBadges = project.stack.split('+').map((t) => t.trim());

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group project-premium relative flex flex-col min-w-0 pb-5 rounded-[22px] overflow-hidden transition-all duration-450 hover:-translate-y-2.5"
      style={
        {
          '--pc': project.rgb,
          borderColor: `rgba(${project.rgb}, 0.22)`,
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(${project.rgb}, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.04)`,
          background: 'linear-gradient(145deg, rgba(13, 24, 31, 0.85), rgba(3, 9, 14, 0.75))',
          ...tiltStyle,
        } as React.CSSProperties
      }
    >
      {/* Travelling Neon Border Comet */}
      <span className="nb" aria-hidden="true">
        <i />
      </span>

      {/* Top Visual Area with 3D Laptop Frame */}
      <div className="relative p-3 md:p-4 pb-0">
        <div
          className="cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#19e0d2]"
          role="button"
          tabIndex={0}
          aria-label={`Preview ${project.title}`}
          onClick={() => onSelectProject?.(project)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProject?.(project);
            }
          }}
          title={`Click to preview ${project.title}`}
        >
          <div className="laptop" style={{ perspective: 1000 }}>
            <div
              ref={laptopRef}
              className="transition-transform duration-500 ease-out will-change-transform"
              style={laptopTilt}
            >
              {/* Laptop Lid */}
              <div className="laptop-lid">
                <div className="laptop-screen relative group/screen">
                  {/* Browser Bar */}
                  <div className="h-[9%] bg-[#eceef1] flex items-center gap-1 px-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                    <span className="flex-1 h-[60%] bg-white rounded ml-2 shadow-inner" />
                  </div>

                  {/* Screen Content View (Scrolls on hover) */}
                  <div className="absolute inset-[9%_0_0_0] overflow-hidden">
                    <div className="w-full transition-transform duration-[3200ms] ease-[cubic-bezier(0.35,0.1,0.2,1)] group-hover/screen:-translate-y-[44%]">
                      <ProjectScreen type={project.screen} />
                    </div>
                  </div>

                  {/* Centered Chip Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 max-w-[92%] text-center leading-tight px-3 py-1 rounded bg-[#12191e]/80 backdrop-blur text-[#59e8f0] text-[0.68rem] sm:text-xs font-mono transition-all duration-300 group-hover/screen:opacity-0 group-hover/screen:scale-90 pointer-events-none">
                    {project.stack}
                  </div>

                  {/* Preview Action overlay on hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-3.5 py-1.5 rounded-full border border-white/25 bg-[#040a0e]/85 text-white font-semibold text-xs tracking-wider backdrop-blur opacity-0 group-hover/screen:opacity-100 transition-all duration-300 pointer-events-none">
                    Inspect Preview
                  </div>
                </div>
              </div>

              {/* Laptop Base Stand */}
              <div className="laptop-base" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Copy & Details */}
      <div className="relative z-10 px-4 md:px-5 pt-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="text-xs font-bold tracking-[0.16em] uppercase mb-1"
              style={{ color: `rgb(${project.rgb})` }}
            >
              {String(index + 1).padStart(2, '0')} / PROJECT
            </p>
            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-[#19e0d2] transition-colors">
              {project.title}
            </h3>
          </div>

          {/* Status Badge */}
          {hasLiveDemo ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-[#a9f7cf] border border-[#1f9d55]/40 bg-[#1f9d55]/15 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38d486] shadow-[0_0_8px_#38d486] animate-pulse" />
              Live Demo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-[#aab5bd] border border-white/10 bg-white/5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8b959e]" />
              In Progress
            </span>
          )}
        </div>

        <p className="text-[#aebbc3] text-[0.88rem] leading-relaxed">
          {project.description}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.72rem] font-medium border"
              style={{
                borderColor: `rgba(${project.rgb}, 0.35)`,
                backgroundColor: `rgba(${project.rgb}, 0.1)`,
                color: `rgb(${project.rgb})`,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 mt-auto">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-h-[38px] px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#15985a] to-[#20bd70] text-white text-xs font-bold tracking-wide flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(31,157,85,0.4)] hover:-translate-y-0.5 transition-all"
            >
              <span>Live Demo</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onSelectProject?.(project)}
              className="flex-1 min-h-[38px] px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              style={{
                borderColor: `rgba(${project.rgb}, 0.6)`,
                color: `rgb(${project.rgb})`,
                backgroundColor: `rgba(${project.rgb}, 0.08)`,
              }}
            >
              <span>Preview Details</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          )}

          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 min-h-[38px] rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5"
              style={{
                borderColor: `rgba(${project.rgb}, 0.55)`,
                color: `rgb(${project.rgb})`,
              }}
            >
              Code ↗
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onSelectProject?.(project)}
              className="px-3 min-h-[38px] rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 text-xs flex items-center justify-center cursor-pointer"
            >
              Overview
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
