"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { certifications } from "@/data/portfolio";
import { useLang } from "@/hooks/useLang";

/* ─────────────────────────────────────────
   OUTFIT PIECES (one per certification)
   Order: boots → robe → belt → hat → wand → spell book → cauldron → stars/aura
   We have 5 certs so we map the first 5 pieces
───────────────────────────────────────── */
const OUTFIT_PIECES = [
  { name: "Boots",      icon: "👢", color: "#C9956C" },
  { name: "Robe",       icon: "🌑", color: "#BF5FFF" },
  { name: "Belt",       icon: "⚜️",  color: "#E8D5FF" },
  { name: "Hat",        icon: "🎩", color: "#7FFF00" },
  { name: "Spell Book", icon: "📖", color: "#BF5FFF" },
];

/* ─────────────────────────────────────────
   CANVAS — Witch assembly
───────────────────────────────────────── */
function WitchAssemblyCanvas({ unlockedCount }: { unlockedCount: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx    = canvas.getContext("2d")!;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let raf: number, t = 0;

    // Particle effects when a piece unlocks
    const unlockParticles: { x:number;y:number;vx:number;vy:number;alpha:number;color:string;r:number }[] = [];

    function spawnUnlockParticles(cx: number, cy: number, color: string) {
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        unlockParticles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * (Math.random() * 3 + 1),
          vy: Math.sin(angle) * (Math.random() * 3 + 1) - 1,
          alpha: 1, color,
          r: Math.random() * 3 + 1,
        });
      }
    }

    let prevUnlocked = unlockedCount;

    function drawBase(cx: number, cy: number) {
      // Ghost outline — always visible (pale silhouette)
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#E8D5FF";
      ctx.lineWidth = 1.5;
      // body outline
      ctx.beginPath();
      ctx.moveTo(cx-20,cy+10); ctx.bezierCurveTo(cx-26,cy+35,cx-26,cy+62,cx-16,cy+80);
      ctx.lineTo(cx+16,cy+80); ctx.bezierCurveTo(cx+26,cy+62,cx+26,cy+35,cx+20,cy+10);
      ctx.closePath(); ctx.stroke();
      // head
      ctx.beginPath(); ctx.ellipse(cx,cy-28,16,19,0,0,Math.PI*2); ctx.stroke();
      // hat
      ctx.beginPath(); ctx.moveTo(cx-22,cy-42); ctx.lineTo(cx,cy-82); ctx.lineTo(cx+22,cy-42); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawBoots(cx: number, cy: number, alpha: number) {
      ctx.globalAlpha = alpha;
      // Left boot
      ctx.fillStyle = "#8B5E3C";
      ctx.beginPath();
      ctx.moveTo(cx-18,cy+62); ctx.bezierCurveTo(cx-22,cy+68,cx-24,cy+78,cx-16,cy+82);
      ctx.lineTo(cx-4,cy+82); ctx.lineTo(cx-4,cy+62); ctx.closePath(); ctx.fill();
      // Right boot
      ctx.beginPath();
      ctx.moveTo(cx+18,cy+62); ctx.bezierCurveTo(cx+22,cy+68,cx+24,cy+78,cx+16,cy+82);
      ctx.lineTo(cx+4,cy+82); ctx.lineTo(cx+4,cy+62); ctx.closePath(); ctx.fill();
      // Boot buckle details
      ctx.fillStyle = "#C9956C";
      ctx.fillRect(cx-20,cy+64,6,4); ctx.fillRect(cx+14,cy+64,6,4);
      ctx.shadowBlur = 8; ctx.shadowColor = "#C9956C";
      ctx.fillStyle = "#E8D5FF"; ctx.fillRect(cx-18,cy+65,2,2); ctx.fillRect(cx+16,cy+65,2,2);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    function drawRobe(cx: number, cy: number, alpha: number) {
      ctx.globalAlpha = alpha;
      const robe = ctx.createLinearGradient(cx-24,cy+8,cx+24,cy+82);
      robe.addColorStop(0,"#2A1850"); robe.addColorStop(0.5,"#1E1240"); robe.addColorStop(1,"#150D35");
      ctx.beginPath();
      ctx.moveTo(cx-22,cy+8);
      ctx.bezierCurveTo(cx-30,cy+35,cx-32,cy+58,cx-20,cy+80);
      ctx.lineTo(cx+20,cy+80);
      ctx.bezierCurveTo(cx+32,cy+58,cx+30,cy+35,cx+22,cy+8);
      ctx.closePath();
      ctx.fillStyle = robe; ctx.fill();
      ctx.strokeStyle = "#BF5FFF40"; ctx.lineWidth = 1.5; ctx.stroke();
      // Cape flow
      ctx.beginPath();
      ctx.moveTo(cx+22,cy+8);
      ctx.bezierCurveTo(cx+40+Math.sin(t)*5,cy+25,cx+42+Math.sin(t*0.8)*6,cy+55,cx+28,cy+76);
      ctx.bezierCurveTo(cx+34,cy+55,cx+36,cy+28,cx+22,cy+8);
      ctx.fillStyle = "#BF5FFF18"; ctx.fill();
      // Star embroidery
      ctx.font = "8px sans-serif"; ctx.fillStyle = "#BF5FFF80"; ctx.textAlign="center";
      ctx.fillText("✦",cx-5,cy+28); ctx.fillText("✦",cx+8,cy+44); ctx.fillText("✦",cx-8,cy+58);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    function drawBelt(cx: number, cy: number, alpha: number) {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#8B6914";
      ctx.fillRect(cx-22,cy+38,44,7);
      ctx.strokeStyle = "#E8D5FF60"; ctx.lineWidth=1; ctx.strokeRect(cx-22,cy+38,44,7);
      // Buckle centre
      ctx.fillStyle = "#E8D5FF";
      ctx.shadowBlur = 10; ctx.shadowColor = "#E8D5FF";
      ctx.fillRect(cx-5,cy+37,10,9);
      ctx.fillStyle = "#8B6914"; ctx.fillRect(cx-2,cy+39,4,5);
      ctx.shadowBlur = 0;
      // Potions on belt
      for(let i=0;i<3;i++){
        const px = cx-16+i*13, py=cy+44;
        ctx.fillStyle=["#BF5FFF80","#C9956C80","#7FFF0080"][i];
        ctx.beginPath(); ctx.ellipse(px,py+4,3,5,0,0,Math.PI*2); ctx.fill();
        ctx.fillStyle="#E8D5FF";
        ctx.beginPath(); ctx.ellipse(px,py,1.5,2,0,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function drawHat(cx: number, cy: number, alpha: number) {
      ctx.globalAlpha = alpha;
      // Brim
      ctx.fillStyle = "#0D0A1A";
      ctx.beginPath(); ctx.ellipse(cx,cy-42,28,7,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#7FFF0060"; ctx.lineWidth=1; ctx.stroke();
      // Cone
      ctx.beginPath();
      ctx.moveTo(cx-22,cy-42); ctx.lineTo(cx,cy-86+Math.sin(t*0.5)*2); ctx.lineTo(cx+22,cy-42);
      ctx.closePath();
      ctx.fillStyle = "#0D0A1A"; ctx.fill();
      ctx.strokeStyle = "#7FFF00"; ctx.lineWidth=1.5; ctx.stroke();
      // Hat band
      ctx.fillStyle = "#7FFF00";
      ctx.shadowBlur = 12; ctx.shadowColor = "#7FFF00";
      ctx.fillRect(cx-20,cy-48,40,6);
      ctx.shadowBlur = 0;
      // Band star
      ctx.font="10px sans-serif"; ctx.fillStyle="#0D0A1A"; ctx.textAlign="center";
      ctx.fillText("✦",cx,cy-43);
      // Floating stars around hat tip
      for(let i=0;i<4;i++){
        const angle=t*1.2+(i/4)*Math.PI*2;
        const sx=cx+Math.cos(angle)*18, sy=cy-82+Math.sin(angle)*10;
        ctx.beginPath(); ctx.arc(sx,sy,1.5,0,Math.PI*2);
        ctx.fillStyle="#7FFF00"; ctx.shadowBlur=8; ctx.shadowColor="#7FFF00";
        ctx.fill(); ctx.shadowBlur=0;
      }
      ctx.globalAlpha=1;
    }

    function drawSpellBook(cx: number, cy: number, alpha: number) {
      ctx.globalAlpha = alpha;
      // Book floats to left
      const bx = cx-52+Math.sin(t*0.8)*3;
      const by = cy+10+Math.cos(t*0.6)*2;
      ctx.save(); ctx.translate(bx,by); ctx.rotate(-0.15+Math.sin(t*0.4)*0.04);
      // Book body
      ctx.fillStyle="#1E0A3C";
      ctx.beginPath(); ctx.roundRect(-14,-20,28,36,3); ctx.fill();
      ctx.strokeStyle="#BF5FFF"; ctx.lineWidth=1.5; ctx.stroke();
      // Spine
      ctx.fillStyle="#150828"; ctx.fillRect(-14,-20,4,36);
      ctx.strokeStyle="#BF5FFF60"; ctx.lineWidth=0.5; ctx.strokeRect(-14,-20,4,36);
      // Glow sigil on cover
      ctx.font="14px sans-serif"; ctx.textAlign="center";
      ctx.fillStyle="#BF5FFF"; ctx.shadowBlur=14; ctx.shadowColor="#BF5FFF";
      ctx.fillText("⊕",0,4);
      ctx.shadowBlur=0;
      // Text lines
      ctx.fillStyle="#BF5FFF40"; ctx.font="4px sans-serif";
      [-8,-3,2,7,12].forEach(ly=>{ ctx.fillRect(-8,ly,16,1.5); });
      // Floating pages effect
      ctx.restore();
      // Glow aura
      const gr=ctx.createRadialGradient(bx,by,0,bx,by,25);
      gr.addColorStop(0,"#BF5FFF15"); gr.addColorStop(1,"transparent");
      ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(bx,by,25,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=1;
    }

    function drawHead(cx: number, cy: number) {
      // Always drawn (base character)
      // neck
      ctx.fillStyle="#F0C8B0";
      ctx.fillRect(cx-6,cy-12,12,16);
      // head
      ctx.beginPath(); ctx.ellipse(cx,cy-28,15,19,0,0,Math.PI*2);
      ctx.fillStyle="#F0C8B0"; ctx.fill();
      ctx.strokeStyle="#C9956C30"; ctx.lineWidth=1; ctx.stroke();
      // hair (always)
      for(let s=0;s<4;s++){
        ctx.beginPath(); ctx.moveTo(cx-9+s*5,cy-42);
        ctx.bezierCurveTo(cx-10+s*5+Math.sin(t+s)*2,cy+5,cx-8+s*5+Math.sin(t*0.7+s)*3,cy+30,cx-7+s*5,cy+52);
        ctx.strokeStyle="#1A0A0A"; ctx.lineWidth=3.5-s*0.4; ctx.stroke();
      }
      // Eyes
      const blink=Math.sin(t*0.25)>0.94;
      if(!blink){
        ctx.beginPath(); ctx.ellipse(cx-5,cy-30,3,3.5,0,0,Math.PI*2); ctx.fillStyle="#BF5FFF"; ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx+5,cy-30,3,3.5,0,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx-5.5,cy-31,1.2,1.8,0,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx+4.5,cy-31,1.2,1.8,0,0,Math.PI*2); ctx.fill();
      } else {
        ctx.strokeStyle="#BF5FFF"; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(cx-8,cy-30); ctx.lineTo(cx-2,cy-30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx+2,cy-30); ctx.lineTo(cx+8,cy-30); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx,cy-22,5,0.2,Math.PI-0.2);
      ctx.strokeStyle="#C9956C"; ctx.lineWidth=1.5; ctx.stroke();
      // arms
      ctx.strokeStyle="#F0C8B0"; ctx.lineWidth=5; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(cx-20,cy+8); ctx.bezierCurveTo(cx-32,cy+20,cx-34,cy+38,cx-26,cy+52); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx+20,cy+8); ctx.bezierCurveTo(cx+32,cy+20,cx+34,cy+38,cx+26,cy+52); ctx.stroke();
      // Bare legs placeholder
      ctx.strokeStyle="#F0C8B0"; ctx.lineWidth=6;
      ctx.beginPath(); ctx.moveTo(cx-10,cy+80); ctx.lineTo(cx-12,cy+100); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx+10,cy+80); ctx.lineTo(cx+12,cy+100); ctx.stroke();
    }

    function drawCompletionAura(cx: number, cy: number) {
      // Full aura when all pieces unlocked
      for(let ring=0;ring<3;ring++){
        const r = 70+ring*20+Math.sin(t*1.5+ring)*8;
        const alpha2 = 0.15-ring*0.04;
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(191,95,255,${alpha2})`; ctx.lineWidth=2-ring*0.5; ctx.stroke();
      }
      // Orbiting runes
      const runes=["∫","∑","∂","π","∞","σ"];
      runes.forEach((r,i)=>{
        const angle=t*0.6+(i/runes.length)*Math.PI*2;
        const rx=cx+Math.cos(angle)*80, ry=cy+Math.sin(angle)*60;
        ctx.font="11px serif"; ctx.fillStyle="#BF5FFF80"; ctx.textAlign="center";
        ctx.shadowBlur=8; ctx.shadowColor="#BF5FFF";
        ctx.fillText(r,rx,ry); ctx.shadowBlur=0;
      });
    }

    // Spawn particles on new unlock
    if (unlockedCount > prevUnlocked) {
      const cx2 = canvas.width/2, cy2=canvas.height*0.52;
      spawnUnlockParticles(cx2, cy2, OUTFIT_PIECES[unlockedCount-1]?.color || "#BF5FFF");
      prevUnlocked = unlockedCount;
    }

    function loop() {
      ctx.clearRect(0,0,W,H);
      const cx=W/2, cy=H*0.52;

      // Background radial
      const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,H*0.6);
      bg.addColorStop(0,"#0D0A1A"); bg.addColorStop(1,"#06040E");
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // Floating ambient particles
      for(let i=0;i<20;i++){
        const px=((i*173+t*15)%W), py=((i*97+t*8)%H);
        const pa=(Math.sin(t*0.3+i)*0.5+0.5)*0.2;
        ctx.beginPath(); ctx.arc(px,py,1,0,Math.PI*2);
        ctx.fillStyle=`rgba(191,95,255,${pa})`; ctx.fill();
      }

      if(unlockedCount===OUTFIT_PIECES.length) drawCompletionAura(cx,cy);

      drawBase(cx,cy);

      // Layer pieces in order (bottom to top)
      const easeIn=(n:number)=>Math.min(1,n);
      if(unlockedCount>=1) drawBoots(cx,cy,easeIn(1));
      if(unlockedCount>=2) drawRobe(cx,cy,easeIn(1));
      if(unlockedCount>=3) drawBelt(cx,cy,easeIn(1));
      drawHead(cx,cy); // head always on top of robe
      if(unlockedCount>=4) drawHat(cx,cy,easeIn(1));
      if(unlockedCount>=5) drawSpellBook(cx,cy,easeIn(1));

      // Unlock particles
      for(let i=unlockParticles.length-1;i>=0;i--){
        const p=unlockParticles[i];
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.06; p.alpha-=0.022;
        if(p.alpha<=0){ unlockParticles.splice(i,1); continue; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.globalAlpha=p.alpha; ctx.fillStyle=p.color;
        ctx.shadowBlur=8; ctx.shadowColor=p.color; ctx.fill(); ctx.shadowBlur=0;
      }
      ctx.globalAlpha=1;

      // Progress text at bottom
      if(unlockedCount<OUTFIT_PIECES.length){
        ctx.font="bold 10px JetBrains Mono"; ctx.textAlign="center";
        ctx.fillStyle="#BF5FFF60";
        ctx.fillText(`${unlockedCount} / ${OUTFIT_PIECES.length} pieces unlocked`,cx,H-16);
      } else {
        ctx.font="bold 11px JetBrains Mono"; ctx.textAlign="center";
        ctx.fillStyle="#7FFF00"; ctx.shadowBlur=12; ctx.shadowColor="#7FFF00";
        ctx.fillText("✦  The Witch is Complete  ✦",cx,H-16);
        ctx.shadowBlur=0;
      }

      t+=0.016; raf=requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, [unlockedCount]);

  return <canvas ref={ref} className="w-full h-full" />;
}

/* ─────────────────────────────────────────
   CERTIFICATION SCROLL CARD
───────────────────────────────────────── */
function CertScroll({
  cert, index, unlocked, onClick, outfitPiece,
}: {
  cert: typeof certifications[0];
  index: number;
  unlocked: boolean;
  onClick: () => void;
  outfitPiece: typeof OUTFIT_PIECES[0];
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:30, rotateX:20 }}
      animate={inView ? { opacity:1, y:0, rotateX:0 } : {}}
      transition={{ delay: index*0.1, duration:0.6, type:"spring" }}
      onClick={onClick}
      className="cursor-pointer group"
      style={{ perspective:"800px" }}
    >
      <motion.div
        whileHover={{ y:-6, rotateY:4 }}
        whileTap={{ scale:0.96 }}
        transition={{ type:"spring", stiffness:300 }}
        className="witch-card p-5 relative overflow-hidden transition-all duration-300"
        style={{
          borderColor: unlocked ? cert.color+"70" : cert.color+"20",
          background:  unlocked ? `radial-gradient(ellipse at top,${cert.color}18,#06040E)` : "#0D0A1A",
          boxShadow:   unlocked ? `0 0 24px ${cert.color}25` : "none",
        }}
      >
        {/* Scroll texture top */}
        <div className="absolute top-0 left-0 right-0 h-2 rounded-t-2xl"
          style={{ background:`linear-gradient(90deg,transparent,${cert.color}30,transparent)` }} />

        <div className="flex items-start gap-4">
          {/* Outfit piece icon */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <motion.div
              animate={unlocked ? { rotate:[0,10,-10,0], scale:[1,1.15,1] } : {}}
              transition={{ repeat: unlocked?Infinity:0, duration:3 }}
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ background: unlocked?cert.color+"20":"#1A1033", border:`1px solid ${cert.color}${unlocked?"60":"20"}` }}
            >
              {unlocked ? outfitPiece.icon : "🔒"}
            </motion.div>
            <span className="font-mono text-xs" style={{ color: unlocked?cert.color:"#C4B5D430", fontSize:"0.55rem" }}>
              {unlocked ? outfitPiece.name : "Locked"}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1 flex-1">
            <div className="font-mono text-xs tracking-widest" style={{ color: cert.color+"80" }}>
              ✦ {cert.issuer}
            </div>
            <h4 className="font-cinzel text-sm font-bold leading-snug"
              style={{ color: unlocked?"#E8D5FF":"#C4B5D460" }}>
              {cert.title}
            </h4>
            <p className="font-mono text-xs text-witch-silver/40">{cert.period}</p>

            {/* Unlock status */}
            <div className="flex items-center gap-2 mt-2">
              <div className="h-1 flex-1 rounded-full overflow-hidden bg-witch-purple">
                <motion.div
                  initial={{ width:0 }}
                  animate={{ width: unlocked?"100%":"0%" }}
                  transition={{ duration:0.8, ease:"easeOut" }}
                  className="h-full rounded-full"
                  style={{ background:`linear-gradient(90deg,${cert.color},${cert.color}80)` }}
                />
              </div>
              <span className="font-mono text-xs" style={{ color: unlocked?cert.color:"#C4B5D430" }}>
                {unlocked ? "MASTERED" : "CLICK"}
              </span>
            </div>
          </div>
        </div>

        {/* Unlocked sparkle burst */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity:1, scale:0 }}
              animate={{ opacity:0, scale:2.5 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.6 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background:`radial-gradient(circle,${cert.color}40,transparent)` }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function Certifications() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin:"-60px" });
  const { t }  = useLang();

  // Track which certs have been clicked/unlocked
  const [unlocked, setUnlocked] = useState<boolean[]>(
    new Array(certifications.length).fill(false)
  );

  const unlockedCount = unlocked.filter(Boolean).length;

  const handleUnlock = (i: number) => {
    setUnlocked(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const unlockAll = () => setUnlocked(new Array(certifications.length).fill(true));
  const resetAll  = () => setUnlocked(new Array(certifications.length).fill(false));

  return (
    <section id="certifications" ref={ref} className="section-base py-20 px-6 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-witch-violet/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity:0,y:40 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.8 }} className="text-center mb-12">
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">
            ✦ {t("certs_label")}
          </div>
          <h2 className="section-title shimmer-text">{t("certs_title")}</h2>
          <p className="font-dm italic text-witch-silver/50 mt-2 text-sm">
            {t("certs_subtitle")} — {unlockedCount}/{OUTFIT_PIECES.length} pieces unlocked
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — cert scrolls */}
          <div className="flex flex-col gap-4">
            {certifications.map((cert, i) => (
              <CertScroll
                key={cert.title}
                cert={cert}
                index={i}
                unlocked={unlocked[i]}
                onClick={() => handleUnlock(i)}
                outfitPiece={OUTFIT_PIECES[i] || OUTFIT_PIECES[OUTFIT_PIECES.length-1]}
              />
            ))}

            {/* Control row */}
            <motion.div initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
              transition={{ delay:0.6 }}
              className="flex gap-3 mt-2">
              <button onClick={unlockAll}
                className="flex-1 font-mono text-xs tracking-widest py-2.5 rounded-xl border border-witch-violet/30 text-witch-violet hover:bg-witch-violet/10 transition-all">
                Mark All Complete ✦
              </button>
              <button onClick={resetAll}
                className="flex-1 font-mono text-xs tracking-widest py-2.5 rounded-xl border border-witch-silver/20 text-witch-silver/40 hover:text-witch-silver/70 transition-all">
                Reset
              </button>
            </motion.div>
          </div>

          {/* Right — witch canvas */}
          <motion.div initial={{ opacity:0,x:40 }} animate={inView?{opacity:1,x:0}:{}}
            transition={{ duration:0.8,delay:0.2 }}
            className="sticky top-24">
            <div className="rounded-2xl overflow-hidden relative"
              style={{ height:"460px", border:"1px solid #BF5FFF20" }}>
              <WitchAssemblyCanvas unlockedCount={Math.min(unlockedCount, OUTFIT_PIECES.length)} />
            </div>

            {/* Completion banner */}
            <AnimatePresence>
              {unlockedCount === certifications.length && (
                <motion.div
                  initial={{ opacity:0,y:20,scale:0.9 }}
                  animate={{ opacity:1,y:0,scale:1 }}
                  exit={{ opacity:0,y:10 }}
                  transition={{ type:"spring",stiffness:200 }}
                  className="mt-4 p-4 rounded-2xl text-center"
                  style={{ background:"radial-gradient(ellipse,#7FFF0015,#06040E)", border:"1px solid #7FFF0050" }}>
                  <p className="font-cinzel text-sm font-bold text-witch-green text-glow-green">
                    {t("certs_all_done")}
                  </p>
                  <p className="font-dm italic text-witch-silver/50 text-xs mt-1">
                    {t("certs_complete")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
