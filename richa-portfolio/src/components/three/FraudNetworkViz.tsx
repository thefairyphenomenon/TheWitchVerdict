"use client";
import { useEffect, useRef } from "react";

interface Node { id: string; x: number; y: number; vx: number; vy: number; type: "normal" | "suspect" | "fraud" | "hub"; }
interface Edge { source: number; target: number; active: boolean; }

export default function FraudNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Generate nodes
    const NODE_COUNT = 28;
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const types = ["normal", "normal", "normal", "normal", "suspect", "suspect", "fraud"] as const;
      return {
        id: `N${i}`,
        x: 40 + Math.random() * (W - 80),
        y: 40 + Math.random() * (H - 80),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        type: i === 0 ? "hub" : types[Math.floor(Math.random() * types.length)],
      };
    });

    // Generate edges (hub connects to many)
    const edges: Edge[] = [];
    nodes.forEach((n, i) => {
      if (i === 0) return;
      edges.push({ source: 0, target: i, active: false });
      if (i < NODE_COUNT - 1 && Math.random() > 0.55) {
        edges.push({ source: i, target: i + 1, active: false });
      }
    });

    // Animate one "detection sweep" every 2.5s
    let sweepActive = -1;
    let sweepTimer = 0;
    const SWEEP_INTERVAL = 150;

    let t = 0;
    let raf: number;

    const NODE_COLOR = {
      normal:  "#C4B5D4",
      suspect: "#C9956C",
      fraud:   "#7FFF00",
      hub:     "#BF5FFF",
    };

    function drawArrow(x1: number, y1: number, x2: number, y2: number, color: string, glow: boolean) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth   = glow ? 1.5 : 0.5;
      if (glow) {
        ctx.shadowBlur  = 8;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur  = 0;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function drawNode(n: Node, pulse: boolean) {
      const r    = n.type === "hub" ? 10 : n.type === "fraud" ? 7 : 5;
      const col  = NODE_COLOR[n.type];
      // Glow ring
      if (pulse || n.type === "fraud" || n.type === "hub") {
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        gr.addColorStop(0,   col + "40");
        gr.addColorStop(1,   "transparent");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.shadowBlur  = pulse ? 20 : n.type !== "normal" ? 10 : 4;
      ctx.shadowColor = col;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label on fraud nodes
      if (n.type === "fraud") {
        ctx.font = "bold 8px JetBrains Mono, monospace";
        ctx.fillStyle = "#7FFF00";
        ctx.fillText("⚠", n.x + 8, n.y - 6);
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      // Dark bg
      ctx.fillStyle = "#06040E";
      ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = "#BF5FFF08";
      ctx.lineWidth   = 0.5;
      for (let gx = 0; gx < W; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
      for (let gy = 0; gy < H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

      // Edges
      sweepTimer++;
      if (sweepTimer > SWEEP_INTERVAL) {
        sweepActive = Math.floor(Math.random() * edges.length);
        sweepTimer  = 0;
      }

      edges.forEach((e, i) => {
        const s = nodes[e.source];
        const tgt = nodes[e.target];
        const isActive = i === sweepActive;
        const col  = isActive
          ? nodes[tgt.type === "fraud" ? e.target : e.source].type === "fraud" ? "#7FFF00" : "#BF5FFF"
          : "#BF5FFF18";
        drawArrow(s.x, s.y, tgt.x, tgt.y, col, isActive);

        // Moving dot on active edge
        if (isActive) {
          const prog = ((t * 2) % 1);
          const dx   = tgt.x - s.x;
          const dy   = tgt.y - s.y;
          ctx.beginPath();
          ctx.arc(s.x + dx * prog, s.y + dy * prog, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#7FFF00";
          ctx.shadowBlur  = 10;
          ctx.shadowColor = "#7FFF00";
          ctx.fill();
          ctx.shadowBlur  = 0;
        }
      });

      // Nodes physics
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 20 || n.x > W - 20) n.vx *= -1;
        if (n.y < 20 || n.y > H - 20) n.vy *= -1;
        const pulse = n.type === "fraud" && Math.sin(t * 4) > 0.5;
        drawNode(n, pulse);
      });

      // Legend
      const legend = [
        { label: "Normal", color: "#C4B5D4" },
        { label: "Suspect", color: "#C9956C" },
        { label: "Flagged", color: "#7FFF00" },
        { label: "Hub",     color: "#BF5FFF" },
      ];
      legend.forEach((l, i) => {
        ctx.beginPath();
        ctx.arc(12, H - 70 + i * 16, 4, 0, Math.PI * 2);
        ctx.fillStyle   = l.color;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = l.color;
        ctx.fill();
        ctx.shadowBlur  = 0;
        ctx.font        = "10px JetBrains Mono, monospace";
        ctx.fillStyle   = "#C4B5D4";
        ctx.fillText(l.label, 22, H - 66 + i * 16);
      });

      t += 0.016;
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-64 rounded-xl"
      style={{ background: "#06040E" }}
    />
  );
}
