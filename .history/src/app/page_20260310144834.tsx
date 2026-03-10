"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
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
const Certifications = dynamic(() => import("@/components/sections/Certifications"), { ssr: false });

function AppShell() {
  const { isFlipping } = useLang();

  return (
        <motion.div
      animate={isFlipping ? { rotateY: [0, -90, 0], opacity: [1, 0.55, 1] } : { rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d", transformOrigin: "center center", perspective: 1800 }}
    >
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Certifications/>
        <Projects />
        <Skills />
        <Contact />
      </main>
    </motion.div>  
  );
}

export default function Home() {
  return (
    <LangProvider>
      <AppShell />
    </LangProvider>
  );
}