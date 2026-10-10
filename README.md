# LENSCRAFT — Camera Zoom Experience

A premium futuristic cinematic camera zoom transitions website built with pure **HTML5, CSS3 and vanilla JavaScript**.

---

## Overview

LENSCRAFT is an immersive web experience centred around the concept of **CAMERA ZOOM · LENS · FOCUS · DEPTH · 3D · MOTION · CINEMATIC TRANSITIONS**. Every section progresses like entering a camera lens — from the floating 3D hero camera through zoom, focus, aperture and finally into the photography gallery.

---

## File Structure

```
camera-experience/
│
├── index.html          ← Main cinematic camera experience
├── camera.html         ← Camera specifications & technology
├── lens.html           ← Lens system, lineup & aperture
├── technology.html     ← Sensor, IBIS & AI engine
├── gallery.html        ← Interactive 3D photography gallery
├── experience.html     ← 7-chapter scroll cinematic storytelling
├── about.html          ← Philosophy, values & story timeline
├── contact.html        ← Contact form, info & FAQ
│
├── css/
│   ├── style.css       ← Design tokens, all component styles
│   ├── animations.css  ← All keyframes, loading, transitions
│   └── responsive.css  ← Breakpoints: 1440/1200/992/768/576/375px
│
├── js/
│   ├── main.js         ← Bootstrap, header, mobile menu, SVG builders
│   ├── cursor.js       ← Custom futuristic cursor + magnetic buttons
│   ├── particles.js    ← Canvas particle system with depth layers
│   ├── camera-3d.js    ← Cursor-based 3D camera tilt + parallax
│   ├── scroll.js       ← Scroll progress, zoom transitions, reveals
│   └── gallery.js      ← 3D gallery tilt + fullscreen viewer
│
├── images/
│   ├── camera/         ← Camera body images (optional)
│   ├── lenses/         ← Lens images (optional)
│   ├── gallery/        ← Gallery photos (optional)
│   └── backgrounds/    ← Background images (optional)
│
└── README.md
```

---

## How to Run

1. Open the folder `camera-experience/` in any static file server, **or**
2. Simply open `index.html` directly in a modern browser.

> **Note:** Particle canvas, cursor, and some dynamic features work best when served from localhost rather than opened as a `file://` URL, due to browser security policies. Use VS Code Live Server, Python's `http.server`, or any local server.

```bash
# Python quick server (from the camera-experience/ directory)
python -m http.server 8080

# Then visit: http://localhost:8080
```

---

## Key Features

### Visual Design
- Dark futuristic base (`#050810`) with electric blue, cyan and violet accents
- Glassmorphism panels with `backdrop-filter: blur()`
- Soft neon glow effects (`box-shadow` + SVG filters)
- Volumetric lighting and depth-of-field feeling
- Camera lens HUD circles and aperture elements
- Subtle grain/noise texture overlay
- CSS grid perspective depth layers

### Interactions
- **Custom cursor** — glowing dot + trailing ring, changes per hover state (Explore / View / Link)
- **Magnetic buttons** — buttons physically follow the cursor on hover
- **3D camera tilt** — hero camera responds to cursor with `rotateX/Y`, parallax layers move at different depths
- **Card tilt** — all `.tech-card` and `.gallery-item` tilt toward the cursor on hover
- **Lens reflection** — reflection gradient follows cursor position on the lens visual

### Scroll Animations
- **Hero zoom** — camera scales up and approaches viewer as you scroll
- **Sticky zoom showcase** — 4×height sticky section zooms camera from 0.6× to 3.5× scale
- **Aperture animation** — SVG aperture blades open as section scrolls into view
- **Parallax story** — multiple layers move at different speeds
- **Scroll reveal** — fade, slide-left, slide-right, scale-in with stagger delays
- **Text split** — character-by-character reveal for headings with `data-split`

### Animated Elements
- **Particle system** — 90 particles across 3 depth layers, mouse-reactive
- **HUD rings** — CSS-animated rotating rings (clockwise and counter-clockwise)
- **Orbit particles** — three dots orbiting the hero camera
- **Aperture blades** — 8-blade SVG aperture built and animated by JS
- **Camera SVG** — full DSLR/mirrorless camera drawn inline with SVG
- **Lens SVG** — multi-layer animated lens with glass reflection
- **Loading screen** — 3-ring animated lens with progress bar

### Gallery
- 12+ gallery items with category filtering (All / Urban / Nature / Astro / Portrait / Abstract)
- Fullscreen viewer with smooth zoom-in, navigation arrows, keyboard arrows, ESC, and touch swipe
- Live item counter

### Pages
| Page | Hero Visual | Special Feature |
|------|------------|-----------------|
| `index.html` | Floating 3D camera | Sticky zoom showcase |
| `camera.html` | 3D camera (right-aligned) | Full spec tables |
| `lens.html` | Rotating lens | SVG optical formula cross-section |
| `technology.html` | Circuit/sensor board SVG | Sensor layer stack diagram |
| `gallery.html` | Floating photo frames | Filter bar + fullscreen viewer |
| `experience.html` | 3D camera | 7-chapter scroll + timeline nav |
| `about.html` | Camera silhouette | Story timeline |
| `contact.html` | Glowing lens | Full form with validation + FAQ |

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 100+ | ✅ Full |
| Firefox 100+ | ✅ Full |
| Safari 15.4+ | ✅ Full |
| Edge 100+ | ✅ Full |
| Mobile Safari | ✅ (cursor disabled, reduced 3D) |
| Mobile Chrome | ✅ (cursor disabled, reduced 3D) |

---

## Accessibility

- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- ARIA labels on interactive elements, dialogs, and live regions
- `aria-hidden="true"` on all decorative SVG and visual elements
- Keyboard navigation: Tab, Enter, Space, Arrow keys, Escape
- Focus-visible outlines for keyboard users
- `prefers-reduced-motion` media query disables all complex animations
- `hover: none` media query disables custom cursor and 3D transforms on touch devices
- Alt text on all meaningful images
- Proper heading hierarchy per page

---

## Performance Notes

- All animations use `transform` and `opacity` (GPU composited — no layout thrashing)
- `requestAnimationFrame` for cursor and 3D tilt loops
- `IntersectionObserver` for scroll reveals (no scroll event overhead)
- Particle canvas paused on `document.hidden`
- Reduced particle count on `prefers-reduced-motion`
- No external JavaScript libraries — pure vanilla JS
- Google Fonts loaded via `@import` (can be self-hosted for offline use)
- Images use `loading="lazy"` where applicable

---

## Customisation

### Changing Colours
Edit the CSS variables in `css/style.css` `:root` block:
```css
:root {
  --clr-blue:   #00d4ff;   /* primary accent */
  --clr-cyan:   #00ffff;   /* secondary accent */
  --clr-violet: #7c3aed;   /* tertiary accent */
}
```

### Adding Real Images
Replace the gradient `<div class="gallery-img-placeholder">` elements in `gallery.html` and the index gallery section with:
```html
<img class="gallery-img" src="images/gallery/your-photo.jpg" alt="Description" loading="lazy"/>
```

### Adding Camera Images
Replace the SVG camera in the hero by providing a real PNG/WebP image instead of the SVG wrapper. The 3D tilt will still work as it operates on the parent container.

---

## Credits

- Design & Development: LENSCRAFT Team
- Fonts: [Orbitron](https://fonts.google.com/specimen/Orbitron), [Rajdhani](https://fonts.google.com/specimen/Rajdhani), [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Icons & visuals: Custom inline SVG
- No third-party JavaScript libraries used

---

© 2026 LENSCRAFT CAMERA EXPERIENCE. ALL RIGHTS RESERVED.
