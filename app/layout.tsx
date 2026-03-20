import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

function resolveMetadataBase(): URL {
  const renderUrl = process.env.RENDER_EXTERNAL_URL;
  if (renderUrl) return new URL(renderUrl);
  const vercel = process.env.VERCEL_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: "Rails Doctor — Diagnostics Rails",
  description:
    "Rapports d'audit Rails : sécurité, qualité, performance, architecture.",
  keywords: ["Rails", "Ruby on Rails", "audit", "diagnostic", "sécurité", "performance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0a0f] text-white">{children}</body>
    </html>
  );
}
