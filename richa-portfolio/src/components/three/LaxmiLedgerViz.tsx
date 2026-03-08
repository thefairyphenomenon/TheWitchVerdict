"use client";
import { useEffect, useRef } from "react";

interface Tx { from: string; to: string; amount: number; type: "credit" | "debit"; progress: number; speed: number; active: boolean; }

export default function LaxmiLedgerViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    // Nodes: accounts
    const accounts = [
      { id: "WALLET",  label: "Wallet",   x: W / 2,        y: H / 2,       r: 22, color: "#7FFF00" },
      { id: "UPI",     label: "UPI/BHIM", x: W * 0.12,     y: H * 0.3,     r: 16, color: "#BF5FFF" },
      { id: "RAZORPAY",label: "Razorpay", x: W * 0.85,     y: H * 0.25,    r: 16, color: "#C9956C" },
      { id: "SAVINGS", label: "Savings",  x: W * 0.15,     y: H * 0.72,    r: 14, color: "#E8D5FF" },
      { id: "EMFUND",  label: "Emergency",x: W * 0.82,     y: H * 0.75,    r: 14, color: "#C9956C" },
      { id: "AGENT",   label: "AI Agent", x: W / 2,        y: H * 0.12,    r: 14, color: "#BF5FFF" },
    ];

    const txTemplates: Omit<Tx, "progress" | "active">[] = [
      { from: "UPI",      to: "WALLET",   amount: 850,  type: "credit", speed: 0.008 },
      { from: "WALLET",   to: "SAVINGS",  amount: 200,  type: "debit",  speed: 0.006 },
      { from: "WALLET",   to: "RAZORPAY", amount: 1200, type: "debit",  speed: 0.007 },
      { from: "WALLET",   to: "EMFUND",   amount: 300,  type: "debit",  speed: 0.005 },
      { from: "AGENT",    to: "WALLET",   amount: 0,    type: "credit", speed: 0.009 },
      { from: "RAZORPAY", to: "WALLET",   amount: 450,  type: "credit", speed: 0.006 },
    ];

    // Stagger tx activation
    const txs: Tx[] = txTemplates.map((t, i) => ({
      ...t,
      progress: -(i * 0.25), // stagger
      active: false,
    }));

    let raf: number;
    let t = 0;
    let ledgerEntries: { label: string; amount: string; type: string; age: number }[] = [];
    let entryTimer = 0;

    function getNode(id: string) { return accounts.find(a => a.id === id)!; }

    function addLedgerEntry(tx: Tx) {
      const labels = ["Food", "Rent", "Transport", "Income", "Emergency", "AI Budget"];
      ledgerEntries.unshift({
        label:  labels[Math.floor(Math.random() * labels.length)],
        amount: (tx.amount || Math.floor(Math.random() * 2000 + 100)).toString(),
        type:   tx.type,
        age:    0,
      });
      if (ledgerEntries.length > 5) ledgerEntries.pop();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#06040E";
      ctx.fillRect(0, 0, W, H);

      // Subtle radial glow from wallet
      const wn = getNode("WALLET");
      const wg  = ctx.createRadialGradient(wn.x, wn.y, 0, wn.x, wn.y, 140);
      wg.addColorStop(0,   "#7FFF0008");
      wg.addColorStop(1,   "transparent");
      ctx.fillStyle = wg;
      ctx.fillRect(0, 0, W, H);

      // Draw static connection lines
      txTemplates.forEach(tx => {
        const s = getNode(tx.from), tgt = getNode(tx.to);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y); ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = "#BF5FFF12";
        ctx.lineWidth   = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Animate transactions
      txs.forEach(tx => {
        tx.progress += tx.speed;
        if (tx.progress > 1.1) {
          addLedgerEntry(tx);
          tx.progress = -Math.random() * 0.5;
        }
        if (tx.progress < 0 || tx.progress > 1) return;

        const s = getNode(tx.from), tgt = getNode(tx.to);
        const x  = s.x + (tgt.x - s.x) * tx.progress;
        const y  = s.y + (tgt.y - s.y) * tx.progress;
        const col = tx.type === "credit" ? "#7FFF00" : "#C9956C";

        // Trail
        for (let trail = 1; trail <= 6; trail++) {
          const tp = Math.max(0, tx.progress - trail * 0.02);
          const tx_ = s.x + (tgt.x - s.x) * tp;
          const ty_ = s.y + (tgt.y - s.y) * tp;
          ctx.beginPath();
          ctx.arc(tx_, ty_, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = col + Math.floor((1 - trail / 6) * 60).toString(16).padStart(2, "0");
          ctx.fill();
        }

        // Particle
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle   = col;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = col;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Amount label on particle
        if (tx.amount > 0) {
          ctx.font      = "8px JetBrains Mono";
          ctx.fillStyle = col;
          ctx.fillText(`₹${tx.amount}`, x + 6, y - 4);
        }
      });

      // Draw account nodes
      accounts.forEach(a => {
        const pulse = Math.sin(t * 2 + a.x) * 0.5 + 0.5;
        // Glow
        const gr = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 3 + pulse * 6);
        gr.addColorStop(0,   a.color + "40");
        gr.addColorStop(1,   "transparent");
        ctx.fillStyle = gr;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r * 3 + pulse * 6, 0, Math.PI * 2);
        ctx.fill();
        // Node
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle   = a.color + "20";
        ctx.strokeStyle = a.color;
        ctx.lineWidth   = 1.5;
        ctx.shadowBlur  = 15;
        ctx.shadowColor = a.color;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur  = 0;
        // Label
        ctx.font      = `bold 9px JetBrains Mono`;
        ctx.fillStyle = a.color;
        ctx.textAlign = "center";
        ctx.fillText(a.label, a.x, a.y + a.r + 13);
        ctx.textAlign = "left";
      });

      // Live ledger feed (right side)
      ledgerEntries.forEach((e, i) => {
        e.age++;
        const opacity = Math.max(0, 1 - e.age / 180);
        const y       = H - 20 - i * 18;
        const col     = e.type === "credit" ? "#7FFF00" : "#C9956C";
        ctx.font      = "9px JetBrains Mono, monospace";
        ctx.fillStyle = `rgba(196, 181, 212, ${opacity * 0.7})`;
        ctx.textAlign = "right";
        ctx.fillText(e.label, W - 70, y);
        ctx.fillStyle = col.replace(")", `, ${opacity})`.replace("rgb", "rgba"));
        ctx.fillText((e.type === "credit" ? "+ " : "- ") + "₹" + e.amount, W - 5, y);
        ctx.textAlign = "left";
      });

      // Status
      ctx.font      = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "#7FFF00";
      ctx.fillText("LAXMI ENGINE · LIVE", 10, 16);
      ctx.font      = "9px JetBrains Mono, monospace";
      ctx.fillStyle = "#C4B5D460";
      ctx.fillText("Double-Entry Bookkeeping · ACID", 10, 28);

      entryTimer++;
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
