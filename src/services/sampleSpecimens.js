// sampleSpecimens.js — Self-contained high-resolution clinical specimens (CORS-free, instant-load)

// Helper to convert SVG string to clean Data URI
function svgToDataUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// Specimen 1: Warfarin Sodium 5mg (Coumadin) + Bayer Aspirin 325mg (Lethal DDI Case)
export const SPECIMEN_WARFARIN_ASPIRIN = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101f"/>
      <stop offset="100%" stop-color="#050811"/>
    </linearGradient>
    <radialGradient id="peachPill" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="60%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </radialGradient>
    <radialGradient id="whitePill" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Surface -->
  <rect width="800" height="550" fill="url(#bg)"/>
  
  <!-- Grid Matrix Overlay -->
  <path d="M0,50 H800 M0,100 H800 M0,150 H800 M0,200 H800 M0,250 H800 M0,300 H800 M0,350 H800 M0,400 H800 M0,450 H800 M0,500 H800" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  <path d="M50,0 V550 M100,0 V550 M150,0 V550 M200,0 V550 M250,0 V550 M300,0 V550 M350,0 V550 M400,0 V550 M450,0 V550 M500,0 V550 M550,0 V550 M600,0 V550 M650,0 V550 M700,0 V550 M750,0 V550" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>

  <!-- Bottle 1: Prescription Coumadin (Warfarin 5mg) -->
  <g transform="translate(100, 100)" filter="url(#shadow)">
    <!-- Amber Bottle Body -->
    <rect x="0" y="50" width="180" height="260" rx="16" fill="#b45309" stroke="#d97706" stroke-width="2"/>
    <!-- Bottle Cap -->
    <rect x="25" y="15" width="130" height="40" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <!-- White Rx Label -->
    <rect x="15" y="85" width="150" height="190" rx="8" fill="#ffffff"/>
    <text x="25" y="115" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Rx #849201-9</text>
    <text x="25" y="138" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#dc2626">WARFARIN 5MG</text>
    <text x="25" y="158" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#475569">COUMADIN SODIUM</text>
    <line x1="25" y1="170" x2="155" y2="170" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="25" y="190" font-family="Arial, sans-serif" font-size="11" fill="#334155">Take 1 tab daily at PM</text>
    <text x="25" y="208" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#ea580c">⚠️ BLOOD THINNER</text>
    <rect x="25" y="222" width="130" height="24" rx="4" fill="#fee2e2"/>
    <text x="32" y="238" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#991b1b">MONITOR INR / BLEEDING</text>
  </g>

  <!-- Bottle 2: Bayer Aspirin 325mg OTC -->
  <g transform="translate(520, 120)" filter="url(#shadow)">
    <!-- Bottle Body -->
    <rect x="0" y="45" width="160" height="230" rx="14" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <!-- Yellow Cap -->
    <rect x="20" y="15" width="120" height="35" rx="5" fill="#facc15" stroke="#eab308" stroke-width="2"/>
    <!-- Label -->
    <rect x="12" y="75" width="136" height="165" rx="6" fill="#0284c7"/>
    <text x="80" y="115" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">BAYER</text>
    <text x="80" y="140" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fef08a" text-anchor="middle">ASPIRIN 325mg</text>
    <text x="80" y="165" font-family="Arial, sans-serif" font-size="11" fill="#ffffff" text-anchor="middle">Pain Reliever / NSAID</text>
    <rect x="24" y="185" width="112" height="22" rx="4" fill="#ffffff"/>
    <text x="80" y="200" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="#0369a1" text-anchor="middle">REGULAR STRENGTH</text>
  </g>

  <!-- Loose Pill 1: Warfarin 5mg Peach Scored Round Tablet -->
  <g transform="translate(330, 360)" filter="url(#shadow)">
    <circle cx="50" cy="50" r="48" fill="url(#peachPill)" stroke="#c2410c" stroke-width="2"/>
    <!-- Score line -->
    <line x1="50" y1="12" x2="50" y2="88" stroke="#9a3412" stroke-width="3" stroke-linecap="round"/>
    <!-- Imprint Text -->
    <text x="28" y="55" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#7c2d12" text-anchor="middle">COU</text>
    <text x="72" y="55" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#7c2d12" text-anchor="middle">5</text>
  </g>

  <!-- Loose Pill 2: Bayer Aspirin 325mg White Round Tablet -->
  <g transform="translate(450, 370)" filter="url(#shadow)">
    <circle cx="45" cy="45" r="44" fill="url(#whitePill)" stroke="#64748b" stroke-width="2"/>
    <!-- Imprint Cross / Name -->
    <text x="45" y="49" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#334155" text-anchor="middle" letter-spacing="1">BAYER</text>
  </g>

  <!-- Clinical Annotations Overlay -->
  <rect x="40" y="490" width="720" height="36" rx="8" fill="rgba(239, 68, 68, 0.15)" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1"/>
  <text x="400" y="513" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fca5a5" text-anchor="middle">
    ⚠️ SPECIMEN: Warfarin (5mg Peach Scored) &amp; Aspirin (325mg Bayer) co-administered — HIGH HEMORRHAGIC RISK
  </text>
</svg>
`);

// Specimen 2: Handwritten Prescription Slip (Metformin 850mg & Lipitor 20mg)
export const SPECIMEN_HANDWRITTEN_RX = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <defs>
    <linearGradient id="paperBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="100%" stop-color="#f4eee4"/>
    </linearGradient>
    <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <!-- Dark Clinical Desk Surface -->
  <rect width="800" height="550" fill="#080d1a"/>

  <!-- Prescription Pad Slip -->
  <g transform="translate(100, 30)" filter="url(#paperShadow)">
    <rect width="600" height="480" rx="10" fill="url(#paperBg)" stroke="#dcd6c8" stroke-width="2"/>

    <!-- Medical Header -->
    <text x="50" y="45" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#0f172a">ST. JUDE METROPOLITAN HOSPITAL</text>
    <text x="50" y="68" font-family="Arial, sans-serif" font-size="12" fill="#475569">DEPARTMENT OF INTERNAL MEDICINE • CLINICAL PHARMACOLOGY</text>
    <text x="50" y="85" font-family="Arial, sans-serif" font-size="11" fill="#64748b">Dr. A. Harrison, MD, FACP • Lic #NY-48920194</text>
    <line x1="50" y1="98" x2="550" y2="98" stroke="#0ea5e9" stroke-width="3"/>

    <!-- Patient Data -->
    <text x="50" y="125" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b">Patient: Robert Miller</text>
    <text x="320" y="125" font-family="Arial, sans-serif" font-size="13" fill="#1e293b">Age: 54   DOB: 10/12/1972</text>
    <text x="50" y="145" font-family="Arial, sans-serif" font-size="12" fill="#64748b">Date: October 2026</text>
    <line x1="50" y1="155" x2="550" y2="155" stroke="#cbd5e1" stroke-width="1"/>

    <!-- Prescription Symbol ℞ -->
    <text x="50" y="215" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#0284c7">℞</text>

    <!-- Handwritten Cursive Scripts (Simulated Medical Handwriting) -->
    <!-- Item 1: Metformin 850mg -->
    <g transform="translate(110, 205)">
      <path d="M0,0 Q15,-18 35,-6 Q55,5 75,-12 Q95,-22 120,-8 Q140,5 170,-10" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round"/>
      <text x="10" y="0" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-size="28" font-weight="bold" fill="#1e3a8a">
        Metformin HCl 850mg
      </text>
      <text x="30" y="28" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-size="22" fill="#1e3a8a">
        Sig: 1 tab BID with meals (pc)  #60
      </text>
    </g>

    <!-- Item 2: Atorvastatin (Lipitor) 20mg -->
    <g transform="translate(110, 285)">
      <text x="10" y="0" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-size="28" font-weight="bold" fill="#1e3a8a">
        Atorvastatin 20mg (Lipitor)
      </text>
      <text x="30" y="28" font-family="'Brush Script MT', 'Segoe Script', cursive, sans-serif" font-size="22" fill="#1e3a8a">
        Sig: 1 tab qhs (at bedtime)  #30
      </text>
    </g>

    <!-- Refills & Warnings -->
    <line x1="50" y1="360" x2="550" y2="360" stroke="#cbd5e1" stroke-width="1"/>
    <text x="50" y="385" font-family="Arial, sans-serif" font-size="12" fill="#475569">Refills: 3 times</text>
    <text x="240" y="385" font-family="Arial, sans-serif" font-size="12" fill="#475569">Generic Substitution Allowed: YES</text>

    <!-- Doctor Signature -->
    <g transform="translate(380, 420)">
      <path d="M0,0 Q25,-30 45,5 Q60,-20 85,0 Q105,-40 140,-5" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round"/>
      <text x="10" y="18" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155">A. Harrison, M.D.</text>
    </g>
  </g>
</svg>
`);

// Specimen 3: Look-Alike / Sound-Alike Pills (Clonidine 0.1mg vs Clonazepam 0.5mg)
export const SPECIMEN_LOOKALIKE_PILLS = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <defs>
    <linearGradient id="specBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1329"/>
      <stop offset="100%" stop-color="#040711"/>
    </linearGradient>
    <radialGradient id="roundWhiteA" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </radialGradient>
    <radialGradient id="roundWhiteB" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#64748b"/>
    </radialGradient>
    <filter id="pillGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Clinical Inspection Surface -->
  <rect width="800" height="550" fill="url(#specBg)"/>

  <!-- Pill Organizer Slot Left: Clonidine 0.1mg -->
  <g transform="translate(140, 110)">
    <rect x="0" y="0" width="220" height="300" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="2"/>
    <text x="110" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">SPECIMEN A (0.1mg)</text>

    <!-- Pill 1 -->
    <g transform="translate(60, 90)" filter="url(#pillGlow)">
      <circle cx="50" cy="50" r="48" fill="url(#roundWhiteA)" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="12" y1="50" x2="88" y2="50" stroke="#64748b" stroke-width="2"/>
      <text x="50" y="42" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#334155" text-anchor="middle">0.1</text>
      <text x="50" y="72" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#475569" text-anchor="middle">BOEHRINGER</text>
    </g>
    <text x="110" y="240" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">CLONIDINE 0.1mg</text>
    <text x="110" y="260" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Blood Pressure / Catapres</text>
  </g>

  <!-- VS Comparison Badge in Center -->
  <g transform="translate(375, 230)">
    <circle cx="25" cy="25" r="24" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
    <text x="25" y="32" font-family="Arial, sans-serif" font-size="15" font-weight="900" fill="#0f172a" text-anchor="middle">VS</text>
  </g>

  <!-- Pill Organizer Slot Right: Clonazepam 0.5mg (Look-alike) -->
  <g transform="translate(440, 110)">
    <rect x="0" y="0" width="220" height="300" rx="16" fill="rgba(255,255,255,0.03)" stroke="rgba(245, 158, 11, 0.3)" stroke-width="2"/>
    <text x="110" y="35" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fbbf24" text-anchor="middle">SPECIMEN B (0.5mg)</text>

    <!-- Pill 2 -->
    <g transform="translate(60, 90)" filter="url(#pillGlow)">
      <circle cx="50" cy="50" r="48" fill="url(#roundWhiteB)" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="50" y1="12" x2="50" y2="88" stroke="#64748b" stroke-width="2"/>
      <text x="50" y="42" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#334155" text-anchor="middle">ROCHE</text>
      <text x="50" y="72" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#334155" text-anchor="middle">0.5</text>
    </g>
    <text x="110" y="240" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">KLONOPIN 0.5mg</text>
    <text x="110" y="260" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Clonazepam / Sedative</text>
  </g>

  <!-- Bottom Safety Banner -->
  <rect x="60" y="450" width="680" height="42" rx="8" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1"/>
  <text x="400" y="476" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fde047" text-anchor="middle">
    ⚠️ LOOK-ALIKE SOUND-ALIKE (LASA) WARNING: Identical round white morphology with similar naming
  </text>
</svg>
`);
