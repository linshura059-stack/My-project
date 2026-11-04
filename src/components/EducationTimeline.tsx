import React from 'react';
import { EDUCATION_ITEMS } from '../data/portfolioData';

export const EducationTimeline: React.FC = () => {
  return (
    <div className="mt-16 md:mt-24">
      <h3 className="text-xl font-medium text-center text-white mb-8 md:mb-12 tracking-wide flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#ff5a2e]" />
        <span>Academic Journey</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#ff2a9d]" />
      </h3>

      {/* Horizontal timeline on tablet/desktop, vertical on phones so every field stays readable */}
      <ol className="relative flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-2 px-2 md:px-8 max-w-4xl mx-auto list-none m-0 p-0">
        {/* Glowing gradient connecting track (horizontal) */}
        <div
          className="hidden sm:block absolute top-[26px] left-[clamp(20px,6vw,50px)] right-[clamp(20px,6vw,50px)] h-[3px] rounded-full z-0 shadow-[0_0_12px_rgba(255,90,46,0.5)]"
          style={{
            background:
              'linear-gradient(90deg, #ff5a2e 0%, #ffb23e 26%, #c400ff 55%, #ff2a9d 78%, #ff5a2e 100%)',
          }}
          aria-hidden="true"
        />
        {/* Connecting track (vertical, phones) */}
        <div
          className="sm:hidden absolute left-[34px] top-[26px] bottom-[26px] w-[3px] -translate-x-1/2 rounded-full z-0 shadow-[0_0_12px_rgba(255,90,46,0.5)]"
          style={{
            background:
              'linear-gradient(180deg, #ff5a2e 0%, #ffb23e 26%, #c400ff 55%, #ff2a9d 78%, #ff5a2e 100%)',
          }}
          aria-hidden="true"
        />

        {EDUCATION_ITEMS.map((item) => (
          <li
            key={item.label}
            className="group relative z-10 sm:flex-1 min-w-0 flex flex-row sm:flex-col items-center gap-4 sm:gap-2.5 text-left sm:text-center cursor-default"
          >
            {/* Pulsing graduation cap dot */}
            <div className="edu-dot shrink-0 group-hover:-translate-y-1 group-hover:scale-105">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[52%] h-[52%] fill-white">
                <path d="M12 3L1 9l11 6 9-4.9V17h2V9z" />
                <path d="M5 11.2V16c0 1.9 3.1 3.4 7 3.4s7-1.5 7-3.4v-4.8l-7 3.8z" />
              </svg>
            </div>

            {/* Label, period and details: all fields from EDUCATION_ITEMS */}
            <div className="min-w-0 flex flex-col items-start sm:items-center gap-1">
              <span className="text-[clamp(0.85rem,1.6vw,0.95rem)] font-medium text-[#dce5ec] group-hover:text-white transition-colors">
                {item.label}
              </span>
              {item.period && (
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#ff9a6b]">
                  {item.period}
                </span>
              )}
              {item.degree && <span className="text-[0.72rem] text-[#c6d3dc]">{item.degree}</span>}
              {item.details && (
                <span className="text-[0.72rem] text-[#8ea2b1] sm:max-w-[150px] leading-tight">
                  {item.details}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
