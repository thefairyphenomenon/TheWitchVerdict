"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/data/portfolio";

export default function Contact() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Opens mail client — real deploy would use Resend/Formspree
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(form.message);
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const links = [
    { label: "GitHub",   href: personal.github,   icon: "⬡", color: "#BF5FFF" },
    { label: "LinkedIn", href: personal.linkedin,  icon: "◈", color: "#C9956C" },
    { label: "Email",    href: `mailto:${personal.email}`, icon: "✦", color: "#7FFF00" },
  ];

  return (
    <section id="contact" ref={ref} className="section-base py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-witch-violet/05 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-witch-violet/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs tracking-[0.3em] text-witch-violet mb-3 uppercase">✦ Contact</div>
          <h2 className="section-title shimmer-text">Get in Touch</h2>
          <p className="font-dm italic text-witch-silver/60 mt-3 max-w-md mx-auto">
            Whether you have a project, an opportunity, or just want to connect — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="witch-card p-8 text-center flex flex-col gap-4 glow-violet"
              >
                <div className="text-5xl">🪄</div>
                <p className="font-cinzel text-witch-violet text-lg">Message Sent</p>
                <p className="font-dm italic text-witch-silver/60 text-sm">Thanks for reaching out. I will be in touch soon.</p>
              </motion.div>
            ) : (
              <>
                {[
                  { name: "name",    label: "Your Name",    type: "text",  placeholder: "Introduce yourself..." },
                  { name: "email",   label: "Your Email",   type: "email", placeholder: "Where should I reply?" },
                ].map(field => (
                  <div key={field.name}>
                    <label className="font-mono text-xs tracking-widest text-witch-silver/50 block mb-2 uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name as "name" | "email"]}
                      onChange={e => setForm(f => ({ ...f, [field.name]: e.target.value }))}
                      className="w-full bg-witch-deep border border-witch-violet/20 rounded-xl px-4 py-3 font-dm text-witch-mist text-sm focus:outline-none focus:border-witch-violet/60 transition-colors placeholder:text-witch-silver/20"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-xs tracking-widest text-witch-silver/50 block mb-2 uppercase">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="What is on your mind?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-witch-deep border border-witch-violet/20 rounded-xl px-4 py-3 font-dm text-witch-mist text-sm focus:outline-none focus:border-witch-violet/60 transition-colors placeholder:text-witch-silver/20 resize-none"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full font-mono text-xs tracking-widest py-4 rounded-xl transition-all duration-300 hover:scale-105 text-witch-void font-bold"
                  style={{ background: "linear-gradient(135deg, #BF5FFF, #C9956C)" }}
                >
                  ✦ &nbsp; Send Raven &nbsp; ✦
                </button>
              </>
            )}
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Links */}
            <div className="flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="witch-card p-4 flex items-center gap-4 group"
                >
                  <span className="text-xl" style={{ color: link.color }}>{link.icon}</span>
                  <span className="font-mono text-sm tracking-widest text-witch-silver group-hover:text-witch-violet transition-colors">
                    {link.label}
                  </span>
                  <span className="ml-auto text-witch-silver/30 group-hover:text-witch-violet transition-colors">→</span>
                </a>
              ))}
            </div>

            {/* Quote */}
            <div className="witch-card p-6 border-l-2 border-witch-violet/40">
              <p className="font-dm italic text-witch-silver/70 text-base leading-relaxed">
                "I code because I desire to be the wind itself."
              </p>
              <p className="font-mono text-xs text-witch-violet/60 mt-3">— Richa Sharma</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <span className="text-witch-violet">◈</span>
              <span className="font-mono text-xs text-witch-silver/50 tracking-widest">
                {personal.location} · Open to remote opportunities
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-0 right-0 text-center"
      >
        <p className="font-mono text-xs text-witch-silver/20 tracking-widest">
          ✦ &nbsp; Richa Sharma &nbsp; · &nbsp; Financial Engineer &amp; AI Builder &nbsp; · &nbsp; {new Date().getFullYear()} &nbsp; ✦
        </p>
      </motion.div>
    </section>
  );
}
