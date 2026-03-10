"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Language } from "@/data/translations";
import { useLang } from "@/hooks/useLang";

const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "hi", label: "हि", flag: "🇮🇳" },
  { code: "de", label: "DE", flag: "🇩🇪" },
];

export default function LanguageToggle() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, isFlipping } = useLang();

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        disabled={isFlipping}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs tracking-widest transition-all duration-300 disabled:opacity-50"
        style={{
          borderColor: "#BF5FFF60",
          color: "#E8D5FF",
          background: "rgba(191,95,255,0.08)",
        }}
      >
        <span>{LANGS.find((l) => l.code === lang)?.flag}</span>
        <span>{LANGS.find((l) => l.code === lang)?.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}>▾</motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute top-full right-0 mt-2 flex flex-col gap-1 p-2 rounded-xl border z-50"
            style={{ background: "#0D0A1A", borderColor: "#BF5FFF30", minWidth: "110px" }}
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs tracking-widest transition-all duration-200"
                style={{
                  color: lang === l.code ? "#BF5FFF" : "#C4B5D4",
                  background: lang === l.code ? "#BF5FFF18" : "transparent",
                }}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && <span className="ml-auto">✦</span>}
              </button>
            ))}
            <p className="px-2 pt-1 font-mono text-[0.6rem] text-witch-silver/40">book flip transition ✦</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
