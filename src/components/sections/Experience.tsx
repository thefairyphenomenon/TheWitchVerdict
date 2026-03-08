"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { experience } from "@/data/portfolio";

/* ══════════════════════════════════════════
   CANVAS — Animated road / journey map
══════════════════════════════════════════ */
function JourneyCanvas({ activeIndex }: { activeIndex: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let raf: number, t = 0;
    let travelerX = activeIndex === 0 ? W * 0.72 : W * 0.28;
    let travelerTargetX = activeIndex === 0 ? W * 0.72 : W * 0.28;

    // Road nodes
    const nodes = [
      { x: W * 0.22, y: H * 0.52, label: "CGB Solutions", period: "May–Sep 2024", color: "#C9956C", icon: "📊" },
      { x: W * 0.78, y: H * 0.52, label: "Web3Task", period: "June 2025+", color: "#BF5FFF", icon: "🚀" },
    ];

    function drawRoad() {
      // Road surface
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.bezierCurveTo(
        nodes[0].x + (nodes[1].x - nodes[0].x) * 0.33, nodes[0].y + 30,
        nodes[0].x + (nodes[1].x - nodes[0].x) * 0.66, nodes[1].y + 30,
        nodes[1].x, nodes[1].y
      );
      ctx.strokeStyle = "#1A1033";
      ctx.lineWidth = 32;
      ctx.lineCap = "round";
      ctx.stroke();

      // Road center dashes
      ctx.setLineDash([14, 10]);
      ctx.strokeStyle = "#BF5FFF25";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.bezierCurveTo(
        nodes[0].x + (nodes[1].x - nodes[0].x) * 0.33, nodes[0].y + 30,
        nodes[0].x + (nodes[1].x - nodes[0].x) * 0.66, nodes[1].y + 30,
        nodes[1].x, nodes[1].y
      );
      ctx.stroke();
      ctx.setLineDash([]);

      // Road glow edges
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.bezierCurveTo(
        nodes[0].x + (nodes[1].x - nodes[0].x) * 0.33, nodes[0].y + 30,
        nodes[0].x + (nodes[1].x - nodes[0].x) * 0.66, nodes[1].y + 30,
        nodes[1].x, nodes[1].y
      );
      ctx.strokeStyle = "#BF5FFF15";
      ctx.lineWidth = 36;
      ctx.stroke();
    }

    function drawBuilding(x: number, y: number, col: string, type: number) {
      ctx.save(); ctx.translate(x, y - 90);

      if (type === 0) {
        // Office block — CGB Solutions
        ctx.fillStyle = "#1A1033";
        ctx.fillRect(-30, 0, 60, 80);
        ctx.strokeStyle = col + "60"; ctx.lineWidth = 1;
        ctx.strokeRect(-30, 0, 60, 80);
        for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
          const lit = Math.sin(t * 0.6 + r * 1.3 + c * 2.1) > 0.2;
          ctx.fillStyle = lit ? col + "bb" : "#06040E";
          ctx.shadowBlur = lit ? 5 : 0; ctx.shadowColor = col;
          ctx.fillRect(-22 + c * 16, 8 + r * 17, 10, 10);
        }
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#0D0A1A"; ctx.fillRect(-10, 58, 20, 22);
        ctx.font = "bold 7px JetBrains Mono"; ctx.fillStyle = col;
        ctx.textAlign = "center"; ctx.fillText("CGB", 0, -6);
      } else {
        // Startup building — Web3Task
        ctx.fillStyle = "#120D2A";
        ctx.fillRect(-26, 0, 52, 90);
        ctx.strokeStyle = col + "70"; ctx.lineWidth = 1.5;
        ctx.strokeRect(-26, 0, 52, 90);
        // Neon sign
        ctx.shadowBlur = 14; ctx.shadowColor = col;
        ctx.strokeStyle = col; ctx.lineWidth = 1.5;
        ctx.strokeRect(-20, 6, 40, 14);
        ctx.shadowBlur = 0;
        ctx.fillStyle = col; ctx.font = "bold 6px JetBrains Mono"; ctx.textAlign = "center";
        ctx.fillText("WEB3TASK", 0, 16);
        // Windows with code glow
        for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) {
          const lit = Math.sin(t * 0.9 + r * 1.1 + c * 3.3) > 0;
          ctx.fillStyle = lit ? "#7FFF0044" : "#06040E";
          ctx.shadowBlur = lit ? 8 : 0; ctx.shadowColor = "#7FFF00";
          ctx.fillRect(-18 + c * 22, 28 + r * 14, 14, 9);
        }
        ctx.shadowBlur = 0;
        // Antenna
        ctx.strokeStyle = col; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -18); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, -18, 2 + Math.sin(t * 4) * 1, 0, Math.PI * 2);
        ctx.fillStyle = col; ctx.shadowBlur = 12; ctx.shadowColor = col; ctx.fill(); ctx.shadowBlur = 0;
        ctx.font = "bold 7px JetBrains Mono"; ctx.fillStyle = col;
        ctx.textAlign = "center"; ctx.fillText("WEB3", 0, -24);
      }
      ctx.restore();
    }

    function drawTraveler(x: number, y: number) {
      // Smooth lerp
      travelerX += (travelerTargetX - travelerX) * 0.06;
      const walking = Math.abs(travelerTargetX - travelerX) > 2;
      const bob = walking ? Math.sin(t * 10) * 3 : Math.sin(t * 2) * 2;
      const legSwing = walking ? Math.sin(t * 10) * 12 : 0;

      ctx.save(); ctx.translate(travelerX, y + bob);
      ctx.shadowBlur = 20; ctx.shadowColor = "#BF5FFF50";

      // Shadow
      ctx.beginPath(); ctx.ellipse(0, 28, 12, 3, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#BF5FFF20"; ctx.fill();

      // Legs
      ctx.strokeStyle = "#2A1850"; ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-4, 12); ctx.lineTo(-6 - legSwing * 0.4, 26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, 12); ctx.lineTo(6 + legSwing * 0.4, 26); ctx.stroke();

      // Boots
      ctx.fillStyle = "#BF5FFF";
      ctx.beginPath(); ctx.ellipse(-6 - legSwing * 0.4, 27, 5, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6 + legSwing * 0.4, 27, 5, 3, 0, 0, Math.PI * 2); ctx.fill();

      // Body / robe
      const robe = ctx.createLinearGradient(-14, -12, 14, 14);
      robe.addColorStop(0, "#2A1850"); robe.addColorStop(1, "#1A1033");
      ctx.beginPath();
      ctx.moveTo(-14, -10); ctx.bezierCurveTo(-16, 0, -15, 10, -10, 14);
      ctx.lineTo(10, 14); ctx.bezierCurveTo(15, 10, 16, 0, 14, -10);
      ctx.closePath(); ctx.fillStyle = robe; ctx.fill();
      ctx.strokeStyle = "#BF5FFF40"; ctx.lineWidth = 1; ctx.stroke();

      // Arms swing
      ctx.strokeStyle = "#F5D0C0"; ctx.lineWidth = 3.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-12, -6); ctx.bezierCurveTo(-20, -2 + legSwing * 0.3, -22, 6, -18, 10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12, -6); ctx.bezierCurveTo(20, -2 - legSwing * 0.3, 22, 6, 18, 10); ctx.stroke();

      // Head
      ctx.beginPath(); ctx.ellipse(0, -22, 10, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#F5D0C0"; ctx.fill();

      // Hair
      for (let s = 0; s < 3; s++) {
        ctx.beginPath(); ctx.moveTo(-7 + s * 4, -30);
        ctx.bezierCurveTo(-8 + s * 4 + Math.sin(t + s) * 2, 10, -6 + s * 4, 20, -5 + s * 4, 28);
        ctx.strokeStyle = "#1A0A0A"; ctx.lineWidth = 3 - s * 0.5; ctx.stroke();
      }

      // Witch hat (tiny)
      ctx.beginPath(); ctx.moveTo(-12, -30); ctx.lineTo(0, -52); ctx.lineTo(12, -30); ctx.closePath();
      ctx.fillStyle = "#0D0A1A"; ctx.fill(); ctx.strokeStyle = "#BF5FFF80"; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = "#BF5FFF"; ctx.fillRect(-10, -33, 20, 3);

      // Eyes
      ctx.beginPath(); ctx.ellipse(-3, -23, 2, 2.5, 0, 0, Math.PI * 2); ctx.fillStyle = "#BF5FFF"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(3, -23, 2, 2.5, 0, 0, Math.PI * 2); ctx.fill();

      // Speed lines if walking
      if (walking) {
        const dir = travelerTargetX > travelerX ? -1 : 1;
        for (let i = 0; i < 4; i++) {
          const lx = dir * (18 + i * 8), ly = -8 + i * 5;
          ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + dir * (8 + i * 3), ly);
          ctx.strokeStyle = "#BF5FFF" + (60 - i * 12).toString(16).padStart(2, "0");
          ctx.lineWidth = 1; ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function drawFootprints() {
      const count = 8;
      const startX = Math.min(nodes[0].x, nodes[1].x);
      const endX = travelerX;
      for (let i = 0; i < count; i++) {
        const fx = startX + (endX - startX) * (i / count);
        const fy = nodes[0].y + Math.sin(i * 0.8) * 6;
        ctx.save(); ctx.translate(fx, fy);
        ctx.rotate(Math.PI * 0.1);
        ctx.beginPath();
        ctx.ellipse(i % 2 === 0 ? -3 : 3, 0, 3, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#BF5FFF" + Math.floor(15 + (i / count) * 25).toString(16).padStart(2, "0");
        ctx.fill(); ctx.restore();
      }
    }

    // Update target when active changes
    travelerTargetX = activeIndex === 0 ? nodes[0].x : nodes[1].x;

    function loop() {
      ctx.clearRect(0, 0, W, H);

      // Gradient sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#06040E");
      sky.addColorStop(0.6, "#0D0A1A");
      sky.addColorStop(1, "#06040E");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

      // Floating background stars
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 137 + t * 8) % W);
        const sy = ((i * 97) % (H * 0.45));
        const alpha = (Math.sin(t * 0.5 + i) + 1) / 2 * 0.4 + 0.1;
        ctx.beginPath(); ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,213,255,${alpha})`; ctx.fill();
      }

      // Ground plane
      const ground = ctx.createLinearGradient(0, H * 0.55, 0, H);
      ground.addColorStop(0, "#0D0A1A"); ground.addColorStop(1, "#06040E");
      ctx.fillStyle = ground; ctx.fillRect(0, H * 0.55, W, H * 0.45);

      drawRoad();
      drawFootprints();

      // Destination glow halos
      nodes.forEach((n, i) => {
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 55);
        gr.addColorStop(0, n.color + (i === activeIndex ? "30" : "12"));
        gr.addColorStop(1, "transparent");
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(n.x, n.y, 55, 0, Math.PI * 2); ctx.fill();
      });

      // 2D buildings
      nodes.forEach((n, i) => drawBuilding(n.x, n.y, n.color, i));

      // Node circles
      nodes.forEach((n, i) => {
        const isActive = i === activeIndex;
        const pulse = Math.sin(t * 2) * 0.4 + 0.6;
        ctx.beginPath(); ctx.arc(n.x, n.y, isActive ? 16 + pulse * 4 : 12, 0, Math.PI * 2);
        ctx.fillStyle = n.color + (isActive ? "40" : "20");
        ctx.strokeStyle = n.color; ctx.lineWidth = isActive ? 2 : 1;
        ctx.shadowBlur = isActive ? 20 : 8; ctx.shadowColor = n.color;
        ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;
        // Icon
        ctx.font = "14px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(n.icon, n.x, n.y + 5);
        // Label below
        ctx.font = "bold 9px JetBrains Mono"; ctx.fillStyle = n.color;
        ctx.fillText(n.period, n.x, n.y + 32);
      });

      drawTraveler(travelerX, nodes[0].y - 28);

      // "YOU ARE HERE" indicator on active node
      const activeNode = nodes[activeIndex];
      ctx.font = "bold 8px JetBrains Mono"; ctx.fillStyle = "#E8D5FF";
      ctx.textAlign = "center"; ctx.shadowBlur = 6; ctx.shadowColor = activeNode.color;
      ctx.fillText("▼ YOU ARE HERE", travelerX, activeNode.y - 68);
      ctx.shadowBlur = 0;

      t += 0.016;
      raf = requestAnimationFrame(loop);
    }
    loop();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [activeIndex]);

  return <canvas ref={ref} className="w-full h-full" />;
}

/* ══════════════════════════════════════════
   XP BAR
══════════════════════════════════════════ */
function XPBar({ xp, max, color }: { xp: number; max: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-mono text-xs text-witch-silver/40 w-6">XP</span>
      <div className="flex-1 h-1.5 bg-witch-purple rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${(xp / max) * 100}%` } : {}}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}70)` }}
        />
      </div>
      <span className="font-mono text-xs tabular-nums" style={{ color }}>{xp.toLocaleString()}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   SKILL TREE NODE
══════════════════════════════════════════ */
function SkillNode({ skill, color, delay }: { skill: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="flex items-center gap-2 font-mono text-xs tracking-wide px-3 py-1.5 rounded-full border"
      style={{ borderColor: color + "50", color, background: color + "12" }}>
      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, delay }}>
        ◈
      </motion.span>
      {skill}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const exp = experience[active];

  return (
    <section id="experience" ref={ref} className="section-base py-20 px-6 overflow-hidden">
      {/* Background pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, #BF5FFF06 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ Quest Log</div>
          <h2 className="section-title shimmer-text">Experience</h2>
          <p className="font-dm italic text-witch-silver/50 mt-2 text-sm">
            Click a destination to travel there
          </p>
        </motion.div>

        {/* Journey Map */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-72 rounded-2xl overflow-hidden mb-8 cursor-pointer"
          style={{ border: "1px solid #BF5FFF20" }}>
          <JourneyCanvas activeIndex={active} />
          {/* Click zones */}
          <div className="absolute inset-0 grid grid-cols-2">
            {experience.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} className="cursor-pointer" />
            ))}
          </div>
        </motion.div>

        {/* Quest selector tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {experience.map((e, i) => (
            <motion.button key={i} onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-3 px-6 py-3 rounded-full border font-mono text-xs tracking-widest transition-all duration-300"
              style={{
                borderColor: active === i ? e.color : e.color + "30",
                color: active === i ? e.color : "#C4B5D4",
                background: active === i ? e.color + "15" : "transparent",
                boxShadow: active === i ? `0 0 24px ${e.color}30` : "none",
              }}>
              <span>{active === i ? "▶" : "○"}</span>
              {e.company}
              <span className="opacity-60">{e.level}</span>
            </motion.button>
          ))}
        </div>

        {/* Quest details panel */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="witch-card p-8 grid md:grid-cols-3 gap-8"
            style={{ borderColor: exp.color + "30" }}>

            {/* Left — identity */}
            <div className="flex flex-col gap-5">
              {/* Comic badge */}
              <div className="relative w-24 h-24">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}
                  className="w-full h-full rounded-2xl flex items-center justify-center text-4xl"
                  style={{ background: `radial-gradient(circle, ${exp.color}30, ${exp.color}08)`, border: `2px solid ${exp.color}50`, boxShadow: `0 0 30px ${exp.color}25` }}>
                  {active === 0 ? "📊" : "🚀"}
                </motion.div>
                {/* Status dot */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-witch-void"
                  style={{ background: exp.level === "ACTIVE QUEST" ? "#7FFF00" : "#C9956C", boxShadow: `0 0 8px ${exp.color}` }}>
                  {exp.level === "ACTIVE QUEST" && (
                    <motion.div animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full" style={{ background: "#7FFF00" }} />
                  )}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs tracking-widest mb-1" style={{ color: exp.color }}>
                  ✦ {exp.level}
                </div>
                <h3 className="font-cinzel text-lg font-bold text-witch-mist leading-snug">{exp.role}</h3>
                <p className="font-dm italic text-witch-silver/60 mt-1">{exp.company}</p>
                <p className="font-mono text-xs text-witch-silver/40 mt-1">{exp.location}</p>
                <p className="font-mono text-xs text-witch-silver/40">{exp.period}</p>
              </div>

              <XPBar xp={exp.xp} max={3000} color={exp.color} />
            </div>

            {/* Middle — mission objectives */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs tracking-widest text-witch-silver/40 uppercase">
                Mission Objectives
              </p>
              <ul className="flex flex-col gap-3">
                {exp.highlights.map((h, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-2.5 group">
                    <motion.span animate={{ color: ["#BF5FFF", "#C9956C", "#BF5FFF"] }}
                      transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                      className="mt-1 shrink-0 text-xs">◈</motion.span>
                    <span className="font-dm text-witch-silver/75 text-sm leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right — skill tree */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs tracking-widest text-witch-silver/40 uppercase">
                Skills Unlocked
              </p>
              <div className="flex flex-col gap-2">
                {exp.skills.map((s, i) => (
                  <SkillNode key={s} skill={s} color={exp.color} delay={i * 0.08} />
                ))}
              </div>
              {/* Achievement badge */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="mt-auto rounded-xl p-3 text-center"
                style={{ background: exp.color + "10", border: `1px solid ${exp.color}30` }}>
                <div className="font-mono text-xs text-witch-silver/40 mb-1">Achievement</div>
                <div className="font-dm italic text-sm" style={{ color: exp.color }}>
                  {active === 0 ? "📊 Financial Architect" : "🏆 50K Users Shipped"}
                </div>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
