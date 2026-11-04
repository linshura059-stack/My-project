import React from 'react';
import { PORTFOLIO_CONFIG, SERVICES } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (route: 'home' | 'about' | 'portfolio' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black/60 border-t-2 border-[#19e0d2] shadow-[0_-6px_24px_rgba(25,224,210,0.28)] mt-20">
      <div className="w-[min(1240px,calc(100%-2*clamp(18px,7vw,120px)))] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 md:py-14">
        {/* Brand column */}
        <div>
          <h3 className="font-['Roboto'] font-bold text-xl md:text-2xl text-white mb-3">
            {PORTFOLIO_CONFIG.name}
          </h3>
          <p className="text-sm text-[#b9c4cc] leading-relaxed max-w-[28ch]">
            {PORTFOLIO_CONFIG.footerBlurb}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#19e0d2] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#19e0d2] shadow-[0_0_8px_#19e0d2] animate-pulse" />
            <span>{PORTFOLIO_CONFIG.availability}</span>
          </div>
        </div>

        {/* Pages Nav */}
        <nav aria-label="Footer Navigation">
          <h3 className="font-['Roboto'] font-bold text-lg text-white mb-4">Pages</h3>
          <ul className="flex flex-col gap-2 list-none m-0 p-0">
            {(['home', 'about', 'portfolio', 'contact'] as const).map((route) => (
              <li key={route}>
                <button
                  onClick={() => onNavigate(route)}
                  className="text-sm text-[#dce6ed] hover:text-[#19e0d2] hover:translate-x-1 transition-all capitalize cursor-pointer"
                >
                  {route}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services List */}
        <div>
          <h3 className="font-['Roboto'] font-bold text-lg text-white mb-4">Services</h3>
          <ul className="flex flex-col gap-2 list-none m-0 p-0 text-sm text-[#dce6ed]">
            {SERVICES.map((service) => (
              <li key={service.label} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                {service.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Glowing Contact List */}
        <div>
          <h3 className="font-['Roboto'] font-bold text-lg text-white mb-4">Contact</h3>
          <ul className="flex flex-col gap-3 list-none m-0 p-0 text-sm">
            {/* Email */}
            <li className="group flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
                className="w-4 h-4 text-[#ff7a59] shrink-0 transition-transform group-hover:scale-125"
                aria-hidden="true"
              >
                <path d="M3 6h18v12H3z" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <a
                href={`mailto:${PORTFOLIO_CONFIG.email}`}
                className="text-white hover:text-[#ff7a59] hover:translate-x-1 transition-all truncate"
              >
                {PORTFOLIO_CONFIG.email}
              </a>
            </li>

            {/* Phone */}
            <li className="group flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
                className="w-4 h-4 text-[#34e89e] shrink-0 transition-transform group-hover:scale-125 group-hover:animate-[phoneRing_0.7s_ease-in-out]"
                aria-hidden="true"
              >
                <path d="M6.6 3h3l1.4 4-2 1.3a11 11 0 0 0 5.7 5.7l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z" />
              </svg>
              <a
                href={`tel:${PORTFOLIO_CONFIG.phone.replace(/[^\d+]/g, '')}`}
                className="text-white hover:text-[#34e89e] hover:translate-x-1 transition-all"
              >
                {PORTFOLIO_CONFIG.phone}
              </a>
            </li>

            {/* LinkedIn */}
            <li className="group flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
                className="w-4 h-4 text-[#4da3ff] shrink-0 transition-transform group-hover:scale-125"
                aria-hidden="true"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                <path d="M8 10.5V16M8 8v.01M11.5 16v-5.5M11.5 12.8c0-1.5 1-2.4 2.3-2.4s2.2.9 2.2 2.4V16" />
              </svg>
              <a
                href={PORTFOLIO_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#4da3ff] hover:translate-x-1 transition-all"
              >
                {PORTFOLIO_CONFIG.linkedinLabel}
              </a>
            </li>

            {/* GitHub */}
            <li className="group flex items-center gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                className="w-4 h-4 text-[#b48aff] shrink-0 transition-transform group-hover:scale-125"
                aria-hidden="true"
              >
                <circle cx="7" cy="6" r="2.4" />
                <circle cx="7" cy="18" r="2.4" />
                <circle cx="17" cy="9" r="2.4" />
                <path d="M7 8.4v7.2M17 11.4c0 3-3 3.6-10 4.6" />
              </svg>
              <a
                href={PORTFOLIO_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#b48aff] hover:translate-x-1 transition-all"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-[#b9c4cc]">
        Copyright © {currentYear} | All rights reserved by{' '}
        <span className="text-[#19e0d2] font-medium">{PORTFOLIO_CONFIG.name}</span>
      </div>
    </footer>
  );
};
