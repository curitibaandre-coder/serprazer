export const metadata = {
  title: "Meu Desejo Também Importa",
  robots: { index: false, follow: false },
};

/**
 * Destino do CTA do quiz. Aqui entra a mini VSL (roteiro pronto em
 * SER Prazer/copy/minivsl-pos-quiz-ser-prazer.md) e a oferta do curso.
 * Enquanto o vídeo não existe, esta página evita um 404 no fim do funil.
 */
export default function ProximoPasso() {
  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-in">
          <span className="brand">SER</span>
        </div>
      </header>

      <main>
        <section className="stack">
          <span className="eyebrow">Próximo passo</span>
          <h1 className="h-abertura">Meu Desejo Também Importa</h1>
          <p className="lede">
            Entender o que está acontecendo é a primeira parte. A segunda é ter o que fazer com isso.
            São oito aulas de psicoeducação, no seu ritmo, com um exercício prático em cada uma.
          </p>
          <p className="nota">
            Esta página ainda está sendo montada. Em breve o vídeo e as condições de inscrição estarão aqui.
          </p>
          <div className="acoes">
            <a className="btn btn-primary" href="/" style={{ textDecoration: "none" }}>
              Voltar ao início
            </a>
          </div>
        </section>
      </main>

      <footer>SER Sexualidades &amp; Relacionamentos</footer>
    </div>
  );
}
