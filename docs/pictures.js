function pictureSVG(key) {
  const art = PICTURES[key] || PICTURES.unknown;
  return `<svg viewBox="0 0 120 120" role="img" aria-label="${escapeAttr(key)}">${art}</svg>`;
}

function escapeAttr(s) {
  return String(s).replace(/[&"]/g, (c) => (c === "&" ? "&amp;" : "&quot;"));
}

const PICTURES = {
  apple: `<circle cx="60" cy="68" r="32" fill="#d94c3d"/><path d="M60 40c8-14 22-16 28-10" fill="none" stroke="#3d6b2f" stroke-width="6" stroke-linecap="round"/><ellipse cx="58" cy="38" rx="8" ry="5" fill="#5c8f3a"/>`,
  ball: `<circle cx="60" cy="62" r="34" fill="#e36b2c"/><path d="M26 62h68M60 28v68M36 38c16 10 32 10 48 0M36 86c16-10 32-10 48 0" fill="none" stroke="#fff" stroke-width="4"/>`,
  cat: `<ellipse cx="60" cy="78" rx="28" ry="18" fill="#f0c27a"/><circle cx="60" cy="52" r="22" fill="#f0c27a"/><polygon points="42,42 38,22 54,36" fill="#f0c27a"/><polygon points="78,42 82,22 66,36" fill="#f0c27a"/><circle cx="52" cy="52" r="3" fill="#1c1914"/><circle cx="68" cy="52" r="3" fill="#1c1914"/>`,
  dog: `<ellipse cx="62" cy="78" rx="30" ry="18" fill="#c48a4a"/><circle cx="48" cy="54" r="20" fill="#c48a4a"/><ellipse cx="30" cy="62" rx="10" ry="14" fill="#a56f38"/><circle cx="44" cy="50" r="3" fill="#1c1914"/><circle cx="56" cy="50" r="3" fill="#1c1914"/>`,
  egg: `<ellipse cx="60" cy="64" rx="24" ry="32" fill="#f7efd2"/><ellipse cx="52" cy="52" rx="8" ry="6" fill="#fff"/>`,
  fish: `<ellipse cx="58" cy="62" rx="30" ry="18" fill="#4aa3c7"/><polygon points="88,62 112,42 112,82" fill="#3b88a8"/><circle cx="42" cy="58" r="4" fill="#1c1914"/>`,
  goat: `<ellipse cx="64" cy="82" rx="28" ry="16" fill="#ece4d4"/><rect x="46" y="48" width="28" height="28" rx="10" fill="#ece4d4"/><path d="M50 48l-10-16M70 48l10-16" stroke="#c9b48a" stroke-width="4" fill="none"/><circle cx="54" cy="60" r="3"/><circle cx="66" cy="60" r="3"/>`,
  hat: `<ellipse cx="60" cy="86" rx="38" ry="8" fill="#3d4f7c"/><rect x="38" y="42" width="44" height="40" rx="8" fill="#4d6499"/>`,
  ice: `<polygon points="60,22 88,88 32,88" fill="#9fd7ea"/><polygon points="60,22 74,88 60,88" fill="#7ec4dc"/>`,
  juice: `<rect x="42" y="38" width="36" height="52" rx="6" fill="#f0a12e"/><rect x="42" y="38" width="36" height="14" fill="#f4c56a"/><rect x="54" y="24" width="12" height="16" fill="#d7d0c4"/>`,
  kite: `<polygon points="60,18 92,60 60,102 28,60" fill="#e24b4b"/><polygon points="60,18 92,60 60,60" fill="#f0c44a"/><path d="M60 102c12 10 8 16 18 16" fill="none" stroke="#1c1914" stroke-width="3"/>`,
  leaf: `<path d="M28 84c28-54 72-54 64-8-22 10-42 10-64 8z" fill="#4f8f3c"/><path d="M40 78c20-24 40-28 48-12" fill="none" stroke="#2f6b28" stroke-width="3"/>`,
  moon: `<circle cx="60" cy="60" r="34" fill="#f2d98a"/><circle cx="78" cy="48" r="28" fill="#f4ead6"/>`,
  nest: `<ellipse cx="60" cy="78" rx="36" ry="16" fill="#b5814a"/><ellipse cx="48" cy="64" rx="10" ry="12" fill="#f4efe2"/><ellipse cx="68" cy="62" rx="10" ry="12" fill="#f4efe2"/>`,
  orange: `<circle cx="60" cy="64" r="32" fill="#f08a2a"/><polygon points="60,28 68,40 52,40" fill="#4f8f3c"/>`,
  pear: `<path d="M60 28c18 8 26 28 22 48-4 18-40 18-44 0-4-20 4-40 22-48z" fill="#c5d45a"/><rect x="57" y="18" width="6" height="14" fill="#6b4a2a"/>`,
  queen: `<circle cx="60" cy="70" r="22" fill="#f0c27a"/><path d="M32 48l10 18 18-22 18 22 10-18-8 34H40z" fill="#e2b84a"/>`,
  rain: `<circle cx="48" cy="42" r="16" fill="#9bb7c9"/><circle cx="68" cy="40" r="20" fill="#8aacc0"/><path d="M44 70l-6 18M60 74l-6 18M76 70l-6 18" stroke="#4aa3c7" stroke-width="5" stroke-linecap="round"/>`,
  sun: `<circle cx="60" cy="60" r="22" fill="#f2c14e"/><g stroke="#f2c14e" stroke-width="6" stroke-linecap="round"><path d="M60 18v10M60 92v10M18 60h10M92 60h10M32 32l8 8M80 80l8 8M32 88l8-8M80 40l8-8"/></g>`,
  tree: `<rect x="54" y="72" width="12" height="28" fill="#7a4e2a"/><circle cx="60" cy="52" r="28" fill="#3f8f4a"/>`,
  umbrella: `<path d="M20 64c0-24 18-40 40-40s40 16 40 40H20z" fill="#d94c3d"/><path d="M60 64v30" stroke="#1c1914" stroke-width="5"/><path d="M60 94c8 0 10-6 10-6" fill="none" stroke="#1c1914" stroke-width="5"/>`,
  violin: `<ellipse cx="48" cy="78" rx="18" ry="24" fill="#8a4a24"/><rect x="58" y="28" width="8" height="52" fill="#6b3a1c"/><path d="M62 28l18-10" stroke="#1c1914" stroke-width="4"/>`,
  whale: `<ellipse cx="58" cy="68" rx="36" ry="20" fill="#4d7ea8"/><polygon points="90,62 114,48 114,86" fill="#3d678c"/><circle cx="38" cy="64" r="4" fill="#1c1914"/>`,
  xray: `<rect x="28" y="24" width="64" height="72" rx="8" fill="#d9e7ef"/><path d="M48 40v40M72 40v40M40 58h40" stroke="#6d7c86" stroke-width="6"/><circle cx="48" cy="40" r="6" fill="#6d7c86"/><circle cx="72" cy="40" r="6" fill="#6d7c86"/>`,
  yarn: `<circle cx="60" cy="64" r="30" fill="#e36b7a"/><path d="M40 50c20 8 20 20 0 28M80 50c-20 8-20 20 0 28M60 34v60" fill="none" stroke="#fff" stroke-width="4"/>`,
  zebra: `<ellipse cx="64" cy="80" rx="28" ry="16" fill="#f7f2e8"/><rect x="40" y="46" width="30" height="28" rx="10" fill="#f7f2e8"/><path d="M46 52h6M56 60h6M48 70h8M70 78h8" stroke="#1c1914" stroke-width="5"/>`,
  boat: `<path d="M24 70h72l-10 22H34z" fill="#c45c26"/><path d="M60 28v42" stroke="#6b4a2a" stroke-width="5"/><polygon points="62,30 62,62 92,62" fill="#f4efe2"/>`,
  house: `<rect x="30" y="54" width="60" height="42" fill="#e8c07a"/><polygon points="24,54 60,24 96,54" fill="#c45c26"/><rect x="54" y="70" width="14" height="26" fill="#6b4a2a"/>`,
  dinosaur: `<path d="M28 86c8-28 40-36 52-16 8-18 28-18 28 2 0 16-18 20-28 16v18H48v-18c-8 2-18 4-20-2z" fill="#5aa36a"/>`,
  elephant: `<ellipse cx="62" cy="74" rx="32" ry="20" fill="#b7b3c2"/><circle cx="40" cy="58" r="18" fill="#b7b3c2"/><path d="M28 62c-10 16-8 28 4 28" fill="none" stroke="#9c98a8" stroke-width="8"/>`,
  seal: `<ellipse cx="64" cy="70" rx="32" ry="18" fill="#7b8894"/><circle cx="40" cy="62" r="14" fill="#7b8894"/><circle cx="36" cy="58" r="3" fill="#1c1914"/>`,
  island: `<ellipse cx="60" cy="86" rx="40" ry="10" fill="#4aa3c7"/><path d="M28 86c8-28 28-40 44-8 4 8-36 12-44 8z" fill="#e2c07a"/><rect x="70" y="40" width="6" height="28" fill="#6b4a2a"/><circle cx="78" cy="40" r="14" fill="#3f8f4a"/>`,
  giraffe: `<rect x="56" y="28" width="10" height="52" fill="#e2b14a"/><circle cx="64" cy="24" r="12" fill="#e2b14a"/><ellipse cx="58" cy="92" rx="18" ry="12" fill="#d4a13e"/>`,
  koala: `<circle cx="60" cy="64" r="24" fill="#9aa3ad"/><circle cx="38" cy="48" r="12" fill="#9aa3ad"/><circle cx="82" cy="48" r="12" fill="#9aa3ad"/><circle cx="52" cy="64" r="3"/><circle cx="68" cy="64" r="3"/>`,
  rhea: `<ellipse cx="58" cy="78" rx="24" ry="14" fill="#c4a574"/><rect x="68" y="40" width="8" height="36" fill="#c4a574"/><circle cx="78" cy="36" r="10" fill="#c4a574"/><path d="M48 90v18M64 90v18" stroke="#8a6d48" stroke-width="4"/>`,
  bear: `<ellipse cx="60" cy="78" rx="30" ry="18" fill="#8a5a32"/><circle cx="60" cy="52" r="20" fill="#8a5a32"/><circle cx="44" cy="38" r="8" fill="#8a5a32"/><circle cx="76" cy="38" r="8" fill="#8a5a32"/><circle cx="52" cy="52" r="3"/><circle cx="68" cy="52" r="3"/>`,
  cheese: `<path d="M24 80 60 28l36 52z" fill="#f2c14e"/><circle cx="52" cy="62" r="6" fill="#e0a83a"/><circle cx="70" cy="70" r="5" fill="#e0a83a"/>`,
  frog: `<ellipse cx="60" cy="74" rx="28" ry="18" fill="#5aa36a"/><circle cx="44" cy="52" r="10" fill="#5aa36a"/><circle cx="76" cy="52" r="10" fill="#5aa36a"/><circle cx="44" cy="52" r="4" fill="#1c1914"/><circle cx="76" cy="52" r="4" fill="#1c1914"/>`,
  train: `<rect x="22" y="54" width="76" height="32" rx="6" fill="#c45c26"/><rect x="50" y="36" width="28" height="18" fill="#4d6499"/><circle cx="40" cy="90" r="8" fill="#1c1914"/><circle cx="80" cy="90" r="8" fill="#1c1914"/>`,
  grape: `<circle cx="50" cy="46" r="12" fill="#6a4d9b"/><circle cx="70" cy="46" r="12" fill="#6a4d9b"/><circle cx="40" cy="66" r="12" fill="#5b3f88"/><circle cx="60" cy="66" r="12" fill="#6a4d9b"/><circle cx="80" cy="66" r="12" fill="#5b3f88"/><circle cx="60" cy="86" r="12" fill="#5b3f88"/>`,
  cow: `<ellipse cx="64" cy="80" rx="30" ry="16" fill="#f7f2e8"/><circle cx="44" cy="58" r="18" fill="#f7f2e8"/><circle cx="36" cy="50" r="6" fill="#1c1914"/><circle cx="58" cy="72" r="7" fill="#1c1914"/>`,
  waffle: `<rect x="28" y="28" width="64" height="64" rx="8" fill="#e2b14a"/><path d="M28 52h64M28 76h64M52 28v64M76 28v64" stroke="#c48a4a" stroke-width="4"/>`,
  xylophone: `<rect x="20" y="36" width="80" height="12" rx="4" fill="#e36b2c"/><rect x="24" y="52" width="72" height="12" rx="4" fill="#f2c14e"/><rect x="28" y="68" width="64" height="12" rx="4" fill="#4aa3c7"/>`,
  yacht: `<path d="M22 78h76l-12 16H36z" fill="#4d6499"/><polygon points="50,78 50,28 86,78" fill="#f4efe2"/>`,
  shoe: `<path d="M24 70c18-8 30-8 40 0 14 0 32 4 32 12H24z" fill="#c45c26"/><rect x="24" y="66" width="28" height="16" rx="6" fill="#8a3d1c"/>`,
  unknown: `<circle cx="60" cy="60" r="28" fill="#e2d3b8"/>`,
};
