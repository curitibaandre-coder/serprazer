"use client";

import { useMemo, useState } from "react";
import Donut, { type FatiaDonut } from "@/components/Donut";
import {
  CATEGORIAS,
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

type Etapa = "abertura" | "perfil" | "perguntas" | "disposicao" | "resultado";

type Perfil = {
  nome: string;
  idade: string;
  whatsapp: string;
  satisfacao: number | null;
  disposicao: number | null;
};

const PERFIL_VAZIO: Perfil = {
  nome: "",
  idade: "",
  whatsapp: "",
  satisfacao: null,
  disposicao: null,
};

export default function Quiz() {
  const [etapa, setEtapa] = useState<Etapa>("abertura");
  const [perfil, setPerfil] = useState<Perfil>(PERFIL_VAZIO);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});

  const pergunta = PERGUNTAS[indice];
  const selecionadas = respostas[pergunta?.id] ?? [];
  const resultado = useMemo(() => calcular(respostas), [respostas]);

  // perfil + perguntas + disposicao
  const totalEtapas = PERGUNTAS.length + 2;
  const etapaAtual =
    etapa === "perfil" ? 1 : etapa === "perguntas" ? indice + 2 : totalEtapas;
  const progresso =
    etapa === "abertura" ? 0 : etapa === "resultado" ? 100 : (etapaAtual / totalEtapas) * 100;

  function alternar(processo: ProcessoId) {
    setRespostas((atual) => {
      const atuais = atual[pergunta.id] ?? [];
      const novas = atuais.includes(processo)
        ? atuais.filter((p) => p !== processo)
        : [...atuais, processo].slice(-MAX_POR_PERGUNTA);
      return { ...atual, [pergunta.id]: novas };
    });
  }

  function irPara(proxima: Etapa) {
    setEtapa(proxima);
    window.scrollTo({ top: 0 });
  }

  function avancar() {
    if (indice + 1 < PERGUNTAS.length) {
      setIndice(indice + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      irPara("disposicao");
    }
  }

  function voltar() {
    if (indice === 0) irPara("perfil");
    else {
      setIndice(indice - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function concluir() {
    enviarLead(perfil, respostas);
    irPara("resultado");
  }

  const perfilCompleto =
    perfil.nome.trim().length > 1 && perfil.idade !== "" && perfil.satisfacao !== null;

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
                aria-label="Progresso do quiz"
              >
                <div className="progress-fill" style={{ width: `${progresso}%` }} />
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        {etapa === "abertura" && <Abertura onComecar={() => irPara("perfil")} />}

        {etapa === "perfil" && (
          <FormPerfil
            perfil={perfil}
            setPerfil={setPerfil}
            completo={perfilCompleto}
            onAvancar={() => irPara("perguntas")}
          />
        )}

        {etapa === "perguntas" && pergunta && (
          <section className="stack">
            <div className="stack-sm">
              <span className="eyebrow">
                Pergunta {indice + 1} de {PERGUNTAS.length}
              </span>
              <h1 className="h-pergunta">{pergunta.enunciado}</h1>
              <p className="nota">
                Escolha uma ou duas alternativas, as que mais combinam com o que você tem vivido
                agora. Não existe resposta certa ou errada.
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={avancar}
                disabled={selecionadas.length === 0}
              >
                Continuar
              </button>
              <button type="button" className="btn btn-ghost" onClick={voltar}>
                Voltar
              </button>
            </div>
          </section>
        )}

        {etapa === "disposicao" && (
          <section className="stack">
            <div className="stack-sm">
              <span className="eyebrow">Última pergunta</span>
              <h1 className="h-pergunta">
                Quanto você está disposta a cuidar e melhorar a sua vida sexual?
              </h1>
              <p className="nota">
                Responda com sinceridade. Não tem resposta certa, e ninguém vai cobrar nada de você.
              </p>
            </div>

            <Escala
              rotulo="Disposição hoje"
              valor={perfil.disposicao}
              onEscolher={(n) => setPerfil({ ...perfil, disposicao: n })}
              esquerda="Não é o meu momento"
              direita="Estou pronta"
            />

            <div className="acoes">
              <button
                type="button"
                className="btn btn-primary"
                onClick={concluir}
                disabled={perfil.disposicao === null}
              >
                Ver o meu resultado
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setIndice(PERGUNTAS.length - 1);
                  irPara("perguntas");
                }}
              >
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
      <span className="eyebrow">Quiz</span>
      <h1 className="h-abertura">Veja o que está acontecendo com o seu desejo</h1>
      <p className="lede">
        Responda algumas perguntas e descubra quais são os principais fatores que podem estar
        atrapalhando o seu desejo hoje. Leva poucos minutos e não existe resposta certa ou errada.
      </p>
      <p className="nota">
        No final você recebe um resultado com os fatores que mais apareceram nas suas respostas,
        explicados de um jeito simples.
      </p>
      <div className="acoes">
        <button type="button" className="btn btn-primary" onClick={onComecar}>
          Começar
        </button>
      </div>
    </section>
  );
}

function Escala({
  rotulo,
  valor,
  onEscolher,
  esquerda,
  direita,
}: {
  rotulo: string;
  valor: number | null;
  onEscolher: (n: number) => void;
  esquerda: string;
  direita: string;
}) {
  const id = `escala-${rotulo.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="campo">
      <span className="escala-legenda" style={{ marginBottom: 2 }}>
        <span id={id} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {rotulo}
        </span>
      </span>
      <div className="escala" role="group" aria-labelledby={id}>
        {Array.from({ length: 11 }, (_, n) => (
          <button
            key={n}
            type="button"
            aria-pressed={valor === n}
            aria-label={`${n} de 10`}
            onClick={() => onEscolher(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="escala-legenda">
        <span>{esquerda}</span>
        <span>{direita}</span>
      </div>
    </div>
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

function Resultado({ perfil, resultado }: { perfil: Perfil; resultado: ReturnType<typeof calcular> }) {
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
          {primeiroNome ? `${primeiroNome}, ` : ""}veja o que mais apareceu nas suas respostas
        </h1>
        <p className="lede">
          O desejo quase nunca é afetado por uma coisa só. Estes são os quatro fatores que mais
          influenciam, e o peso de cada um no que você respondeu.
        </p>
      </section>

      <section className="res-hero entra" aria-label="Distribuição dos fatores">
        <div className="res-topo">
          <div className="donut-holder">
            <Donut
              fatias={fatias}
              titulo={`Como as suas respostas se distribuem entre os quatro fatores. O que mais pesa é ${predominante.nome}, com ${resultado.percentualCategoria[predominante.id]}%.`}
            />
            <div className="donut-centro">
              <span className="rotulo">O que mais pesa</span>
              <span className="valor">{resultado.percentualCategoria[predominante.id]}%</span>
              <span className="nome">{predominante.nome}</span>
            </div>
          </div>

          <ul className="legenda">
            {ordenadas.map((f) => (
              <li
                key={f.id}
                className={`legenda-item${f.id === predominante.id ? " destaque" : ""}`}
              >
                <span className="legenda-rail" style={{ background: f.cor }} aria-hidden="true" />
                <span className="legenda-nome">{f.nome}</span>
                <span className="legenda-valor" style={{ color: f.cor }}>
                  {f.valor}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="res-rodape">
          <details className="tabela">
            <summary>Ver os números por trás do gráfico</summary>
            <div className="tabela-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Fator</th>
                    <th scope="col">Escolhas</th>
                    <th scope="col">Máximo</th>
                    <th scope="col">Peso</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenadas.map((f) => (
                    <tr key={f.id}>
                      <th scope="row" style={{ fontWeight: 500, color: "var(--ink)" }}>
                        {f.nome}
                      </th>
                      <td className="num">
                        {resultado.pontosCategoria[f.id as keyof typeof resultado.pontosCategoria]}
                      </td>
                      <td className="num">
                        {TETO_POR_CATEGORIA[f.id as keyof typeof TETO_POR_CATEGORIA]}
                      </td>
                      <td className="num">{f.valor}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="nota" style={{ marginTop: 12 }}>
              Os fatores têm tamanhos diferentes dentro do quiz: contexto de vida aparece menos
              vezes que os outros três. Por isso o peso não é a contagem simples, e sim o quanto de
              cada fator você marcou em relação ao total que ele poderia ter.
            </p>
          </details>
        </div>
      </section>

      <section className="stack">
        <span className="eyebrow">O que mais está pesando hoje</span>
        <article
          className="fator fator-destaque"
          style={{ borderLeftColor: `var(--cat-${predominante.id})` }}
        >
          <div className="fator-topo">
            <h2 className="fator-nome">{predominante.nome}</h2>
            <span className="fator-pct">{resultado.percentualCategoria[predominante.id]}%</span>
          </div>
          <p className="fator-texto">{predominante.texto}</p>
        </article>
      </section>

      <section className="stack">
        <span className="eyebrow">Os outros fatores</span>
        {ordenadas
          .filter((f) => f.id !== predominante.id)
          .map((f) => (
            <article key={f.id} className="fator" style={{ borderLeftColor: f.cor }}>
              <div className="fator-topo">
                <h3 className="fator-nome">{f.nome}</h3>
                <span className="fator-pct">{f.valor}%</span>
              </div>
              <p className="fator-texto">{CATEGORIAS[f.id as keyof typeof CATEGORIAS].texto}</p>
            </article>
          ))}
      </section>

      <section className="cta-final">
        <h2 className="h-secao">
          Agora que você entendeu mais o que está acontecendo, vamos para o próximo passo
        </h2>
        <p>
          Este quiz não oferece um diagnóstico, mas ele foi criado para te ajudar a identificar o que
          pode estar participando da sua dificuldade relacionada ao desejo sexual. E entender o que
          está acontecendo é a primeira parte. A segunda é ter o que fazer com isso, certo?
        </p>
        <p>
          No curso Meu Desejo Também Importa vamos te ajudar a pensar no que fazer. Nele, você vai
          entender mais sobre o desejo sexual e construir ferramentas para lidar com a dificuldade
          mais importante no seu caso.
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

/** Ponto de integração do lead. Nunca bloqueia a tela de resultado. */
function enviarLead(perfil: Perfil, respostas: Respostas) {
  try {
    const payload = JSON.stringify({ perfil, respostas, em: new Date().toISOString() });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      navigator.sendBeacon("/api/lead", new Blob([payload], { type: "application/json" }));
    } else {
      void fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });
    }
  } catch {
    /* o resultado nunca depende do envio do lead */
  }
}

/* PROCESSOS segue exportado em lib/quiz.ts e alimenta a pontuação, mesmo sem
   aparecer na tela: é ele que decide em qual fator cada alternativa pontua. */
void PROCESSOS;
