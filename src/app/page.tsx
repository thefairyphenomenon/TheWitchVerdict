"use client";

import dynamic from "next/dynamic";

// Dynamically import canvas/3D heavy components for SSR safety
const Cursor     = dynamic(() => import("@/components/ui/Cursor"),              { ssr: false });
const Nav        = dynamic(() => import("@/components/ui/Nav"),                 { ssr: false });
const Hero       = dynamic(() => import("@/components/sections/Hero"),          { ssr: false });
const About      = dynamic(() => import("@/components/sections/About"),         { ssr: false });
const Education  = dynamic(() => import("@/components/sections/Education"),     { ssr: false });
const Experience = dynamic(() => import("@/components/sections/Experience"),    { ssr: false });
const Projects   = dynamic(() => import("@/components/sections/Projects"),      { ssr: false });
const Skills     = dynamic(() => import("@/components/sections/Skills"),        { ssr: false });
const Contact    = dynamic(() => import("@/components/sections/Contact"),       { ssr: false });

export default function Home() {
  return (
    <>
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
    </>
  );
}
