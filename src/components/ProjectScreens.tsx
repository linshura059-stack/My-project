import React from 'react';
import {
  EDUCATION_ITEMS,
  PORTFOLIO_CONFIG,
  PROJECTS_ITEMS,
  SKILL_ITEMS,
} from '../data/portfolioData';

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

/** Word-wraps text into at most `maxLines` lines of about `max` characters. */
const wrap = (text: string, max: number, maxLines: number): string[] => {
  const lines: string[] = [];
  let cur = '';
  for (const w of text.split(/\s+/)) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length <= maxLines) return lines;
  const cut = lines.slice(0, maxLines);
  cut[maxLines - 1] = `${cut[maxLines - 1].replace(/[.,;:]?$/, '')}…`;
  return cut;
};

const SvgLines: React.FC<{
  x: number;
  y: number;
  lines: string[];
  size: number;
  lh: number;
  fill: string;
}> = ({ x, y, lines, size, lh, fill }) => (
  <text fontSize={size} fill={fill} fontFamily="Ubuntu,Arial,sans-serif">
    {lines.map((l, i) => (
      <tspan key={i} x={x} y={y + i * lh}>
        {l}
      </tspan>
    ))}
  </text>
);

const SHOP_NAV = ['Home', 'Shop', 'Features', 'About', 'Contact'];
const SHOP_NAV_X = [118, 144, 166, 199, 225];
const SHOP_FILTERS = ['All', 'Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'];
const SHOP_PRODUCTS = [
  { brand: 'Apple', name: 'iPhone 17 Pro Max', badge: 'New', price: '$1,299.00', old: '$1,399.00', back: '#e97d3a', screen: '#2a1710', desc: 'The ultimate iPhone with powerful performance and a professional camera system.' },
  { brand: 'Apple', name: 'iPhone 17 Pro', badge: 'New', price: '$1,099.00', old: '$1,199.00', back: '#e3e5e8', screen: '#b565e8', desc: 'A powerful professional iPhone with advanced performance and premium design.' },
  { brand: 'Apple', name: 'iPhone 17', badge: 'Popular', price: '$899.00', old: '$999.00', back: '#9dbb8a', screen: '#6fcf97', desc: 'Beautiful design, powerful performance and an advanced camera experience.' },
  { brand: 'Samsung', name: 'Galaxy S26 Ultra', badge: 'New', price: '$1,299.00', old: '$1,399.00', back: '#2b2d31', screen: '#6b6f76', desc: 'Samsung’s flagship Ultra smartphone with a large display and advanced cameras.' },
];

const HALO = ['#ff2a2a', '#ffb300', '#e6ff00', '#22ff5a', '#00e5ff', '#2a5bff', '#c400ff', '#ff2a9d'];
const ORBS = [
  { x: 37, y: 31, c: '#fc6d26', t: 'GL' },
  { x: 310, y: 33, c: '#8892bf', t: 'php' },
  { x: 214, y: 40, c: '#61dafb', t: 'Re' },
  { x: 93, y: 37, c: '#ff5cd6', t: 'N' },
  { x: 136, y: 58, c: '#3178c6', t: 'TS' },
  { x: 226, y: 60, c: '#47a248', t: 'Mo' },
  { x: 269, y: 83, c: '#6df7ff', t: '▲' },
  { x: 14, y: 120, c: '#84ff2f', t: '{…}' },
  { x: 44, y: 126, c: '#38bdf8', t: 'Tw' },
];

interface ProjectScreenProps {
  type: 'dashboard' | 'travel' | 'shop' | 'moto' | 'folio' | 'blog';
}

export const ProjectScreen: React.FC<ProjectScreenProps> = ({ type }) => {
  if (type === 'dashboard') {
    return (
      <svg viewBox="0 0 320 400" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="0" y="0" width="320" height="400" fill="#f3f5f9" />
        {/* Left Sidebar */}
        <rect x="0" y="0" width="58" height="400" fill="#ffffff" />
        <circle cx="29" cy="24" r="11" fill="#f2b632" />
        <rect x="10" y="56" width="38" height="9" rx="3" fill="#3b82f6" />
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect key={i} x="10" y={56 + i * 22} width="38" height="9" rx="3" fill="#e8ebf0" />
        ))}
        {/* Header */}
        <text x="70" y="20" fontSize="11" fontWeight="700" fill="#2f80ed" fontFamily="Arial,sans-serif">
          Inventory Dashboard
        </text>
        {/* Stat Cards */}
        {[
          { color: '#22c55e', val: '4,289' },
          { color: '#ef4444', val: '128' },
          { color: '#f59e0b', val: '86%' },
          { color: '#3b82f6', val: '$32.4k' },
        ].map((item, i) => (
          <g key={i}>
            <rect x={70 + i * 61} y="30" width="55" height="36" rx="4" fill="#ffffff" />
            <rect x={76 + i * 61} y="38" width="20" height="4" rx="2" fill={item.color} />
            <rect x={76 + i * 61} y="48" width="34" height="7" rx="2" fill="#1f2937" />
          </g>
        ))}
        {/* Bar Chart Area */}
        <rect x="70" y="76" width="140" height="104" rx="4" fill="#ffffff" />
        <rect x="78" y="84" width="48" height="5" rx="2" fill="#94a3b8" />
        {[30, 52, 40, 66, 48, 72, 58, 44].map((h, i) => (
          <rect key={i} x={80 + i * 16.5} y={172 - h} width="10" height={h} rx="2" fill={i % 2 ? '#93c5fd' : '#3b82f6'} />
        ))}
        {/* Pie Chart Widget */}
        <rect x="218" y="76" width="94" height="104" rx="4" fill="#ffffff" />
        <rect x="226" y="84" width="40" height="5" rx="2" fill="#94a3b8" />
        <circle cx="265" cy="140" r="16" fill="none" stroke="#3b82f6" strokeWidth="24" strokeDasharray="42 100" />
        <circle cx="265" cy="140" r="16" fill="none" stroke="#ef4444" strokeWidth="24" strokeDasharray="26 100" strokeDashoffset="-42" />
        <circle cx="265" cy="140" r="16" fill="none" stroke="#f59e0b" strokeWidth="24" strokeDasharray="20 100" strokeDashoffset="-68" />
        <circle cx="265" cy="140" r="16" fill="none" stroke="#22c55e" strokeWidth="24" strokeDasharray="12 100" strokeDashoffset="-88" />
        {/* Table Rows */}
        <rect x="70" y="190" width="242" height="96" rx="4" fill="#ffffff" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="80" y={200 + i * 17} width="222" height="9" rx="2" fill={i % 2 ? '#f6f7f9' : '#e9edf3'} />
        ))}
        {/* Bottom Widgets */}
        <rect x="70" y="296" width="116" height="96" rx="4" fill="#ffffff" />
        <rect x="194" y="296" width="118" height="96" rx="4" fill="#ffffff" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="78" y={306 + i * 12} width={i === 4 ? 62 : 100} height="4" rx="1.5" fill="#dfe4ea" />
        ))}
        <circle cx="253" cy="346" r="14" fill="none" stroke="#22c55e" strokeWidth="20" strokeDasharray="55 100" />
        <circle cx="253" cy="346" r="14" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="30 100" strokeDashoffset="-55" />
      </svg>
    );
  }

  if (type === 'travel') {
    return (
      <svg viewBox="0 0 320 400" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="0" y="0" width="320" height="400" fill="#ffffff" />
        {/* Navigation Bar */}
        <rect x="0" y="0" width="320" height="24" fill="#ffffff" />
        <circle cx="16" cy="12" r="6" fill="#e0382f" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={120 + i * 36} y="10" width="26" height="4" rx="2" fill="#9aa4b2" />
        ))}
        <rect x="0" y="24" width="320" height="1" fill="#e5e7eb" />
        {/* Mountain Island Vector */}
        <path d="M28 52L74 40l44 10 14 34-14 20 10 34-36 22-30-10-22-28-20-26z" fill="#3b82c4" />
        <path d="M60 70l36-4 8 26-20 26-20-16z" fill="#5aa0de" />
        {/* Hero copy */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="150" y={44 + i * 10} width={i === 5 ? 98 : 158} height="4" rx="1.5" fill="#cfd6de" />
        ))}
        <rect x="150" y="126" width="70" height="14" rx="3" fill="#e0382f" />
        <text x="162" y="136" fontSize="6.5" fontWeight="700" fill="#ffffff" fontFamily="Arial,sans-serif">
          EXPLORE NOW
        </text>
        {/* Destination Cards */}
        {[
          { color: '#7db7e8', title: 'Island Escape' },
          { color: '#f2b45a', title: 'Mountain Trek' },
          { color: '#84cba0', title: 'City Lights' },
        ].map((item, i) => (
          <g key={i}>
            <rect x={14 + i * 102} y="176" width="94" height="64" rx="4" fill={item.color} />
            <rect x={18 + i * 102} y="250" width="86" height="3" rx="1.5" fill="#d3d9df" />
            <rect x={18 + i * 102} y="258" width="54" height="3" rx="1.5" fill="#d3d9df" />
          </g>
        ))}
        {/* Bottom Section */}
        <rect x="0" y="300" width="320" height="100" fill="#f4f6f9" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="20" y={316 + i * 12} width={i === 4 ? 170 : 280} height="4" rx="1.5" fill="#cbd2da" />
        ))}
      </svg>
    );
  }

  if (type === 'shop') {
    const CARD_H = 204;
    return (
      <svg viewBox="0 0 320 520" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="320" height="520" fill="#f8fafc" />

        {/* Navbar */}
        <rect width="320" height="26" fill="#ffffff" />
        <rect y="25.4" width="320" height="0.8" fill="#e5e7eb" />
        <rect x="14" y="5" width="16" height="16" rx="4.5" fill="#0f172a" />
        <rect x="19.5" y="8.5" width="5" height="9" rx="1.2" fill="none" stroke="#fff" strokeWidth="0.9" />
        <text x="35" y="17" fontSize="9.5" fontWeight="800" fill="#0f172a" fontFamily="Arial,sans-serif">PhoneShop</text>
        {SHOP_NAV.map((l, i) => (
          <text key={l} x={SHOP_NAV_X[i]} y="16" fontSize="5" fontWeight="500" fill={i === 0 ? '#2563eb' : '#334155'} fontFamily="Arial,sans-serif">{l}</text>
        ))}
        <rect x="290" y="5" width="16" height="16" rx="4.5" fill="#0f172a" />
        <rect x="294.5" y="10.5" width="7" height="7" rx="1.4" fill="none" stroke="#fff" strokeWidth="0.9" />
        <circle cx="305" cy="6" r="3.3" fill="#ef4444" />
        <text x="305" y="7.3" fontSize="3.6" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">0</text>

        {/* Search + brand filters */}
        <rect x="14" y="32" width="292" height="44" rx="8" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
        <rect x="20" y="38" width="280" height="14" rx="4" fill="#fff" stroke="#d1d5db" strokeWidth="0.6" />
        <circle cx="28" cy="44.6" r="2.3" fill="none" stroke="#94a3b8" strokeWidth="0.7" />
        <line x1="29.7" y1="46.3" x2="31.3" y2="47.9" stroke="#94a3b8" strokeWidth="0.7" />
        <text x="36" y="47.2" fontSize="5" fill="#94a3b8" fontFamily="Arial,sans-serif">Search smartphones…</text>
        {SHOP_FILTERS.reduce<{ els: React.ReactNode[]; x: number }>(
          (acc, f, i) => {
            const w = f.length * 3.1 + 10;
            acc.els.push(
              <g key={f}>
                <rect x={acc.x} y="57" width={w} height="13" rx="4" fill={i === 0 ? '#0f172a' : '#fff'} stroke="#e2e8f0" strokeWidth="0.6" />
                <text x={acc.x + w / 2} y="65.3" fontSize="4.6" fontWeight="600" textAnchor="middle" fill={i === 0 ? '#fff' : '#0f172a'} fontFamily="Arial,sans-serif">{f}</text>
              </g>
            );
            acc.x += w + 4;
            return acc;
          },
          { els: [], x: 20 }
        ).els}

        {/* Product grid */}
        {SHOP_PRODUCTS.map((p, i) => {
          const x = 14 + (i % 2) * 152;
          const y = 88 + Math.floor(i / 2) * (CARD_H + 10);
          const bw = p.badge.length * 3 + 10;
          const oldX = x + 9 + p.price.length * 5.6 + 4;
          return (
            <g key={p.name}>
              <rect x={x} y={y} width="140" height={CARD_H} rx="8" fill="#fff" stroke="#e8edf3" strokeWidth="0.6" />
              <rect x={x + 0.3} y={y + 0.3} width="139.4" height="92" rx="8" fill="#f1f5f9" />
              {/* phone (back + front) */}
              <rect x={x + 44} y={y + 19} width="30" height="60" rx="6" fill={p.back} />
              <circle cx={x + 52} cy={y + 27} r="2.6" fill="#111" />
              <circle cx={x + 52} cy={y + 34.5} r="2.6" fill="#111" />
              <rect x={x + 62} y={y + 15} width="30" height="60" rx="6" fill="#1a1d21" />
              <rect x={x + 63.6} y={y + 16.6} width="26.8" height="56.8" rx="4.6" fill={p.screen} />
              {/* badge + wishlist */}
              <rect x={x + 7} y={y + 7} width={bw} height="11" rx="4" fill="#0f172a" />
              <text x={x + 7 + bw / 2} y={y + 14.3} fontSize="4.4" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">{p.badge}</text>
              <circle cx={x + 127} cy={y + 13} r="6.5" fill="#fff" stroke="#e5e7eb" strokeWidth="0.5" />
              <text x={x + 127} y={y + 15.6} fontSize="7" textAnchor="middle" fill="#64748b" fontFamily="Arial,sans-serif">♡</text>
              {/* copy */}
              <text x={x + 9} y={y + 108} fontSize="3.8" fontWeight="700" letterSpacing="0.8" fill="#94a3b8" fontFamily="Arial,sans-serif">{p.brand.toUpperCase()}</text>
              <text x={x + 9} y={y + 120} fontSize="7.6" fontWeight="800" fill="#0f172a" fontFamily="Arial,sans-serif">{p.name}</text>
              <SvgLines x={x + 9} y={y + 129} lines={wrap(p.desc, 36, 3)} size={4.2} lh={5.2} fill="#64748b" />
              <text x={x + 9} y={y + 158} fontSize="10" fontWeight="800" fill="#0f172a" fontFamily="Arial,sans-serif">{p.price}</text>
              <text x={oldX} y={y + 158} fontSize="5.4" fontWeight="700" fill="#94a3b8" textDecoration="line-through" fontFamily="Arial,sans-serif">{p.old}</text>
              {/* add to cart */}
              <rect x={x + 9} y={y + 170} width="122" height="22" rx="6" fill="#0f172a" />
              <rect x={x + 47} y={y + 177.5} width="6.5" height="7" rx="1.3" fill="none" stroke="#fff" strokeWidth="0.8" />
              <text x={x + 74} y={y + 184.4} fontSize="6.4" fontWeight="700" textAnchor="middle" fill="#fff" fontFamily="Arial,sans-serif">Add to Cart</text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (type === 'moto') {
    const bike = (x: number, y: number, color: string) => (
      <g transform={`translate(${x} ${y})`}>
        <circle cx="12" cy="30" r="10" fill="none" stroke="#1f2937" strokeWidth="3.5" />
        <circle cx="60" cy="30" r="10" fill="none" stroke="#1f2937" strokeWidth="3.5" />
        <path d="M12 30L30 10h20l10 20M30 10l8 20h22M50 10l5-8" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );

    return (
      <svg viewBox="0 0 320 400" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="0" y="0" width="320" height="400" fill="#ffffff" />
        {/* Header */}
        <rect x="0" y="0" width="320" height="26" fill="#ffffff" />
        <circle cx="16" cy="13" r="8" fill="#1d4ed8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={120 + i * 34} y="11" width="22" height="4" rx="2" fill="#6b7280" />
        ))}
        <rect x="0" y="26" width="320" height="1" fill="#e5e7eb" />
        {/* Top Bike Showcase */}
        {bike(12, 50, '#111111')}
        {bike(120, 50, '#0f5fd7')}
        {bike(228, 50, '#d13b2c')}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 104} y="100" width="86" height="3" rx="1.5" fill="#d3d9df" />
            <rect x={14 + i * 104} y="108" width="56" height="3" rx="1.5" fill="#d3d9df" />
          </g>
        ))}
        {/* Middle Banner */}
        <rect x="0" y="140" width="320" height="120" fill="#f3f4f6" />
        <text x="160" y="172" fontSize="13" fontWeight="700" fill="#111827" textAnchor="middle" fontFamily="Arial,sans-serif">
          New arrivals
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 102} y="186" width="94" height="60" rx="4" fill="#ffffff" />
            {bike(20 + i * 102, 192, '#9ca3af')}
          </g>
        ))}
        {/* Bottom Details */}
        <rect x="0" y="270" width="320" height="130" fill="#ffffff" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="20" y={290 + i * 12} width={i === 5 ? 180 : 280} height="4" rx="1.5" fill="#d3d9df" />
        ))}
      </svg>
    );
  }

  if (type === 'folio') {
    const { name, role, intro, journey, experience, whatIDo, avatarImage } = PORTFOLIO_CONFIG;
    const NAV = ['Home', 'About', 'Portfolio', 'Contact'];
    const NAV_X = [207, 226, 246, 272];
    const R = 27.3;
    const C = 2 * Math.PI * R;
    const blocks = [
      { title: 'My Journey', dot: '#19e0d2', y: 90, lines: wrap(journey, 70, 3) },
      { title: 'Experience', dot: '#ff5a2e', y: 114, lines: wrap(experience, 70, 5) },
      { title: 'What I Do', dot: '#4fe3ff', y: 149, lines: wrap(stripTags(whatIDo), 70, 3) },
    ];
    const neon = (text: string, y: number, size: number) => (
      <>
        <text x="160" y={y} fontSize={size} fontWeight="800" letterSpacing="1.9" textAnchor="middle" fill="none" stroke="#ff5a2e" strokeOpacity="0.45" strokeWidth="1.4" fontFamily="Arial,sans-serif">
          {text}
        </text>
        <text x="160" y={y} fontSize={size} fontWeight="800" letterSpacing="1.9" textAnchor="middle" fill="#ffffff" fontFamily="Arial,sans-serif">
          {text}
        </text>
      </>
    );

    return (
      <svg viewBox="0 0 320 400" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="fp-glow" cx="0.2" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#0b2a30" />
            <stop offset="1" stopColor="#02060b" />
          </radialGradient>
          <linearGradient id="fp-track" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff5a2e" />
            <stop offset="0.5" stopColor="#c400ff" />
            <stop offset="1" stopColor="#ff2a9d" />
          </linearGradient>
          <clipPath id="fp-avatar">
            <circle cx="81" cy="108" r="26.2" />
          </clipPath>
        </defs>
        <rect width="320" height="400" fill="url(#fp-glow)" />

        {/* Rain + lightning */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={(i * 23) % 320} y1={20 + ((i * 47) % 160)} x2={((i * 23) % 320) + 0.4} y2={29 + ((i * 47) % 160)} stroke="#dceefa" strokeOpacity="0.35" strokeWidth="0.4" />
        ))}
        <polyline points="190,16 183,38 190,52 180,78 186,100" fill="none" stroke="#bed7ff" strokeOpacity="0.4" strokeWidth="0.8" />

        {/* Floating tech orbs */}
        {ORBS.map((o) => (
          <g key={o.t}>
            <circle cx={o.x} cy={o.y} r="6.4" fill={o.c} fillOpacity="0.16" />
            <circle cx={o.x} cy={o.y} r="5" fill="#071017" stroke={o.c} strokeWidth="0.6" />
            <text x={o.x} y={o.y + 1.4} fontSize="3.8" fontWeight="700" textAnchor="middle" fill={o.c} fontFamily="Arial,sans-serif">
              {o.t}
            </text>
          </g>
        ))}

        {/* Navbar */}
        <rect width="320" height="15" fill="#000000" />
        <rect y="14.6" width="320" height="0.8" fill="#19e0d2" />
        <text x="35" y="10" fontSize="6.4" fontWeight="700" fill="#ffffff" fontFamily="Arial,sans-serif">
          {name.toUpperCase()}
        </text>
        {NAV.map((label, i) => (
          <text key={label} x={NAV_X[i]} y="8.6" fontSize="3.1" fontWeight={i === 0 ? 700 : 400} fill={i === 0 ? '#ffffff' : '#d6e0e8'} fontFamily="Roboto,Arial,sans-serif">
            {label.toUpperCase()}
          </text>
        ))}
        <rect x="207" y="11" width="13.5" height="0.8" fill="#19e0d2" />

        {/* Neon headline */}
        {neon(`I’M ${name} ${role}`.toUpperCase(), 34, 6.6)}

        {/* Avatar with rainbow halo */}
        <circle cx="81" cy="108" r="28" fill="none" stroke="#19e0d2" strokeOpacity="0.22" strokeWidth="4" />
        <circle cx="81" cy="108" r="26.2" fill="#0a7cf5" />
        <image href={avatarImage} x="54.8" y="81.8" width="52.4" height="52.4" preserveAspectRatio="xMidYMin slice" clipPath="url(#fp-avatar)" />
        {HALO.map((c, i) => (
          <circle key={c} cx="81" cy="108" r={R} fill="none" stroke={c} strokeWidth="2" strokeDasharray={`${C / 8} ${C - C / 8}`} strokeDashoffset={-(i * C) / 8} transform="rotate(-90 81 108)" />
        ))}

        {/* Intro */}
        <text x="136" y="57" fontSize="7.6" fontWeight="800" fill="#ffffff" letterSpacing="0.3" fontFamily="Arial,sans-serif">
          HELLO! I’M{' '}
          <tspan fill="#19e0d2">{name.toUpperCase()}</tspan>
        </text>
        <SvgLines x={136} y={66} lines={wrap(intro, 62, 3)} size={4.3} lh={6.3} fill="#eef3f7" />

        {blocks.map((b) => (
          <g key={b.title}>
            <circle cx="137.5" cy={b.y - 1.2} r="1.1" fill={b.dot} />
            <text x="141" y={b.y} fontSize="4.6" fontWeight="500" fill="#ffffff" fontFamily="Ubuntu,Arial,sans-serif">
              {b.title}
            </text>
            <SvgLines x={136} y={b.y + 6} lines={b.lines} size={3.4} lh={5} fill="#c6d3dc" />
          </g>
        ))}

        <rect x="136" y="170" width="40" height="9" rx="2" fill="#19e0d2" />
        <text x="156" y="176" fontSize="3.6" fontWeight="700" textAnchor="middle" fill="#02060b" fontFamily="Arial,sans-serif">
          Explore Portfolio
        </text>
        <rect x="181" y="170.3" width="30" height="8.4" rx="2" fill="none" stroke="#19e0d2" strokeOpacity="0.7" strokeWidth="0.6" />
        <text x="196" y="176" fontSize="3.6" fontWeight="500" textAnchor="middle" fill="#ffffff" fontFamily="Arial,sans-serif">
          Contact Me
        </text>

        {/* Academic journey */}
        <text x="160" y="198" fontSize="5.2" fontWeight="500" textAnchor="middle" fill="#ffffff" fontFamily="Ubuntu,Arial,sans-serif">
          Academic Journey
        </text>
        <rect x="50" y="212" width="220" height="1.4" rx="0.7" fill="url(#fp-track)" />
        {EDUCATION_ITEMS.map((e, i) => {
          const cx = 50 + (i * 220) / (EDUCATION_ITEMS.length - 1);
          return (
            <g key={e.label}>
              <circle cx={cx} cy="212.7" r="7.5" fill="#ff5a2e" stroke="#02060b" strokeWidth="1.6" />
              <path d={`M${cx - 4} 212.6l4-2.2 4 2.2-4 2.2zM${cx - 2.4} 214v2c0 .9 1.1 1.4 2.4 1.4s2.4-.5 2.4-1.4v-2l-2.4 1.3z`} fill="#fff" />
              <text x={cx} y="228" fontSize="3.4" fontWeight="500" textAnchor="middle" fill="#dce5ec" fontFamily="Ubuntu,Arial,sans-serif">
                {e.label}
              </text>
              <text x={cx} y="233.5" fontSize="2.7" textAnchor="middle" fill="#8ea2b1" fontFamily="Ubuntu,Arial,sans-serif">
                {e.period}
              </text>
            </g>
          );
        })}

        {/* Skills */}
        {neon('SKILLS', 256, 7)}
        {SKILL_ITEMS.map((sk, i) => {
          const x = 16 + (i % 6) * 49.6;
          const y = 266 + Math.floor(i / 6) * 33;
          return (
            <g key={sk.name}>
              <rect x={x} y={y} width="44" height="28" rx="4" fill="#08121a" stroke={sk.color} strokeOpacity="0.6" strokeWidth="0.6" />
              <circle cx={x + 22} cy={y + 10.5} r="5.2" fill={sk.color} fillOpacity="0.85" />
              <text x={x + 22} y={y + 23} fontSize="3.6" fontWeight="500" textAnchor="middle" fill="#ffffff" fontFamily="Ubuntu,Arial,sans-serif">
                {sk.name}
              </text>
            </g>
          );
        })}

        {/* Portfolio */}
        {neon('PORTFOLIO', 344, 7)}
        {PROJECTS_ITEMS.slice(0, 3).map((p, i) => (
          <g key={p.id}>
            <rect x={16 + i * 98} y="354" width="92" height="50" rx="5" fill="#0b141b" stroke={`rgba(${p.rgb},0.5)`} strokeWidth="0.6" />
            <text x={20 + i * 98} y="384" fontSize="3.6" fontWeight="700" fill={`rgb(${p.rgb})`} fontFamily="Ubuntu,Arial,sans-serif">
              {p.title}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  // blog / task management screen
  return (
    <svg viewBox="0 0 320 400" className="w-full h-auto block select-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0" y="0" width="320" height="400" fill="#ffffff" />
      {/* Top Bar */}
      <rect x="0" y="0" width="320" height="26" fill="#ffffff" />
      <circle cx="16" cy="13" r="7" fill="#e8433f" />
      <rect x="34" y="10" width="40" height="6" rx="2" fill="#333333" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={150 + i * 40} y="11" width="28" height="4" rx="2" fill="#8aa0b8" />
      ))}
      <rect x="0" y="26" width="320" height="3" fill="#22b8cf" />
      {/* Task cards */}
      {[
        { color: '#7cc5e8', title: 'Design Architecture' },
        { color: '#f0b56a', title: 'Backend API Auth' },
        { color: '#9ad2a8', title: 'Database Optimization' },
        { color: '#c9a7e8', title: 'Production Testing' },
      ].map((task, i) => (
        <g key={i}>
          <rect x="12" y={42 + i * 70} width="64" height="54" rx="3" fill={task.color} />
          <rect x="84" y={44 + i * 70} width="150" height="6" rx="2" fill="#1d3557" />
          <rect x="84" y={58 + i * 70} width="150" height="4" rx="1.5" fill="#cfd6de" />
          <rect x="84" y={67 + i * 70} width="110" height="4" rx="1.5" fill="#cfd6de" />
          <rect x="84" y={76 + i * 70} width="70" height="4" rx="1.5" fill="#22c55e" />
        </g>
      ))}
      {/* Right side task widget */}
      <rect x="246" y="42" width="64" height="210" rx="4" fill="#f1f5f9" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x="252" y={54 + i * 16} width="52" height="4" rx="1.5" fill="#c7d0da" />
      ))}
    </svg>
  );
};
