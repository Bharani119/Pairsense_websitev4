import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Loader from "@/components/layout/Loader";
import Nav from "@/components/layout/Nav";
import Cursor from "@/components/ui/Cursor";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pairsense — Engineering flavors. Crafting fragrances.",
  description:
    "Pairsense designs high-performance sensory systems for global brands. Precision formulation of flavors and fragrances for personal care, beverages, and lifestyle applications.",
  openGraph: {
    title: "Pairsense",
    description: "Engineering flavors. Crafting fragrances.",
    type: "website",
  },
  icons: {
    icon: "/pairsense-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <Loader />
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
