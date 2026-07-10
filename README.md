# gilangpps.dev — Personal Research & Engineering Portfolio

Personal website of **Gilang Pratama Putra Siswanto**, a physicist operating at the intersection of scientific research and applied engineering. The site showcases instrumentation projects, publications, and research focus areas.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| 3D / WebGL | React Three Fiber + Three.js |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| UI Primitives | Base UI, shadcn/ui |
| Analytics | Vercel Analytics |
| Package Manager | pnpm v11 |

---

## Project Structure

```
web/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── projects/
│   │   ├── page.tsx            # Projects index grid
│   │   └── [slug]/page.tsx     # Project detail page
│   └── publications/
│       └── page.tsx            # Publications archive
│
├── components/
│   ├── 3d/                     # Three.js / WebGL components
│   ├── common/                 # Shared primitives (Reveal, Counter, etc.)
│   ├── home/                   # Home page sections
│   ├── interaction/            # Cursor, scroll-to-top
│   ├── layout/                 # Header, footer, page-header
│   ├── projects/               # Project grid and gallery
│   ├── providers/              # Smooth scroll provider
│   ├── publications/           # Publication archive
│   └── ui/                     # Base UI button
│
├── content/
│   ├── projects.ts             # Project data (P-01 – P-09), helpers, publications
│   ├── site.ts                 # Profile, contact, socials, positions, research focus
│   ├── specialities.ts         # Domain specialities
│   └── hero.ts                 # Hero section content
│
├── hooks/
│   └── use-pointer.ts          # Mouse/touch pointer hook
│
├── lib/
│   └── utils.ts                # Utility functions (cn)
│
└── public/
    ├── images/
    │   ├── projects/           # Project thumbnails and gallery images (P-0X_*.*)
    │   └── publications/       # Publication thumbnails
    ├── hero-loop-poster.png
    └── icon.svg
```

---

## Projects (P-01 – P-09)

| Index | Title | Category | Year | Status |
|---|---|---|---|---|
| P-01 | Digitalization of Wien's Displacement Experiment | Instrumentation | 2024 | Archived |
| P-02 | Brownian Motion — Digitalized Tracking System | Instrumentation | 2024 | Archived |
| P-03 | SIBI Hand Gesture Recognition and LED System Control Using DNN | AI & Embedded Systems | 2025 | Prototype |
| P-04 | StaySafeX2 Solo — Gamma Radiation Detector Replica | Instrumentation | 2025 | Archived |
| P-05 | IoT Smarthome Control and Monitoring System Using ESP32 and Ngrok | IoT & Automation | 2025 | Archived |
| P-06 | LUMINA-GAN — Image Reconstruction and Refinement | AI & Medical Imaging | 2025 | Archived |
| P-07 | Bekkusu-CAM — Retro ESP32-CAM Web Camera | Embedded Vision | 2026 | Active |
| P-08 | Robot Matcha V2 [CLW] — 4-DOF SCARA Matcha Robot | Robotics & Automation | 2026 | Active |
| P-09 | Coune Labworks Birthday Interactive TouchDesigner Installation | Interactive Installation | 2026 | Active |

Each project has a dedicated detail page at `/projects/[slug]` with thumbnail, gallery, overview, challenge, approach, outcomes, and tech stack sections.

---

## Image Conventions

Project images live under `/public/images/projects/` and follow this naming scheme:

```
P-0X_thumbnail_<description>.<ext>   # Card thumbnail + detail hero
P-0X_<description>.<ext>             # Additional gallery images
```

Supported formats: `.png`, `.jpg`, `.jpeg`, `.jfif`

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 11 (`npm install -g pnpm`)

### Install

```bash
pnpm install
```

> pnpm v11 requires build scripts to be explicitly approved. The `pnpm-workspace.yaml` at the repo root already allows `sharp` and `msw`:
>
> ```yaml
> allowBuilds:
>   msw: true
>   sharp: true
> ```

### Development

```bash
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack hot-reload.

### Production Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## Content Management

All site content is managed through TypeScript files under `content/`. No CMS or database is required.

### Adding a New Project

1. Add project images to `public/images/projects/` following the `P-0X_*` naming convention.
2. Open `content/projects.ts` and append a new entry to the `projects` array.
3. Set `thumbnail` and `gallery` to the new image paths (relative to `/public`).
4. Run `pnpm build` to verify.

### Updating Profile / Contact

Edit `content/site.ts` — `profile`, `contact`, `socials`, and `positions` objects.

### Adding Publications

Add entries to the `publications` array in `content/projects.ts`. The `Publication` type requires: `slug`, `index`, `title`, `authors`, `venue`, `year`, `type`, `doi`, `abstract`, `tags`.

---

## Key Pages

| Route | Description |
|---|---|
| `/` | Home — hero, projects preview, publications, research focus, contact |
| `/projects` | Full project grid (all 9 projects) |
| `/projects/[slug]` | Project detail — gallery, stack, approach, outcomes |
| `/publications` | Publications archive with type filter |

---

## Environment

No environment variables are required for local development or static build.

For Vercel deployment, analytics are enabled automatically via `@vercel/analytics` — no additional configuration needed.

---

## License

All content and source code © 2024–2026 Gilang Pratama Putra Siswanto. All rights reserved.
