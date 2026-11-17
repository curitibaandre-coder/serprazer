"use client";

import { useEffect, useState } from "react";

/**
 * Botao do checkout da Eduzz.
 *
 * - Repassa a query string da pagina (utm_*, fbclid etc.) para o checkout,
 *   pra venda ficar atribuida ao anuncio.
 * - `segundos` > 0 esconde o botao ate esse ponto do video (tempo do pitch).
 *   Com 0 ele aparece desde o inicio.
 */
export default function BotaoCheckout({ href, segundos = 0 }: { href: string; segundos?: number }) {
  const [link, setLink] = useState(href);
  const [visivel, setVisivel] = useState(segundos <= 0);

  useEffect(() => {
    const atual = new URLSearchParams(window.location.search);
    if ([...atual.keys()].length) {
      const url = new URL(href);
      atual.forEach((v, k) => {
        if (!url.searchParams.has(k)) url.searchParams.set(k, v);
      });
      setLink(url.toString());
    }
    if (segundos > 0) {
      const t = window.setTimeout(() => setVisivel(true), segundos * 1000);
      return () => window.clearTimeout(t);
    }
  }, [href, segundos]);

  if (!visivel) return null;

  return (
    <a className="btn btn-primary btn-checkout" href={link}>
      Quero começar agora
    </a>
  );
}
