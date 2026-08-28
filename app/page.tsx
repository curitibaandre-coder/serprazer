"use client";

import { useMemo, useState } from "react";
import Donut, { type FatiaDonut } from "@/components/Donut";
import {
  CATEGORIAS,
  FECHAMENTO,
  ORDEM_CATEGORIAS_EXIBICAO,
  PERGUNTAS,
  PROCESSOS,
  TETO_POR_CATEGORIA,
  calcular,
  type ProcessoId,
  type Respostas,
} from "@/lib/quiz";

const MAX_POR_PERGUNTA = 2;
const LINK_VSL = "/proximo-passo";

type Perfil = {
  nome: string;
  idade: string;
  genero: string;
  whatsapp: string;
  satisfacao: number | null;
};

const PERFIL_VAZIO: Perfil = { nome: "", idade: "", genero: "", whatsapp: "", satisfacao: null };

export default function Quiz() {
  const [etapa, setEtapa] = useState<"abertura" | "perfil" | "perguntas" | "resultado">("abertura");
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_VAZIO);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});

  const pergunta = PERGUNTAS[indice];
  const selecionadas = respostas[pergunta?.id] ?? [];
  const resultado = useMemo(() => calcular(respostas), [respostas]);

  const totalEtapas = PERGUNTAS.length + 1;
  const etapaAtual = etapa === "perfil" ? 1 : etapa === "perguntas" ? indice + 2 : totalEtapas;
  const progresso =
    etapa === "abertura" ? 0 : etapa === "resultado" ? 100 : (etapaAtual / totalEtapas) * 100;

  function alternar(processo: ProcessoId) {
    setRespostas((atual) => {
      const atuais = atual[pergunta.id] ?? [];
      const jaTem = atuais.includes(processo);
      const novas = jaTem
        ? atuais.filter((p) => p !== processo)
        : [...atuais, processo].slice(-MAX_POR_PERGUNTA);
      return { ...atual, [pergunta.id]: novas };
    });
  }

  function avancar() {
    if (indice + 1 < PERGUNTAS.length) {
      setIndice(indice + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      enviarLead(perfil, respostas);
      setEtapa("resultado");
      window.scrollTo({ top: 0 });
    }
  }

  function voltar() {
    if (indice === 0) setEtapa("perfil");
    else setIndice(indice - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const perfilCompleto =
    perfil.nome.trim().length > 1 && perfil.idade !== "" && perfil.genero !== "" && perfil.satisfacao !== null;

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-in">
          <span className="brand">
            <MarcaSer />
            SER
          </span>
          {etapa !== "abertura" && (
            <div className="progress-wrap">
              <span className="progress-count">
                {etapa === "resultado" ? "Resultado" : `${etapaAtual} de ${totalEtapas}`}
              </span>
              <div
                className="progress-track"
                role="progressbar"
                aria-valuenow={Math.round(progresso)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progresso do questionário"
              >
                <div className="progress-fill" style={{ width: `${progresso}%` }} />
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        {etapa === "abertura" && <Abertura onComecar={() => setEtapa("perfil")} />}

        {etapa === "perfil" && (
          <FormPerfil
            perfil={perfil}
            setPerfil={setPerfil}
            completo={perfilCompleto}
            onAvancar={() => {
              setEtapa("perguntas");
              window.scrollTo({ top: 0 });
            }}
          />
        )}

        {etapa === "perguntas" && pergunta && (
          <section className="stack">
            <div className="stack-sm">
              <span className="eyebrow">Pergunta {indice + 1} de {PERGUNTAS.length}</span>
              <h1 className="h-pergunta">{pergunta.enunciado}</h1>
              <p className="nota">
                Escolha uma ou duas alternativas, as que mais combinam com o que você tem vivido
                atualmente. Não existe resposta certa ou errada.
              </p>
            </div>

            <div className="alternativas">
              {pergunta.alternativas.map((alt) => {
                const marcada = selecionadas.includes(alt.processo);
                return (
                  <button
                    key={alt.letra}
                    type="button"
                    className="alt"
                    aria-pressed={marcada}
                    onClick={() => alternar(alt.processo)}
                  >
                    <span className="alt-marca" aria-hidden="true">
                      {marcada ? "✓" : alt.letra}
                    </span>
                    <span className="alt-texto">{alt.texto}</span>
                  </button>
                );
              })}
            </div>

            <div className="acoes">
              <button type="button" className="btn btn-primary" onClick={avancar} disabled={selecionadas.length === 0}>
                {indice + 1 === PERGUNTAS.length ? "Ver meu resultado" : "Continuar"}
              </button>
              <button type="button" className="btn btn-ghost" onClick={voltar}>
                Voltar
              </button>
            </div>
          </section>
        )}

        {etapa === "resultado" && <Resultado perfil={perfil} resultado={resultado} />}
      </main>

      <footer>SER Sexualidades &amp; Relacionamentos</footer>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function Abertura({ onComecar }: { onComecar: () => void }) {
  return (
    <section className="stack">
      <span className="eyebrow">Questionário</span>
      <h1 className="h-abertura">O que pode estar interferindo no seu desejo sexual?</h1>
      <p className="lede">
        O desejo sexual pode ser afetado por muitas coisas diferentes. Em cada pergunta, escolha as
        alternativas que mais combinam com o que você tem vivido atualmente. Não existe resposta certa
        ou errada.
      </p>
      <p className="nota">
        São dez perguntas e leva poucos minutos. No final você vê quais processos estão mais presentes
        hoje, com uma explicação de cada um. Este questionário não oferece um diagnóstico.
      </p>
      <div className="acoes">
        <button type="button" className="btn btn-primary" onClick={onComecar}>
          Começar
        </button>
      </div>
    </section>
  );
}

function FormPerfil({
  perfil,
  setPerfil,
  completo,
  onAvancar,
}: {
  perfil: Perfil;
  setPerfil: (p: Perfil) => void;
  completo: boolean;
  onAvancar: () => void;
}) {
  return (
    <section className="stack">
      <div className="stack-sm">
        <span className="eyebrow">Antes de começar</span>
        <h1 className="h-pergunta">Para deixar o seu resultado no seu nome</h1>
      </div>

      <div className="stack">
        <div className="campo">
          <label htmlFor="nome">Como você quer ser chamada</label>
          <input
            id="nome"
            value={perfil.nome}
            onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
            placeholder="Seu primeiro nome"
            autoComplete="given-name"
          />
        </div>

        <div className="campo">
          <label htmlFor="idade">Idade</label>
          <input
            id="idade"
            type="number"
            inputMode="numeric"
            min={18}
            max={99}
            value={perfil.idade}
            onChange={(e) => setPerfil({ ...perfil, idade: e.target.value })}
            placeholder="Ex: 34"
          />
        </div>

        <div className="campo">
          <label htmlFor="genero">Gênero</label>
          <select
            id="genero"
            value={perfil.genero}
            onChange={(e) => setPerfil({ ...perfil, genero: e.target.value })}
          >
            <option value="">Selecione</option>
            <option value="mulher-cis">Mulher cis</option>
            <option value="mulher-trans">Mulher trans</option>
            <option value="nao-binarie">Não binárie</option>
            <option value="outro">Outro</option>
            <option value="prefiro-nao-dizer">Prefiro não dizer</option>
          </select>
        </div>

        <div className="campo">
          <label htmlFor="whatsapp">WhatsApp (opcional)</label>
          <input
            id="whatsapp"
            type="tel"
            inputMode="tel"
            value={perfil.whatsapp}
            onChange={(e) => setPerfil({ ...perfil, whatsapp: e.target.value })}
            placeholder="(00) 00000-0000"
            autoComplete="tel"
          />
        </div>

        <div className="campo">
          <label id="lbl-satisfacao">
            Hoje, o quanto você se sente satisfeita com o seu desejo sexual?
          </label>
          <div className="escala" role="group" aria-labelledby="lbl-satisfacao">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                aria-pressed={perfil.satisfacao === n}
                aria-label={`${n} de 10`}
                onClick={() => setPerfil({ ...perfil, satisfacao: n })}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="escala-legenda">
            <span>Nada satisfeita</span>
            <span>Muito satisfeita</span>
          </div>
        </div>
      </div>

      <div className="acoes">
        <button type="button" className="btn btn-primary" onClick={onAvancar} disabled={!completo}>
          Ir para as perguntas
        </button>
      </div>

      <p className="nota">
        Usamos esses dados apenas para enviar o seu resultado e conteúdos da SER. Você pode pedir a
        remoção quando quiser.
      </p>
    </section>
  );
}

function Resultado({
  perfil,
  resultado,
}: {
  perfil: Perfil;
  resultado: ReturnType<typeof calcular>;
}) {
  const fatias: FatiaDonut[] = ORDEM_CATEGORIAS_EXIBICAO.map((id) => ({
    id,
    nome: CATEGORIAS[id].nome,
    valor: resultado.percentualCategoria[id],
    cor: `var(--cat-${id})`,
  }));

  const ordenadas = [...fatias].sort((a, b) => b.valor - a.valor);
  const predominante = CATEGORIAS[resultado.categoriaPredominante];
  const primeiroNome = perfil.nome.trim().split(" ")[0];

  return (
    <div className="stack-lg">
      <section className="stack-sm">
        <span className="eyebrow">Seu resultado</span>
        <h1 className="h-abertura">
          {primeiroNome ? `${primeiroNome}, ` : ""}o que mais aparece nas suas respostas
        </h1>
        <p className="lede">
          Baixo desejo quase nunca tem uma causa só. Estes são os quatro grupos de processos que podem
          estar participando, e o peso de cada um nas suas respostas.
        </p>
      </section>

      <section className="card grafico-bloco" aria-label="Distribuição por categoria">
        <div className="donut-holder">
          <Donut
            fatias={fatias}
            titulo={`Distribuição das suas respostas entre as quatro categorias. Predominante: ${predominante.nome}, ${resultado.percentualCategoria[predominante.id]}%.`}
          />
          <div className="donut-centro">
            <span className="rotulo">Predominante</span>
            <span className="valor">{resultado.percentualCategoria[predominante.id]}%</span>
            <span className="nome">{predominante.nome}</span>
          </div>
        </div>

        <div className="barras">
          {ordenadas.map((f) => (
            <div key={f.id}>
              <div className="barra-topo">
                <span className="barra-chip" style={{ background: f.cor }} aria-hidden="true" />
                <span className="barra-nome">{f.nome}</span>
                <span className="barra-valor">{f.valor}%</span>
              </div>
              <div className="barra-track">
                <div className="barra-fill" style={{ width: `${f.valor}%`, background: f.cor }} />
              </div>
            </div>
          ))}
        </div>

        <details className="tabela">
          <summary>Ver os números por trás do gráfico</summary>
          <div className="tabela-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Categoria</th>
                  <th scope="col">Escolhas</th>
                  <th scope="col">Máximo</th>
                  <th scope="col">Peso</th>
                </tr>
              </thead>
              <tbody>
                {ordenadas.map((f) => (
                  <tr key={f.id}>
                    <th scope="row" style={{ fontWeight: 400, color: "var(--ink)" }}>
                      {f.nome}
                    </th>
                    <td className="num">{resultado.pontosCategoria[f.id as keyof typeof resultado.pontosCategoria]}</td>
                    <td className="num">{TETO_POR_CATEGORIA[f.id as keyof typeof TETO_POR_CATEGORIA]}</td>
                    <td className="num">{f.valor}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="nota" style={{ marginTop: 12 }}>
            As categorias têm tamanhos diferentes dentro do questionário: contexto de vida reúne um
            processo e as outras três reúnem três cada. Por isso o peso não é a contagem bruta, e sim
            a fração do máximo de cada categoria que você endossou.
          </p>
        </details>
      </section>

      <section className="stack">
        <h2 className="h-secao">O que significa {predominante.nome.toLowerCase()}</h2>
        <p className="lede">{predominante.texto}</p>
      </section>

      <section className="stack">
        <h2 className="h-secao">Seus três processos mais presentes hoje</h2>
        {resultado.topProcessos.length === 0 && (
          <p className="lede">Você não marcou nenhuma alternativa, então não há processos a mostrar.</p>
        )}
        {resultado.topProcessos.map((id, i) => (
          <article key={id} className="processo">
            <span className="processo-rank">{i + 1}º lugar</span>
            <h3 className="processo-nome">{PROCESSOS[id].nome}</h3>
            <p className="processo-texto">{PROCESSOS[id].texto}</p>
          </article>
        ))}
      </section>

      <section className="stack">
        <h2 className="h-secao">As outras categorias</h2>
        {ordenadas
          .filter((f) => f.id !== predominante.id)
          .map((f) => (
            <article key={f.id} className="processo" style={{ borderLeftColor: f.cor }}>
              <span className="processo-rank">
                {f.nome} · {f.valor}%
              </span>
              <p className="processo-texto" style={{ marginTop: 8 }}>
                {CATEGORIAS[f.id as keyof typeof CATEGORIAS].texto}
              </p>
            </article>
          ))}
      </section>

      <section className="aviso stack-sm">
        <h2 className="h-secao">{FECHAMENTO.titulo}</h2>
        {FECHAMENTO.paragrafos.map((p) => (
          <p key={p.slice(0, 24)} className="processo-texto">
            {p}
          </p>
        ))}
      </section>

      <section className="cta-final">
        <h2 className="h-secao">Agora que você viu o mapa, o próximo passo</h2>
        <p>
          Entender o que está acontecendo é a primeira parte. A segunda é ter o que fazer com isso.
          No curso Meu Desejo Também Importa, cada um desses processos tem uma aula e um exercício
          prático, no seu ritmo.
        </p>
        <a className="btn" href={LINK_VSL}>
          Ver o próximo passo
        </a>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- */

/** Marca provisória. Substituir por /public/logo.svg quando o arquivo do logo chegar. */
function MarcaSer() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--wine)" />
      <path d="M20 1a19 19 0 0 1 0 38Z" fill="var(--rose)" />
      <circle cx="20" cy="20" r="12" fill="var(--paper)" />
    </svg>
  );
}

/** Ponto de integração do lead. Hoje é um no-op seguro: nada quebra se a rota não existir. */
function enviarLead(perfil: Perfil, respostas: Respostas) {
  try {
    const payload = JSON.stringify({ perfil, respostas, em: new Date().toISOString() });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon("/api/lead", new Blob([payload], { type: "application/json" }));
    } else {
      void fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload });
    }
  } catch {
    /* o resultado nunca depende do envio do lead */
  }
}
