"use client";

import { useId } from "react";

export type FatiaDonut = { id: string; nome: string; valor: number; cor: string };

/**
 * Rosca de quatro fatias.
 *
 * A cor sozinha nunca carrega a identidade: cada fatia tambem recebe rotulo
 * direto quando tem espaco, e o resultado repete os mesmos numeros em barras
 * nomeadas e em tabela. Entre as fatias existe um respiro da propria superficie,
 * pra que dois tons vizinhos nunca encostem.
 */
export default function Donut({
  fatias,
  espessura = 26,
  titulo,
}: {
  fatias: FatiaDonut[];
  espessura?: number;
  titulo: string;
}) {
  const uid = useId();
  const tamanho = 240;
  const centro = tamanho / 2;
  const raio = centro - espessura / 2 - 2;
  const circunferencia = 2 * Math.PI * raio;
  const respiro = 1.6; // graus de folga entre fatias

  let anguloAcumulado = -90;

  const arcos = fatias
    .filter((f) => f.valor > 0)
    .map((f) => {
      const angulo = (f.valor / 100) * 360;
      const inicio = anguloAcumulado;
      anguloAcumulado += angulo;
      const anguloVisivel = Math.max(angulo - respiro, angulo * 0.55);
      const comprimento = (anguloVisivel / 360) * circunferencia;
      return {
        ...f,
        rotacao: inicio + respiro / 2,
        dash: `${comprimento} ${circunferencia - comprimento}`,
        anguloMedio: inicio + angulo / 2,
        angulo,
      };
    });

  const raioRotulo = raio + espessura / 2 + 15;

  return (
    <svg
      viewBox={`0 0 ${tamanho} ${tamanho}`}
      width="100%"
      role="img"
      aria-labelledby={`${uid}-t`}
      style={{ display: "block", overflow: "visible" }}
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

      {arcos.map((a) => (
        <circle
          key={a.id}
          cx={centro}
          cy={centro}
          r={raio}
          fill="none"
          stroke={a.cor}
          strokeWidth={espessura}
          strokeDasharray={a.dash}
          strokeLinecap="butt"
          transform={`rotate(${a.rotacao} ${centro} ${centro})`}
        />
      ))}

      {arcos
        .filter((a) => a.angulo >= 34)
        .map((a) => {
          const rad = (a.anguloMedio * Math.PI) / 180;
          const x = centro + raioRotulo * Math.cos(rad);
          const y = centro + raioRotulo * Math.sin(rad);
          const alinhamento = Math.cos(rad) > 0.25 ? "start" : Math.cos(rad) < -0.25 ? "end" : "middle";
          return (
            <text
              key={`r-${a.id}`}
              x={x}
              y={y}
              textAnchor={alinhamento}
              dominantBaseline="middle"
              fill="var(--ink-2)"
              fontSize="12"
              fontFamily="var(--font-dm-sans), sans-serif"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {a.valor}%
            </text>
          );
        })}
    </svg>
  );
}
