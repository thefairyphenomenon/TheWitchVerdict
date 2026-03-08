"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personal, languages } from "@/data/portfolio";

export default function About() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="section-base py-24 px-6">
      {/* bg glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-witch-violet/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* Portrait side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center md:items-start gap-8"
        >
          {/* Placeholder portrait frame */}
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 rounded-full border border-witch-violet/30 animate-pulse-glow" />
            <div className="absolute inset-4 rounded-full border border-witch-rose/20" />
            <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-witch-purple via-witch-deep to-witch-void flex items-center justify-center">
              {/* Replace src with actual photo */}
              <div className="text-7xl select-none">✦</div>
            </div>
            {/* Orbiting dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-witch-violet rounded-full animate-orbit shadow-[0_0_12px_#BF5FFF]" />
            </div>
          </div>

          {/* Location + contact */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs text-witch-silver/60 tracking-widest flex items-center gap-2">
              <span className="text-witch-violet">◈</span> {personal.location}
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-xs text-witch-silver/60 tracking-widest flex items-center gap-2 hover:text-witch-violet transition-colors"
            >
              <span className="text-witch-rose">◈</span> {personal.email}
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-witch-silver/60 tracking-widest flex items-center gap-2 hover:text-witch-violet transition-colors"
            >
              <span className="text-witch-green">◈</span> github.com/thefairyphenomenon
            </a>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col gap-8"
        >
          <div>
            <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">
              ✦ About
            </div>
            <h2 className="section-title text-witch-mist mb-6">
              The Witch<br />
              <span className="text-witch-violet">Behind the</span> Code
            </h2>
            <p className="font-dm text-witch-silver/80 text-lg leading-relaxed">
              {personal.bio}
            </p>
          </div>

          {/* Languages spoken */}
          <div>
            <p className="font-mono text-xs tracking-widest text-witch-silver/50 mb-4 uppercase">
              Languages Spoken
            </p>
            <div className="flex flex-col gap-3">
              {languages.map(lang => (
                <div key={lang.language} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-dm text-witch-mist text-sm">{lang.language}</span>
                    <span className="font-mono text-xs text-witch-silver/50">{lang.level}</span>
                  </div>
                  <div className="h-1 bg-witch-purple rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.proficiency}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #BF5FFF, #C9956C)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications mini list */}
          <div className="witch-card p-4">
            <p className="font-mono text-xs tracking-widest text-witch-silver/50 mb-3 uppercase">
              Currently Studying
            </p>
            <div className="flex flex-wrap gap-2">
              {["Stochastic Finance (NPTEL·IIT Kanpur)", "Financial Accounting (NPTEL)", "Risk Management (NPTEL)"].map(c => (
                <span key={c} className="skill-pill">{c}</span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
