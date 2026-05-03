import type { Metadata } from "next";
import { Geist_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEO Diagnostic - Find if AI recommends your brand",
  description: "Query OpenAI, Claude, and Gemini simultaneously.",
  icons: {
    icon: "data:,",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full font-sans text-[var(--text-primary)]">
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
