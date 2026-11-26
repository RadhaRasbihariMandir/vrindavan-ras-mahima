import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeEffects, { ThemePicker } from "@/components/ThemeEffects";
import SiteHeader from "@/components/SiteHeader";
import AudioPlayerBar from "@/components/AudioPlayerBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-tiro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vrindavan Ras Mahima — Santo ki Amrit Vani",
  description:
    "Bhajan, pravachan aur santo ki vani ka naya ghar — day-wise archive, shabd reader aur sant collection pages.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#B03A2E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hi" className={`${cormorant.variable} ${tiro.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ThemeEffects />
          <SiteHeader />
          <main className="page-content">{children}</main>
          <footer className="page-content" style={{ padding: "var(--sp-12) var(--sp-6) 96px", textAlign: "center", color: "var(--muted)" }}>
            <p style={{ margin: 0 }}>
              समस्त वाणी संतों की अमृत वाणी है — सार्वजनिक domain में, सबके लिए।
            </p>
          </footer>
          <AudioPlayerBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
