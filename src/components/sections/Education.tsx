"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { education } from "@/data/portfolio";

export default function Education() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="education" ref={ref} className="section-base py-24 px-6">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-witch-rose/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ The Grimoire</div>
          <h2 className="section-title shimmer-text">Education</h2>
          <p className="font-dm italic text-witch-silver/60 mt-3">Each degree — a chapter of the tome</p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-witch-violet/60 via-witch-rose/40 to-transparent"
            />
          </div>

          <div className="flex flex-col gap-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`relative flex ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start gap-8 pl-16 md:pl-0`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 z-10"
                  style={{ borderColor: edu.color, boxShadow: `0 0 12px ${edu.color}80`, background: "var(--void)" }}
                />

                {/* Card */}
                <div className={`md:w-5/12 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:ml-auto md:pl-12"}`}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="witch-card p-6 w-full text-left group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{edu.icon}</span>
                      <div>
                        <div className="font-mono text-xs tracking-widest mb-1" style={{ color: edu.color }}>
                          {edu.period}
                        </div>
                        <h3 className="font-cinzel text-base font-bold text-witch-mist leading-snug">
                          {edu.degree}
                        </h3>
                        <p className="font-dm italic text-witch-silver/70 text-sm mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {open === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="font-dm text-witch-silver/60 text-sm leading-relaxed mt-3 border-t border-witch-violet/20 pt-3"
                        >
                          {edu.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div className="font-mono text-xs text-witch-silver/30 mt-3 group-hover:text-witch-violet/60 transition-colors">
                      {open === i ? "▲ collapse" : "▼ expand"}
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
