"use client";

import dynamic from "next/dynamic";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { LangProvider, useLang } from "@/hooks/useLang";

const Cursor = dynamic(() => import("@/components/ui/Cursor"), { ssr: false });
const Nav = dynamic(() => import("@/components/ui/Nav"), { ssr: false });
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const Education = dynamic(() => import("@/components/sections/Education"), { ssr: false });
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

function AppShell() {
  const { flipToken } = useLang();
  const controls = useAnimationControls();

  useEffect(() => {
    if (!flipToken) return;
    controls.start({
      rotateY: [0, -92, 0],
      opacity: [1, 0.5, 1],
      scale: [1, 0.985, 1],
      transition: { duration: 0.9, ease: "easeInOut", times: [0, 0.48, 1] },
    });
  }, [flipToken, controls]);

  return (
    <div style={{ perspective: 2600 }}>
      <motion.div
        animate={controls}
        initial={{ rotateY: 0, opacity: 1, scale: 1 }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}
