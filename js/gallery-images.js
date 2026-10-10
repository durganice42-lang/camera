/* ============================================================
   GALLERY-IMAGES.JS
   Builds rich SVG scene illustrations into every
   .gallery-img-placeholder element on the page.
   Each scene is unique, thematic, and visually rich.
   ============================================================ */

const GalleryImages = (() => {
  'use strict';

  /* ── Scene definitions ──────────────────────────────────────
     Each entry maps to a data-scene attribute OR falls back to
     sequential order. The SVG string is injected as innerHTML
     of the placeholder div.
  ──────────────────────────────────────────────────────────── */

  const SCENES = {

    /* 1. CITYSCAPE AT DUSK ─ blue-navy urban skyline */
    cityscape: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#020b1e"/>
          <stop offset="60%" stop-color="#03194a"/>
          <stop offset="100%" stop-color="#051a60"/>
        </linearGradient>
        <linearGradient id="water-c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#05224a"/>
          <stop offset="100%" stop-color="#010a1a"/>
        </linearGradient>
        <radialGradient id="moon-c" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stop-color="#e8f4ff"/>
          <stop offset="100%" stop-color="#a0c8f0"/>
        </radialGradient>
        <filter id="glow-c"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="blur-c"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <!-- Sky -->
      <rect width="800" height="500" fill="url(#sky-c)"/>
      <!-- Stars -->
      <g fill="rgba(255,255,255,0.7)">
        <circle cx="50" cy="30" r="1"/><circle cx="120" cy="15" r="1.2"/>
        <circle cx="200" cy="40" r="0.8"/><circle cx="300" cy="20" r="1"/>
        <circle cx="420" cy="10" r="1.3"/><circle cx="550" cy="35" r="0.9"/>
        <circle cx="650" cy="18" r="1.1"/><circle cx="720" cy="28" r="0.8"/>
        <circle cx="780" cy="12" r="1"/><circle cx="80" cy="60" r="0.7"/>
        <circle cx="170" cy="55" r="1"/><circle cx="380" cy="45" r="0.8"/>
        <circle cx="490" cy="25" r="1.2"/><circle cx="600" cy="50" r="0.9"/>
        <circle cx="690" cy="40" r="1"/><circle cx="750" cy="55" r="0.8"/>
      </g>
      <!-- Moon -->
      <circle cx="680" cy="60" r="28" fill="url(#moon-c)" opacity="0.9"/>
      <circle cx="688" cy="54" r="22" fill="#03194a" opacity="0.15"/>
      <!-- Moon glow -->
      <circle cx="680" cy="60" r="40" fill="rgba(160,200,255,0.06)"/>
      <circle cx="680" cy="60" r="55" fill="rgba(160,200,255,0.03)"/>
      <!-- Water reflection base -->
      <rect x="0" y="320" width="800" height="180" fill="url(#water-c)"/>
      <!-- City glow on water -->
      <ellipse cx="400" cy="330" rx="300" ry="40" fill="rgba(0,60,150,0.3)" filter="url(#blur-c)"/>
      <!-- Building silhouettes - back row -->
      <g fill="#010d24">
        <rect x="0"   y="200" width="60"  height="130"/><rect x="30"  y="175" width="20" height="25"/>
        <rect x="55"  y="180" width="80"  height="150"/>
        <rect x="70"  y="165" width="12"  height="18"/><rect x="80" y="158" width="8" height="10"/>
        <rect x="130" y="190" width="50"  height="140"/>
        <rect x="145" y="170" width="20"  height="22"/><rect x="150" y="162" width="10" height="10"/>
        <rect x="175" y="200" width="40"  height="130"/>
        <rect x="210" y="160" width="70"  height="170"/>
        <rect x="225" y="140" width="15"  height="22"/>
        <rect x="275" y="195" width="35"  height="135"/>
        <rect x="305" y="170" width="90"  height="160"/>
        <rect x="330" y="148" width="18"  height="24"/><rect x="334" y="138" width="10" height="12"/>
        <rect x="390" y="185" width="55"  height="145"/>
        <rect x="440" y="175" width="40"  height="155"/>
        <rect x="475" y="160" width="80"  height="170"/>
        <rect x="495" y="138" width="20"  height="25"/>
        <rect x="550" y="190" width="45"  height="140"/>
        <rect x="590" y="165" width="60"  height="165"/>
        <rect x="610" y="148" width="12"  height="19"/>
        <rect x="645" y="180" width="50"  height="150"/>
        <rect x="690" y="195" width="35"  height="135"/>
        <rect x="720" y="170" width="80"  height="160"/>
        <rect x="750" y="155" width="18"  height="17"/>
      </g>
      <!-- Building windows -->
      <g fill="rgba(255,220,100,0.6)">
        <rect x="62"  y="195" width="5" height="4"/><rect x="72"  y="195" width="5" height="4"/>
        <rect x="62"  y="207" width="5" height="4"/><rect x="82"  y="207" width="5" height="4"/>
        <rect x="92"  y="195" width="5" height="4"/><rect x="102" y="195" width="5" height="4"/>
        <rect x="140" y="200" width="5" height="4"/><rect x="152" y="200" width="5" height="4"/>
        <rect x="140" y="212" width="5" height="4"/><rect x="162" y="212" width="5" height="4"/>
        <rect x="215" y="175" width="5" height="4"/><rect x="228" y="175" width="5" height="4"/>
        <rect x="240" y="175" width="5" height="4"/><rect x="215" y="188" width="5" height="4"/>
        <rect x="228" y="188" width="5" height="4"/><rect x="252" y="188" width="5" height="4"/>
        <rect x="310" y="180" width="5" height="4"/><rect x="323" y="180" width="5" height="4"/>
        <rect x="335" y="165" width="5" height="4"/><rect x="350" y="180" width="5" height="4"/>
        <rect x="362" y="180" width="5" height="4"/><rect x="374" y="180" width="5" height="4"/>
        <rect x="395" y="195" width="5" height="4"/><rect x="408" y="195" width="5" height="4"/>
        <rect x="420" y="195" width="5" height="4"/><rect x="432" y="195" width="5" height="4"/>
        <rect x="480" y="170" width="5" height="4"/><rect x="494" y="170" width="5" height="4"/>
        <rect x="508" y="170" width="5" height="4"/><rect x="480" y="184" width="5" height="4"/>
        <rect x="494" y="184" width="5" height="4"/>
        <rect x="596" y="178" width="5" height="4"/><rect x="608" y="178" width="5" height="4"/>
        <rect x="620" y="165" width="5" height="4"/><rect x="632" y="178" width="5" height="4"/>
        <rect x="596" y="192" width="5" height="4"/><rect x="620" y="192" width="5" height="4"/>
        <rect x="650" y="190" width="5" height="4"/><rect x="664" y="190" width="5" height="4"/>
        <rect x="725" y="182" width="5" height="4"/><rect x="738" y="182" width="5" height="4"/>
        <rect x="750" y="182" width="5" height="4"/><rect x="762" y="182" width="5" height="4"/>
      </g>
      <!-- Antenna lights (red) -->
      <g fill="rgba(255,60,60,0.9)" filter="url(#glow-c)">
        <circle cx="90"  cy="155" r="2.5"/><circle cx="155" cy="160" r="2.5"/>
        <circle cx="338" cy="136" r="2.5"/><circle cx="500" cy="135" r="2.5"/>
        <circle cx="614" cy="146" r="2.5"/>
      </g>
      <!-- Light trails on water -->
      <g opacity="0.35" filter="url(#blur-c)">
        <rect x="220" y="325" width="4"  height="60" fill="#ffdd80"/>
        <rect x="245" y="330" width="3"  height="50" fill="#ffcc55"/>
        <rect x="338" y="322" width="5"  height="70" fill="#ffee99"/>
        <rect x="362" y="328" width="3"  height="55" fill="#ffdd80"/>
        <rect x="500" y="322" width="4"  height="68" fill="#ffcc55"/>
        <rect x="614" y="325" width="4"  height="60" fill="#ffdd80"/>
        <rect x="680" y="328" width="3"  height="50" fill="#aaccff"/>
      </g>
      <!-- Horizon atmospheric haze -->
      <rect x="0" y="308" width="800" height="18" fill="rgba(10,40,100,0.4)" filter="url(#blur-c)"/>
      <!-- Lens flare overlay -->
      <ellipse cx="680" cy="60" rx="60" ry="20" fill="rgba(180,220,255,0.04)"/>
    </svg>`,

    /* 2. NEBULA ─ deep space purple stellar cloud */
    nebula: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="neb1" cx="35%" cy="40%" r="55%">
          <stop offset="0%"   stop-color="#6010a0" stop-opacity="0.8"/>
          <stop offset="50%"  stop-color="#2d0a4a" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#070310" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="neb2" cx="70%" cy="60%" r="50%">
          <stop offset="0%"   stop-color="#1040a0" stop-opacity="0.6"/>
          <stop offset="60%"  stop-color="#0a2060" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#070310" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="neb3" cx="55%" cy="30%" r="40%">
          <stop offset="0%"   stop-color="#c040e0" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#070310" stop-opacity="0"/>
        </radialGradient>
        <filter id="blur-n"><feGaussianBlur stdDeviation="8"/></filter>
        <filter id="blur-n2"><feGaussianBlur stdDeviation="3"/></filter>
        <filter id="gstar"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <!-- Deep space background -->
      <rect width="800" height="500" fill="#070310"/>
      <!-- Nebula clouds -->
      <ellipse cx="280" cy="200" rx="300" ry="220" fill="url(#neb1)" filter="url(#blur-n)"/>
      <ellipse cx="560" cy="300" rx="280" ry="200" fill="url(#neb2)" filter="url(#blur-n)"/>
      <ellipse cx="440" cy="150" rx="200" ry="150" fill="url(#neb3)" filter="url(#blur-n)"/>
      <!-- Dust lanes -->
      <path d="M100 200 Q300 150 500 220 Q650 260 750 200" stroke="rgba(180,80,255,0.15)" stroke-width="40" fill="none" filter="url(#blur-n2)"/>
      <path d="M50 300 Q250 280 450 320 Q600 340 780 300" stroke="rgba(60,80,200,0.12)" stroke-width="30" fill="none" filter="url(#blur-n2)"/>
      <!-- Star field - tiny -->
      <g fill="white">
        <circle cx="30"  cy="20"  r="0.8" opacity="0.9"/>
        <circle cx="80"  cy="45"  r="0.6" opacity="0.7"/>
        <circle cx="150" cy="15"  r="1"   opacity="0.8"/>
        <circle cx="210" cy="60"  r="0.7" opacity="0.6"/>
        <circle cx="290" cy="30"  r="0.9" opacity="0.9"/>
        <circle cx="370" cy="50"  r="0.6" opacity="0.7"/>
        <circle cx="430" cy="18"  r="1.1" opacity="0.8"/>
        <circle cx="510" cy="40"  r="0.7" opacity="0.6"/>
        <circle cx="580" cy="25"  r="0.9" opacity="0.9"/>
        <circle cx="640" cy="55"  r="0.6" opacity="0.7"/>
        <circle cx="710" cy="35"  r="1"   opacity="0.8"/>
        <circle cx="770" cy="20"  r="0.8" opacity="0.6"/>
        <circle cx="55"  cy="120" r="0.7" opacity="0.8"/>
        <circle cx="130" cy="100" r="1"   opacity="0.9"/>
        <circle cx="200" cy="130" r="0.8" opacity="0.7"/>
        <circle cx="350" cy="90"  r="0.6" opacity="0.8"/>
        <circle cx="460" cy="110" r="0.9" opacity="0.9"/>
        <circle cx="540" cy="80"  r="0.7" opacity="0.7"/>
        <circle cx="620" cy="120" r="1"   opacity="0.8"/>
        <circle cx="700" cy="95"  r="0.6" opacity="0.6"/>
        <circle cx="760" cy="115" r="0.8" opacity="0.9"/>
        <circle cx="90"  cy="200" r="0.7" opacity="0.7"/>
        <circle cx="180" cy="250" r="0.9" opacity="0.8"/>
        <circle cx="320" cy="180" r="0.6" opacity="0.6"/>
        <circle cx="480" cy="220" r="1"   opacity="0.9"/>
        <circle cx="600" cy="190" r="0.8" opacity="0.7"/>
        <circle cx="720" cy="230" r="0.7" opacity="0.8"/>
        <circle cx="40"  cy="350" r="0.9" opacity="0.9"/>
        <circle cx="160" cy="370" r="0.7" opacity="0.7"/>
        <circle cx="280" cy="340" r="1"   opacity="0.8"/>
        <circle cx="420" cy="380" r="0.8" opacity="0.6"/>
        <circle cx="560" cy="355" r="0.6" opacity="0.9"/>
        <circle cx="670" cy="390" r="0.9" opacity="0.8"/>
        <circle cx="760" cy="360" r="0.7" opacity="0.7"/>
        <circle cx="110" cy="440" r="1"   opacity="0.9"/>
        <circle cx="240" cy="460" r="0.6" opacity="0.7"/>
        <circle cx="390" cy="450" r="0.8" opacity="0.8"/>
        <circle cx="530" cy="470" r="0.9" opacity="0.6"/>
        <circle cx="680" cy="445" r="0.7" opacity="0.9"/>
      </g>
      <!-- Bright stars with glow -->
      <g filter="url(#gstar)">
        <circle cx="280" cy="180" r="3" fill="white" opacity="0.95"/>
        <circle cx="450" cy="130" r="2.5" fill="#e0d0ff" opacity="0.9"/>
        <circle cx="600" cy="280" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="160" cy="320" r="2" fill="#d0e8ff" opacity="0.85"/>
        <circle cx="700" cy="150" r="2.8" fill="white" opacity="0.9"/>
      </g>
      <!-- Star spike cross on brightest star -->
      <g stroke="rgba(255,255,255,0.4)" stroke-width="0.8" opacity="0.7">
        <line x1="276" y1="180" x2="284" y2="180"/>
        <line x1="280" y1="176" x2="280" y2="184"/>
        <line x1="277" y1="177" x2="283" y2="183"/>
        <line x1="283" y1="177" x2="277" y2="183"/>
      </g>
      <!-- Nebula core bright spot -->
      <circle cx="320" cy="200" r="6" fill="rgba(200,120,255,0.6)" filter="url(#blur-n2)"/>
      <circle cx="320" cy="200" r="3" fill="rgba(240,200,255,0.8)"/>
    </svg>`,

    /* 3. FOREST ─ dark deep forest with light rays */
    forest: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-f" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#0a2010"/>
          <stop offset="40%" stop-color="#0d3a1a"/>
          <stop offset="100%" stop-color="#091508"/>
        </linearGradient>
        <linearGradient id="floor-f" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#0a2010"/>
          <stop offset="100%" stop-color="#040a06"/>
        </linearGradient>
        <radialGradient id="sun-f" cx="52%" cy="20%" r="35%">
          <stop offset="0%"  stop-color="rgba(200,255,180,0.25)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="blur-f"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="blur-f2"><feGaussianBlur stdDeviation="1.5"/></filter>
        <linearGradient id="ray1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="rgba(180,255,160,0.18)"/>
          <stop offset="100%" stop-color="rgba(180,255,160,0)"/>
        </linearGradient>
      </defs>
      <!-- Forest background -->
      <rect width="800" height="500" fill="url(#sky-f)"/>
      <!-- Atmospheric light from canopy -->
      <ellipse cx="415" cy="0" rx="180" ry="120" fill="url(#sun-f)"/>
      <!-- Light rays -->
      <g opacity="0.6">
        <polygon points="380,0 430,0 520,500 330,500" fill="rgba(180,255,160,0.04)"/>
        <polygon points="350,0 400,0 470,500 300,500" fill="rgba(180,255,160,0.03)"/>
        <polygon points="420,0 460,0 560,500 380,500" fill="rgba(180,255,160,0.03)"/>
        <polygon points="300,0 340,0 400,500 250,500" fill="rgba(180,255,160,0.02)"/>
        <polygon points="460,0 490,0 590,500 440,500" fill="rgba(180,255,160,0.02)"/>
      </g>
      <!-- Forest floor -->
      <rect x="0" y="400" width="800" height="100" fill="url(#floor-f)"/>
      <!-- Tree trunks - back -->
      <g fill="#050e06">
        <rect x="60"  y="60"  width="18" height="450" rx="3"/>
        <rect x="130" y="40"  width="22" height="460" rx="3"/>
        <rect x="210" y="70"  width="16" height="440" rx="3"/>
        <rect x="290" y="50"  width="20" height="450" rx="3"/>
        <rect x="370" y="30"  width="24" height="470" rx="3"/>
        <rect x="460" y="55"  width="18" height="445" rx="3"/>
        <rect x="540" y="45"  width="22" height="455" rx="3"/>
        <rect x="620" y="65"  width="16" height="440" rx="3"/>
        <rect x="700" y="40"  width="20" height="460" rx="3"/>
        <rect x="760" y="75"  width="15" height="430" rx="3"/>
      </g>
      <!-- Tree trunks - mid (darker) -->
      <g fill="#030906">
        <rect x="20"  y="100" width="28" height="400" rx="4"/>
        <rect x="170" y="80"  width="32" height="420" rx="4"/>
        <rect x="330" y="90"  width="26" height="410" rx="4"/>
        <rect x="500" y="85"  width="30" height="415" rx="4"/>
        <rect x="670" y="95"  width="28" height="405" rx="4"/>
      </g>
      <!-- Canopy top shapes -->
      <g fill="#071208" opacity="0.9">
        <ellipse cx="69"  cy="55"  rx="60"  ry="80"/>
        <ellipse cx="141" cy="35"  rx="70"  ry="90"/>
        <ellipse cx="218" cy="65"  rx="55"  ry="75"/>
        <ellipse cx="300" cy="45"  rx="65"  ry="85"/>
        <ellipse cx="382" cy="25"  rx="75"  ry="95"/>
        <ellipse cx="469" cy="50"  rx="60"  ry="80"/>
        <ellipse cx="551" cy="40"  rx="68"  ry="88"/>
        <ellipse cx="628" cy="60"  rx="56"  ry="76"/>
        <ellipse cx="710" cy="35"  rx="64"  ry="86"/>
        <ellipse cx="768" cy="70"  rx="52"  ry="74"/>
      </g>
      <!-- Ground foliage / ferns -->
      <g fill="#081408" opacity="0.8">
        <ellipse cx="100" cy="430" rx="80"  ry="35"/>
        <ellipse cx="280" cy="440" rx="90"  ry="30"/>
        <ellipse cx="450" cy="425" rx="100" ry="38"/>
        <ellipse cx="630" cy="435" rx="85"  ry="32"/>
        <ellipse cx="780" cy="445" rx="70"  ry="28"/>
      </g>
      <!-- Mist / atmosphere on floor -->
      <rect x="0" y="390" width="800" height="40" fill="rgba(180,255,180,0.04)" filter="url(#blur-f)"/>
      <!-- Floating dust motes in light shafts -->
      <g fill="rgba(220,255,200,0.5)" filter="url(#blur-f2)">
        <circle cx="400" cy="150" r="1.5"/><circle cx="415" cy="200" r="1"/>
        <circle cx="390" cy="250" r="1.5"/><circle cx="420" cy="310" r="1"/>
        <circle cx="405" cy="350" r="1.5"/><circle cx="435" cy="180" r="1"/>
        <circle cx="370" cy="220" r="1.2"/><circle cx="445" cy="280" r="1"/>
      </g>
      <!-- Deep dark floor in foreground -->
      <rect x="0" y="450" width="800" height="50" fill="#020604"/>
    </svg>`,

    /* 4. GOLDEN HOUR ─ warm amber sunset landscape */
    golden: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#8b2000"/>
          <stop offset="30%" stop-color="#c44400"/>
          <stop offset="60%" stop-color="#e87000"/>
          <stop offset="80%" stop-color="#f4a020"/>
          <stop offset="100%" stop-color="#f8c040"/>
        </linearGradient>
        <radialGradient id="sun-g" cx="50%" cy="75%" r="35%">
          <stop offset="0%"   stop-color="#fff5c0" stop-opacity="1"/>
          <stop offset="20%"  stop-color="#ffcc40" stop-opacity="0.9"/>
          <stop offset="60%"  stop-color="#ff8800" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
        <linearGradient id="ground-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#2e1200"/>
          <stop offset="100%" stop-color="#120800"/>
        </linearGradient>
        <filter id="blur-g"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur-g2"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <!-- Sky gradient -->
      <rect width="800" height="500" fill="url(#sky-g)"/>
      <!-- Sun glow -->
      <ellipse cx="400" cy="310" rx="220" ry="160" fill="url(#sun-g)"/>
      <!-- Sun disc -->
      <circle cx="400" cy="310" r="42" fill="#fff8d0"/>
      <circle cx="400" cy="310" r="36" fill="#fffde0"/>
      <!-- Horizon atmospheric band -->
      <rect x="0" y="290" width="800" height="30" fill="rgba(255,200,50,0.18)" filter="url(#blur-g2)"/>
      <!-- Cloud silhouettes -->
      <g fill="#6a1a00" opacity="0.7">
        <ellipse cx="120"  cy="120" rx="100" ry="28"/>
        <ellipse cx="80"   cy="115" rx="60"  ry="22"/>
        <ellipse cx="160"  cy="110" rx="70"  ry="20"/>
        <ellipse cx="600"  cy="100" rx="120" ry="30"/>
        <ellipse cx="550"  cy="95"  rx="70"  ry="22"/>
        <ellipse cx="680"  cy="108" rx="80"  ry="24"/>
        <ellipse cx="350"  cy="160" rx="90"  ry="20"/>
        <ellipse cx="500"  cy="175" rx="110" ry="18"/>
        <ellipse cx="450"  cy="170" rx="70"  ry="15"/>
      </g>
      <!-- Clouds lit from below -->
      <g fill="rgba(255,150,50,0.15)" filter="url(#blur-g2)">
        <ellipse cx="120"  cy="128" rx="95"  ry="12"/>
        <ellipse cx="600"  cy="108" rx="115" ry="12"/>
        <ellipse cx="350"  cy="168" rx="85"  ry="8"/>
      </g>
      <!-- Ground / field -->
      <rect x="0" y="308" width="800" height="192" fill="url(#ground-g)"/>
      <!-- Sun reflection on ground -->
      <ellipse cx="400" cy="315" rx="160" ry="25" fill="rgba(255,180,50,0.18)" filter="url(#blur-g)"/>
      <!-- Tree silhouettes line -->
      <g fill="#180900">
        <rect x="30"  y="230" width="8"  height="90" rx="2"/>
        <ellipse cx="34"  cy="228" rx="22" ry="38"/>
        <rect x="80"  y="245" width="7"  height="75" rx="2"/>
        <ellipse cx="83"  cy="243" rx="18" ry="30"/>
        <rect x="130" y="220" width="9"  height="100" rx="2"/>
        <ellipse cx="134" cy="218" rx="28" ry="42"/>
        <rect x="640" y="235" width="8"  height="85" rx="2"/>
        <ellipse cx="644" cy="233" rx="22" ry="36"/>
        <rect x="690" y="228" width="9"  height="90" rx="2"/>
        <ellipse cx="694" cy="226" rx="26" ry="40"/>
        <rect x="745" y="242" width="7"  height="78" rx="2"/>
        <ellipse cx="748" cy="240" rx="20" ry="32"/>
      </g>
      <!-- Horizon dark land mass -->
      <path d="M0 308 Q100 295 200 302 Q300 295 400 300 Q500 295 600 303 Q700 297 800 308 L800 320 L0 320 Z" fill="#1a0800"/>
      <!-- Lens flare rays from sun -->
      <g stroke="rgba(255,220,100,0.08)" stroke-width="1" opacity="0.6">
        <line x1="400" y1="310" x2="0"   y2="0"/>
        <line x1="400" y1="310" x2="800" y2="0"/>
        <line x1="400" y1="310" x2="200" y2="0"/>
        <line x1="400" y1="310" x2="600" y2="0"/>
      </g>
    </svg>`,

    /* 5. OCEAN / SEASCAPE ─ cyan ocean with horizon haze */
    ocean: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-o" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#020d1a"/>
          <stop offset="50%" stop-color="#041830"/>
          <stop offset="100%" stop-color="#062245"/>
        </linearGradient>
        <linearGradient id="sea-o" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#062245"/>
          <stop offset="40%" stop-color="#040f22"/>
          <stop offset="100%" stop-color="#010610"/>
        </linearGradient>
        <radialGradient id="moon-o" cx="30%" cy="25%" r="8%">
          <stop offset="0%"  stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#c0e8ff"/>
        </radialGradient>
        <filter id="blur-o"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="blur-o2"><feGaussianBlur stdDeviation="2"/></filter>
        <filter id="glow-o"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <!-- Sky -->
      <rect width="800" height="500" fill="url(#sky-o)"/>
      <!-- Stars -->
      <g fill="white" opacity="0.8">
        <circle cx="50"  cy="30"  r="1"/><circle cx="140" cy="50"  r="0.8"/>
        <circle cx="220" cy="20"  r="1.2"/><circle cx="310" cy="45"  r="0.9"/>
        <circle cx="480" cy="15"  r="1"/><circle cx="560" cy="38"  r="0.8"/>
        <circle cx="660" cy="22"  r="1.1"/><circle cx="740" cy="50"  r="0.9"/>
        <circle cx="90"  cy="80"  r="0.7"/><circle cx="190" cy="90"  r="1"/>
        <circle cx="380" cy="70"  r="0.8"/><circle cx="500" cy="85"  r="0.9"/>
        <circle cx="620" cy="65"  r="1"/><circle cx="710" cy="88"  r="0.7"/>
        <circle cx="30"  cy="120" r="0.8"/><circle cx="160" cy="130" r="0.9"/>
        <circle cx="350" cy="110" r="1"/><circle cx="540" cy="125" r="0.7"/>
        <circle cx="720" cy="115" r="0.8"/>
      </g>
      <!-- Moon -->
      <circle cx="240" cy="95" r="22" fill="url(#moon-o)"/>
      <circle cx="244" cy="91" r="18" fill="#041830" opacity="0.1"/>
      <circle cx="240" cy="95" r="32" fill="rgba(180,220,255,0.05)"/>
      <!-- Moon path on water -->
      <ellipse cx="240" cy="270" rx="30" ry="100" fill="rgba(200,230,255,0.12)" filter="url(#blur-o)"/>
      <!-- Sea surface -->
      <rect x="0" y="250" width="800" height="250" fill="url(#sea-o)"/>
      <!-- Horizon glow / atmosphere -->
      <rect x="0" y="244" width="800" height="20" fill="rgba(0,80,160,0.2)" filter="url(#blur-o2)"/>
      <!-- Wave crests -->
      <g fill="none" stroke="rgba(0,180,255,0.15)" stroke-width="1.5">
        <path d="M0 270 Q50 262 100 270 Q150 278 200 270 Q250 262 300 270 Q350 278 400 270 Q450 262 500 270 Q550 278 600 270 Q650 262 700 270 Q750 278 800 270"/>
        <path d="M0 295 Q60 287 120 295 Q180 303 240 295 Q300 287 360 295 Q420 303 480 295 Q540 287 600 295 Q660 303 720 295 Q760 303 800 295" opacity="0.8"/>
        <path d="M0 320 Q70 312 140 320 Q210 328 280 320 Q350 312 420 320 Q490 328 560 320 Q630 312 700 320 Q750 328 800 320" opacity="0.6"/>
        <path d="M0 350 Q80 342 160 350 Q240 358 320 350 Q400 342 480 350 Q560 358 640 350 Q720 342 800 350" opacity="0.4"/>
        <path d="M0 385 Q100 377 200 385 Q300 393 400 385 Q500 377 600 385 Q700 393 800 385" opacity="0.25"/>
      </g>
      <!-- Lens flare from moon -->
      <g filter="url(#glow-o)">
        <circle cx="240" cy="95" r="4" fill="rgba(220,240,255,0.6)"/>
        <ellipse cx="340" cy="170" rx="3" ry="6" fill="rgba(0,180,255,0.3)" transform="rotate(-30 340 170)"/>
        <ellipse cx="420" cy="220" rx="2" ry="5" fill="rgba(180,220,255,0.2)"/>
      </g>
      <!-- Distant ship silhouette -->
      <g fill="#020d1a" opacity="0.9">
        <rect x="350" y="246" width="60" height="8" rx="1"/>
        <rect x="362" y="236" width="4"  height="12"/>
        <rect x="390" y="240" width="3"  height="8"/>
      </g>
    </svg>`,

    /* 6. NIGHT ARCHITECTURE ─ dark building with neon lights */
    architecture: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#050310"/>
          <stop offset="100%" stop-color="#0a0520"/>
        </linearGradient>
        <filter id="blur-a"><feGaussianBlur stdDeviation="3"/></filter>
        <filter id="blur-a2"><feGaussianBlur stdDeviation="8"/></filter>
        <filter id="glow-a"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="800" height="500" fill="url(#sky-a)"/>
      <!-- Stars -->
      <g fill="rgba(255,255,255,0.5)">
        <circle cx="30" cy="20" r="0.8"/><circle cx="100" cy="35" r="0.7"/><circle cx="200" cy="15" r="1"/>
        <circle cx="350" cy="25" r="0.8"/><circle cx="500" cy="18" r="0.9"/><circle cx="650" cy="30" r="0.7"/>
        <circle cx="750" cy="22" r="0.8"/><circle cx="150" cy="55" r="0.6"/><circle cx="420" cy="48" r="0.7"/>
        <circle cx="580" cy="52" r="0.8"/><circle cx="710" cy="45" r="0.6"/>
      </g>
      <!-- Main tower building -->
      <rect x="240" y="40"  width="320" height="460" fill="#07041a"/>
      <!-- Tower lit floors -->
      <g fill="#0d0830">
        <rect x="250" y="50"  width="300" height="8"/>
        <rect x="250" y="70"  width="300" height="8"/>
        <rect x="250" y="90"  width="300" height="8"/>
        <rect x="250" y="110" width="300" height="8"/>
        <rect x="250" y="130" width="300" height="8"/>
        <rect x="250" y="150" width="300" height="8"/>
        <rect x="250" y="170" width="300" height="8"/>
        <rect x="250" y="190" width="300" height="8"/>
        <rect x="250" y="210" width="300" height="8"/>
      </g>
      <!-- Vertical neon lines on tower -->
      <rect x="298" y="40" width="2" height="460" fill="rgba(0,212,255,0.5)" filter="url(#blur-a)"/>
      <rect x="399" y="40" width="2" height="460" fill="rgba(0,212,255,0.5)" filter="url(#blur-a)"/>
      <rect x="500" y="40" width="2" height="460" fill="rgba(0,212,255,0.5)" filter="url(#blur-a)"/>
      <!-- Horizontal accent lines -->
      <rect x="240" y="40"  width="320" height="2" fill="rgba(0,212,255,0.6)" filter="url(#blur-a)"/>
      <rect x="240" y="220" width="320" height="2" fill="rgba(0,212,255,0.4)" filter="url(#blur-a)"/>
      <rect x="240" y="400" width="320" height="2" fill="rgba(0,212,255,0.4)" filter="url(#blur-a)"/>
      <!-- Windows with warm light -->
      <g fill="rgba(255,220,140,0.7)">
        <rect x="262" y="56"  width="18" height="10"/><rect x="290" y="56"  width="18" height="10"/>
        <rect x="318" y="56"  width="18" height="10"/><rect x="346" y="56"  width="18" height="10"/>
        <rect x="374" y="56"  width="18" height="10"/><rect x="402" y="56"  width="18" height="10"/>
        <rect x="430" y="56"  width="18" height="10"/><rect x="458" y="56"  width="18" height="10"/>
        <rect x="486" y="56"  width="18" height="10"/>
        <rect x="262" y="76"  width="18" height="10"/><rect x="318" y="76"  width="18" height="10"/>
        <rect x="374" y="76"  width="18" height="10"/><rect x="430" y="76"  width="18" height="10"/>
        <rect x="486" y="76"  width="18" height="10"/>
        <rect x="290" y="96"  width="18" height="10"/><rect x="346" y="96"  width="18" height="10"/>
        <rect x="402" y="96"  width="18" height="10"/><rect x="458" y="96"  width="18" height="10"/>
        <rect x="262" y="116" width="18" height="10"/><rect x="318" y="116" width="18" height="10"/>
        <rect x="374" y="116" width="18" height="10"/><rect x="430" y="116" width="18" height="10"/>
        <rect x="486" y="116" width="18" height="10"/>
      </g>
      <!-- Windows with blue/cyan light (some floors) -->
      <g fill="rgba(0,200,255,0.6)">
        <rect x="262" y="136" width="18" height="10"/><rect x="290" y="136" width="18" height="10"/>
        <rect x="346" y="136" width="18" height="10"/><rect x="402" y="136" width="18" height="10"/>
        <rect x="458" y="136" width="18" height="10"/>
        <rect x="318" y="156" width="18" height="10"/><rect x="374" y="156" width="18" height="10"/>
        <rect x="430" y="156" width="18" height="10"/><rect x="486" y="156" width="18" height="10"/>
      </g>
      <!-- Side buildings -->
      <rect x="0"   y="120" width="240" height="380" fill="#060318"/>
      <rect x="560" y="100" width="240" height="400" fill="#060318"/>
      <!-- Side building windows -->
      <g fill="rgba(255,200,100,0.4)">
        <rect x="20"  y="135" width="12" height="8"/><rect x="42"  y="135" width="12" height="8"/>
        <rect x="64"  y="135" width="12" height="8"/><rect x="86"  y="135" width="12" height="8"/>
        <rect x="20"  y="155" width="12" height="8"/><rect x="64"  y="155" width="12" height="8"/>
        <rect x="108" y="135" width="12" height="8"/><rect x="130" y="155" width="12" height="8"/>
        <rect x="160" y="135" width="12" height="8"/><rect x="182" y="155" width="12" height="8"/>
        <rect x="200" y="135" width="12" height="8"/><rect x="215" y="165" width="12" height="8"/>
        <rect x="580" y="115" width="12" height="8"/><rect x="602" y="115" width="12" height="8"/>
        <rect x="624" y="115" width="12" height="8"/><rect x="646" y="115" width="12" height="8"/>
        <rect x="580" y="135" width="12" height="8"/><rect x="624" y="135" width="12" height="8"/>
        <rect x="668" y="115" width="12" height="8"/><rect x="690" y="135" width="12" height="8"/>
        <rect x="712" y="115" width="12" height="8"/><rect x="734" y="135" width="12" height="8"/>
        <rect x="756" y="115" width="12" height="8"/>
      </g>
      <!-- Ground reflection glow -->
      <ellipse cx="400" cy="500" rx="350" ry="50" fill="rgba(0,80,200,0.12)" filter="url(#blur-a2)"/>
      <!-- Crown light on tower top -->
      <ellipse cx="400" cy="42" rx="160" ry="15" fill="rgba(0,212,255,0.15)" filter="url(#blur-a)"/>
    </svg>`,

    /* 7. STUDIO PORTRAIT ─ dramatic studio lighting silhouette */
    portrait: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="key-p" cx="25%" cy="30%" r="45%">
          <stop offset="0%"  stop-color="rgba(255,240,220,0.35)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="fill-p" cx="75%" cy="50%" r="40%">
          <stop offset="0%"  stop-color="rgba(0,180,255,0.12)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="hair-p" cx="50%" cy="15%" r="30%">
          <stop offset="0%"  stop-color="rgba(255,200,120,0.2)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="blur-p"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur-p2"><feGaussianBlur stdDeviation="2"/></filter>
        <linearGradient id="bg-p" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#0f0808"/>
          <stop offset="100%" stop-color="#050404"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-p)"/>
      <!-- Key light -->
      <ellipse cx="200" cy="150" rx="280" ry="300" fill="url(#key-p)" filter="url(#blur-p)"/>
      <!-- Fill light -->
      <ellipse cx="600" cy="250" rx="240" ry="280" fill="url(#fill-p)" filter="url(#blur-p)"/>
      <!-- Hair / rim light -->
      <ellipse cx="400" cy="75"  rx="130" ry="100" fill="url(#hair-p)" filter="url(#blur-p)"/>
      <!-- Subject silhouette -->
      <!-- Head -->
      <ellipse cx="400" cy="145" rx="68" ry="80" fill="#1a0808"/>
      <!-- Neck -->
      <rect x="380" y="210" width="40" height="50" rx="8" fill="#1a0808"/>
      <!-- Shoulders / body -->
      <path d="M220 500 Q250 290 310 265 Q360 250 400 255 Q440 250 490 265 Q550 290 580 500 Z" fill="#0f0606"/>
      <!-- Hair highlight -->
      <ellipse cx="400" cy="100" rx="62" ry="30" fill="rgba(200,140,80,0.18)" filter="url(#blur-p2)"/>
      <!-- Eye glint (key light reflection) -->
      <ellipse cx="374" cy="148" rx="8"  ry="5"  fill="rgba(255,240,220,0.15)" filter="url(#blur-p2)"/>
      <ellipse cx="426" cy="148" rx="8"  ry="5"  fill="rgba(255,240,220,0.15)" filter="url(#blur-p2)"/>
      <!-- Cheekbone rim -->
      <path d="M340 160 Q335 175 340 195" stroke="rgba(255,200,120,0.12)" stroke-width="8" fill="none" filter="url(#blur-p2)"/>
      <!-- Background texture dots -->
      <g fill="rgba(255,255,255,0.015)">
        <circle cx="100" cy="100" r="40"/><circle cx="700" cy="150" r="50"/>
        <circle cx="150" cy="400" r="60"/><circle cx="680" cy="420" r="45"/>
      </g>
      <!-- Dust particles in light shaft -->
      <g fill="rgba(255,230,200,0.3)" filter="url(#blur-p2)">
        <circle cx="250" cy="180" r="1.5"/><circle cx="270" cy="220" r="1"/>
        <circle cx="230" cy="260" r="1.5"/><circle cx="290" cy="300" r="1"/>
        <circle cx="260" cy="340" r="1.2"/>
      </g>
    </svg>`,

    /* 8. LENS BOKEH ─ abstract circular light orbs */
    bokeh: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="b1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(0,212,255,0.5)"/><stop offset="60%" stop-color="rgba(0,212,255,0.1)"/><stop offset="100%" stop-color="rgba(0,212,255,0)"/></radialGradient>
        <radialGradient id="b2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(180,80,255,0.45)"/><stop offset="60%" stop-color="rgba(180,80,255,0.1)"/><stop offset="100%" stop-color="rgba(180,80,255,0)"/></radialGradient>
        <radialGradient id="b3" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,220,80,0.4)"/><stop offset="60%" stop-color="rgba(255,220,80,0.08)"/><stop offset="100%" stop-color="rgba(255,220,80,0)"/></radialGradient>
        <radialGradient id="b4" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(255,100,120,0.35)"/><stop offset="60%" stop-color="rgba(255,100,120,0.07)"/><stop offset="100%" stop-color="rgba(255,100,120,0)"/></radialGradient>
        <radialGradient id="b5" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(60,255,200,0.4)"/><stop offset="60%" stop-color="rgba(60,255,200,0.08)"/><stop offset="100%" stop-color="rgba(60,255,200,0)"/></radialGradient>
        <filter id="blur-b"><feGaussianBlur stdDeviation="4"/></filter>
      </defs>
      <rect width="800" height="500" fill="#030612"/>
      <!-- Large soft bokeh circles - back layer -->
      <circle cx="120"  cy="100"  r="90"  fill="url(#b2)" filter="url(#blur-b)"/>
      <circle cx="680"  cy="80"   r="80"  fill="url(#b1)" filter="url(#blur-b)"/>
      <circle cx="400"  cy="380"  r="110" fill="url(#b2)" filter="url(#blur-b)"/>
      <circle cx="80"   cy="380"  r="75"  fill="url(#b3)" filter="url(#blur-b)"/>
      <circle cx="720"  cy="400"  r="90"  fill="url(#b4)" filter="url(#blur-b)"/>
      <circle cx="300"  cy="60"   r="70"  fill="url(#b5)" filter="url(#blur-b)"/>
      <circle cx="550"  cy="200"  r="95"  fill="url(#b3)" filter="url(#blur-b)"/>
      <!-- Mid bokeh -->
      <circle cx="200"  cy="280"  r="55"  fill="url(#b1)"/>
      <circle cx="600"  cy="310"  r="65"  fill="url(#b2)"/>
      <circle cx="350"  cy="180"  r="50"  fill="url(#b4)"/>
      <circle cx="480"  cy="420"  r="60"  fill="url(#b5)"/>
      <circle cx="150"  cy="450"  r="45"  fill="url(#b3)"/>
      <circle cx="660"  cy="180"  r="50"  fill="url(#b1)"/>
      <!-- Small sharp bokeh -->
      <g>
        <circle cx="50"   cy="50"  r="20" fill="url(#b1)"/>
        <circle cx="250"  cy="430" r="18" fill="url(#b3)"/>
        <circle cx="750"  cy="280" r="22" fill="url(#b2)"/>
        <circle cx="450"  cy="80"  r="16" fill="url(#b4)"/>
        <circle cx="700"  cy="480" r="14" fill="url(#b5)"/>
      </g>
      <!-- Bokeh outlines (hexagonal aperture effect) -->
      <g fill="none" stroke-width="1.5" opacity="0.4">
        <circle cx="120"  cy="100"  r="82" stroke="rgba(180,80,255,0.5)"/>
        <circle cx="680"  cy="80"   r="72" stroke="rgba(0,212,255,0.5)"/>
        <circle cx="400"  cy="380"  r="102" stroke="rgba(180,80,255,0.4)"/>
        <circle cx="550"  cy="200"  r="88" stroke="rgba(255,220,80,0.4)"/>
      </g>
      <!-- Center focal point -->
      <circle cx="400" cy="250" r="6"  fill="rgba(255,255,255,0.9)"/>
      <circle cx="400" cy="250" r="12" fill="rgba(255,255,255,0.25)"/>
      <circle cx="400" cy="250" r="24" fill="rgba(255,255,255,0.06)"/>
    </svg>`,

    /* 9. MILKY WAY ─ night sky star field */
    milkyway: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="core-mw" cx="60%" cy="55%" r="35%">
          <stop offset="0%"  stop-color="rgba(255,240,200,0.6)"/>
          <stop offset="30%" stop-color="rgba(200,160,120,0.3)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="band-mw" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stop-color="rgba(120,100,180,0.2)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="blur-mw"><feGaussianBlur stdDeviation="5"/></filter>
        <filter id="blur-mw2"><feGaussianBlur stdDeviation="2"/></filter>
        <filter id="gstar-mw"><feGaussianBlur stdDeviation="1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="800" height="500" fill="#010208"/>
      <!-- Galaxy band -->
      <ellipse cx="480" cy="280" rx="380" ry="140" fill="url(#band-mw)" filter="url(#blur-mw)" transform="rotate(-25 480 280)"/>
      <ellipse cx="480" cy="275" rx="300" ry="90"  fill="rgba(100,80,150,0.15)" filter="url(#blur-mw)" transform="rotate(-25 480 275)"/>
      <!-- Core glow -->
      <ellipse cx="480" cy="280" rx="120" ry="60"  fill="url(#core-mw)" filter="url(#blur-mw)" transform="rotate(-25 480 280)"/>
      <!-- Star field - dense -->
      <g fill="white">
        <!-- Row 1 -->
        <circle cx="15"  cy="12" r="0.7" opacity="0.9"/><circle cx="42"  cy="28" r="1"   opacity="0.8"/>
        <circle cx="78"  cy="8"  r="0.8" opacity="0.7"/><circle cx="105" cy="35" r="0.6" opacity="0.9"/>
        <circle cx="145" cy="18" r="0.9" opacity="0.8"/><circle cx="180" cy="42" r="0.7" opacity="0.7"/>
        <circle cx="215" cy="10" r="1"   opacity="0.9"/><circle cx="258" cy="30" r="0.8" opacity="0.8"/>
        <circle cx="292" cy="15" r="0.6" opacity="0.7"/><circle cx="325" cy="45" r="0.9" opacity="0.9"/>
        <circle cx="368" cy="20" r="0.7" opacity="0.8"/><circle cx="400" cy="8"  r="1"   opacity="0.7"/>
        <circle cx="440" cy="38" r="0.8" opacity="0.9"/><circle cx="475" cy="22" r="0.6" opacity="0.8"/>
        <circle cx="510" cy="42" r="0.9" opacity="0.7"/><circle cx="545" cy="12" r="0.7" opacity="0.9"/>
        <circle cx="582" cy="32" r="1"   opacity="0.8"/><circle cx="618" cy="18" r="0.8" opacity="0.7"/>
        <circle cx="655" cy="40" r="0.6" opacity="0.9"/><circle cx="690" cy="10" r="0.9" opacity="0.8"/>
        <circle cx="728" cy="28" r="0.7" opacity="0.7"/><circle cx="762" cy="45" r="1"   opacity="0.9"/>
        <circle cx="788" cy="20" r="0.8" opacity="0.8"/>
        <!-- Row 2 -->
        <circle cx="28"  cy="70" r="0.9" opacity="0.8"/><circle cx="62"  cy="85" r="0.7" opacity="0.7"/>
        <circle cx="98"  cy="65" r="1"   opacity="0.9"/><circle cx="132" cy="90" r="0.8" opacity="0.8"/>
        <circle cx="168" cy="72" r="0.6" opacity="0.7"/><circle cx="202" cy="55" r="0.9" opacity="0.9"/>
        <circle cx="238" cy="88" r="0.7" opacity="0.8"/><circle cx="272" cy="68" r="1"   opacity="0.7"/>
        <circle cx="308" cy="82" r="0.8" opacity="0.9"/><circle cx="344" cy="60" r="0.6" opacity="0.8"/>
        <circle cx="378" cy="92" r="0.9" opacity="0.7"/><circle cx="414" cy="75" r="0.7" opacity="0.9"/>
        <circle cx="448" cy="58" r="1"   opacity="0.8"/><circle cx="485" cy="88" r="0.8" opacity="0.7"/>
        <circle cx="520" cy="70" r="0.6" opacity="0.9"/><circle cx="556" cy="55" r="0.9" opacity="0.8"/>
        <circle cx="592" cy="84" r="0.7" opacity="0.7"/><circle cx="628" cy="65" r="1"   opacity="0.9"/>
        <circle cx="662" cy="90" r="0.8" opacity="0.8"/><circle cx="698" cy="72" r="0.6" opacity="0.7"/>
        <circle cx="735" cy="58" r="0.9" opacity="0.9"/><circle cx="772" cy="85" r="0.7" opacity="0.8"/>
        <!-- Row 3 -->
        <circle cx="10"  cy="130" r="0.8" opacity="0.7"/><circle cx="48"  cy="148" r="1"   opacity="0.9"/>
        <circle cx="85"  cy="118" r="0.7" opacity="0.8"/><circle cx="120" cy="145" r="0.9" opacity="0.7"/>
        <circle cx="158" cy="128" r="0.6" opacity="0.9"/><circle cx="195" cy="112" r="0.8" opacity="0.8"/>
        <circle cx="232" cy="150" r="0.7" opacity="0.7"/><circle cx="268" cy="130" r="1"   opacity="0.9"/>
        <circle cx="305" cy="115" r="0.9" opacity="0.8"/><circle cx="342" cy="148" r="0.7" opacity="0.7"/>
        <circle cx="380" cy="122" r="0.8" opacity="0.9"/><circle cx="418" cy="138" r="0.6" opacity="0.8"/>
        <circle cx="455" cy="118" r="0.9" opacity="0.7"/><circle cx="492" cy="145" r="0.7" opacity="0.9"/>
        <circle cx="530" cy="128" r="1"   opacity="0.8"/><circle cx="568" cy="112" r="0.8" opacity="0.7"/>
        <circle cx="605" cy="142" r="0.6" opacity="0.9"/><circle cx="642" cy="125" r="0.9" opacity="0.8"/>
        <circle cx="678" cy="148" r="0.7" opacity="0.7"/><circle cx="715" cy="118" r="0.8" opacity="0.9"/>
        <circle cx="752" cy="138" r="1"   opacity="0.8"/><circle cx="785" cy="122" r="0.7" opacity="0.7"/>
        <!-- Additional stars in galaxy band area -->
        <circle cx="350" cy="220" r="1.1" opacity="0.95"/><circle cx="420" cy="240" r="1.2" opacity="0.9"/>
        <circle cx="490" cy="260" r="1"   opacity="0.85"/><circle cx="560" cy="280" r="1.1" opacity="0.9"/>
        <circle cx="300" cy="250" r="0.9" opacity="0.8"/><circle cx="380" cy="290" r="1.2" opacity="0.95"/>
        <circle cx="460" cy="310" r="1"   opacity="0.85"/><circle cx="530" cy="240" r="0.9" opacity="0.8"/>
        <circle cx="610" cy="260" r="1.1" opacity="0.9"/>
      </g>
      <!-- Bright stars with glow -->
      <g filter="url(#gstar-mw)">
        <circle cx="150" cy="180" r="3"   fill="white" opacity="0.95"/>
        <circle cx="600" cy="120" r="2.5" fill="#fff8e0" opacity="0.9"/>
        <circle cx="350" cy="320" r="3.5" fill="white" opacity="0.95"/>
        <circle cx="700" cy="350" r="2.8" fill="#e8f0ff" opacity="0.9"/>
        <circle cx="50"  cy="300" r="2"   fill="white" opacity="0.85"/>
      </g>
      <!-- Ground / horizon silhouette -->
      <path d="M0 440 Q100 420 200 435 Q300 425 400 432 Q500 420 600 430 Q700 422 800 440 L800 500 L0 500 Z" fill="#010108"/>
      <!-- Grass/tree suggestion at horizon -->
      <path d="M0 440 Q50 430 80 438 Q90 428 100 436 Q115 424 125 433 Q140 422 155 432 Q170 428 180 436" stroke="#020310" stroke-width="8" fill="none"/>
    </svg>`,

    /* 10. ARCTIC REFLECTION ─ icy blue landscape with mirror water */
    arctic: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-ar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#020c1a"/>
          <stop offset="40%" stop-color="#041530"/>
          <stop offset="70%" stop-color="#062050"/>
          <stop offset="100%" stop-color="#083070"/>
        </linearGradient>
        <linearGradient id="water-ar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#083070"/>
          <stop offset="100%" stop-color="#020c1a"/>
        </linearGradient>
        <radialGradient id="aurora1" cx="40%" cy="30%" r="60%">
          <stop offset="0%"  stop-color="rgba(0,255,160,0.2)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="aurora2" cx="65%" cy="20%" r="50%">
          <stop offset="0%"  stop-color="rgba(100,0,255,0.15)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="blur-ar"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur-ar2"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <rect width="800" height="500" fill="url(#sky-ar)"/>
      <!-- Aurora borealis -->
      <ellipse cx="320" cy="120" rx="380" ry="120" fill="url(#aurora1)" filter="url(#blur-ar)"/>
      <ellipse cx="520" cy="80"  rx="300" ry="100" fill="url(#aurora2)" filter="url(#blur-ar)"/>
      <!-- Aurora curtain streaks -->
      <g stroke="rgba(0,255,160,0.12)" stroke-width="3" fill="none" filter="url(#blur-ar2)">
        <path d="M150 200 Q160 130 170 60"/><path d="M200 210 Q215 140 225 65"/>
        <path d="M260 205 Q270 135 278 62"/><path d="M320 215 Q330 145 338 68"/>
        <path d="M380 208 Q388 138 395 64"/><path d="M440 212 Q450 142 458 66"/>
        <path d="M500 205 Q510 135 518 60"/>
      </g>
      <g stroke="rgba(100,0,255,0.1)" stroke-width="2" fill="none" filter="url(#blur-ar2)">
        <path d="M520 200 Q530 130 538 55"/><path d="M580 210 Q590 138 600 62"/>
        <path d="M640 205 Q648 132 655 58"/>
      </g>
      <!-- Stars -->
      <g fill="white" opacity="0.7">
        <circle cx="30"  cy="20"  r="0.9"/><circle cx="90"  cy="35"  r="0.7"/>
        <circle cx="180" cy="15"  r="1"/><circle cx="280" cy="30"  r="0.8"/>
        <circle cx="370" cy="10"  r="0.9"/><circle cx="490" cy="25"  r="0.7"/>
        <circle cx="600" cy="18"  r="1"/><circle cx="700" cy="40"  r="0.8"/>
        <circle cx="770" cy="15"  r="0.9"/>
      </g>
      <!-- Ice shelf / mountain silhouette -->
      <path d="M0 260 Q80 220 150 245 Q200 225 240 248 Q280 215 330 242 Q370 218 420 244 Q460 222 510 248 Q560 220 620 245 Q670 225 720 248 Q760 230 800 252 L800 280 L0 280 Z" fill="#061828"/>
      <!-- Snow highlights on mountains -->
      <path d="M200 225 Q215 215 230 225" stroke="rgba(180,220,255,0.4)" stroke-width="2" fill="none"/>
      <path d="M330 242 Q345 228 355 240" stroke="rgba(180,220,255,0.4)" stroke-width="2" fill="none"/>
      <path d="M510 248 Q525 233 540 246" stroke="rgba(180,220,255,0.4)" stroke-width="2" fill="none"/>
      <!-- Water surface -->
      <rect x="0" y="275" width="800" height="225" fill="url(#water-ar)"/>
      <!-- Horizon atmosphere -->
      <rect x="0" y="268" width="800" height="18" fill="rgba(0,60,120,0.4)" filter="url(#blur-ar2)"/>
      <!-- Ice reflection in water -->
      <path d="M0 280 Q80 300 150 285 Q200 295 240 283 Q280 298 330 285 Q370 296 420 284 Q460 295 510 283 Q560 294 620 284 Q670 292 720 283 Q760 290 800 280 L800 310 Q760 302 720 312 Q670 302 620 312 Q560 302 510 312 Q460 302 420 312 Q370 302 330 312 Q280 302 240 312 Q200 302 150 312 Q80 302 0 310 Z" fill="rgba(6,24,40,0.8)"/>
      <!-- Aurora reflection in water -->
      <ellipse cx="320" cy="380" rx="300" ry="60" fill="rgba(0,200,120,0.06)" filter="url(#blur-ar)"/>
      <!-- Ice chunks -->
      <g fill="#0a2040" stroke="rgba(180,220,255,0.2)" stroke-width="0.5">
        <path d="M80 278 L120 268 L160 276 L140 282 Z"/>
        <path d="M350 274 L400 264 L440 272 L420 280 Z"/>
        <path d="M600 276 L650 266 L690 274 L668 282 Z"/>
      </g>
    </svg>`,

    /* 11. CINEMATIC PORTRAIT 2 ─ blue-violet tone */
    portrait2: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="key-p2" cx="20%" cy="25%" r="50%">
          <stop offset="0%"  stop-color="rgba(0,180,255,0.3)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <radialGradient id="rim-p2" cx="85%" cy="35%" r="40%">
          <stop offset="0%"  stop-color="rgba(120,60,255,0.25)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
        <filter id="blur-p2a"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur-p2b"><feGaussianBlur stdDeviation="2"/></filter>
        <linearGradient id="bg-p2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stop-color="#04060f"/>
          <stop offset="100%" stop-color="#080414"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg-p2)"/>
      <!-- Colour washes -->
      <ellipse cx="160" cy="125" rx="320" ry="280" fill="url(#key-p2)" filter="url(#blur-p2a)"/>
      <ellipse cx="680" cy="175" rx="280" ry="240" fill="url(#rim-p2)"  filter="url(#blur-p2a)"/>
      <!-- Subject silhouette -->
      <!-- Head -->
      <ellipse cx="400" cy="145" rx="65" ry="78" fill="#0a0814"/>
      <!-- Neck -->
      <rect x="382" y="208" width="36" height="52" rx="8" fill="#0a0814"/>
      <!-- Body -->
      <path d="M210 500 Q245 285 308 262 Q358 248 400 253 Q442 248 492 262 Q555 285 590 500 Z" fill="#060510"/>
      <!-- Rim light on edge of face -->
      <path d="M458 110 Q475 140 472 180 Q470 200 460 215" stroke="rgba(120,60,255,0.4)" stroke-width="6" fill="none" filter="url(#blur-p2b)"/>
      <!-- Key side subtle glow -->
      <path d="M342 110 Q328 140 330 180 Q332 200 340 215" stroke="rgba(0,180,255,0.25)" stroke-width="5" fill="none" filter="url(#blur-p2b)"/>
      <!-- Eye reflections -->
      <ellipse cx="374" cy="148" rx="7" ry="4.5" fill="rgba(0,180,255,0.2)" filter="url(#blur-p2b)"/>
      <ellipse cx="426" cy="148" rx="7" ry="4.5" fill="rgba(0,180,255,0.2)" filter="url(#blur-p2b)"/>
      <!-- Shoulders highlight edge -->
      <path d="M250 280 Q300 260 340 268" stroke="rgba(0,180,255,0.12)" stroke-width="4" fill="none" filter="url(#blur-p2b)"/>
      <path d="M460 268 Q500 260 550 280" stroke="rgba(120,60,255,0.15)" stroke-width="4" fill="none" filter="url(#blur-p2b)"/>
      <!-- Background noise texture suggestion -->
      <rect width="800" height="500" fill="url(#bg-p2)" opacity="0.2"/>
    </svg>`,

    /* 12. DIFFRACTION ─ abstract light refraction through glass */
    diffraction: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <filter id="blur-d"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="blur-d2"><feGaussianBlur stdDeviation="1.5"/></filter>
        <linearGradient id="spec1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stop-color="rgba(255,0,100,0.8)"/>
          <stop offset="20%"  stop-color="rgba(255,120,0,0.7)"/>
          <stop offset="40%"  stop-color="rgba(255,255,0,0.6)"/>
          <stop offset="60%"  stop-color="rgba(0,255,100,0.6)"/>
          <stop offset="80%"  stop-color="rgba(0,120,255,0.7)"/>
          <stop offset="100%" stop-color="rgba(180,0,255,0.8)"/>
        </linearGradient>
        <linearGradient id="spec2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stop-color="rgba(0,212,255,0.6)"/>
          <stop offset="50%"  stop-color="rgba(180,80,255,0.5)"/>
          <stop offset="100%" stop-color="rgba(255,80,160,0.6)"/>
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="#030408"/>
      <!-- Primary spectral streak -->
      <rect x="0" y="230" width="800" height="18" fill="url(#spec1)" opacity="0.8" filter="url(#blur-d2)"/>
      <rect x="0" y="235" width="800" height="8"  fill="url(#spec1)" opacity="0.9"/>
      <!-- Secondary streaks (parallel) -->
      <rect x="0" y="198" width="800" height="10" fill="url(#spec1)" opacity="0.3" filter="url(#blur-d2)"/>
      <rect x="0" y="270" width="800" height="10" fill="url(#spec1)" opacity="0.3" filter="url(#blur-d2)"/>
      <rect x="0" y="165" width="800" height="6"  fill="url(#spec1)" opacity="0.15" filter="url(#blur-d)"/>
      <rect x="0" y="305" width="800" height="6"  fill="url(#spec1)" opacity="0.15" filter="url(#blur-d)"/>
      <!-- Diagonal cross-streak -->
      <line x1="0" y1="500" x2="800" y2="0" stroke="url(#spec2)" stroke-width="6" opacity="0.4" filter="url(#blur-d2)"/>
      <line x1="0" y1="400" x2="800" y2="100" stroke="url(#spec2)" stroke-width="3" opacity="0.2" filter="url(#blur-d2)"/>
      <!-- Lens flare ghosts -->
      <circle cx="160" cy="240" r="30" fill="rgba(0,180,255,0.15)" filter="url(#blur-d)"/>
      <circle cx="260" cy="238" r="20" fill="rgba(255,100,0,0.12)" filter="url(#blur-d)"/>
      <circle cx="400" cy="239" r="50" fill="rgba(255,255,255,0.06)" filter="url(#blur-d)"/>
      <circle cx="540" cy="238" r="22" fill="rgba(180,0,255,0.12)" filter="url(#blur-d)"/>
      <circle cx="640" cy="239" r="28" fill="rgba(0,255,120,0.1)"  filter="url(#blur-d)"/>
      <!-- Source light point -->
      <circle cx="400" cy="239" r="5" fill="rgba(255,255,255,0.95)"/>
      <circle cx="400" cy="239" r="15" fill="rgba(255,255,255,0.3)" filter="url(#blur-d2)"/>
      <!-- Prism glass edge suggestion -->
      <line x1="400" y1="0" x2="400" y2="500" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <!-- Chromatic aberration halos -->
      <circle cx="400" cy="239" r="80"  fill="none" stroke="rgba(255,0,100,0.06)"  stroke-width="2"/>
      <circle cx="400" cy="239" r="100" fill="none" stroke="rgba(0,200,255,0.06)"  stroke-width="2"/>
      <circle cx="400" cy="239" r="120" fill="none" stroke="rgba(180,0,255,0.05)"  stroke-width="2"/>
    </svg>`,

    /* 13. RAIN REFLECTIONS ─ wet street at night */
    rain: () => `
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
      <defs>
        <linearGradient id="sky-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#040408"/>
          <stop offset="100%" stop-color="#08081a"/>
        </linearGradient>
        <linearGradient id="street-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stop-color="#060614"/>
          <stop offset="100%" stop-color="#020208"/>
        </linearGradient>
        <filter id="blur-r"><feGaussianBlur stdDeviation="4"/></filter>
        <filter id="blur-r2"><feGaussianBlur stdDeviation="1.5"/></filter>
      </defs>
      <rect width="800" height="500" fill="url(#sky-r)"/>
      <!-- Buildings silhouette -->
      <g fill="#030310">
        <rect x="0"   y="80"  width="120" height="280"/>
        <rect x="10"  y="50"  width="30"  height="35"/>
        <rect x="115" y="110" width="90"  height="250"/>
        <rect x="130" y="90"  width="20"  height="22"/>
        <rect x="200" y="70"  width="110" height="290"/>
        <rect x="220" y="45"  width="15"  height="28"/>
        <rect x="305" y="95"  width="85"  height="265"/>
        <rect x="385" y="85"  width="100" height="275"/>
        <rect x="400" y="60"  width="18"  height="28"/>
        <rect x="480" y="105" width="75"  height="255"/>
        <rect x="550" y="80"  width="95"  height="280"/>
        <rect x="560" y="55"  width="20"  height="28"/>
        <rect x="640" y="90"  width="80"  height="270"/>
        <rect x="715" y="75"  width="85"  height="285"/>
        <rect x="725" y="50"  width="18"  height="28"/>
      </g>
      <!-- Building windows (lit) -->
      <g fill="rgba(255,200,100,0.5)">
        <rect x="15"  y="90"  width="10" height="7"/><rect x="35"  y="90"  width="10" height="7"/>
        <rect x="55"  y="90"  width="10" height="7"/><rect x="75"  y="90"  width="10" height="7"/>
        <rect x="15"  y="108" width="10" height="7"/><rect x="55"  y="108" width="10" height="7"/>
        <rect x="95"  y="90"  width="10" height="7"/>
        <rect x="122" y="120" width="10" height="7"/><rect x="142" y="120" width="10" height="7"/>
        <rect x="162" y="120" width="10" height="7"/><rect x="182" y="120" width="10" height="7"/>
        <rect x="122" y="138" width="10" height="7"/><rect x="162" y="138" width="10" height="7"/>
        <rect x="205" y="80"  width="10" height="7"/><rect x="225" y="80"  width="10" height="7"/>
        <rect x="245" y="80"  width="10" height="7"/><rect x="265" y="80"  width="10" height="7"/>
        <rect x="285" y="80"  width="10" height="7"/>
        <rect x="310" y="105" width="10" height="7"/><rect x="330" y="105" width="10" height="7"/>
        <rect x="350" y="105" width="10" height="7"/>
        <rect x="390" y="95"  width="10" height="7"/><rect x="410" y="95"  width="10" height="7"/>
        <rect x="430" y="95"  width="10" height="7"/><rect x="450" y="95"  width="10" height="7"/>
        <rect x="390" y="113" width="10" height="7"/><rect x="430" y="113" width="10" height="7"/>
        <rect x="486" y="115" width="10" height="7"/><rect x="506" y="115" width="10" height="7"/>
        <rect x="526" y="115" width="10" height="7"/>
        <rect x="556" y="90"  width="10" height="7"/><rect x="576" y="90"  width="10" height="7"/>
        <rect x="596" y="90"  width="10" height="7"/><rect x="616" y="90"  width="10" height="7"/>
        <rect x="646" y="100" width="10" height="7"/><rect x="666" y="100" width="10" height="7"/>
        <rect x="686" y="100" width="10" height="7"/>
        <rect x="720" y="85"  width="10" height="7"/><rect x="740" y="85"  width="10" height="7"/>
        <rect x="760" y="85"  width="10" height="7"/><rect x="780" y="85"  width="10" height="7"/>
        <rect x="720" y="103" width="10" height="7"/><rect x="760" y="103" width="10" height="7"/>
      </g>
      <!-- Cyan/blue window lights -->
      <g fill="rgba(0,180,255,0.45)">
        <rect x="75"  y="108" width="10" height="7"/><rect x="185" y="108" width="10" height="7"/>
        <rect x="310" y="123" width="10" height="7"/><rect x="370" y="105" width="10" height="7"/>
        <rect x="470" y="95"  width="10" height="7"/><rect x="545" y="115" width="10" height="7"/>
        <rect x="636" y="118" width="10" height="7"/><rect x="706" y="100" width="10" height="7"/>
        <rect x="780" y="103" width="10" height="7"/>
      </g>
      <!-- Street -->
      <rect x="0" y="360" width="800" height="140" fill="url(#street-r)"/>
      <!-- Horizon ground glow -->
      <rect x="0" y="355" width="800" height="20" fill="rgba(20,20,60,0.6)" filter="url(#blur-r2)"/>
      <!-- Rain streaks -->
      <g stroke="rgba(180,200,255,0.12)" stroke-width="0.8">
        <line x1="40"  y1="0" x2="28"  y2="360"/><line x1="110" y1="0" x2="98"  y2="360"/>
        <line x1="185" y1="0" x2="173" y2="360"/><line x1="260" y1="0" x2="248" y2="360"/>
        <line x1="335" y1="0" x2="323" y2="360"/><line x1="410" y1="0" x2="398" y2="360"/>
        <line x1="485" y1="0" x2="473" y2="360"/><line x1="560" y1="0" x2="548" y2="360"/>
        <line x1="635" y1="0" x2="623" y2="360"/><line x1="710" y1="0" x2="698" y2="360"/>
        <line x1="785" y1="0" x2="773" y2="360"/>
        <line x1="75"  y1="0" x2="63"  y2="360"/><line x1="150" y1="0" x2="138" y2="360"/>
        <line x1="225" y1="0" x2="213" y2="360"/><line x1="300" y1="0" x2="288" y2="360"/>
        <line x1="375" y1="0" x2="363" y2="360"/><line x1="450" y1="0" x2="438" y2="360"/>
        <line x1="525" y1="0" x2="513" y2="360"/><line x1="600" y1="0" x2="588" y2="360"/>
        <line x1="675" y1="0" x2="663" y2="360"/><line x1="750" y1="0" x2="738" y2="360"/>
      </g>
      <!-- Street light reflections on wet road -->
      <g filter="url(#blur-r)">
        <ellipse cx="160" cy="400" rx="12" ry="50" fill="rgba(255,200,100,0.2)"/>
        <ellipse cx="400" cy="410" rx="8"  ry="40" fill="rgba(255,200,100,0.15)"/>
        <ellipse cx="600" cy="405" rx="10" ry="45" fill="rgba(255,200,100,0.18)"/>
        <ellipse cx="100" cy="420" rx="6"  ry="30" fill="rgba(0,150,255,0.2)"/>
        <ellipse cx="700" cy="415" rx="7"  ry="35" fill="rgba(0,150,255,0.18)"/>
        <ellipse cx="320" cy="430" rx="5"  ry="25" fill="rgba(255,100,100,0.12)"/>
        <ellipse cx="500" cy="425" rx="6"  ry="28" fill="rgba(100,100,255,0.15)"/>
      </g>
      <!-- Street lane lines -->
      <g stroke="rgba(255,255,255,0.06)" stroke-width="1.5" stroke-dasharray="30 20">
        <line x1="400" y1="365" x2="400" y2="500"/>
      </g>
    </svg>`,
  };

  /* ── Scene assignment map ───────────────────────────────────
     Maps data-scene value → scene function.
     Falls back to sequential order if no attribute found.
  ──────────────────────────────────────────────────────────── */
  const SCENE_KEYS = [
    'cityscape','nebula','forest','golden','ocean',
    'architecture','portrait','bokeh','milkyway',
    'arctic','portrait2','diffraction','rain'
  ];

  /* ── Inject SVG into a placeholder ─────────────────────────
     The placeholder can be:
       • .gallery-img-placeholder  (grid items)
       • a direct container with data-scene
       • .gallery-strip-item       (thumbnails)
       • .gallery-featured > div   (featured item)
  ──────────────────────────────────────────────────────────── */
  function injectScene(el, sceneKey) {
    const fn = SCENES[sceneKey];
    if (!fn) return;
    el.innerHTML = fn();
    el.style.overflow = 'hidden';
    el.style.display  = 'block';
    // remove old inline background so SVG shows
    el.style.background = 'none';
  }

  /* ── Assign scenes to all gallery items on the page ─────── */
  function init() {

    /* 1. .gallery-img-placeholder inside .gallery-item ──── */
    const placeholders = document.querySelectorAll('.gallery-item .gallery-img-placeholder, .gallery-item > div:first-child:not(.gallery-overlay):not(.gallery-light-reflect):not(.gallery-badge)');

    placeholders.forEach((el, idx) => {
      const item = el.closest('[data-scene]') || el.parentElement;
      const sceneAttr = item ? item.dataset.scene : null;
      const key = sceneAttr || SCENE_KEYS[idx % SCENE_KEYS.length];
      injectScene(el, key);
    });

    /* 2. .gallery-featured direct child div ────────────── */
    document.querySelectorAll('.gallery-featured').forEach((feat, idx) => {
      const firstDiv = feat.querySelector('div:not(.gallery-overlay):not(.gallery-light-reflect):not(.gallery-badge)');
      if (firstDiv && !firstDiv.querySelector('svg')) {
        const key = feat.dataset.scene || SCENE_KEYS[idx % SCENE_KEYS.length];
        injectScene(firstDiv, key);
      }
    });

    /* 3. .gallery-strip-item ───────────────────────────── */
    const STRIP_KEYS = ['cityscape','nebula','forest','golden','ocean','architecture','portrait','bokeh'];
    document.querySelectorAll('.gallery-strip-item').forEach((el, idx) => {
      if (!el.querySelector('svg')) {
        injectScene(el, STRIP_KEYS[idx % STRIP_KEYS.length]);
      }
    });

    /* 4. Page-hero floating frames with data-scene attr ── */
    document.querySelectorAll('[data-scene]').forEach(el => {
      // Skip gallery-item / gallery-featured (handled above)
      if (el.classList.contains('gallery-item') || el.classList.contains('gallery-featured')) return;
      // This element itself carries data-scene and has no SVG yet
      if (!el.querySelector('svg')) {
        injectScene(el, el.dataset.scene);
      }
    });

    /* 5. Fallback: any remaining .gallery-img-placeholder without SVG */
    document.querySelectorAll('.gallery-img-placeholder').forEach((el, idx) => {
      if (!el.querySelector('svg')) {
        injectScene(el, SCENE_KEYS[idx % SCENE_KEYS.length]);
      }
    });
  }

  return { init, SCENES, injectScene };
})();
