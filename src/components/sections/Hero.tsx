"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";

/* ── Canvas Starfield ── */
function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let raf: number;

    /* Stars */
    const N_STARS = 200;
    const stars = Array.from({ length: N_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));

    /* Floating particles */
    const N_PARTICLES = 60;
    const particles = Array.from({ length: N_PARTICLES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? "#BF5FFF" : Math.random() > 0.5 ? "#C9956C" : "#7FFF00",
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Deep gradient bg
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
      grad.addColorStop(0,   "#0D0A1A");
      grad.addColorStop(0.5, "#0A0617");
      grad.addColorStop(1,   "#06040E");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Nebula glow
      const neb = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.4);
      neb.addColorStop(0,   "rgba(191, 95, 255, 0.06)");
      neb.addColorStop(0.5, "rgba(191, 95, 255, 0.02)");
      neb.addColorStop(1,   "transparent");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, W, H);

      const neb2 = ctx.createRadialGradient(W * 0.75, H * 0.6, 0, W * 0.75, H * 0.6, W * 0.35);
      neb2.addColorStop(0,   "rgba(201, 149, 108, 0.05)");
      neb2.addColorStop(1,   "transparent");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        const a = (Math.sin(t * s.speed + s.phase) + 1) / 2 * 0.8 + 0.1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 213, 255, ${a})`;
        ctx.fill();
      }

      // Floating particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        pGrad.addColorStop(0,   p.hue + "30");
        pGrad.addColorStop(1,   "transparent");
        ctx.fillStyle = pGrad;
        ctx.fill();
      }

      t += 0.01;
      raf = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ── Word split text reveal ── */
function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: delay + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Particle name formation ── */
function ParticleName({ name }: { name: string }) {
  const [phase, setPhase] = useState<"particles" | "text">("particles");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("text"), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {phase === "particles" && (
        <div className="flex gap-2 justify-center flex-wrap">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ x: (Math.random() - 0.5) * 400, y: (Math.random() - 0.5) * 300, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.04, ease: "backOut" }}
              className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black text-witch-violet text-glow-violet"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      )}
      {phase === "text" && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-black shimmer-text"
        >
          {name}
        </motion.h1>
      )}
    </div>
  );
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarfieldCanvas />

      {/* Sigil ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-witch-violet/10 animate-[spin_40s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-witch-rose/08 animate-[spin_25s_linear_infinite_reverse]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.4em] text-witch-silver uppercase mb-2"
        >
          ✦ &nbsp; The Witch Verdict &nbsp; ✦
        </motion.div>

        <ParticleName name={personal.name} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-dm italic text-xl md:text-2xl text-witch-rose">
            {personal.headline}
          </p>
          <p className="font-mono text-xs text-witch-silver/60 tracking-widest max-w-md leading-relaxed">
            {personal.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="flex items-center gap-4 mt-4"
        >
          <button
            onClick={scrollToAbout}
            className="gradient-border px-8 py-3 font-mono text-xs tracking-widest text-witch-violet hover:text-white transition-colors duration-300"
          >
            Enter the Realm
          </button>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest text-witch-silver hover:text-witch-violet transition-colors duration-300 border border-witch-violet/30 px-8 py-3 rounded-xl hover:border-witch-violet/60"
          >
            GitHub ↗
          </a>
        </motion.div>

        {/* Floating tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="flex flex-wrap justify-center gap-2 mt-2"
        >
          {["Quant Finance", "ML Engineering", "AI Systems", "Data Pipelines"].map(tag => (
            <span key={tag} className="skill-pill">{tag}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <span className="font-mono text-xs text-witch-silver/40 tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-witch-violet/40 to-transparent" />
      </div>
    </section>
  );
}
