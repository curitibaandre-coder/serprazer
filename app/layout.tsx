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
  title: "O que pode estar interferindo no seu desejo sexual?",
  description:
    "Um questionário da SER Sexualidades & Relacionamentos para identificar os processos que podem estar participando da sua dificuldade com o desejo. Leva poucos minutos e não é um diagnóstico.",
  openGraph: {
    title: "O que pode estar interferindo no seu desejo sexual?",
    description:
      "Poucos minutos, dez perguntas, e no final você vê os processos mais presentes hoje. Feito por psicólogas.",
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
