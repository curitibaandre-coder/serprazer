import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
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
    // a variavel da fonte fica no <html>: globals.css monta --texto e --display
    // em :root, e um var() so enxerga o que foi definido no proprio escopo ou acima
    <html lang="pt-BR" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
