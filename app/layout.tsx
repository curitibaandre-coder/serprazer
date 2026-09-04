import type { Metadata, Viewport } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veja o que está acontecendo com o seu desejo",
  description:
    "Um quiz da SER Sexualidades & Relacionamentos para descobrir os principais fatores que podem estar atrapalhando o seu desejo hoje. Leva poucos minutos e não é um diagnóstico.",
  openGraph: {
    title: "Veja o que está acontecendo com o seu desejo",
    description:
      "Poucos minutos e no final você vê os fatores que mais aparecem nas suas respostas. Feito por psicólogas.",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#16171a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${dmSans.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
