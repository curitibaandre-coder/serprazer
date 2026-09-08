"use client";

import { useEffect, useId, useState } from "react";

export type FatiaDonut = { id: string; nome: string; valor: number; cor: string };

/**
 * Rosca de quatro fatias.
 *
 * A cor sozinha nunca carrega a identidade: a legenda ao lado nomeia cada
 * fatia e repete o numero, e a tabela do rodape traz a conta inteira. Por isso
 * a rosca nao leva rotulo proprio, que so duplicaria a legenda e ainda corria
 * risco de ser cortado pela borda do cartao. Entre as fatias fica um respiro,
 * pra que dois tons vizinhos nao encostem.
 *
 * Os arcos entram desenhando. Quem pediu menos movimento no sistema recebe
 * o grafico ja pronto, sem animacao.
 */
export default function Donut({
  fatias,
  espessura = 22,
  titulo,
}: {
  fatias: FatiaDonut[];
  espessura?: number;
  titulo: string;
}) {
  const uid = useId();
  const [desenhado, setDesenhado] = useState(false);

  useEffect(() => {
    const semMovimento =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento) {
      setDesenhado(true);
      return;
    }
    const t = window.setTimeout(() => setDesenhado(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const tamanho = 240;
  const centro = tamanho / 2;
  const raio = centro - espessura / 2 - 3;
  const circunferencia = 2 * Math.PI * raio;
  const respiro = 2; // graus de folga entre fatias

  let anguloAcumulado = -90;

  const arcos = fatias
    .filter((f) => f.valor > 0)
    .map((f) => {
      const angulo = (f.valor / 100) * 360;
      const inicio = anguloAcumulado;
      anguloAcumulado += angulo;
      const anguloVisivel = Math.max(angulo - respiro, angulo * 0.5);
      const comprimento = (anguloVisivel / 360) * circunferencia;
      return {
        ...f,
        rotacao: inicio + respiro / 2,
        comprimento,
        anguloMedio: inicio + angulo / 2,
        angulo,
      };
    });

  return (
    <svg
      viewBox={`0 0 ${tamanho} ${tamanho}`}
      width="100%"
      role="img"
      aria-labelledby={`${uid}-t`}
      style={{ display: "block" }}
    >
      <title id={`${uid}-t`}>{titulo}</title>

      <circle
        cx={centro}
        cy={centro}
        r={raio}
        fill="none"
        stroke="var(--surface-2)"
        strokeWidth={espessura}
      />

      {arcos.map((a, i) => (
        <circle
          key={a.id}
          cx={centro}
          cy={centro}
          r={raio}
          fill="none"
          stroke={a.cor}
          strokeWidth={espessura}
          strokeDasharray={`${a.comprimento} ${circunferencia - a.comprimento}`}
          strokeDashoffset={desenhado ? 0 : a.comprimento}
          strokeLinecap="butt"
          transform={`rotate(${a.rotacao} ${centro} ${centro})`}
          style={{
            transition: `stroke-dashoffset 760ms cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 110}ms`,
          }}
        />
      ))}

    </svg>
  );
}
