import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

interface NavbarProps {
  currentRoute: 'home' | 'about' | 'portfolio' | 'contact';
  onNavigate: (route: 'home' | 'about' | 'portfolio' | 'contact') => void;
  onTriggerLightning?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onTriggerLightning,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'about' | 'portfolio' | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: 'home' | 'about' | 'portfolio' | 'contact') => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 h-[76px] bg-black z-50 header-neon-line">
      <div className="w-[min(1320px,calc(100%-2*clamp(18px,7vw,120px)))] mx-auto h-full flex items-center justify-between">
        {/* Brand logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-bold text-[clamp(1.2rem,2.3vw,1.85rem)] uppercase text-white tracking-[0.01em] hover:text-[#19e0d2] transition-colors cursor-pointer"
        >
          {PORTFOLIO_CONFIG.name}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-[clamp(1.4rem,3.5vw,3rem)]" aria-label="Main">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    type="button"
                    className={`group relative py-1.5 font-['Roboto'] uppercase text-[0.95rem] tracking-[0.02em] transition-colors cursor-pointer ${
                      isActive ? 'text-white font-bold' : 'text-[#d6e0e8] hover:text-white'
                    }`}
                  >
                    {item.label}
                    {/* Animated teal bottom bar */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#19e0d2] shadow-[0_0_8px_#19e0d2] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Lightning Strike button */}
          {onTriggerLightning && (
            <button
              type="button"
              onClick={onTriggerLightning}
              title="Strike Lightning"
              aria-label="Strike Lightning"
              className="px-3 py-1 rounded border border-[#19e0d2]/40 bg-[#19e0d2]/10 hover:bg-[#19e0d2]/25 text-[#19e0d2] text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(25,224,210,0.25)] hover:shadow-[0_0_18px_rgba(25,224,210,0.6)] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>STRIKE</span>
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden relative w-[46px] h-[46px] rounded-lg text-white flex flex-col justify-center items-center gap-1.5 cursor-pointer z-50"
        >
          <span
            className={`block w-6 h-[2px] bg-white rounded-full transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white rounded-full transition-opacity duration-200 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white rounded-full transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        className={`md:hidden fixed top-[76px] inset-x-0 bg-black/95 border-b-2 border-[#19e0d2] shadow-[0_10px_30px_rgba(25,224,210,0.25)] backdrop-blur-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[440px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-2 px-6 list-none m-0">
          {navItems.map((item, idx) => {
            const isActive = currentRoute === item.id;
            return (
              <li
                key={item.id}
                style={{
                  transitionDelay: `${idx * 40}ms`,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3 text-lg uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                    isActive ? 'text-[#19e0d2] font-bold' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#19e0d2] shadow-[0_0_8px_#19e0d2]" />}
                </button>
              </li>
            );
          })}
          {onTriggerLightning && (
            <li className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  onTriggerLightning();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded bg-[#19e0d2]/15 text-[#19e0d2] font-mono text-sm flex items-center justify-center gap-2 border border-[#19e0d2]/40"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>TRIGGER LIGHTNING STRIKE</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};
