import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { SmoothAnchors } from "@/components/motion/SmoothAnchors";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headlines (Hero onward). Geist stays for body text.
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const title =`${site.name} — ${site.title}`;

export const metadata: Metadata = {
  title,
  description: site.pitch,
  openGraph: { title, description: site.pitch, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}>
      <body className="min-h-screen bg-bg font-sans text-fg">
        <SmoothAnchors />
        <a
          href="#main"
          data-instant
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
