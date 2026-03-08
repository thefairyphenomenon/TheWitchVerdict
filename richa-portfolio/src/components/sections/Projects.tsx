"use client";
import { useRef, useState, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio";

const FraudNetworkViz = lazy(() => import("@/components/three/FraudNetworkViz"));
const TradingBotViz   = lazy(() => import("@/components/three/TradingBotViz"));
const LaxmiLedgerViz  = lazy(() => import("@/components/three/LaxmiLedgerViz"));

function ProjectViz({ type }: { type: string }) {
  return (
    <Suspense fallback={
      <div className="w-full h-64 rounded-xl bg-witch-deep flex items-center justify-center">
        <span className="font-mono text-xs text-witch-violet/50 animate-pulse">Initializing...</span>
      </div>
    }>
      {type === "network-graph"    && <FraudNetworkViz />}
      {type === "candlestick-chart" && <TradingBotViz />}
      {type === "ledger-flow"      && <LaxmiLedgerViz />}
    </Suspense>
  );
}

export default function Projects() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const proj = projects[active];

  return (
    <section id="projects" ref={ref} className="section-base py-24 px-6">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-witch-rose/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ Projects</div>
          <h2 className="section-title shimmer-text">Projects</h2>
          <p className="font-dm italic text-witch-silver/60 mt-3">Each system built to solve a real problem</p>
        </motion.div>

        {/* Project tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-mono text-xs tracking-widest transition-all duration-300 border ${
                active === i
                  ? "border-transparent text-witch-void"
                  : "border-witch-violet/20 text-witch-silver hover:border-witch-violet/50"
              }`}
              style={active === i ? { background: p.color } : {}}
            >
              <span>{p.icon}</span>
              {p.title.split(":")[0]}
            </motion.button>
          ))}
        </div>

        {/* Active project */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Visualization */}
            <div className="flex flex-col gap-4">
              <div className="gradient-border overflow-hidden">
                <ProjectViz type={proj.visualType} />
              </div>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2">
                {proj.stack.map(s => (
                  <span key={s} className="skill-pill" style={{ borderColor: proj.color + "50" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6 justify-center">
              <div>
                <div className="font-mono text-xs tracking-widest mb-2" style={{ color: proj.color }}>
                  ✦ {proj.icon} &nbsp; Project
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-witch-mist mb-2">
                  {proj.title}
                </h3>
                <p className="font-dm italic text-witch-silver/60 mb-4">
                  "{proj.tagline}"
                </p>
                <p className="font-dm text-witch-silver/80 text-base leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Impact badge */}
              <div
                className="witch-card p-4 border-l-2"
                style={{ borderLeftColor: proj.color }}
              >
                <p className="font-mono text-xs text-witch-silver/40 mb-1 tracking-widest uppercase">Impact</p>
                <p className="font-dm text-witch-silver/80 text-sm">{proj.impact}</p>
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs tracking-widest px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105"
                  style={{ borderColor: proj.color + "60", color: proj.color }}
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* GitHub repos live fetch note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/thefairyphenomenon"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 witch-card px-8 py-4 hover:border-witch-violet/50 transition-all"
          >
            <span className="font-mono text-xs text-witch-silver/60 tracking-widest">
              View all repositories on GitHub
            </span>
            <span className="text-witch-violet">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
