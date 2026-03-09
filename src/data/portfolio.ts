// ─────────────────────────────────────────────
//  Portfolio Data — Richa Sharma
// ─────────────────────────────────────────────

export const personal = {
  name: "Richa Sharma",
  headline: "Financial Engineer & AI Builder",
  tagline: "I code because I desire to be the wind itself.",
  bio: "I design projects to help people understand finance and technology better, and push the limits of AI with mathematical brute force. Multidisciplinary builder at the intersection of quant finance, machine learning, and elegant systems.",
  location: "Noida, India",
  email: "richaaa02@gmail.com",
  github: "https://github.com/thefairyphenomenon",
  linkedin: "https://linkedin.com/in/richa-sharma",
  githubUsername: "thefairyphenomenon",
};

export const education = [
  {
    institution: "WorldQuant University",
    degree: "MSc Financial Engineering",
    period: "2026 – Present",
    icon: "📐",
    color: "#BF5FFF",
    description: "Advanced coursework in stochastic calculus, derivatives pricing, risk modeling, and quantitative methods.",
  },
  {
    institution: "GL Bajaj Institute of Technology & Management",
    degree: "B.Tech — Computer Science Engineering (Data Science)",
    period: "Nov 2022 – Present",
    icon: "💻",
    color: "#C9956C",
    description: "Data Analysis, Data Science, Computational Mathematics. Graduating 2026.",
  },
  {
    institution: "Central Board of Secondary Education",
    degree: "Senior Secondary (PCMB)",
    period: "2021",
    icon: "🎓",
    color: "#7FFF00",
    description: "CGPA: 8.0 — Physics, Chemistry, Mathematics, Biology",
  },
];

export const experience = [
  {
    role: "Technical Project Manager Intern",
    company: "Web3Task Pvt Ltd",
    location: "Noida, NCR",
    period: "June 2025 – Jan 2026",
    color: "#BF5FFF",
    level: "COMPLETED",
    xp: 2400,
    highlights: [
      "Secured startup credits & cloud infra from Google, Microsoft & Vultr — enabled multi-app deployment",
      "Directed launches: Voice to Notes (50K+ users), Jukebox (TalesFM), V3VPN with DNS-level ad blocking & parental control",
      "Fine-tuned multimodal ML models for Voice to Notes personalization",
      "Instituted SCRUM boards, burn-down charts & RACI matrices — boosted productivity 50%, completed 5 sprints on schedule",
    ],
    skills: ["ML Fine-tuning", "Product Management", "Cloud Infrastructure", "SCRUM", "Team Leadership"],
  },
  {
    role: "Strategist",
    company: "CGB Solutions",
    location: "Delhi, India",
    period: "May 2024 – Sep 2024",
    color: "#C9956C",
    level: "COMPLETED",
    xp: 1200,
    highlights: [
      "Assisted finance team with monthly financial modeling and reporting",
      "Contributed to backend data support using AWS, MySQL, and data pipelines",
      "Implemented performance analytics to track and improve content KPIs",
    ],
    skills: ["Financial Modeling", "AWS", "MySQL", "Data Pipelines", "Analytics"],
  },
];

export const projects = [
  {
    id: "fraud-detection",
    title: "Enterprise Fraud Detection",
    subtitle: "Statistical anomaly meets graph intelligence meets LLM judgment",
    description: "A modular fraud detection system leveraging statistical anomaly detection, graph neural modeling, and LLM-based evaluation to detect risky transactions at enterprise scale.",
    github: "https://github.com/thefairyphenomenon",
    stack: ["Python", "Scikit-learn", "Google GenAI", "Transformers", "NetworkX", "LangChain", "SQLite"],
    color: "#BF5FFF",
    accentColor: "#7FFF00",
    visualType: "network-graph",
    icon: "🕸️",
    tagline: "Catching ghosts in the machine",
    impact: "Multi-layer anomaly detection pipeline with graph-based entity relationships",
  },
  {
    id: "trading-bot",
    title: "Trading Bot: n8n Pipeline",
    subtitle: "Real-time market intelligence, automated & verified",
    description: "An automation pipeline using n8n to get real-time stock market updates. Web-scrapes Economic Times & Google Finance, analyzes with ChatGPT, verifies with Claude, then sends real-time signals via Telegram.",
    github: "https://github.com/thefairyphenomenon",
    stack: ["n8n", "Python", "ChatGPT API", "Claude API", "Telegram Bot", "Web Scraping"],
    color: "#C9956C",
    accentColor: "#7FFF00",
    visualType: "candlestick-chart",
    icon: "📈",
    tagline: "Markets whisper. The bot listens.",
    impact: "End-to-end automated market signal pipeline with dual-LLM verification",
  },
  {
    id: "laxmi-bot",
    title: "Laxmi: Finance Bot",
    subtitle: "ACID-compliant wallet engine with AI budget enforcement",
    description: "A full-stack finance bot with ACID-compliant wallet engine and double-entry bookkeeping. Integrates n8n AI agents and LangChain for automated budget enforcement, spending analysis, and geolocation-based spending pattern analytics.",
    github: "https://github.com/thefairyphenomenon",
    stack: ["Python", "C++", "MySQL", "n8n", "LangChain", "UPI APIs", "BHIM/Razorpay"],
    color: "#7FFF00",
    accentColor: "#BF5FFF",
    visualType: "ledger-flow",
    icon: "💸",
    tagline: "Sub-100ms. Double-entry. No mercy.",
    impact: "Sub-100ms transaction processing with concurrent handling and override protocols",
  },
];

export const skills = {
  "Languages": {
    color: "#BF5FFF",
    items: ["Python", "C++", "R", "Rust"],
  },
  "AI & ML": {
    color: "#7FFF00",
    items: ["Scikit-learn", "TensorFlow", "Keras", "PyTorch", "Transformers", "NetworkX", "Isolation Forests", "CNNs", "GNNs", "Reinforcement Learning", "Generative AI"],
  },
  "Databases": {
    color: "#C9956C",
    items: ["MySQL", "MongoDB", "SQLite", "MS SQL Server"],
  },
  "Finance": {
    color: "#E8D5FF",
    items: ["Financial Modeling", "Risk Management", "Probability", "Stochastics", "VaR", "Stress Testing"],
  },
  "Infrastructure": {
    color: "#BF5FFF",
    items: ["AWS", "Docker", "n8n", "LangChain", "FastAPI"],
  },
};

export const certifications = [
  {
    title: "Data Science Course",
    issuer: "WorldQuant University",
    period: "Jan 2026 – Feb 2026",
    color: "#BF5FFF",
  },
  {
    title: "Advanced Finance",
    issuer: "Pregrad",
    period: "May 2024 – Jul 2024",
    color: "#C9956C",
  },
  {
    title: "Financial Accounting and Analysis",
    issuer: "NPTEL",
    period: "Feb 2025 – Present",
    color: "#7FFF00",
  },
  {
    title: "Banking & Financial Markets: Risk Management",
    issuer: "NPTEL",
    period: "Feb 2025 – Present",
    color: "#E8D5FF",
  },
  {
    title: "Probability & Stochastic for Finance",
    issuer: "NPTEL – IIT Kanpur",
    period: "Feb 2025 – Present",
    color: "#BF5FFF",
  },
];

export const languages = [
  { language: "Hindi",   level: "Native",  proficiency: 100 },
  { language: "English", level: "Fluent",  proficiency: 95  },
  { language: "German",  level: "Basic",   proficiency: 25  },
];

export const navItems = [
  { label: "About",          href: "#about"          },
  { label: "Education",      href: "#education"      },
  { label: "Experience",     href: "#experience"     },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects",       href: "#projects"       },
  { label: "Skills",         href: "#skills"         },
  { label: "Contact",        href: "#contact"        },
];
