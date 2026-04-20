# PAIRSENSE

A heritage-luxury flavor & fragrance house website with futuristic-tech undertones — Next.js 14 (App Router) + React Three Fiber, built around classical serif typography, GPU-accelerated particles, parallax photography and a deep-forest cream palette.

---

## Prerequisites

| Tool    | Version                                | Check           |
| ------- | -------------------------------------- | --------------- |
| Node.js | **≥ 18.17** (20 LTS recommended)       | `node -v`       |
| npm     | ≥ 9                                    | `npm -v`        |
| Git     | any                                    | `git --version` |

Install Node from [nodejs.org](https://nodejs.org/) or via `nvm` / `volta`.

> Works on Windows, macOS, and Linux. On Windows, PowerShell or Git Bash are both fine.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload, runs on http://localhost:3000)
npm run dev
```

Open **http://localhost:3000** in your browser.

First load compiles the R3F scenes and fetches Google Fonts — give it ~10 seconds.

---

## Available Scripts

| Command         | Purpose                                                       |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Start Next.js dev server on port 3000 with HMR.               |
| `npm run build` | Create an optimized production build into `.next/`.           |
| `npm start`     | Serve the production build (run `npm run build` first).       |
| `npm run lint`  | Run `next lint` (ESLint with the Next.js config).             |

> ⚠️ **Do not run `npm run build` while `npm run dev` is active.** The build replaces `.next/` artifacts and the dev server will serve 404s until you restart. If that happens: stop dev, delete `.next/`, then `npm run dev` again.

---

## Tech Stack

- **Framework** — Next.js 14.2 (App Router) + React 18 + TypeScript 5
- **3D / WebGL** — `three` 0.169, `@react-three/fiber`, `@react-three/drei`
- **Animation** — `framer-motion`, `gsap`, custom rAF parallax
- **Smooth scroll** — `lenis`
- **Styling** — Tailwind CSS 3.4 + CSS custom properties (design tokens in `app/globals.css`)
- **Fonts** — `next/font/google`: Fraunces (variable display serif, opsz + SOFT axes), Manrope (UI sans), JetBrains Mono (captions)
- **Images** — Pinned `images.unsplash.com` URLs in `lib/images.ts`

---

## Project Structure

```
claudec/
├─ app/
│  ├─ layout.tsx             # fonts, loader, cursor, smooth-scroll, nav
│  ├─ page.tsx               # section composition
│  └─ globals.css            # design tokens, grain, utilities
├─ components/
│  ├─ layout/                # Nav, Footer, Loader, SmoothScroll
│  ├─ sections/              # Hero, InnovationLoop, Process, WhoWeAre,
│  │                         # About, Capabilities, Segments, CategoryStrip, Contact
│  ├─ three/                 # R3F scenes: MolecularField, LiquidField, DropletField
│  └─ ui/                    # Cursor, Marquee, TiltCard, Reveal, SplitText, ParallaxImage
├─ lib/
│  ├─ images.ts              # Pinned Unsplash photo URLs
│  └─ cn.ts                  # className helper
├─ public/                   # logo, favicon
├─ tailwind.config.ts
├─ tsconfig.json
└─ package.json
```

---

## Design Tokens

Brand colors and typographic scale live as CSS variables in `app/globals.css`.

| Token        | Value     | Role                       |
| ------------ | --------- | -------------------------- |
| `--bg`       | `#f6f3ea` | warm cream base            |
| `--bg-warm`  | `#fbf8ef` | lighter cream              |
| `--bg-alt`   | `#efeadb` | deeper cream               |
| `--ink`      | `#0f2e22` | deep forest (primary type) |
| `--ink-soft` | `#1e3a2d` | softened forest            |
| `--moss`     | `#6b7860` | sage neutral               |
| `--mist`     | `#c5ccb6` | light sage                 |
| `--earth`    | `#4a3212` | earthy brown               |
| `--gold`     | `#b08b4f` | brass luxury accent        |

Tailwind consumes them through `tailwind.config.ts` (e.g. `bg-bg`, `text-ink`, `text-gold`).

---

## Troubleshooting

**Port 3000 already in use**
```bash
npm run dev -- -p 3001
```

**Images show as blank gradients**
The site uses pinned Unsplash URLs. If a photo 404s, swap the ID in `lib/images.ts` and verify with:
```bash
curl -I "https://images.unsplash.com/photo-<id>?w=400&q=60&auto=format&fit=crop"
```

**`.next/` serves stale chunks / plain HTML**
```bash
rm -rf .next node_modules/.cache
npm run dev
```

**Type errors after edits**
```bash
npx tsc --noEmit
```

**Reduced-motion users** get animations disabled via `prefers-reduced-motion`. **Touch devices** hide the custom cursor automatically.

---

## Production Deployment

Any Node host works. Vercel is the path of least resistance:

```bash
npm install -g vercel
vercel          # follow prompts — Next.js is auto-detected
```

Manual deploy:

```bash
npm ci
npm run build
npm start       # serves on $PORT or 3000
```
