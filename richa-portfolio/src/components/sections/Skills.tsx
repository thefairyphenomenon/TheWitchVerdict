"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/portfolio";

/* Canvas constellation */
function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    const categories = Object.entries(skills);
    const nodes: { label: string; x: number; y: number; color: string; r: number; hub?: boolean }[] = [];

    // Place category hubs in a circle
    categories.forEach(([cat, data], ci) => {
      const angle  = (ci / categories.length) * Math.PI * 2 - Math.PI / 2;
      const radius = Math.min(W, H) * 0.28;
      const hx     = W / 2 + Math.cos(angle) * radius;
      const hy     = H / 2 + Math.sin(angle) * radius;
      nodes.push({ label: cat, x: hx, y: hy, color: data.color, r: 12, hub: true });

      // Skill nodes around hub
      data.items.forEach((skill, si) => {
        const sAngle  = angle + (si - data.items.length / 2) * 0.28;
        const sRadius = 65 + Math.random() * 30;
        nodes.push({
          label: skill,
          x:     hx + Math.cos(sAngle) * sRadius,
          y:     hy + Math.sin(sAngle) * sRadius,
          color: data.color,
          r:     4 + Math.random() * 3,
        });
      });
    });

    let t = 0;
    let raf: number;
    let hoveredIdx = -1;

    canvas.addEventListener("mousemove", (e) => {
      const rect  = canvas.getBoundingClientRect();
      const mx    = e.clientX - rect.left;
      const my    = e.clientY - rect.top;
      hoveredIdx  = nodes.findIndex(n => Math.hypot(n.x - mx, n.y - my) < n.r + 8);
    });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, W, H);

      // Center glow
      const cg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 80);
      cg.addColorStop(0,   "#BF5FFF08");
      cg.addColorStop(1,   "transparent");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);

      // Lines: hub to center
      nodes.filter(n => n.hub).forEach(hub => {
        ctx.beginPath();
        ctx.moveTo(W / 2, H / 2);
        ctx.lineTo(hub.x, hub.y);
        ctx.strokeStyle = hub.color + "30";
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      });

      // Lines: hub to skills
      let hIdx = 0;
      Object.entries(skills).forEach(([, data]) => {
        const hub = nodes[hIdx];
        let sIdx  = hIdx + 1;
        data.items.forEach(() => {
          if (nodes[sIdx]) {
            ctx.beginPath();
            ctx.moveTo(hub.x, hub.y);
            ctx.lineTo(nodes[sIdx].x, nodes[sIdx].y);
            ctx.strokeStyle = hub.color + "20";
            ctx.lineWidth   = 0.5;
            ctx.stroke();
            sIdx++;
          }
        });
        hIdx += data.items.length + 1;
      });

      // Nodes
      nodes.forEach((n, i) => {
        const hovered = i === hoveredIdx;
        const pulse   = n.hub ? Math.sin(t * 1.5 + i) * 0.3 + 0.7 : 1;

        // Glow
        if (n.hub || hovered) {
          const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
          gr.addColorStop(0,   n.color + (hovered ? "60" : "30"));
          gr.addColorStop(1,   "transparent");
          ctx.fillStyle = gr;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (hovered ? 1.6 : 1) * pulse, 0, Math.PI * 2);
        ctx.fillStyle   = n.color + (n.hub ? "ff" : "cc");
        ctx.shadowBlur  = n.hub ? 15 : hovered ? 10 : 4;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Label
        if (n.hub || hovered) {
          ctx.font      = n.hub ? "bold 11px Cinzel Decorative, serif" : "9px JetBrains Mono, monospace";
          ctx.fillStyle = n.hub ? n.color : "#E8D5FF";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y + n.r + (n.hub ? 16 : 12));
          ctx.textAlign = "left";
        }
      });

      // Center orb
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 18, 0, Math.PI * 2);
      const cOrb = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 18);
      cOrb.addColorStop(0,   "#BF5FFF");
      cOrb.addColorStop(1,   "#C9956C");
      ctx.fillStyle   = cOrb;
      ctx.shadowBlur  = 30;
      ctx.shadowColor = "#BF5FFF";
      ctx.fill();
      ctx.shadowBlur  = 0;
      ctx.font        = "11px serif";
      ctx.fillStyle   = "#fff";
      ctx.textAlign   = "center";
      ctx.fillText("✦", W / 2, H / 2 + 4);
      ctx.textAlign   = "left";

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: "480px" }}
    />
  );
}

export default function Skills() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<string | null>(null);

  const categories = Object.entries(skills);

  return (
    <section id="skills" ref={ref} className="section-base py-24 px-6">
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-witch-violet/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ Skills</div>
          <h2 className="section-title shimmer-text">Skills</h2>
          <p className="font-dm italic text-witch-silver/60 mt-3">Hover to explore — each cluster is a domain</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <SkillConstellation />
        </motion.div>

        {/* Category pills below */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map(([cat, data]) => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-widest border transition-all duration-300"
              style={{
                borderColor:      filter === cat ? data.color : data.color + "40",
                color:            filter === cat ? data.color : "#C4B5D4",
                backgroundColor:  filter === cat ? data.color + "15" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filtered skill pills */}
        {filter && (
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {skills[filter as keyof typeof skills]?.items.map(s => (
              <span
                key={s}
                className="skill-pill"
                style={{ borderColor: skills[filter as keyof typeof skills].color + "60" }}
              >
                {s}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
