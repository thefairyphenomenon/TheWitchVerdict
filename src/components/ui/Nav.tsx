"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, personal } from "@/data/portfolio";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const ids = navItems.map(n => n.href.replace("#", ""));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-witch-void/80 backdrop-blur-xl border-b border-witch-violet/10" : ""
      }`}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo("#hero")}
        className="font-cinzel text-sm font-bold tracking-widest text-witch-violet text-glow-violet"
      >
        ✦ {personal.name.split(" ")[0]}
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map(item => (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className={`nav-link ${active === item.href.replace("#", "") ? "!text-witch-violet" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CTA */}
      <a
        href={`mailto:${personal.email}`}
        className="hidden md:flex items-center gap-2 font-mono text-xs tracking-widest text-witch-void bg-witch-violet px-4 py-2 rounded-full hover:bg-witch-rose transition-colors duration-300"
      >
        Send Raven ✦
      </a>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-witch-violet text-xl">
        {open ? "✕" : "☰"}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-witch-deep/95 backdrop-blur-xl border-b border-witch-violet/20 p-6 flex flex-col gap-4"
          >
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link text-left text-base"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
