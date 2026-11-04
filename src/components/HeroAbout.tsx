import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface HeroAboutProps {
  onNavigateSection?: (section: 'portfolio' | 'contact') => void;
}

export const HeroAbout: React.FC<HeroAboutProps> = ({ onNavigateSection }) => {
  const [imageError, setImageError] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 8;
    setTiltStyle({
      transform: `rotateY(${(px * maxTilt * 2).toFixed(2)}deg) rotateX(${(-py * maxTilt * 2).toFixed(2)}deg) translateY(-6px)`,
    });
  };

  const handlePointerLeave = () => {
    setTiltStyle({});
  };

  const initials = PORTFOLIO_CONFIG.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,0.8fr)_1.5fr] gap-8 md:gap-16 items-center">
      {/* 3D Interactive Avatar with Rainbow Halo */}
      <div
        className="justify-self-center cursor-pointer"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ perspective: 1000 }}
      >
        <div
          className="avatar-halo w-[clamp(190px,24vw,300px)] aspect-square"
          style={tiltStyle}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a9cf5] shadow-[0_0_24px_rgba(25,224,210,0.3)]">
            {!imageError ? (
              <img
                src={PORTFOLIO_CONFIG.avatarImage}
                alt={`Portrait of ${PORTFOLIO_CONFIG.name}`}
                className="w-full h-full object-cover object-top block transition-transform duration-500 hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <span
                className="w-full h-full grid place-items-center font-extrabold text-[clamp(2.4rem,8vw,4rem)] text-white bg-gradient-to-tr from-[#0a2540] to-[#0a9cf5]"
                aria-hidden="true"
              >
                {initials}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Intro & Story Copy */}
      <div className="space-y-5">
        <h2 className="hello-title text-white">
          Hello! I’m <span className="hl">{PORTFOLIO_CONFIG.name}</span>
        </h2>

        <p className="text-[#eef3f7] font-light text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed max-w-[58ch]">
          {PORTFOLIO_CONFIG.intro}
        </p>

        <div className="space-y-4 pt-2">
          <div>
            <h3 className="text-white text-lg font-medium tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#19e0d2] shadow-[0_0_8px_#19e0d2]" />
              My Journey
            </h3>
            <p className="text-[#c6d3dc] text-[0.98rem] leading-relaxed max-w-[62ch] mt-1">
              {PORTFOLIO_CONFIG.journey}
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff5a2e] shadow-[0_0_8px_#ff5a2e]" />
              Experience
            </h3>
            <p className="text-[#c6d3dc] text-[0.98rem] leading-relaxed max-w-[62ch] mt-1">
              {PORTFOLIO_CONFIG.experience}
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4fe3ff] shadow-[0_0_8px_#4fe3ff]" />
              What I Do
            </h3>
            <p
              className="text-[#c6d3dc] text-[0.98rem] leading-relaxed max-w-[62ch] mt-1"
              dangerouslySetInnerHTML={{ __html: PORTFOLIO_CONFIG.whatIDo }}
            />
          </div>
        </div>

        {/* Action buttons */}
        {onNavigateSection && (
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigateSection('portfolio')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#19e0d2] to-[#00b4d8] text-[#02060b] font-bold tracking-wide hover:shadow-[0_0_24px_rgba(25,224,210,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Explore Portfolio
            </button>
            <button
              onClick={() => onNavigateSection('contact')}
              className="px-6 py-3 rounded-lg border border-[#19e0d2]/60 text-white font-medium hover:bg-[#19e0d2]/15 hover:border-[#19e0d2] hover:shadow-[0_0_18px_rgba(25,224,210,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Contact Me
            </button>
            <a
              href={PORTFOLIO_CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-lg border border-white/20 text-[#b9c4cc] hover:text-white hover:border-white/40 transition-colors flex items-center gap-2 text-sm"
            >
              <span>LinkedIn</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
