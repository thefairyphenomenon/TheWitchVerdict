"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/portfolio";

function XPBar({ xp, max, color }: { xp: number; max: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-mono text-xs text-witch-silver/50">XP</span>
      <div className="flex-1 h-1.5 bg-witch-purple rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(xp / max) * 100}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        />
      </div>
      <span className="font-mono text-xs" style={{ color }}>{xp.toLocaleString()}</span>
    </div>
  );
}

export default function Experience() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const exp = experience[active];

  return (
    <section id="experience" ref={ref} className="section-base py-24 px-6">
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-witch-violet/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ Quest Log</div>
          <h2 className="section-title shimmer-text">Experience</h2>
          <p className="font-dm italic text-witch-silver/60 mt-3">Each role — a mission undertaken</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Quest list (left) */}
          <div className="flex flex-col gap-3">
            {experience.map((e, i) => (
              <motion.button
                key={e.company}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                onClick={() => setActive(i)}
                className={`witch-card p-4 text-left transition-all duration-300 ${
                  active === i ? "border-witch-violet/50 bg-witch-violet/10" : ""
                }`}
              >
                <div className="font-mono text-xs tracking-widest mb-1" style={{ color: e.color }}>
                  {e.level}
                </div>
                <div className="font-cinzel text-sm font-bold text-witch-mist leading-snug">{e.role}</div>
                <div className="font-dm italic text-witch-silver/60 text-xs mt-1">{e.company}</div>
                <div className="font-mono text-xs text-witch-silver/40 mt-1">{e.period}</div>
              </motion.button>
            ))}
          </div>

          {/* Quest details (right) */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 witch-card p-8 flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex flex-col gap-1">
              <div className="font-mono text-xs tracking-widest" style={{ color: exp.color }}>
                ✦ {exp.level}
              </div>
              <h3 className="font-cinzel text-xl font-bold text-witch-mist">{exp.role}</h3>
              <p className="font-dm italic text-witch-silver/70">{exp.company} · {exp.location}</p>
              <p className="font-mono text-xs text-witch-silver/40">{exp.period}</p>
            </div>

            {/* XP bar */}
            <XPBar xp={exp.xp} max={3000} color={exp.color} />

            {/* Highlights */}
            <div>
              <p className="font-mono text-xs tracking-widest text-witch-silver/40 mb-4 uppercase">
                Mission Objectives
              </p>
              <ul className="flex flex-col gap-3">
                {exp.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-witch-violet mt-1 shrink-0">◈</span>
                    <span className="font-dm text-witch-silver/80 text-sm leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Skills unlocked */}
            <div>
              <p className="font-mono text-xs tracking-widest text-witch-silver/40 mb-3 uppercase">
                Skills Unlocked
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map(s => (
                  <span key={s} className="skill-pill" style={{ borderColor: exp.color + "50", color: exp.color }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
