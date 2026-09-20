# Nexora Games

A premium, cinematic Game Studio + Game Marketplace website for the fictional studio
**Nexora Games** — built with React, Vite, SCSS, GSAP, and Three.js.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **5 routed pages** — Home, Marketplace, Game Details, Studio, Discover (`react-router-dom`)
- **12 fictional games** with full detail data (description, features, system requirements,
  languages, screenshots, reviews) in `src/data/games.js`
- **Working marketplace**: live search, category filters, platform/price/rating/status filters,
  and 5 sort modes, all computed client-side
- **Wishlist** persisted to `localStorage` via a React context (`src/hooks/useWishlist.jsx`)
- **Procedural cover art** (`src/components/GameArt`) — every game gets a unique SVG key-art
  composition generated from a palette + pattern seed, so the project ships with zero external
  or copyrighted image assets
- **Three.js hero** (`src/components/ThreeHero`) — a lightweight particle field + wireframe
  object with mouse parallax on the homepage, with particle count and pixel ratio reduced on
  mobile, `prefers-reduced-motion` respected, and full resource cleanup on unmount
- **GSAP** throughout — hero entrance sequencing, scroll reveals (`useScrollReveal`), animated
  stat counters (`ScrollTrigger`), mobile menu transitions, and modal transitions
- **Screenshot lightbox**, trailer modal, tabs, toasts, and a fully validated newsletter form

## Project structure

```text
src/
├── components/     Reusable UI building blocks (one folder per component, co-located .scss)
├── pages/          The 5 routed pages
├── data/           Mock data: games, studio info, community/discover content
├── hooks/          useWishlist, useLocalStorage, useMediaQuery, useScrollReveal
├── utils/          Formatting helpers
└── styles/         Design tokens (_variables.scss), mixins, and global base styles
```

## Notes

- No backend — everything runs from local mock data in `src/data`.
- All "buy" and "subscribe" actions are simulated (no real payment or network calls) and are
  clearly labeled as a demo.
