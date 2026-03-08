# ✦ The Witch Verdict — Richa Sharma Portfolio

> *"I code because I desire to be the wind itself."*

A dark, witchy, highly interactive personal portfolio built with Next.js 14, Framer Motion, Three.js, and Canvas animations.

---

## 🔮 Features

- **Starfield Hero** — Name forms from flying particles on load
- **Sparkle Cursor** — Subtle trailing sparkle cursor
- **Fraud Detection Viz** — Live animated network graph showing transaction anomaly detection
- **Trading Bot Viz** — Real-time candlestick chart with buy/sell signals and pipeline status
- **Laxmi Finance Bot Viz** — Animated double-entry ledger with live transaction particles
- **Skills Constellation** — Interactive star map of all skills, hover to reveal
- **Quest Log Experience** — Career history as a gamified mission log with XP bars
- **Spell Tome Timeline** — Education as expandable chapters of an arcane tome
- **Send a Raven** — Contact form with a dark witchy aesthetic

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations & transitions |
| Canvas 2D API | Custom visualizations |
| Google Fonts | Cinzel Decorative + DM Serif Display |

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   └── page.tsx            # Main page (assembles all sections)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Starfield + particle name formation
│   │   ├── About.tsx        # Bio + portrait + languages
│   │   ├── Education.tsx    # Spell tome timeline
│   │   ├── Experience.tsx   # Quest log with XP bars
│   │   ├── Projects.tsx     # Project cards + live visualizations
│   │   ├── Skills.tsx       # Constellation map
│   │   └── Contact.tsx      # Send a Raven form
│   ├── three/
│   │   ├── FraudNetworkViz.tsx   # Network graph animation
│   │   ├── TradingBotViz.tsx     # Candlestick chart animation
│   │   └── LaxmiLedgerViz.tsx   # Ledger flow animation
│   └── ui/
│       ├── Cursor.tsx       # Custom sparkle cursor
│       └── Nav.tsx          # Navigation
├── data/
│   └── portfolio.ts         # All portfolio data (edit this!)
└── styles/
    └── globals.css          # Global styles, animations, CSS vars
```

---

## 🎨 Customization

Edit **`src/data/portfolio.ts`** to update all content — name, bio, projects, experience, skills, etc.

To add your profile photo, replace the placeholder `<div>✦</div>` in `About.tsx` with:
```tsx
<Image src="/images/profile.jpg" alt="Richa Sharma" fill className="object-cover" />
```
and place your photo at `public/images/profile.jpg`.

---

## ☁️ Deploy on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect at [vercel.com](https://vercel.com) for automatic deployments.

---

## 📝 License

MIT — built for Richa Sharma's personal portfolio.
