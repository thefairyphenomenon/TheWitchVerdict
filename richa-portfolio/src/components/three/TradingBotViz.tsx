"use client";
import { useEffect, useRef } from "react";

export default function TradingBotViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Generate OHLC data
    const N = 40;
    let price = 180;
    const candles = Array.from({ length: N }, (_, i) => {
      const open  = price;
      const move  = (Math.random() - 0.46) * 6;
      const close = price + move;
      const high  = Math.max(open, close) + Math.random() * 4;
      const low   = Math.min(open, close) - Math.random() * 4;
      price = close;
      return { open, close, high, low, i };
    });

    // Signals: random buy/sell markers
    const signals: { idx: number; type: "BUY" | "SELL"; price: number }[] = [];
    for (let i = 5; i < N - 5; i += Math.floor(Math.random() * 6 + 4)) {
      const c = candles[i];
      signals.push({ idx: i, type: Math.random() > 0.5 ? "BUY" : "SELL", price: c.close });
    }

    const allPrices = candles.flatMap(c => [c.high, c.low]);
    const minP = Math.min(...allPrices) - 5;
    const maxP = Math.max(...allPrices) + 5;

    function priceToY(p: number) {
      return H * 0.85 - ((p - minP) / (maxP - minP)) * (H * 0.7);
    }

    // Animated ticker: reveal candles one by one then loop
    let visibleCount = 0;
    let raf: number;
    let t = 0;
    let phase: "reveal" | "hold" | "pulse" = "reveal";
    let holdTimer = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#06040E";
      ctx.fillRect(0, 0, W, H);

      // Grid lines
      const gridPrices = [minP, minP + (maxP - minP) * 0.25, minP + (maxP - minP) * 0.5,
        minP + (maxP - minP) * 0.75, maxP];
      gridPrices.forEach(p => {
        const y = priceToY(p);
        ctx.beginPath();
        ctx.moveTo(30, y); ctx.lineTo(W, y);
        ctx.strokeStyle = "#BF5FFF10";
        ctx.lineWidth   = 0.5;
        ctx.stroke();
        ctx.font        = "9px JetBrains Mono, monospace";
        ctx.fillStyle   = "#C4B5D450";
        ctx.fillText(p.toFixed(0), 2, y + 3);
      });

      const candleW = (W - 40) / N * 0.7;
      const step    = (W - 40) / N;

      // Draw visible candles
      const count = Math.min(Math.floor(visibleCount), N);
      for (let i = 0; i < count; i++) {
        const c  = candles[i];
        const x  = 35 + i * step + step / 2;
        const isUp = c.close >= c.open;
        const col = isUp ? "#7FFF00" : "#C9956C";

        // Wick
        ctx.beginPath();
        ctx.moveTo(x, priceToY(c.high));
        ctx.lineTo(x, priceToY(c.low));
        ctx.strokeStyle = col + "80";
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Body
        const y1 = priceToY(Math.max(c.open, c.close));
        const y2 = priceToY(Math.min(c.open, c.close));
        const bodyH = Math.max(y2 - y1, 1);
        ctx.fillStyle   = col;
        ctx.shadowBlur  = i === count - 1 ? 12 : 0;
        ctx.shadowColor = col;
        ctx.fillRect(x - candleW / 2, y1, candleW, bodyH);
        ctx.shadowBlur  = 0;
      }

      // MA line (simple: close prices moving average over 5)
      if (count > 5) {
        ctx.beginPath();
        for (let i = 5; i < count; i++) {
          const avg = candles.slice(i - 5, i).reduce((s, c) => s + c.close, 0) / 5;
          const x   = 35 + i * step + step / 2;
          if (i === 5) ctx.moveTo(x, priceToY(avg));
          else         ctx.lineTo(x, priceToY(avg));
        }
        ctx.strokeStyle = "#BF5FFF80";
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      }

      // Draw visible signals
      signals.filter(s => s.idx < count).forEach(s => {
        const x = 35 + s.idx * step + step / 2;
        const y = priceToY(s.price) + (s.type === "BUY" ? 14 : -14);
        ctx.font        = "10px JetBrains Mono, monospace";
        ctx.fillStyle   = s.type === "BUY" ? "#7FFF00" : "#C9956C";
        ctx.shadowBlur  = 8;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fillText(s.type === "BUY" ? "▲" : "▼", x - 5, y);
        ctx.shadowBlur  = 0;
      });

      // Telegram pulse indicator
      if (phase !== "reveal") {
        const px = W - 110;
        const py = 20;
        ctx.fillStyle   = "#C9956C";
        ctx.shadowBlur  = 12;
        ctx.shadowColor = "#C9956C";
        ctx.beginPath();
        ctx.arc(px, py, 5 + Math.sin(t * 6) * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.font       = "9px JetBrains Mono, monospace";
        ctx.fillStyle  = "#C4B5D4";
        ctx.fillText("TELEGRAM SIGNAL", px + 10, py + 3);
      }

      // Status label
      ctx.font      = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "#BF5FFF";
      ctx.fillText("n8n PIPELINE LIVE", 35, 16);

      // Phase logic
      if (phase === "reveal") {
        visibleCount += 0.35;
        if (visibleCount >= N) { phase = "hold"; holdTimer = 0; }
      } else if (phase === "hold") {
        holdTimer++;
        if (holdTimer > 90) { phase = "pulse"; }
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    }
    draw();
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
