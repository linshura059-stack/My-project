import { useCallback, useEffect, useRef, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { EducationTimeline } from './components/EducationTimeline';
import { FloatingOrbs } from './components/FloatingOrbs';
import { Footer } from './components/Footer';
import { HeroAbout } from './components/HeroAbout';
import { Navbar } from './components/Navbar';
import { NeonHeader } from './components/NeonHeader';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsGrid } from './components/SkillsGrid';
import { StormCanvas } from './components/StormCanvas';
import { PORTFOLIO_CONFIG } from './data/portfolioData';
import { ProjectItem } from './types';

type RouteKey = 'home' | 'about' | 'portfolio' | 'contact';

const ROUTES: RouteKey[] = ['home', 'about', 'portfolio', 'contact'];

const ROUTE_TITLES: Record<RouteKey, string> = {
  home: PORTFOLIO_CONFIG.name,
  about: `About | ${PORTFOLIO_CONFIG.name}`,
  portfolio: `Portfolio | ${PORTFOLIO_CONFIG.name}`,
  contact: `Contact | ${PORTFOLIO_CONFIG.name}`,
};

const SECTION_IDS: Partial<Record<RouteKey, string>> = {
  portfolio: 'portfolio-section',
  contact: 'contact-section',
};

/**
 * Maps the URL hash to a route. Returns null for hashes that are not routes
 * (e.g. the "skip to content" anchor), so they never change the current page.
 */
const parseHash = (): RouteKey | null => {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (raw === '') return 'home';
  return (ROUTES as string[]).includes(raw) ? (raw as RouteKey) : null;
};

/** Scrolls to a section, retrying briefly in case the page is still mounting it. */
const scrollToSection = (id: string, tries = 10) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tries > 0) {
    setTimeout(() => scrollToSection(id, tries - 1), 50);
  }
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteKey>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const lightningTriggerRef = useRef<((x?: number) => void) | null>(null);

  const applyRoute = useCallback((route: RouteKey, scroll: boolean) => {
    setCurrentRoute(route);
    document.title = ROUTE_TITLES[route];
    if (!scroll) return;

    const sectionId = SECTION_IDS[route];
    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Sync route with the URL hash on load, hashchange, and back/forward.
  useEffect(() => {
    const initial = parseHash() ?? 'home';
    applyRoute(initial, initial === 'portfolio' || initial === 'contact');

    const handleHashChange = () => {
      const route = parseHash();
      if (route) applyRoute(route, true);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [applyRoute]);

  const handleNavigate = useCallback(
    (route: RouteKey) => {
      // Trigger lightning effect on route navigation
      lightningTriggerRef.current?.();

      const target = `#${route}`;
      if (window.location.hash === target) {
        // Hash won't change, so no hashchange event: apply directly (re-scrolls).
        applyRoute(route, true);
      } else {
        window.location.hash = target; // hashchange -> applyRoute
      }
    },
    [applyRoute]
  );

  const triggerLightningStrike = () => {
    lightningTriggerRef.current?.();
  };

  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="relative min-h-screen flex flex-col pt-[76px] selection:bg-[#19e0d2] selection:text-black">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="fixed left-3 top-[-60px] focus:top-3 z-[100] bg-white text-black px-4 py-2 rounded-md font-medium transition-all"
      >
        Skip to content
      </a>

      {/* Atmospheric Storm Canvas & Procedural Lightning Engine */}
      <StormCanvas onLightningTriggerRef={lightningTriggerRef} />

      {/* Technology Constellation Floating Orbs & Ambient Glow */}
      <FloatingOrbs />

      {/* Fixed Site Header with Neon Wave & Underline */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onTriggerLightning={triggerLightningStrike}
      />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10 flex-1">
        <div className="w-[min(1240px,calc(100%-2*clamp(18px,7vw,120px)))] mx-auto pb-16">
          {currentRoute === 'about' ? (
            /* Dedicated About Page */
            <section className="animate-fadeIn">
              <NeonHeader title="About Me" as="h1" />
              <HeroAbout onNavigateSection={handleNavigate} />
              <EducationTimeline />
              <NeonHeader title="Technical Skills" as="h2" />
              <SkillsGrid />
            </section>
          ) : (
            /* Full Single-Page Portfolio Flow with Sections */
            <div>
              {/* Hero Section */}
              <section id="hero-section">
                <NeonHeader
                  title={`I’m ${PORTFOLIO_CONFIG.name} ${PORTFOLIO_CONFIG.role}`}
                  as="h1"
                />
                <HeroAbout onNavigateSection={handleNavigate} />
              </section>

              {/* Education Timeline */}
              <section id="education-section">
                <EducationTimeline />
              </section>

              {/* Skills Constellation */}
              <section id="skills-section" className="scroll-mt-24">
                <NeonHeader title="Skills" as="h2" />
                <SkillsGrid />
              </section>

              {/* Portfolio Showcase */}
              <section id="portfolio-section" className="scroll-mt-24 mt-12 md:mt-20">
                <NeonHeader title="Portfolio" as="h2" />
                <ProjectsShowcase onSelectProject={(p) => setSelectedProject(p)} />
              </section>

              {/* Contact & NTTI Google Map Section */}
              <section id="contact-section" className="scroll-mt-24 mt-12 md:mt-20">
                <NeonHeader title="Contact" as="h2" />
                <ContactSection />
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Footer with Glowing Brand-Colored Contacts */}
      <Footer onNavigate={handleNavigate} />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={closeProject}
      />
    </div>
  );
}
