"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useLang";
import { Language } from "@/data/translations";

/* ── Full-screen particle burst overlay ── */
function ParticleBurst({ active, onComplete }: { active: boolean; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef   = useRef(false);

  useEffect(() => {
    if (!active) { doneRef.current = false; return; }
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const COLORS = ["#BF5FFF","#C9956C","#7FFF00","#E8D5FF","#C4B5D4"];
    const GLYPHS  = ["✦","◈","⬡","✧","⊕","∂","∑","∫","π","∞","✿","꩜"];

    // Petals — mix of shapes and glyphs
    const petals = Array.from({ length: 180 }, () => {
      const isGlyph = Math.random() > 0.55;
      return {
        x:      Math.random() * W,
        y:      -20 - Math.random() * H * 0.5,       // start above viewport
        vy:     Math.random() * 4 + 2,
        vx:     (Math.random() - 0.5) * 3,
        vrot:   (Math.random() - 0.5) * 0.15,
        rot:    Math.random() * Math.PI * 2,
        size:   Math.random() * 14 + 4,
        alpha:  Math.random() * 0.6 + 0.4,
        color:  COLORS[Math.floor(Math.random() * COLORS.length)],
        isGlyph,
        glyph:  GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.05 + 0.02,
        delay:  Math.random() * 0.6,   // stagger start
        life:   0,
      };
    });

    let t = 0, raf: number;
    const DURATION = 1.6; // seconds

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Vignette overlay that sweeps across
      const sweepX = (t / DURATION) * W * 1.4 - W * 0.2;
      const sweep  = ctx.createLinearGradient(sweepX - 200, 0, sweepX + 200, 0);
      sweep.addColorStop(0,   "transparent");
      sweep.addColorStop(0.4, "rgba(6,4,14,0.85)");
      sweep.addColorStop(0.6, "rgba(6,4,14,0.85)");
      sweep.addColorStop(1,   "transparent");
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, W, H);

      petals.forEach(p => {
        if (t < p.delay) return;
        p.life += 0.016;
        p.x    += p.vx + Math.sin(p.wobble) * 1.2;
        p.y    += p.vy;
        p.rot  += p.vrot;
        p.wobble += p.wobbleSpeed;
        // fade out near end
        const fadeAlpha = p.life > 0.8 ? Math.max(0, 1 - (p.life - 0.8) / 0.6) : 1;

        ctx.save();
        ctx.globalAlpha = p.alpha * fadeAlpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);

        if (p.isGlyph) {
          ctx.font        = `${p.size * 1.4}px serif`;
          ctx.fillStyle   = p.color;
          ctx.shadowBlur  = 10;
          ctx.shadowColor = p.color;
          ctx.textAlign   = "center";
          ctx.fillText(p.glyph, 0, 0);
        } else {
          // Petal shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.6, p.size * 0.6, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.6, -p.size * 0.6, -p.size * 0.6, 0, -p.size);
          ctx.fillStyle   = p.color;
          ctx.shadowBlur  = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
        ctx.restore();
      });

      t += 0.016;

      if (t >= DURATION && !doneRef.current) {
        doneRef.current = true;
        onComplete();
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[99990] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

/* ── Language pill ── */
const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "hi", label: "हि", flag: "🇮🇳" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  const [open,    setOpen]    = useState(false);
  const [bursting, setBursting] = useState(false);
  const [pending,  setPending]  = useState<Language | null>(null);

  const handleSelect = useCallback((code: Language) => {
    if (code === lang) { setOpen(false); return; }
    setPending(code);
    setBursting(true);
    setOpen(false);
  }, [lang]);

  const handleBurstComplete = useCallback(() => {
    if (pending) {
      setLang(pending);
      setPending(null);
    }
    setTimeout(() => setBursting(false), 200);
  }, [pending, setLang]);

  return (
    <>
      <ParticleBurst active={bursting} onComplete={handleBurstComplete} />

      <div className="relative">
        {/* Toggle button */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs tracking-widest transition-all duration-300"
          style={{
            borderColor: "#BF5FFF60",
            color:       "#E8D5FF",
            background:  "rgba(191,95,255,0.08)",
          }}
        >
          <span className="text-sm">{LANGS.find(l => l.code === lang)?.flag}</span>
          <span>{LANGS.find(l => l.code === lang)?.label}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ▾
          </motion.span>
        </motion.button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 flex flex-col gap-1 p-2 rounded-xl border z-50"
              style={{ background: "#0D0A1A", borderColor: "#BF5FFF30", minWidth: "110px" }}
            >
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l.code)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs tracking-widest transition-all duration-200 text-left"
                  style={{
                    color:      lang === l.code ? "#BF5FFF" : "#C4B5D4",
                    background: lang === l.code ? "#BF5FFF18" : "transparent",
                  }}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.label}</span>
                  {lang === l.code && <span className="ml-auto text-witch-violet">✦</span>}
                </button>
              ))}
              <div className="border-t border-witch-violet/10 mt-1 pt-1 px-2">
                <p className="font-mono text-xs text-witch-silver/30" style={{ fontSize: "0.6rem" }}>
                  petals will fall ✿
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
