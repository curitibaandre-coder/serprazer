import { NextResponse } from "next/server";
import { sql, bancoConfigurado } from "@/lib/db";
import { CATEGORIAS, calcular, type Respostas } from "@/lib/quiz";

type Perfil = {
  nome?: string;
  idade?: string;
  genero?: string;
  whatsapp?: string;
  satisfacao?: number | null;
};

/**
 * Grava o lead do quiz no Neon.
 *
 * O resultado e recalculado aqui a partir das respostas cruas, e nao lido do
 * que o navegador mandou: assim a pontuacao tem uma fonte unica, em lib/quiz.ts.
 *
 * Se DATABASE_URL nao estiver definida, a rota responde 200 e avisa no log em
 * vez de quebrar. O quiz nunca depende disto pra mostrar o resultado dela.
 */
export async function POST(request: Request) {
  let corpo: { perfil?: Perfil; respostas?: Respostas };

  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ ok: false, erro: "payload inválido" }, { status: 400 });
  }

  const perfil = corpo.perfil ?? {};
  const respostas = corpo.respostas ?? {};
  const resultado = calcular(respostas);

  if (!bancoConfigurado || !sql) {
    console.warn("[lead] DATABASE_URL ausente, lead não foi guardado:", JSON.stringify({ perfil, resultado }));
    return NextResponse.json({ ok: true, guardado: false });
  }

  try {
    const idade = Number.parseInt(String(perfil.idade ?? ""), 10);

    await sql`
      insert into leads_quiz (
        nome, idade, genero, whatsapp, satisfacao,
        categoria_predominante, percentual_categorias,
        top_processos, pontos_processos, respostas
      ) values (
        ${perfil.nome?.trim() || null},
        ${Number.isFinite(idade) ? idade : null},
        ${perfil.genero || null},
        ${perfil.whatsapp?.trim() || null},
        ${typeof perfil.satisfacao === "number" ? perfil.satisfacao : null},
        ${CATEGORIAS[resultado.categoriaPredominante].nome},
        ${JSON.stringify(resultado.percentualCategoria)},
        ${JSON.stringify(resultado.topProcessos)},
        ${JSON.stringify(resultado.pontosProcesso)},
        ${JSON.stringify(respostas)}
      )
    `;

    return NextResponse.json({ ok: true, guardado: true });
  } catch (erro) {
    // Guardar o lead nunca pode derrubar o resultado dela. Erro fica no log da Vercel.
    console.error("[lead] falha ao gravar no Neon:", erro);
    return NextResponse.json({ ok: true, guardado: false });
  }
}
