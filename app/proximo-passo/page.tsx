import Script from "next/script";
import BotaoCheckout from "./BotaoCheckout";

export const metadata = {
  title: "Meu Desejo Também Importa",
  robots: { index: false, follow: false },
};

// VSL hospedada no VTurb (teste A/B do proprio VTurb)
const VTURB_PLAYER_ID = "ab-6afb9f6bf55703359957274f";
const VTURB_PLAYER_JS =
  "https://scripts.converteai.net/b778d6ff-8f67-45a8-b21d-e59f5bcbf7e8/ab-test/6afb9f6bf55703359957274f/player.js";

const CHECKOUT_URL = "https://chk.eduzz.com/G92K5367WE";

/** Segundos do video ate o botao aparecer. 0 = aparece desde o inicio. */
const SEGUNDOS_PARA_BOTAO = 0;

/**
 * Destino do CTA do quiz: mini VSL (roteiro em
 * SER Prazer/copy/minivsl-pos-quiz-ser-prazer-v2.md) + botao do checkout.
 * Os <link> de preload abaixo o React 19 sobe para o <head> sozinho, e ficam
 * so nesta pagina, pra nao pesar o quiz.
 */
export default function ProximoPasso() {
  return (
    <div className="shell">
      {/* aceleracao de carregamento recomendada pelo VTurb */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);",
        }}
      />
      <link rel="preload" href={VTURB_PLAYER_JS} as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://m3u8.vturb.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />

      <header className="topbar">
        <div className="topbar-in">
          <span className="brand">SER</span>
        </div>
      </header>

      <main>
        <section className="stack vsl-pagina">
          <span className="eyebrow">Seu próximo passo</span>
          <h1 className="h-abertura">Assista antes de fechar esta página</h1>

          <div
            className="vsl-player"
            // web component do VTurb; renderizado como HTML puro pra o React nao tentar hidratar
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="${VTURB_PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>`,
            }}
          />

          <div className="acoes vsl-acoes">
            <BotaoCheckout href={CHECKOUT_URL} segundos={SEGUNDOS_PARA_BOTAO} />
          </div>
        </section>
      </main>

      <footer>SER Sexualidades &amp; Relacionamentos</footer>

      <Script src={VTURB_PLAYER_JS} strategy="afterInteractive" />
    </div>
  );
}
