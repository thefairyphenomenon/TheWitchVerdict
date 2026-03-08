import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title:       "Richa Sharma — The Witch Verdict",
  description: "Financial Engineer & AI Builder. I design projects to help people understand finance and technology better, and push the limits of AI with mathematical brute force.",
  keywords:    ["Financial Engineering", "AI", "Quant Finance", "Machine Learning", "Python", "Portfolio"],
  authors:     [{ name: "Richa Sharma" }],
  openGraph: {
    title:       "Richa Sharma — The Witch Verdict",
    description: "Financial Engineer & AI Builder",
    type:        "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="grain antialiased">
        {children}
      </body>
    </html>
  );
}
