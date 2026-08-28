import { NextResponse } from "next/server";

/**
 * Recebe o lead do quiz.
 *
 * PONTO DE INTEGRACAO: hoje isto so registra no log da Vercel, o que ja permite
 * conferir que os dados chegam. Escolher um destino antes de rodar trafego:
 *
 *   - Supabase  -> insert em `leads_quiz`
 *   - Planilha  -> POST no webhook do Google Apps Script
 *   - CRM/WhatsApp -> POST no webhook da ferramenta
 *
 * Enquanto nao houver destino, NENHUM lead fica guardado.
 */
export async function POST(request: Request) {
  try {
    const dados = await request.json();

    console.log("[lead]", JSON.stringify(dados));

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, erro: "payload inválido" }, { status: 400 });
  }
}
