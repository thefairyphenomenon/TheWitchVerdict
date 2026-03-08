"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { education } from "@/data/portfolio";

/* ── Floating spark particles bg ── */
function EducationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let raf: number;
    const sparks = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vy: -(Math.random() * 0.5 + 0.15),
      vx: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2.2 + 0.5,
      alpha: Math.random(),
      color: ["#BF5FFF","#C9956C","#7FFF00","#E8D5FF"][Math.floor(Math.random()*4)],
      wobble: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      sparks.forEach(s => {
        s.wobble += 0.022; s.x += s.vx + Math.sin(s.wobble)*0.35; s.y += s.vy; s.alpha -= 0.0025;
        if (s.alpha <= 0 || s.y < -10) { s.x = Math.random()*W; s.y = H+10; s.alpha = Math.random()*0.7+0.3; }
        ctx.save(); ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.translate(s.x, s.y); ctx.rotate(t*0.5+s.wobble);
        ctx.beginPath();
        for (let i=0;i<4;i++){
          const a=(i/4)*Math.PI*2;
          ctx.lineTo(Math.cos(a)*s.r*2.5, Math.sin(a)*s.r*2.5);
          ctx.lineTo(Math.cos(a+Math.PI/4)*s.r*0.8, Math.sin(a+Math.PI/4)*s.r*0.8);
        }
        ctx.closePath(); ctx.fillStyle=s.color; ctx.shadowBlur=8; ctx.shadowColor=s.color; ctx.fill();
        ctx.restore();
      });
      t += 0.016; raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── 2D Animated Buildings ── */
function Building2D({ index }: { index: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const colors = ["#BF5FFF","#C9956C","#7FFF00"];

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let raf: number, t = 0;
    const col = colors[index];

    const drawBuilding = [
      // WorldQuant — sleek modern tower
      () => {
        ctx.fillStyle="#06040E"; ctx.fillRect(0,H*0.82,W,H*0.18);
        const tw=W*0.22, tx=W/2-tw/2;
        const grad=ctx.createLinearGradient(tx,0,tx+tw,0);
        grad.addColorStop(0,"#1A1033"); grad.addColorStop(0.5,"#2A1850"); grad.addColorStop(1,"#1A1033");
        ctx.fillStyle=grad; ctx.fillRect(tx,H*0.18,tw,H*0.64);
        for(let row=0;row<10;row++) for(let c=0;c<3;c++){
          const wx=tx+8+c*(tw/3-2)+4, wy=H*0.22+row*(H*0.055);
          const lit=Math.sin(t*0.8+row*0.7+c*1.3)>0.3;
          ctx.fillStyle=lit?col+"cc":"#0D0A1A"; ctx.shadowBlur=lit?6:0; ctx.shadowColor=col;
          ctx.fillRect(wx,wy,tw/3-10,H*0.035);
        }
        ctx.shadowBlur=0;
        ctx.strokeStyle=col; ctx.lineWidth=2;
        ctx.beginPath(); ctx.moveTo(W/2,H*0.18); ctx.lineTo(W/2,H*0.06); ctx.stroke();
        ctx.beginPath(); ctx.arc(W/2,H*0.06,3+Math.sin(t*3)*1.5,0,Math.PI*2);
        ctx.fillStyle=col; ctx.shadowBlur=14; ctx.shadowColor=col; ctx.fill(); ctx.shadowBlur=0;
        ctx.fillStyle="#120D2A";
        ctx.fillRect(tx-tw*0.35,H*0.42,tw*0.33,H*0.4);
        ctx.fillRect(tx+tw,H*0.42,tw*0.33,H*0.4);
        ctx.font="bold 9px JetBrains Mono"; ctx.fillStyle=col; ctx.textAlign="center";
        ctx.fillText("WORLDQUANT UNIV", W/2, H*0.92);
      },
      // GL Bajaj — university campus
      () => {
        ctx.fillStyle="#06040E"; ctx.fillRect(0,H*0.78,W,H*0.22);
        const bw=W*0.62, bx=W/2-bw/2;
        ctx.fillStyle="#1E1240"; ctx.fillRect(bx,H*0.3,bw,H*0.48);
        ctx.beginPath(); ctx.moveTo(bx-W*0.05,H*0.3); ctx.quadraticCurveTo(W/2,H*0.1,bx+bw+W*0.05,H*0.3);
        ctx.fillStyle="#2A1850"; ctx.fill();
        for(let p=0;p<5;p++){
          ctx.fillStyle="#0F0820"; ctx.fillRect(bx+10+p*(bw/5),H*0.52,bw/5-8,H*0.26);
        }
        for(let r=0;r<2;r++) for(let c=0;c<4;c++){
          const lit=Math.sin(t*0.6+r*2+c*1.7)>0.2;
          ctx.fillStyle=lit?col+"aa":"#06040E"; ctx.shadowBlur=lit?8:0; ctx.shadowColor=col;
          ctx.fillRect(bx+18+c*(bw/4),H*0.34+r*H*0.1,bw/4-14,H*0.07);
        }
        ctx.shadowBlur=0;
        ctx.strokeStyle=col+"80"; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(W/2,H*0.1); ctx.lineTo(W/2,H*0.02); ctx.stroke();
        ctx.fillStyle=col;
        ctx.beginPath(); ctx.moveTo(W/2,H*0.02); ctx.lineTo(W/2+20,H*0.055); ctx.lineTo(W/2,H*0.09); ctx.fill();
        ctx.font="bold 9px JetBrains Mono"; ctx.fillStyle=col; ctx.textAlign="center";
        ctx.fillText("GL BAJAJ INSTITUTE", W/2, H*0.88);
      },
      // CBSE school
      () => {
        ctx.fillStyle="#06040E"; ctx.fillRect(0,H*0.8,W,H*0.2);
        ctx.fillStyle="#1A1033"; ctx.fillRect(W*0.12,H*0.38,W*0.76,H*0.42);
        ctx.beginPath(); ctx.moveTo(W*0.08,H*0.38); ctx.lineTo(W/2,H*0.14); ctx.lineTo(W*0.92,H*0.38);
        ctx.closePath(); ctx.fillStyle="#241650"; ctx.fill();
        ctx.fillStyle=col+"30"; ctx.fillRect(W/2-14,H*0.6,28,H*0.2);
        ctx.strokeStyle=col+"60"; ctx.lineWidth=1.5; ctx.strokeRect(W/2-14,H*0.6,28,H*0.2);
        for(let w=0;w<4;w++){
          const lit=Math.sin(t*0.5+w*2.1)>0.1;
          ctx.fillStyle=lit?col+"99":"#0A0617"; ctx.shadowBlur=lit?6:0; ctx.shadowColor=col;
          ctx.fillRect(W*0.16+w*W*0.18,H*0.44,W*0.1,H*0.08);
        }
        ctx.shadowBlur=0;
        ctx.fillStyle="#120D2A"; ctx.fillRect(W/2-10,H*0.14,20,H*0.24);
        ctx.font="bold 9px JetBrains Mono"; ctx.fillStyle=col; ctx.textAlign="center";
        ctx.fillText("CBSE — 12TH GRADE", W/2, H*0.9);
      },
    ][index];

    function loop() {
      ctx.clearRect(0,0,W,H);
      drawBuilding();
      t += 0.016; raf = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, [index]);

  return <canvas ref={ref} className="w-full h-full" />;
}

/* ── 3D Comic Characters ── */
function ComicCharacter({ degreeIndex }: { degreeIndex: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    let raf: number, t = 0;

    function drawWitchScholar(cx: number, cy: number) {
      // WorldQuant witch with glowing scroll
      const bob = Math.sin(t*2)*4;
      ctx.save(); ctx.translate(cx, cy+bob);
      ctx.beginPath(); ctx.ellipse(0,72,26,7,0,0,Math.PI*2);
      ctx.fillStyle="#BF5FFF18"; ctx.fill();
      const robe=ctx.createLinearGradient(-22,-10,22,62);
      robe.addColorStop(0,"#2A1850"); robe.addColorStop(1,"#1A1033");
      ctx.beginPath();
      ctx.moveTo(-22,0); ctx.bezierCurveTo(-28,28,-30,52,-18,70);
      ctx.lineTo(18,70); ctx.bezierCurveTo(30,52,28,28,22,0);
      ctx.closePath(); ctx.fillStyle=robe; ctx.fill();
      ctx.strokeStyle="#BF5FFF30"; ctx.lineWidth=1; ctx.stroke();
      // flowing cape
      ctx.beginPath();
      ctx.moveTo(22,0); ctx.bezierCurveTo(38+Math.sin(t)*5,18,40+Math.sin(t*0.7)*7,48,26,66);
      ctx.bezierCurveTo(32,48,34,22,22,0);
      ctx.fillStyle="#BF5FFF15"; ctx.fill();
      // head
      ctx.beginPath(); ctx.ellipse(0,-28,15,18,0,0,Math.PI*2);
      ctx.fillStyle="#F5D0C0"; ctx.fill(); ctx.strokeStyle="#C9956C30"; ctx.lineWidth=1; ctx.stroke();
      // hair
      ctx.beginPath();
      ctx.moveTo(-15,-32); ctx.bezierCurveTo(-20,-54,-5,-60,0,-47);
      ctx.bezierCurveTo(5,-60,20,-54,15,-32);
      ctx.fillStyle="#1A0A0A"; ctx.fill();
      // witch hat
      ctx.beginPath(); ctx.moveTo(-20,-44); ctx.lineTo(0,-82); ctx.lineTo(20,-44); ctx.closePath();
      ctx.fillStyle="#0D0A1A"; ctx.fill(); ctx.strokeStyle="#BF5FFF70"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle="#BF5FFF"; ctx.fillRect(-16,-48,32,5);
      // hat star
      ctx.font="10px sans-serif"; ctx.fillStyle="#C9956C"; ctx.textAlign="center"; ctx.fillText("✦",0,-58);
      // eyes
      const blink=Math.sin(t*0.3)>0.95;
      if(!blink){
        ctx.beginPath(); ctx.ellipse(-5,-30,3.5,4,0,0,Math.PI*2); ctx.fillStyle="#BF5FFF"; ctx.fill();
        ctx.beginPath(); ctx.ellipse(5,-30,3.5,4,0,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-5,-30,1.5,2,0,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
        ctx.beginPath(); ctx.ellipse(5,-30,1.5,2,0,0,Math.PI*2); ctx.fill();
      } else {
        ctx.strokeStyle="#BF5FFF"; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(-8,-30); ctx.lineTo(-2,-30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2,-30); ctx.lineTo(8,-30); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(0,-22,5,0.2,Math.PI-0.2);
      ctx.strokeStyle="#C9956C"; ctx.lineWidth=1.5; ctx.stroke();
      // arms
      ctx.strokeStyle="#F5D0C0"; ctx.lineWidth=5; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(-18,5); ctx.bezierCurveTo(-30,18,-32,34,-24,48); ctx.stroke();
      const sw=Math.sin(t*1.5)*4;
      ctx.beginPath(); ctx.moveTo(18,5); ctx.bezierCurveTo(30+sw,14,38+sw,26,34+sw,36); ctx.stroke();
      // glowing math scroll
      ctx.save(); ctx.translate(34+sw,36); ctx.rotate(Math.PI/6);
      ctx.fillStyle="#C9956C20"; ctx.shadowBlur=18; ctx.shadowColor="#BF5FFF";
      ctx.fillRect(-8,-18,16,34); ctx.shadowBlur=0;
      ctx.strokeStyle="#BF5FFF"; ctx.lineWidth=1; ctx.strokeRect(-8,-18,16,34);
      ctx.fillStyle="#BF5FFF80"; ctx.font="5px sans-serif"; ctx.textAlign="center";
      ["∫∂σ","∑√π","dX²"].forEach((l,i)=>ctx.fillText(l,0,-10+i*8));
      ctx.restore();
      // orbiting sparkles
      for(let i=0;i<5;i++){
        const a=t*1.3+(i/5)*Math.PI*2;
        ctx.beginPath(); ctx.arc(Math.cos(a)*38,Math.sin(a)*22-10,1.5,0,Math.PI*2);
        ctx.fillStyle=`hsl(${270+i*36},100%,75%)`; ctx.shadowBlur=6; ctx.shadowColor=ctx.fillStyle;
        ctx.fill(); ctx.shadowBlur=0;
      }
      ctx.restore();
    }

    function drawCoderGirl(cx: number, cy: number) {
      const bob=Math.sin(t*1.8)*3;
      ctx.save(); ctx.translate(cx,cy+bob);
      ctx.beginPath(); ctx.ellipse(0,70,24,6,0,0,Math.PI*2);
      ctx.fillStyle="#C9956C18"; ctx.fill();
      const robe=ctx.createLinearGradient(-20,-5,20,64);
      robe.addColorStop(0,"#1E1240"); robe.addColorStop(1,"#0F0820");
      ctx.beginPath();
      ctx.moveTo(-20,0); ctx.bezierCurveTo(-25,26,-26,50,-16,68);
      ctx.lineTo(16,68); ctx.bezierCurveTo(26,50,25,26,20,0);
      ctx.closePath(); ctx.fillStyle=robe; ctx.fill();
      ctx.strokeStyle="#C9956C25"; ctx.lineWidth=1; ctx.stroke();
      // head
      ctx.beginPath(); ctx.ellipse(0,-28,15,18,0,0,Math.PI*2);
      ctx.fillStyle="#F0C8B0"; ctx.fill();
      // wavy hair strands
      for(let s=0;s<4;s++){
        ctx.beginPath(); ctx.moveTo(-10+s*5,-42);
        ctx.bezierCurveTo(-12+s*5+Math.sin(t+s)*3,5,-10+s*5+Math.sin(t*0.7+s)*4,38,-8+s*5,54);
        ctx.strokeStyle="#1A0A0A"; ctx.lineWidth=4-s*0.5; ctx.stroke();
      }
      // bow
      ctx.save(); ctx.translate(10,-45);
      ctx.fillStyle="#C9956C";
      ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(-10,-8,-12,0,0,0); ctx.bezierCurveTo(12,0,10,-8,0,0); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(-10,8,-12,0,0,0); ctx.bezierCurveTo(12,0,10,8,0,0); ctx.fill();
      ctx.restore();
      // eyes
      const blink=Math.sin(t*0.25)>0.92;
      if(!blink){
        ctx.beginPath(); ctx.ellipse(-5,-30,3,3.5,0,0,Math.PI*2); ctx.fillStyle="#C9956C"; ctx.fill();
        ctx.beginPath(); ctx.ellipse(5,-30,3,3.5,0,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-5.5,-31,1.2,1.8,0,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
        ctx.beginPath(); ctx.ellipse(4.5,-31,1.2,1.8,0,0,Math.PI*2); ctx.fill();
      } else {
        ctx.strokeStyle="#C9956C"; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(-7,-30); ctx.lineTo(-3,-30); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(3,-30); ctx.lineTo(7,-30); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(0,-23,4,0.15,Math.PI-0.15); ctx.strokeStyle="#C9956C"; ctx.lineWidth=1.5; ctx.stroke();
      // typing arms
      const type=Math.sin(t*6)*3;
      ctx.strokeStyle="#F0C8B0"; ctx.lineWidth=4; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(-18,4); ctx.bezierCurveTo(-28,16,-30,30,-22+type,42); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(18,4); ctx.bezierCurveTo(28,16,30,30,22-type,42); ctx.stroke();
      // floating laptop
      ctx.save(); ctx.translate(0,46+Math.sin(t)*2);
      ctx.fillStyle="#1A1033"; ctx.strokeStyle="#7FFF00"; ctx.lineWidth=1.5;
      ctx.fillRect(-24,-8,48,24); ctx.strokeRect(-24,-8,48,24);
      ctx.fillStyle="#0D2A0D"; ctx.fillRect(-20,-5,40,18);
      ctx.fillStyle="#7FFF00"; ctx.font="4px JetBrains Mono"; ctx.textAlign="left";
      ["const f=()=>{","  return ∂x","  * ∫dt","};"].forEach((l,i)=>ctx.fillText(l,-18,-1+i*4.5));
      if(Math.sin(t*4)>0){ ctx.fillStyle="#7FFF00"; ctx.fillRect(-18+28,-1+3*4.5,2,4); }
      ctx.fillStyle="#2A1850"; ctx.fillRect(-24,-12,48,5);
      ctx.restore();
      // floating data particles
      for(let i=0;i<4;i++){
        const a=(t*0.8+i*1.57);
        const px=Math.cos(a)*44, py=-15+Math.sin(a)*18;
        ctx.beginPath(); ctx.arc(px,py,1.8,0,Math.PI*2);
        ctx.fillStyle="#7FFF00"; ctx.shadowBlur=8; ctx.shadowColor="#7FFF00"; ctx.fill(); ctx.shadowBlur=0;
      }
      ctx.restore();
    }

    function drawSchoolGirl(cx: number, cy: number) {
      const bob=Math.sin(t*2.2)*4;
      ctx.save(); ctx.translate(cx,cy+bob);
      ctx.beginPath(); ctx.ellipse(0,66,22,5,0,0,Math.PI*2);
      ctx.fillStyle="#7FFF0012"; ctx.fill();
      const uni=ctx.createLinearGradient(-18,-5,18,58);
      uni.addColorStop(0,"#0F1A0F"); uni.addColorStop(1,"#0A1208");
      ctx.beginPath();
      ctx.moveTo(-18,0); ctx.bezierCurveTo(-22,24,-22,46,-14,64);
      ctx.lineTo(14,64); ctx.bezierCurveTo(22,46,22,24,18,0);
      ctx.closePath(); ctx.fillStyle=uni; ctx.fill();
      ctx.strokeStyle="#7FFF0025"; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle="#7FFF00";
      ctx.beginPath(); ctx.arc(0,-2,4,0,Math.PI*2); ctx.fill();
      // head
      ctx.beginPath(); ctx.ellipse(0,-28,14,17,0,0,Math.PI*2);
      ctx.fillStyle="#EECBA0"; ctx.fill();
      // pigtails
      ctx.fillStyle="#1A0A0A";
      ctx.beginPath(); ctx.ellipse(-14,-38,5,14,-0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(14,-38,5,14,0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0,-42,15,10,0,0,Math.PI*2); ctx.fill();
      // big eyes
      ctx.beginPath(); ctx.ellipse(-5,-30,4,4.5,0,0,Math.PI*2); ctx.fillStyle="#7FFF00"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(5,-30,4,4.5,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(-5.5,-31,1.5,2,0,0,Math.PI*2); ctx.fillStyle="#fff"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(4.5,-31,1.5,2,0,0,Math.PI*2); ctx.fill();
      // cheeks
      ctx.beginPath(); ctx.ellipse(-8,-22,4,3,0,0,Math.PI*2); ctx.fillStyle="#FF8BA080"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(8,-22,4,3,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(0,-20,7,0.1,Math.PI-0.1); ctx.strokeStyle="#C9956C"; ctx.lineWidth=2; ctx.stroke();
      // arms raised
      const wave=Math.sin(t*3)*8;
      ctx.strokeStyle="#EECBA0"; ctx.lineWidth=5; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(-16,2); ctx.bezierCurveTo(-35,-8+wave,-42,-22+wave,-36,-36+wave); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(16,2); ctx.bezierCurveTo(35,-8-wave,42,-22-wave,36,-36-wave); ctx.stroke();
      // report card
      ctx.save(); ctx.translate(40,-40-wave); ctx.rotate(Math.PI/8+Math.sin(t)*0.04);
      ctx.fillStyle="#E8D5FF"; ctx.shadowBlur=14; ctx.shadowColor="#7FFF00";
      ctx.fillRect(-12,-16,24,30); ctx.shadowBlur=0;
      ctx.strokeStyle="#7FFF00"; ctx.lineWidth=1; ctx.strokeRect(-12,-16,24,30);
      ctx.fillStyle="#0D0A1A"; ctx.font="bold 5px sans-serif"; ctx.textAlign="center";
      ctx.fillText("CGPA",0,-8); ctx.fillStyle="#7FFF00"; ctx.font="bold 9px sans-serif";
      ctx.fillText("8.0",0,3); ctx.fillStyle="#0D0A1A"; ctx.font="5px sans-serif"; ctx.fillText("★★★★",0,11);
      ctx.restore();
      // rising stars
      for(let i=0;i<5;i++){
        const st=(t*1.8+i*0.6)%2.5, sx=-45+i*22, sy=20-st*38;
        if(st<2){ ctx.beginPath(); ctx.arc(sx,sy,2,0,Math.PI*2); ctx.fillStyle="#7FFF00"; ctx.shadowBlur=8; ctx.shadowColor="#7FFF00"; ctx.fill(); ctx.shadowBlur=0; }
      }
      ctx.restore();
    }

    const poses = [drawWitchScholar, drawCoderGirl, drawSchoolGirl];

    function loop() {
      ctx.clearRect(0,0,W,H);
      poses[degreeIndex](W/2, H*0.62);
      t += 0.016;
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => cancelAnimationFrame(raf);
  }, [degreeIndex]);

  return <canvas ref={ref} className="w-full h-full" />;
}

/* ── Main Section ── */
export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const colors = ["#BF5FFF","#C9956C","#7FFF00"];
  const edu = education[active];

  const handleSelect = (i: number) => {
    if (i === active) { setFlipped(f => !f); return; }
    setFlipped(false);
    setTimeout(() => setActive(i), 150);
  };

  const bubbles = [
    "MSc in\nfinancial\nmagic! ✦",
    "Coding\nspells\nin CS! 💻",
    "CGPA:\n8.0 ⭐",
  ];

  return (
    <section id="education" ref={ref} className="section-base py-20 px-6 overflow-hidden">
      <EducationCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-witch-void/30 to-witch-void/80 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.8 }} className="text-center mb-12">
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ The Grimoire</div>
          <h2 className="section-title shimmer-text">Education</h2>
          <p className="font-dm italic text-witch-silver/50 mt-2 text-sm">
            Select a chapter · Click the card to reveal spell details
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {education.map((e, i) => (
            <motion.button key={i} onClick={() => handleSelect(i)}
              initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay: i*0.1 }}
              className="font-mono text-xs tracking-widest px-5 py-2.5 rounded-full border transition-all duration-300"
              style={{
                borderColor: active===i ? colors[i] : colors[i]+"30",
                color: active===i ? colors[i] : "#C4B5D4",
                background: active===i ? colors[i]+"15" : "transparent",
                boxShadow: active===i ? `0 0 20px ${colors[i]}30` : "none",
              }}>
              {e.icon} {e.institution.split(" ").slice(0,2).join(" ")}
            </motion.button>
          ))}
        </div>

        {/* Stage — 3 panels */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.3 }}
            className="grid lg:grid-cols-3 gap-5 items-end">

            {/* Panel 1 — 2D Building */}
            <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6 }}
              className="h-72 rounded-2xl overflow-hidden relative"
              style={{ background:"linear-gradient(to top,#06040E,#0D0A1A)", border:`1px solid ${colors[active]}25` }}>
              <Building2D index={active} />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-witch-void/60 to-transparent pointer-events-none rounded-2xl" />
            </motion.div>

            {/* Panel 2 — Flip card */}
            <div className="h-72 cursor-pointer" style={{ perspective:"1000px" }}
              onClick={() => setFlipped(f=>!f)}>
              <motion.div className="relative w-full h-full"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration:0.6, type:"spring", stiffness:80 }}>
                {/* Front */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 p-6 text-center"
                  style={{ backfaceVisibility:"hidden", background:`radial-gradient(ellipse at center,${colors[active]}18,#06040E)`, border:`1px solid ${colors[active]}40` }}>
                  <motion.div animate={{ rotate:[0,10,-10,0], scale:[1,1.1,1] }} transition={{ repeat:Infinity, duration:3 }}
                    className="text-5xl select-none">{edu.icon}</motion.div>
                  <h3 className="font-cinzel text-base font-bold text-witch-mist leading-snug">{edu.degree}</h3>
                  <p className="font-dm italic text-witch-silver/60 text-sm">{edu.institution}</p>
                  <div className="font-mono text-xs tracking-widest" style={{ color:colors[active] }}>{edu.period}</div>
                  <motion.p animate={{ opacity:[0.3,1,0.3] }} transition={{ repeat:Infinity, duration:2 }}
                    className="font-mono text-xs text-witch-silver/40 mt-1">tap to reveal ✦</motion.p>
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow:`inset 0 0 40px ${colors[active]}08` }} />
                </div>
                {/* Back */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center gap-4 p-6"
                  style={{ backfaceVisibility:"hidden", transform:"rotateY(180deg)", background:`radial-gradient(ellipse at top,${colors[active]}22,#06040E)`, border:`1px solid ${colors[active]}55` }}>
                  <div className="font-mono text-xs tracking-widest uppercase" style={{ color:colors[active] }}>
                    ✦ Chapter Details
                  </div>
                  <p className="font-dm text-witch-silver/80 text-sm leading-relaxed">{edu.description}</p>
                  <div className="mt-auto border-t border-witch-violet/20 pt-4">
                    <div className="font-mono text-xs text-witch-silver/40 mb-1">Duration</div>
                    <div className="font-dm italic text-sm" style={{ color:colors[active] }}>{edu.period}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Panel 3 — Comic character */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.6 }}
              className="h-72 rounded-2xl overflow-hidden relative"
              style={{ background:"linear-gradient(to top,#06040E,#0D0A1A 70%,transparent)", border:`1px solid ${colors[active]}20` }}>
              <ComicCharacter degreeIndex={active} />
              {/* Speech bubble */}
              <motion.div key={`bubble-${active}`} initial={{ scale:0, opacity:0 }}
                animate={{ scale:1, opacity:1 }} transition={{ delay:0.4, type:"spring" }}
                className="absolute top-4 right-4 bg-white text-witch-void font-mono text-xs font-bold px-3 py-2 rounded-2xl rounded-tr-sm max-w-[110px] text-center leading-snug shadow-lg"
                style={{ whiteSpace:"pre-line" }}>
                {bubbles[active]}
                <div className="absolute -right-2 top-2 w-0 h-0"
                  style={{ borderLeft:"8px solid white", borderTop:"6px solid transparent", borderBottom:"6px solid transparent" }} />
              </motion.div>
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {education.map((_,i) => (
            <button key={i} onClick={() => handleSelect(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: active===i ? colors[active] : "#C4B5D440", transform: active===i ? "scale(1.6)" : "scale(1)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
