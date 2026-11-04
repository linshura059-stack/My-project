import { EducationItem, ProjectItem, ServiceItem, SkillItem, TechOrbConfig } from '../types';

const LOCATION = 'National Technical Training Institute (NTTI), Phnom Penh, Cambodia';

export const PORTFOLIO_CONFIG = {
  name: 'Sok Sophea',
  role: 'Web Developer',
  email: 'sophea044056@gmail.com',
  phone: '0969185182',
  linkedinLabel: 'Sok Sophea',
  linkedinUrl:
    'https://www.linkedin.com/in/sophea-sok-497501438',
  githubUrl: 'https://github.com/',
  location: LOCATION,
  // Both map links are derived from `location`, so changing it updates the button and the embed.
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION)}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(LOCATION)}&hl=en&z=16&output=embed`,
  footerBlurb:
    'Web Developer specializing in modern React.js, Laravel architectures, and interactive digital interfaces.',
  availability: 'AVAILABLE FOR OPPORTUNITIES',
  avatarImage: '/assets/aistudio/sok-sophea-profile_d6bd72d9.png',
  intro:
    'I am an Information Technology student at the National Technical Training Institute (NTTI), currently in the first semester of my second year pursuing an Associate Degree in Information Technology.',
  journey:
    'My journey in technology has evolved from simple curiosity into a passion for creating clean, beautiful, and functional applications using modern web technologies.',
  experience:
    'Currently, I am also working as an intern Backend and Frontend Developer at Somnab Technology, where I continue to gain practical experience in website development. Through this internship, I am developing my skills in both frontend and backend technologies while learning how to build responsive, functional, and user-friendly web applications.',
  whatIDo:
    'I build responsive and interactive interfaces using <strong>React.js</strong> and develop robust backend systems with <strong>Laravel</strong>. I create comprehensive digital experiences by combining clean architecture with modern UI/UX design principles.',
};

export const SERVICES: ServiceItem[] = [
  { label: 'Web Development', color: '#19e0d2' },
  { label: 'Frontend Development (React)', color: '#2f9bff' },
  { label: 'Backend Development (Laravel)', color: '#ff3b30' },
  { label: 'API Design & Integration', color: '#ffe033' },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  { label: 'Primary School', period: 'Basic Education', details: 'Krang Leav Primary School' },
  { label: 'Secondary School', period: 'Middle School', details: 'Hun Sen Krang Leav Secondary School' },
  { label: 'High School', period: 'High School Diploma', details: 'Angkor Meas High School' },
  { label: 'University', period: 'Associate Degree in IT', details: 'National Technical Training Institute (NTTI) - Year 2' },
];

export const SKILL_ITEMS: SkillItem[] = [
  {
    name: 'HTML',
    color: '#ff6a2e',
    category: 'Frontend',
    svg: `<defs><linearGradient id="sk-html" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8a3d"/><stop offset="1" stop-color="#f0371a"/></linearGradient></defs><path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill="url(#sk-html)"/><path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#ffb347" fill-opacity=".55"/><text x="12" y="16" font-size="9" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">5</text>`,
  },
  {
    name: 'CSS',
    color: '#2f9bff',
    category: 'Frontend',
    svg: `<defs><linearGradient id="sk-css" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3db4ff"/><stop offset="1" stop-color="#1257d6"/></linearGradient></defs><path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill="url(#sk-css)"/><path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#7fd6ff" fill-opacity=".5"/><text x="12" y="16" font-size="9" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">3</text>`,
  },
  {
    name: 'Bootstrap',
    color: '#a35bff',
    category: 'Frontend',
    svg: `<defs><linearGradient id="sk-bs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c26bff"/><stop offset="1" stop-color="#6a1fe6"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="4.5" fill="url(#sk-bs)"/><text x="12" y="17" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">B</text>`,
  },
  {
    name: 'JavaScript',
    color: '#ffe033',
    category: 'Frontend',
    svg: `<defs><linearGradient id="sk-js" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff04d"/><stop offset="1" stop-color="#ffc400"/></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="2" fill="url(#sk-js)"/><text x="20.5" y="19.5" font-size="9.5" font-weight="800" text-anchor="end" fill="#1a1a1a" font-family="Arial,sans-serif">JS</text>`,
  },
  {
    name: 'React',
    color: '#4fe3ff',
    category: 'Frontend',
    svg: `<defs><linearGradient id="sk-react" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7df9ff"/><stop offset="1" stop-color="#2d9bff"/></linearGradient></defs><g fill="none" stroke="url(#sk-react)" stroke-width="1.4"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="2" fill="#7df9ff"/>`,
  },
  {
    name: 'PHP',
    color: '#8f94ff',
    category: 'Backend',
    svg: `<defs><linearGradient id="sk-php" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9aeff"/><stop offset="1" stop-color="#5b5fd9"/></linearGradient></defs><ellipse cx="12" cy="12" rx="11" ry="6.5" fill="url(#sk-php)"/><text x="12" y="14.8" font-size="8" font-weight="800" font-style="italic" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">php</text>`,
  },
  {
    name: 'Laravel',
    color: '#ff3b30',
    category: 'Backend',
    svg: `<defs><linearGradient id="sk-laravel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6a4d"/><stop offset="1" stop-color="#ff1f3d"/></linearGradient></defs><path d="M12 3l7 4v6l-7 4-7-4V7z" fill="#ff3b30" fill-opacity=".22" stroke="url(#sk-laravel)" stroke-width="1.9" stroke-linejoin="round"/><path d="M5 7l7 4 7-4M12 11v6" fill="none" stroke="url(#sk-laravel)" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/>`,
  },
  {
    name: 'MySQL',
    color: '#22b8ff',
    category: 'Database',
    svg: `<defs><linearGradient id="sk-mysql" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5de0ff"/><stop offset="1" stop-color="#1c7ed6"/></linearGradient></defs><ellipse cx="12" cy="6" rx="8" ry="3" fill="#22b8ff" fill-opacity=".3"/><g fill="none" stroke="url(#sk-mysql)" stroke-width="1.9" stroke-linecap="round"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></g>`,
  },
  {
    name: 'GitHub',
    color: '#b48aff',
    category: 'DevOps & Tools',
    svg: `<defs><linearGradient id="sk-gh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9a6ff"/></linearGradient></defs><path fill="url(#sk-gh)" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>`,
  },
  {
    name: 'GitLab',
    color: '#fc6d26',
    category: 'DevOps & Tools',
    svg: `<defs><linearGradient id="sk-gitlab" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9a4d"/><stop offset="1" stop-color="#e24329"/></linearGradient></defs><path fill="url(#sk-gitlab)" d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"/>`,
  },
  {
    name: 'Vercel',
    color: '#6df7ff',
    category: 'DevOps & Tools',
    svg: `<defs><linearGradient id="sk-vercel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#5ff0ff"/></linearGradient></defs><path d="M12 4l9 16H3z" fill="url(#sk-vercel)" stroke="url(#sk-vercel)" stroke-width="1.2" stroke-linejoin="round"/>`,
  },
];

export const PROJECTS_ITEMS: ProjectItem[] = [
  {
    id: 'inventory-dashboard',
    title: 'Inventory Dashboard',
    stack: 'Laravel + MySQL + Bootstrap 5',
    screen: 'dashboard',
    rgb: '25,224,210',
    url: '',
    repo: '',
    description: 'Admin dashboard for managing products, inventory, sales analytics, and business data.',
  },
  {
    id: 'travel-guide',
    title: 'Travel Guide',
    stack: 'React.js + TypeScript + Bootstrap 5',
    screen: 'travel',
    rgb: '255,159,64',
    url: '',
    repo: '',
    description: 'Travel-focused web application for exploring destinations, booking packages, built with a modern frontend.',
  },
  {
    id: 'phone-store',
    title: 'Phone Store',
    stack: 'HTML + CSS + JavaScript + Bootstrap 5',
    screen: 'shop',
    rgb: '180,138,255',
    url: 'https://phoneshop-deploy.vercel.app/',
    repo: '',
    description: 'Responsive phone-store interface designed for a clean and modern shopping experience with shopping cart.',
  },
  {
    id: 'bike-rental-system',
    title: 'Bike Rental System',
    stack: 'PHP + MySQL + Bootstrap 5',
    screen: 'moto',
    rgb: '255,82,82',
    url: '',
    repo: '',
    description: 'Bike rental system with bike listings, easy customer booking and database-driven rental status tracking.',
  },
  {
    id: 'my-portfolio',
    title: 'My Portfolio',
    stack: 'React.js + Laravel + Bootstrap 5',
    screen: 'folio',
    rgb: '255,214,51',
    url: 'https://sopheaportfolio.vercel.app/',
    repo: '',
    description: 'Interactive developer portfolio focused on modern UI, responsive layouts, physics, and canvas motion.',
  },
  {
    id: 'task-management-system',
    title: 'Task Management System',
    stack: 'JavaScript + React.js + Bootstrap 5',
    screen: 'blog',
    rgb: '61,220,132',
    url: '',
    repo: '',
    description: 'Task dashboard for tracking projects, priorities, team assignments, and delivery milestones.',
  },
];

export const TECH_ORBS: TechOrbConfig[] = [
  {
    id: 'react',
    name: 'React',
    glow: '#61dafb',
    svg: '<g fill="none" stroke="#61dafb" stroke-width="1.5"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="1.8" fill="#61dafb"/>',
  },
  {
    id: 'html',
    name: 'HTML5',
    glow: '#e44d26',
    svg: '<path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill="#e44d26"/><path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#f16529"/><text x="12" y="16" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">5</text>',
  },
  {
    id: 'css',
    name: 'CSS3',
    glow: '#2f8fe0',
    svg: '<path d="M4 3h16l-1.4 16L12 21l-6.6-2z" fill="#1572b6"/><path d="M12 5v14.4l5.2-1.5L18.4 5z" fill="#33a9dc"/><text x="12" y="16" font-size="9" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">3</text>',
  },
  {
    id: 'js',
    name: 'JavaScript',
    glow: '#f7df1e',
    bg: '#f7df1e',
    svg: '<text x="12" y="16.5" font-size="11" font-weight="800" text-anchor="middle" fill="#1a1a1a" font-family="Arial,sans-serif">JS</text>',
  },
  {
    id: 'ts',
    name: 'TypeScript',
    glow: '#3178c6',
    bg: '#3178c6',
    svg: '<text x="12" y="16.5" font-size="11" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">TS</text>',
  },
  {
    id: 'bs',
    name: 'Bootstrap',
    glow: '#7a1ff5',
    bg: '#7a1ff5',
    svg: '<text x="12" y="17" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">B</text>',
  },
  {
    id: 'laravel',
    name: 'Laravel',
    glow: '#ff2d20',
    svg: '<path d="M12 3l7 4v6l-7 4-7-4V7z" fill="#ff2d20" fill-opacity=".2" stroke="#ff4a3d" stroke-width="2" stroke-linejoin="round"/><path d="M5 7l7 4 7-4M12 11v6" fill="none" stroke="#ff4a3d" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>',
  },
  {
    id: 'php',
    name: 'PHP',
    glow: '#8892bf',
    bg: '#4f5b93',
    svg: '<text x="12" y="15.5" font-size="8.5" font-weight="700" font-style="italic" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif">php</text>',
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    glow: '#47a248',
    svg: '<path d="M12 1.5c.4 2.2 4.8 4.6 4.8 10.3 0 3.6-2 5.6-4 6.4L12.2 22h-.4l-.6-3.8c-2-.8-4-2.8-4-6.4C7.2 6.1 11.6 3.7 12 1.5z" fill="#47a248"/><path d="M12 5v16" stroke="#d7f0d2" stroke-width=".9" stroke-linecap="round"/>',
  },
  {
    id: 'figma',
    name: 'Figma',
    glow: '#a259ff',
    svg: '<rect x="8" y="2" width="4" height="6" rx="2" fill="#f24e1e"/><rect x="12" y="2" width="4" height="6" rx="2" fill="#ff7262"/><rect x="8" y="8" width="4" height="6" rx="2" fill="#a259ff"/><circle cx="14" cy="11" r="3" fill="#1abcfe"/><rect x="8" y="14" width="4" height="6" rx="2" fill="#0acf83"/>',
  },
  {
    id: 'next',
    name: 'Next.js',
    glow: '#ff5cd6',
    bg: '#000',
    svg: '<circle cx="12" cy="12" r="10" fill="#fff"/><text x="12" y="16.6" font-size="12" font-weight="800" text-anchor="middle" fill="#000" font-family="Arial,sans-serif">N</text>',
  },
  {
    id: 'github',
    name: 'GitHub',
    glow: '#b48aff',
    bg: '#0d1117',
    svg: '<path fill="#fff" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    glow: '#6df7ff',
    bg: '#000',
    svg: '<path d="M12 4l9 16H3z" fill="#fff"/>',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    glow: '#fc6d26',
    svg: '<path d="M12 21.5L2.5 14.2l1.9-5.9 1.9 5.9h11.4l1.9-5.9 1.9 5.9z" fill="#e24329"/><path d="M12 21.5L6.3 14.2h11.4z" fill="#fc6d26"/><path d="M4.4 8.3L6.3 2.5l1.9 5.8zM19.6 8.3l-1.9-5.8-1.9 5.8z" fill="#fca326"/>',
  },
  {
    id: 'vue',
    name: 'Vue.js',
    glow: '#41b883',
    svg: '<path d="M2 4h4l6 10 6-10h4L12 21z" fill="#41b883"/><path d="M6 4h3.2L12 9l2.8-5H18l-6 10z" fill="#35495e"/>',
  },
  {
    id: 'api',
    name: 'REST API',
    glow: '#84ff2f',
    bg: '#84ff2f',
    svg: '<text x="12" y="16" font-size="9.5" font-weight="800" text-anchor="middle" fill="#0d1a05" font-family="Arial,sans-serif">{…}</text>',
  },
  {
    id: 'postman',
    name: 'Postman',
    glow: '#ff6c37',
    bg: '#ff6c37',
    svg: '<circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M8.5 15.5l5.5-5.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><circle cx="15" cy="9" r="1.8" fill="#fff"/>',
  },
  {
    id: 'tw',
    name: 'Tailwind CSS',
    glow: '#38bdf8',
    svg: '<path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.6 7.2 14.5 6 12 6zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.6 13.2 9.5 12 7 12z" fill="#38bdf8"/>',
  },
  {
    id: 'node',
    name: 'Node.js',
    glow: '#5fa04e',
    svg: '<path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="#5fa04e"/><text x="12" y="15.5" font-size="8" font-weight="800" text-anchor="middle" fill="#0f1a0d" font-family="Arial,sans-serif">JS</text>',
  },
];
