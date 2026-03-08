"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let raf: number;

    // Spawn one sparkle per N pixels moved
    let lastSparkleX = 0, lastSparkleY = 0;
    const SPARKLE_THRESHOLD = 20;

    const COLORS = ["#BF5FFF", "#C9956C", "#E8D5FF", "#7FFF00"];

    function spawnSparkle(x: number, y: number) {
      const el = document.createElement("div");
      el.className = "sparkle";
      const size = Math.random() * 5 + 3;
      const angle = Math.random() * 360;
      const distance = Math.random() * 16 + 8;
      const dx = Math.cos((angle * Math.PI) / 180) * distance;
      const dy = Math.sin((angle * Math.PI) / 180) * distance;
      el.style.cssText = `
        width:${size}px; height:${size}px;
        background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
        left:${x + dx}px; top:${y + dy}px;
        opacity:0.9;
        box-shadow:0 0 ${size * 2}px currentColor;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 800);
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top  = `${mouseY}px`;
      }

      const dx = mouseX - lastSparkleX;
      const dy = mouseY - lastSparkleY;
      if (Math.sqrt(dx * dx + dy * dy) > SPARKLE_THRESHOLD) {
        spawnSparkle(mouseX, mouseY);
        lastSparkleX = mouseX;
        lastSparkleY = mouseY;
      }
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

    function tick() {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top  = `${ringY}px`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
