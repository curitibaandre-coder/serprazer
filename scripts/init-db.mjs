// Cria a tabela de leads no Neon. Rode uma vez: npm run db:init
// Precisa de DATABASE_URL no ambiente (ou em .env.local).

import { readFileSync, existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL && existsSync(".env.local")) {
  for (const linha of readFileSync(".env.local", "utf8").split("\n")) {
    const m = linha.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não encontrada. Coloque em .env.local ou exporte no ambiente.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  create table if not exists leads_quiz (
    id                     bigserial primary key,
    criado_em              timestamptz not null default now(),
    nome                   text,
    idade                  int,
    genero                 text,
    whatsapp               text,
    satisfacao             int,
    disposicao             int,
    categoria_predominante text,
    percentual_categorias  jsonb,
    top_processos          jsonb,
    pontos_processos       jsonb,
    respostas              jsonb
  )
`;

// para bancos criados antes desta coluna existir
await sql`alter table leads_quiz add column if not exists disposicao int`;

await sql`create index if not exists leads_quiz_criado_em_idx on leads_quiz (criado_em desc)`;
await sql`create index if not exists leads_quiz_categoria_idx on leads_quiz (categoria_predominante)`;

const [{ total }] = await sql`select count(*)::int as total from leads_quiz`;
console.log(`Tabela leads_quiz pronta. Registros hoje: ${total}.`);
