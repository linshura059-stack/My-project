export interface ProjectItem {
  id: string;
  title: string;
  stack: string;
  screen: 'dashboard' | 'travel' | 'shop' | 'moto' | 'folio' | 'blog';
  rgb: string;
  url: string;
  repo: string;
  description: string;
  /** Optional project-specific bullet points shown in the preview modal. */
  highlights?: string[];
}

export interface ServiceItem {
  label: string;
  color: string;
}

export interface SkillItem {
  name: string;
  color: string;
  category?: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Tools';
  svg: string;
}

export interface EducationItem {
  label: string;
  period?: string;
  degree?: string;
  details?: string;
}

export interface TechOrbConfig {
  id: string;
  name: string;
  glow: string;
  bg?: string;
  svg: string;
}
