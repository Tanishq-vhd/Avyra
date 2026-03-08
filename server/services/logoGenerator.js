// ================================================================
// AVIRA PREMIUM LOGO ENGINE
// Generates sophisticated, multi-layered SVG logo compositions
// ================================================================

// ── COLOR PALETTES ──────────────────────────────────────────────
const COLOR_PALETTES = [
    { primary: '#1B1F3B', secondary: '#3D4472', accent: '#7B68EE', text: '#1B1F3B', bg: '#FFFFFF', name: 'Royal Indigo', gradient: ['#1B1F3B', '#3D4472'] },
    { primary: '#0D1117', secondary: '#161B22', accent: '#C9A84C', text: '#0D1117', bg: '#FFFFFF', name: 'Noir Gold', gradient: ['#C9A84C', '#E8D48B'] },
    { primary: '#1A2332', secondary: '#2D3B4E', accent: '#4ECDC4', text: '#1A2332', bg: '#FFFFFF', name: 'Ocean Teal', gradient: ['#4ECDC4', '#44A08D'] },
    { primary: '#2C1810', secondary: '#4A2C20', accent: '#D4956A', text: '#2C1810', bg: '#FFFFFF', name: 'Warm Bronze', gradient: ['#D4956A', '#C47D4E'] },
    { primary: '#1A1A2E', secondary: '#16213E', accent: '#E94560', text: '#1A1A2E', bg: '#FFFFFF', name: 'Midnight Rose', gradient: ['#E94560', '#C23152'] },
    { primary: '#0B132B', secondary: '#1C2541', accent: '#5BC0BE', text: '#0B132B', bg: '#FFFFFF', name: 'Deep Cyan', gradient: ['#5BC0BE', '#3A506B'] },
    { primary: '#212529', secondary: '#343A40', accent: '#6C63FF', text: '#212529', bg: '#FFFFFF', name: 'Electric Violet', gradient: ['#6C63FF', '#9D4EDD'] },
    { primary: '#1B2838', secondary: '#2A3F54', accent: '#F0A500', text: '#1B2838', bg: '#FFFFFF', name: 'Amber Night', gradient: ['#F0A500', '#CF7500'] },
    { primary: '#1E3A5F', secondary: '#2E5077', accent: '#4DA8DA', text: '#1E3A5F', bg: '#FFFFFF', name: 'Steel Blue', gradient: ['#4DA8DA', '#3A86B5'] },
    { primary: '#2D132C', secondary: '#4A1942', accent: '#EE4C7C', text: '#2D132C', bg: '#FFFFFF', name: 'Berry Luxe', gradient: ['#EE4C7C', '#D64673'] },
    { primary: '#1A3C34', secondary: '#2D5A4A', accent: '#5CB85C', text: '#1A3C34', bg: '#FFFFFF', name: 'Forest Sage', gradient: ['#5CB85C', '#3D8B37'] },
    { primary: '#2B2D42', secondary: '#3C3F58', accent: '#EF233C', text: '#2B2D42', bg: '#FFFFFF', name: 'Crimson Edge', gradient: ['#EF233C', '#D90429'] },
];

// ── TYPOGRAPHY ──────────────────────────────────────────────────
const FONT_STACKS = {
    sans: { family: 'Inter, Helvetica, Arial, sans-serif', weight: 600, letterSpacing: 1.5, style: 'Clean Sans' },
    serif: { family: 'Playfair Display, Georgia, Times, serif', weight: 600, letterSpacing: 2, style: 'Elegant Serif' },
    display: { family: 'Space Grotesk, Helvetica, sans-serif', weight: 700, letterSpacing: -0.5, style: 'Modern Display' },
    mono: { family: 'JetBrains Mono, Consolas, monospace', weight: 500, letterSpacing: 3, style: 'Tech Mono' },
    elegant: { family: 'Playfair Display, Georgia, serif', weight: 400, letterSpacing: 5, style: 'Luxury Elegant' },
    technical: { family: 'Inter, Helvetica, sans-serif', weight: 300, letterSpacing: 6, style: 'Ultra Light' },
};

// ── SEEDED RANDOM ───────────────────────────────────────────────
function seededRandom(seed) {
    let s = Math.abs(seed) || 1;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function hashString(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function getInitials(name) {
    return name.split(/\s+/).filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ── SVG BUILDING BLOCKS ─────────────────────────────────────────

function svgGradient(id, colors, angle = 135) {
    const rad = (angle * Math.PI) / 180;
    const x1 = 50 - Math.cos(rad) * 50;
    const y1 = 50 - Math.sin(rad) * 50;
    const x2 = 50 + Math.cos(rad) * 50;
    const y2 = 50 + Math.sin(rad) * 50;
    return `<linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
    <stop offset="0%" stop-color="${colors[0]}"/>
    <stop offset="100%" stop-color="${colors[1]}"/>
  </linearGradient>`;
}

function svgRadialGrad(id, colors) {
    return `<radialGradient id="${id}" cx="30%" cy="30%" r="70%">
    <stop offset="0%" stop-color="${colors[0]}" stop-opacity="0.9"/>
    <stop offset="100%" stop-color="${colors[1]}"/>
  </radialGradient>`;
}

// ── PREMIUM ICON GENERATORS ─────────────────────────────────────

function iconMinimal(cx, cy, size, color, rng) {
    const variant = Math.floor(rng() * 5);
    switch (variant) {
        case 0: // Three stacked lines evolving
            return `
        <line x1="${cx - size * 0.5}" y1="${cy - size * 0.4}" x2="${cx + size * 0.2}" y2="${cy - size * 0.4}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="${cx - size * 0.5}" y1="${cy}" x2="${cx + size * 0.5}" y2="${cy}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="${cx - size * 0.5}" y1="${cy + size * 0.4}" x2="${cx + size * 0.35}" y2="${cy + size * 0.4}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>`;
        case 1: // Circular ring with dot
            return `
        <circle cx="${cx}" cy="${cy}" r="${size * 0.55}" fill="none" stroke="${color}" stroke-width="2.5"/>
        <circle cx="${cx + size * 0.25}" cy="${cy - size * 0.25}" r="${size * 0.1}" fill="${color}"/>`;
        case 2: // Corner bracket mark
            return `
        <path d="M${cx - size * 0.15} ${cy - size * 0.5} L${cx - size * 0.5} ${cy - size * 0.5} L${cx - size * 0.5} ${cy - size * 0.15}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M${cx + size * 0.15} ${cy + size * 0.5} L${cx + size * 0.5} ${cy + size * 0.5} L${cx + size * 0.5} ${cy + size * 0.15}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        case 3: // Split circle
            return `
        <path d="M${cx} ${cy - size * 0.55} A${size * 0.55} ${size * 0.55} 0 0 0 ${cx} ${cy + size * 0.55}" fill="${color}" opacity="0.85"/>
        <path d="M${cx} ${cy - size * 0.55} A${size * 0.55} ${size * 0.55} 0 0 1 ${cx} ${cy + size * 0.55}" fill="${color}" opacity="0.25"/>`;
        default: // Diamond outline
            return `
        <rect x="${cx - size * 0.35}" y="${cy - size * 0.35}" width="${size * 0.7}" height="${size * 0.7}" rx="3" fill="none" stroke="${color}" stroke-width="2.5" transform="rotate(45 ${cx} ${cy})"/>`;
    }
}

function iconLuxury(cx, cy, size, color, gradId, rng) {
    const variant = Math.floor(rng() * 4);
    switch (variant) {
        case 0: // Laurel wreath
            return `
        <path d="M${cx - size * 0.5} ${cy + size * 0.4} Q${cx - size * 0.7} ${cy - size * 0.1} ${cx - size * 0.35} ${cy - size * 0.55}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M${cx - size * 0.45} ${cy + size * 0.3} Q${cx - size * 0.6} ${cy} ${cx - size * 0.25} ${cy - size * 0.45}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M${cx + size * 0.5} ${cy + size * 0.4} Q${cx + size * 0.7} ${cy - size * 0.1} ${cx + size * 0.35} ${cy - size * 0.55}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M${cx + size * 0.45} ${cy + size * 0.3} Q${cx + size * 0.6} ${cy} ${cx + size * 0.25} ${cy - size * 0.45}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy - size * 0.55}" r="${size * 0.07}" fill="${color}"/>`;
        case 1: // Shield crest
            return `
        <path d="M${cx} ${cy - size * 0.65} L${cx + size * 0.5} ${cy - size * 0.35} L${cx + size * 0.5} ${cy + size * 0.1} Q${cx + size * 0.5} ${cy + size * 0.65} ${cx} ${cy + size * 0.75} Q${cx - size * 0.5} ${cy + size * 0.65} ${cx - size * 0.5} ${cy + size * 0.1} L${cx - size * 0.5} ${cy - size * 0.35} Z" fill="url(#${gradId})" opacity="0.9"/>
        <line x1="${cx}" y1="${cy - size * 0.3}" x2="${cx}" y2="${cy + size * 0.35}" stroke="white" stroke-width="1.5" opacity="0.4"/>
        <line x1="${cx - size * 0.25}" y1="${cy + size * 0.05}" x2="${cx + size * 0.25}" y2="${cy + size * 0.05}" stroke="white" stroke-width="1.5" opacity="0.4"/>`;
        case 2: // Crown silhouette
            return `
        <path d="M${cx - size * 0.45} ${cy + size * 0.25} L${cx - size * 0.45} ${cy - size * 0.1} L${cx - size * 0.2} ${cy + size * 0.05} L${cx} ${cy - size * 0.45} L${cx + size * 0.2} ${cy + size * 0.05} L${cx + size * 0.45} ${cy - size * 0.1} L${cx + size * 0.45} ${cy + size * 0.25} Z" fill="url(#${gradId})"/>
        <rect x="${cx - size * 0.5}" y="${cy + size * 0.25}" width="${size}" height="${size * 0.12}" rx="2" fill="${color}"/>`;
        default: // Monogram circle with ornamental border
            return `
        <circle cx="${cx}" cy="${cy}" r="${size * 0.55}" fill="none" stroke="${color}" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy}" r="${size * 0.48}" fill="none" stroke="${color}" stroke-width="0.5" stroke-dasharray="2 4"/>
        <circle cx="${cx}" cy="${cy}" r="${size * 0.62}" fill="none" stroke="${color}" stroke-width="0.5"/>`;
    }
}

function iconModernTech(cx, cy, size, color, gradId, rng) {
    const variant = Math.floor(rng() * 5);
    switch (variant) {
        case 0: // Abstract network nodes
            return `
        <circle cx="${cx - size * 0.3}" cy="${cy - size * 0.3}" r="${size * 0.12}" fill="url(#${gradId})"/>
        <circle cx="${cx + size * 0.35}" cy="${cy - size * 0.15}" r="${size * 0.18}" fill="url(#${gradId})"/>
        <circle cx="${cx - size * 0.1}" cy="${cy + size * 0.35}" r="${size * 0.15}" fill="url(#${gradId})"/>
        <circle cx="${cx + size * 0.3}" cy="${cy + size * 0.3}" r="${size * 0.08}" fill="url(#${gradId})" opacity="0.5"/>
        <line x1="${cx - size * 0.3}" y1="${cy - size * 0.3}" x2="${cx + size * 0.35}" y2="${cy - size * 0.15}" stroke="${color}" stroke-width="1.2" opacity="0.3"/>
        <line x1="${cx + size * 0.35}" y1="${cy - size * 0.15}" x2="${cx - size * 0.1}" y2="${cy + size * 0.35}" stroke="${color}" stroke-width="1.2" opacity="0.3"/>
        <line x1="${cx - size * 0.3}" y1="${cy - size * 0.3}" x2="${cx - size * 0.1}" y2="${cy + size * 0.35}" stroke="${color}" stroke-width="1.2" opacity="0.3"/>`;
        case 1: // Layered hexagons
            return `
        ${hexPath(cx - size * 0.12, cy - size * 0.08, size * 0.35, color, 0.15)}
        ${hexPath(cx + size * 0.12, cy + size * 0.08, size * 0.35, `url(#${gradId})`, 0.9)}`;
        case 2: // Abstract chart / pulse
            return `
        <path d="M${cx - size * 0.55} ${cy + size * 0.15} L${cx - size * 0.25} ${cy + size * 0.15} L${cx - size * 0.1} ${cy - size * 0.35} L${cx + size * 0.05} ${cy + size * 0.05} L${cx + size * 0.2} ${cy - size * 0.5} L${cx + size * 0.35} ${cy} L${cx + size * 0.55} ${cy}" fill="none" stroke="url(#${gradId})" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="${cx + size * 0.2}" cy="${cy - size * 0.5}" r="${size * 0.06}" fill="${color}"/>`;
        case 3: // Stacked layers
            return `
        <rect x="${cx - size * 0.4}" y="${cy - size * 0.1}" width="${size * 0.8}" height="${size * 0.25}" rx="4" fill="${color}" opacity="0.15"/>
        <rect x="${cx - size * 0.4}" y="${cy - size * 0.3}" width="${size * 0.8}" height="${size * 0.25}" rx="4" fill="${color}" opacity="0.35"/>
        <rect x="${cx - size * 0.4}" y="${cy - size * 0.5}" width="${size * 0.8}" height="${size * 0.25}" rx="4" fill="url(#${gradId})"/>`;
        default: // Circular progress / ring segments
            return `
        <circle cx="${cx}" cy="${cy}" r="${size * 0.45}" fill="none" stroke="${color}" stroke-width="3" opacity="0.1"/>
        <path d="M${cx} ${cy - size * 0.45} A${size * 0.45} ${size * 0.45} 0 1 1 ${cx - size * 0.45} ${cy}" fill="none" stroke="url(#${gradId})" stroke-width="3" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="${size * 0.2}" fill="url(#${gradId})" opacity="0.15"/>`;
    }
}

function iconBold(cx, cy, size, color, gradId, rng) {
    const variant = Math.floor(rng() * 4);
    switch (variant) {
        case 0: // Lightning bolt
            return `<path d="M${cx + size * 0.1} ${cy - size * 0.6} L${cx - size * 0.15} ${cy + size * 0.05} L${cx + size * 0.05} ${cy + size * 0.05} L${cx - size * 0.1} ${cy + size * 0.6} L${cx + size * 0.4} ${cy - size * 0.15} L${cx + size * 0.1} ${cy - size * 0.15} Z" fill="url(#${gradId})"/>`;
        case 1: // Arrow / forward
            return `
        <path d="M${cx - size * 0.45} ${cy} L${cx + size * 0.15} ${cy} L${cx + size * 0.15} ${cy - size * 0.25} L${cx + size * 0.55} ${cy} L${cx + size * 0.15} ${cy + size * 0.25} L${cx + size * 0.15} ${cy} Z" fill="url(#${gradId})"/>`;
        case 2: // Bold square with cutout
            return `
        <rect x="${cx - size * 0.5}" y="${cy - size * 0.5}" width="${size}" height="${size}" rx="8" fill="url(#${gradId})"/>
        <rect x="${cx - size * 0.2}" y="${cy - size * 0.2}" width="${size * 0.55}" height="${size * 0.55}" rx="4" fill="white"/>`;
        default: // Stacked triangles
            return `
        <polygon points="${cx},${cy - size * 0.55} ${cx + size * 0.48},${cy + size * 0.25} ${cx - size * 0.48},${cy + size * 0.25}" fill="url(#${gradId})" opacity="0.35"/>
        <polygon points="${cx},${cy - size * 0.35} ${cx + size * 0.3},${cy + size * 0.2} ${cx - size * 0.3},${cy + size * 0.2}" fill="url(#${gradId})"/>`;
    }
}

function iconAbstract(cx, cy, size, color, gradId, rng) {
    const variant = Math.floor(rng() * 5);
    switch (variant) {
        case 0: // Overlapping circles
            return `
        <circle cx="${cx - size * 0.2}" cy="${cy}" r="${size * 0.35}" fill="${color}" opacity="0.7"/>
        <circle cx="${cx + size * 0.2}" cy="${cy}" r="${size * 0.35}" fill="url(#${gradId})" opacity="0.7"/>`;
        case 1: // Flowing curves
            return `
        <path d="M${cx - size * 0.5} ${cy + size * 0.3} Q${cx - size * 0.15} ${cy - size * 0.6} ${cx + size * 0.5} ${cy - size * 0.1}" fill="none" stroke="url(#${gradId})" stroke-width="3" stroke-linecap="round"/>
        <path d="M${cx - size * 0.5} ${cy + size * 0.1} Q${cx + size * 0.15} ${cy - size * 0.5} ${cx + size * 0.5} ${cy + size * 0.2}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.35"/>`;
        case 2: // Concentric arcs
            return `
        <path d="M${cx - size * 0.45} ${cy + size * 0.2} A${size * 0.5} ${size * 0.5} 0 0 1 ${cx + size * 0.25} ${cy - size * 0.4}" fill="none" stroke="url(#${gradId})" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M${cx - size * 0.25} ${cy + size * 0.35} A${size * 0.4} ${size * 0.4} 0 0 1 ${cx + size * 0.4} ${cy - size * 0.15}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.3"/>
        <circle cx="${cx + size * 0.25}" cy="${cy - size * 0.4}" r="${size * 0.06}" fill="url(#${gradId})"/>`;
        case 3: // Petal / leaf form
            return `
        <path d="M${cx} ${cy - size * 0.55} Q${cx + size * 0.55} ${cy - size * 0.55} ${cx + size * 0.55} ${cy} Q${cx + size * 0.55} ${cy + size * 0.55} ${cx} ${cy + size * 0.55} Q${cx} ${cy} ${cx} ${cy - size * 0.55} Z" fill="url(#${gradId})" opacity="0.8"/>
        <path d="M${cx} ${cy - size * 0.55} Q${cx - size * 0.55} ${cy - size * 0.55} ${cx - size * 0.55} ${cy} Q${cx - size * 0.55} ${cy + size * 0.55} ${cx} ${cy + size * 0.55} Q${cx} ${cy} ${cx} ${cy - size * 0.55} Z" fill="${color}" opacity="0.2"/>`;
        default: // Tessellated squares
            return `
        <rect x="${cx - size * 0.45}" y="${cy - size * 0.45}" width="${size * 0.4}" height="${size * 0.4}" rx="3" fill="url(#${gradId})"/>
        <rect x="${cx + size * 0.05}" y="${cy - size * 0.45}" width="${size * 0.4}" height="${size * 0.4}" rx="3" fill="${color}" opacity="0.4"/>
        <rect x="${cx - size * 0.45}" y="${cy + size * 0.05}" width="${size * 0.4}" height="${size * 0.4}" rx="3" fill="${color}" opacity="0.2"/>
        <rect x="${cx + size * 0.05}" y="${cy + size * 0.05}" width="${size * 0.4}" height="${size * 0.4}" rx="3" fill="url(#${gradId})" opacity="0.6"/>`;
    }
}

function iconPlayful(cx, cy, size, color, gradId, rng) {
    const variant = Math.floor(rng() * 4);
    switch (variant) {
        case 0: // Chat bubble
            return `
        <rect x="${cx - size * 0.45}" y="${cy - size * 0.4}" width="${size * 0.9}" height="${size * 0.65}" rx="12" fill="url(#${gradId})"/>
        <polygon points="${cx - size * 0.15},${cy + size * 0.25} ${cx - size * 0.3},${cy + size * 0.5} ${cx + size * 0.05},${cy + size * 0.25}" fill="url(#${gradId})"/>
        <circle cx="${cx - size * 0.15}" cy="${cy - size * 0.1}" r="${size * 0.06}" fill="white"/>
        <circle cx="${cx}" cy="${cy - size * 0.1}" r="${size * 0.06}" fill="white"/>
        <circle cx="${cx + size * 0.15}" cy="${cy - size * 0.1}" r="${size * 0.06}" fill="white"/>`;
        case 1: // Star burst
            return `
        <polygon points="${starPoints(cx, cy, size * 0.5, size * 0.25, 6)}" fill="url(#${gradId})"/>`;
        case 2: // Smiley / friendly face
            return `
        <circle cx="${cx}" cy="${cy}" r="${size * 0.5}" fill="url(#${gradId})"/>
        <circle cx="${cx - size * 0.15}" cy="${cy - size * 0.1}" r="${size * 0.06}" fill="white"/>
        <circle cx="${cx + size * 0.15}" cy="${cy - size * 0.1}" r="${size * 0.06}" fill="white"/>
        <path d="M${cx - size * 0.2} ${cy + size * 0.12} Q${cx} ${cy + size * 0.3} ${cx + size * 0.2} ${cy + size * 0.12}" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/>`;
        default: // Rounded blob
            return `
        <path d="M${cx} ${cy - size * 0.5} C${cx + size * 0.5} ${cy - size * 0.55} ${cx + size * 0.6} ${cy - size * 0.1} ${cx + size * 0.45} ${cy + size * 0.15} C${cx + size * 0.35} ${cy + size * 0.45} ${cx + size * 0.1} ${cy + size * 0.55} ${cx - size * 0.1} ${cy + size * 0.5} C${cx - size * 0.5} ${cy + size * 0.4} ${cx - size * 0.6} ${cy + size * 0.05} ${cx - size * 0.45} ${cy - size * 0.2} C${cx - size * 0.3} ${cy - size * 0.5} ${cx - size * 0.15} ${cy - size * 0.55} ${cx} ${cy - size * 0.5} Z" fill="url(#${gradId})" opacity="0.85"/>`;
    }
}

function iconEmblem(cx, cy, size, color, gradId, rng) {
    return `
    <circle cx="${cx}" cy="${cy}" r="${size * 0.6}" fill="none" stroke="${color}" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="${size * 0.53}" fill="none" stroke="${color}" stroke-width="0.75"/>
    <circle cx="${cx}" cy="${cy}" r="${size * 0.66}" fill="none" stroke="${color}" stroke-width="0.75"/>
    <line x1="${cx - size * 0.2}" y1="${cy - size * 0.68}" x2="${cx - size * 0.2}" y2="${cy - size * 0.6}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${cx + size * 0.2}" y1="${cy - size * 0.68}" x2="${cx + size * 0.2}" y2="${cy - size * 0.6}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${cx - size * 0.2}" y1="${cy + size * 0.68}" x2="${cx - size * 0.2}" y2="${cy + size * 0.6}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${cx + size * 0.2}" y1="${cy + size * 0.68}" x2="${cx + size * 0.2}" y2="${cy + size * 0.6}" stroke="${color}" stroke-width="1.5"/>`;
}

// ── HELPERS ─────────────────────────────────────────────────────

function hexPath(cx, cy, size, fill, opacity = 1) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        pts.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`);
    }
    return `<polygon points="${pts.join(' ')}" fill="${fill}" opacity="${opacity}"/>`;
}

function starPoints(cx, cy, outerR, innerR, points) {
    const pts = [];
    for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI / points) * i - Math.PI / 2;
        pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return pts.join(' ');
}

// ── MAIN LOGO COMPOSITION ENGINE ────────────────────────────────

function generateSingleLogo(brandName, style, paletteIndex, fontKey, seed) {
    const rng = seededRandom(seed);
    const palette = COLOR_PALETTES[paletteIndex % COLOR_PALETTES.length];
    const font = FONT_STACKS[fontKey];
    const initials = getInitials(brandName);

    const W = 400;
    const H = 300;
    const gradId = `g${seed}`;
    const radGradId = `rg${seed}`;

    let defs = svgGradient(gradId, palette.gradient, 135 + Math.floor(rng() * 90));
    defs += svgRadialGrad(radGradId, palette.gradient);

    let iconSvg = '';
    let textSvg = '';
    let decorSvg = '';

    const iconColor = palette.primary;

    switch (style) {
        case 'minimal': {
            const iconX = W * 0.25;
            const iconY = H * 0.45;
            iconSvg = iconMinimal(iconX, iconY, 40, iconColor, rng);
            textSvg = `<text x="${W * 0.53}" y="${H * 0.47}" text-anchor="start" dominant-baseline="central" fill="${palette.text}" font-family="${font.family}" font-size="26" font-weight="${font.weight}" letter-spacing="${font.letterSpacing}">${brandName}</text>`;
            break;
        }
        case 'luxury': {
            iconSvg = iconLuxury(W * 0.3, H * 0.42, 45, iconColor, gradId, rng);
            textSvg = `<text x="${W * 0.63}" y="${H * 0.4}" text-anchor="start" dominant-baseline="central" fill="${palette.text}" font-family="Playfair Display, Georgia, serif" font-size="24" font-weight="500" letter-spacing="3">${brandName}</text>`;
            decorSvg = `<text x="${W * 0.63}" y="${H * 0.55}" text-anchor="start" fill="${palette.accent}" font-family="${font.family}" font-size="7" font-weight="400" letter-spacing="4" text-transform="uppercase">${['ESTABLISHED', 'PREMIUM BRAND', 'SINCE 2024', 'LUXURY'][Math.floor(rng() * 4)]}</text>`;
            break;
        }
        case 'modern_tech': {
            iconSvg = iconModernTech(W * 0.25, H * 0.45, 44, palette.accent, gradId, rng);
            textSvg = `<text x="${W * 0.55}" y="${H * 0.44}" text-anchor="start" dominant-baseline="central" fill="${palette.text}" font-family="Space Grotesk, sans-serif" font-size="28" font-weight="700" letter-spacing="-0.5">${brandName}</text>`;
            decorSvg = `<rect x="${W * 0.55}" y="${H * 0.55}" width="30" height="3" rx="1.5" fill="url(#${gradId})"/>`;
            break;
        }
        case 'bold': {
            iconSvg = iconBold(W * 0.24, H * 0.45, 42, palette.accent, gradId, rng);
            textSvg = `<text x="${W * 0.52}" y="${H * 0.46}" text-anchor="start" dominant-baseline="central" fill="${palette.text}" font-family="Space Grotesk, sans-serif" font-size="32" font-weight="700" letter-spacing="-0.5">${brandName}</text>`;
            break;
        }
        case 'playful': {
            const iconY = H * 0.35;
            iconSvg = iconPlayful(W / 2, iconY, 42, palette.accent, gradId, rng);
            textSvg = `<text x="${W / 2}" y="${H * 0.67}" text-anchor="middle" dominant-baseline="central" fill="${palette.text}" font-family="Space Grotesk, sans-serif" font-size="26" font-weight="700" letter-spacing="1">${brandName}</text>`;
            break;
        }
        case 'abstract': {
            iconSvg = iconAbstract(W * 0.27, H * 0.45, 48, palette.primary, gradId, rng);
            textSvg = `<text x="${W * 0.58}" y="${H * 0.46}" text-anchor="start" dominant-baseline="central" fill="${palette.text}" font-family="${font.family}" font-size="26" font-weight="${font.weight}" letter-spacing="${font.letterSpacing}">${brandName}</text>`;
            break;
        }
        case 'wordmark': {
            const fontSize = Math.min(48, Math.max(30, 360 / brandName.length));
            textSvg = `<text x="${W / 2}" y="${H * 0.46}" text-anchor="middle" dominant-baseline="central" fill="${palette.text}" font-family="${font.family}" font-size="${fontSize}" font-weight="${font.weight}" letter-spacing="${font.letterSpacing + 1}">${brandName}</text>`;
            // Underline accent
            const textW = brandName.length * fontSize * 0.38;
            decorSvg = `<rect x="${W / 2 - textW / 2}" y="${H * 0.58}" width="${textW}" height="3" rx="1.5" fill="url(#${gradId})" opacity="0.8"/>`;
            break;
        }
        case 'icon_text': {
            const iconY = H * 0.33;
            const shapeVariant = Math.floor(rng() * 3);
            if (shapeVariant === 0) {
                iconSvg = `<rect x="${W / 2 - 22}" y="${iconY - 22}" width="44" height="44" rx="10" fill="url(#${gradId})"/>
                    <text x="${W / 2}" y="${iconY + 2}" text-anchor="middle" dominant-baseline="central" fill="white" font-family="${font.family}" font-size="20" font-weight="700">${initials[0]}</text>`;
            } else if (shapeVariant === 1) {
                iconSvg = `<circle cx="${W / 2}" cy="${iconY}" r="24" fill="url(#${gradId})"/>
                    <text x="${W / 2}" y="${iconY + 2}" text-anchor="middle" dominant-baseline="central" fill="white" font-family="${font.family}" font-size="18" font-weight="700">${initials[0]}</text>`;
            } else {
                iconSvg = hexPath(W / 2, iconY, 26, `url(#${gradId})`, 1);
                iconSvg += `<text x="${W / 2}" y="${iconY + 2}" text-anchor="middle" dominant-baseline="central" fill="white" font-family="${font.family}" font-size="18" font-weight="700">${initials[0]}</text>`;
            }
            textSvg = `<text x="${W / 2}" y="${H * 0.64}" text-anchor="middle" dominant-baseline="central" fill="${palette.text}" font-family="${font.family}" font-size="24" font-weight="${font.weight}" letter-spacing="${font.letterSpacing}">${brandName}</text>`;
            break;
        }
        case 'emblem': {
            iconSvg = iconEmblem(W / 2, H * 0.45, 55, palette.primary, gradId, rng);
            textSvg = `<text x="${W / 2}" y="${H * 0.45}" text-anchor="middle" dominant-baseline="central" fill="${palette.text}" font-family="Playfair Display, Georgia, serif" font-size="14" font-weight="600" letter-spacing="3">${brandName.toUpperCase()}</text>`;
            // Top arc text
            decorSvg = `<text x="${W / 2}" y="${H * 0.56}" text-anchor="middle" fill="${palette.accent}" font-family="${font.family}" font-size="6" letter-spacing="3" font-weight="500">${'★  '.repeat(3).trim()}</text>`;
            break;
        }
        case 'monogram': {
            const bgVariant = Math.floor(rng() * 3);
            if (bgVariant === 0) {
                iconSvg = `<rect x="${W / 2 - 45}" y="${H * 0.22}" width="90" height="90" rx="16" fill="url(#${gradId})"/>`;
            } else if (bgVariant === 1) {
                iconSvg = `<circle cx="${W / 2}" cy="${H * 0.45}" r="48" fill="url(#${gradId})"/>`;
            } else {
                iconSvg = hexPath(W / 2, H * 0.43, 50, `url(#${gradId})`, 1);
            }
            textSvg = `<text x="${W / 2}" y="${H * 0.47}" text-anchor="middle" dominant-baseline="central" fill="white" font-family="Playfair Display, Georgia, serif" font-size="40" font-weight="600" letter-spacing="2">${initials}</text>`;
            decorSvg = `<text x="${W / 2}" y="${H * 0.77}" text-anchor="middle" fill="${palette.text}" font-family="${font.family}" font-size="12" letter-spacing="${font.letterSpacing + 2}" font-weight="500">${brandName.toUpperCase()}</text>`;
            break;
        }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>${defs}</defs>
  <rect width="${W}" height="${H}" fill="${palette.bg}"/>
  ${iconSvg}
  ${textSvg}
  ${decorSvg}
</svg>`;

    return {
        style,
        svgData: svg,
        config: {
            palette: { ...palette },
            paletteName: palette.name,
            paletteIndex,
            font: fontKey,
            fontFamily: font.family,
            fontWeight: font.weight,
            fontStyle: font.style,
            letterSpacing: font.letterSpacing,
            layout: style,
            brandName,
            seed
        }
    };
}

// ── STYLE → FONT MAPPING ───────────────────────────────────────

const STYLE_FONT_MAP = {
    minimal: ['sans', 'technical'],
    luxury: ['elegant', 'serif'],
    modern_tech: ['display', 'sans'],
    bold: ['display', 'sans'],
    playful: ['display', 'sans'],
    abstract: ['sans', 'display', 'mono'],
    wordmark: ['elegant', 'display', 'serif', 'sans'],
    icon_text: ['sans', 'display'],
    emblem: ['serif', 'elegant'],
    monogram: ['serif', 'elegant', 'display']
};

// ── PUBLIC API ──────────────────────────────────────────────────

export function generateLogos({ brandName, description = '', industry = '', tagline = '' }) {
    const baseSeed = hashString(`${brandName}|${description}|${industry}|${tagline}`);
    const rng = seededRandom(baseSeed);

    const styles = [
        'minimal', 'luxury', 'modern_tech', 'bold',
        'abstract', 'wordmark', 'icon_text', 'emblem',
        'monogram', 'playful'
    ];

    return styles.map((style, i) => {
        const fonts = STYLE_FONT_MAP[style];
        const fontKey = fonts[Math.floor(rng() * fonts.length)];
        const paletteIndex = Math.floor(rng() * COLOR_PALETTES.length);
        const seed = baseSeed + i * 7919;
        return generateSingleLogo(brandName, style, paletteIndex, fontKey, seed);
    });
}

export function remixLogo(logo, brandName) {
    const config = logo.config || {};
    const newSeed = (config.seed || hashString(brandName)) + Math.floor(Math.random() * 100000);
    const newPaletteIndex = (config.paletteIndex + 1 + Math.floor(Math.random() * 7)) % COLOR_PALETTES.length;
    const fonts = STYLE_FONT_MAP[logo.style] || ['sans'];
    const newFont = fonts[Math.floor(Math.random() * fonts.length)];
    return generateSingleLogo(brandName, logo.style, newPaletteIndex, newFont, newSeed);
}

export { COLOR_PALETTES, FONT_STACKS };
