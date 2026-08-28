import { neon } from "@neondatabase/serverless";

/**
 * Conexao com o Neon.
 *
 * A string vem da variavel DATABASE_URL, definida na Vercel (Production,
 * Preview e Development) e em .env.local pro ambiente local. Ela nunca entra
 * no repositorio.
 *
 * Se a variavel nao existir, `sql` vem nulo e quem chama decide o que fazer.
 * Nenhuma tela do quiz depende do banco: o resultado da mulher aparece de
 * qualquer jeito.
 */
export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export const bancoConfigurado = Boolean(process.env.DATABASE_URL);
