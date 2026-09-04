# SER · Quiz do desejo

Funil da SER Sexualidades & Relacionamentos: quiz → mini VSL → curso "Meu Desejo Também Importa".

Next.js 16 (App Router, TypeScript), sem dependências além do framework. Deploy na Vercel.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Rotas

| Rota | O que é |
|---|---|
| `/` | O quiz inteiro: abertura, cadastro, 8 perguntas, escala de disposição e resultado |
| `/proximo-passo` | Destino do CTA do resultado. Placeholder até a mini VSL entrar |
| `/api/lead` | Recebe o lead ao fim do quiz |

## Como o resultado é calculado

Ficam todos em [`lib/quiz.ts`](lib/quiz.ts): perguntas, alternativas, processos, categorias e pontuação.

São **8 perguntas × 5 alternativas**, mais uma escala final de disposição que não pontua e serve de
gancho para a VSL. Cada alternativa vale 1 ponto para **um dos 10 fatores específicos**, e cada um
aparece exatamente 4 vezes. Esses 10 se agrupam nas **4 categorias** que viram as fatias do gráfico:

| Categoria | Rótulo interno | Fatores específicos |
|---|---|---|
| Emoções e crenças | laranja | crenças e regras · regulação emocional · autoimagem |
| Relacionamento | amarelo | assertividade · comunicação · intimidade |
| Contexto de vida | verde | estilo de vida sexualmente disfuncional |
| Autoconhecimento sexual | rosa | repertório · desconexão com o prazer · estimulação |

### Por que o gráfico não usa a contagem bruta

As categorias têm tamanhos diferentes: **contexto de vida reúne 1 fator (teto de 4 pontos)** e as
outras três reúnem 3 fatores cada (**teto de 12**). Em contagem bruta, contexto nunca passaria
de um terço do peso das demais, e o gráfico ficaria enviesado por construção.

Por isso cada categoria vira a **fração do próprio teto** que a pessoa endossou, e só então as
quatro frações são levadas a somar 100. A tela de resultado mostra essa conta aberta em
"ver os números por trás do gráfico".

> **Decisão a confirmar com a equipe clínica.** A normalização corrige o viés do instrumento, mas
> muda a leitura: uma escolha em contexto (1 de 4) pesa mais que uma escolha em emoções (1 de 12).
> A alternativa estruturalmente melhor é **rebalancear o instrumento**, dando a contexto de vida
> mais dois fatores (por exemplo privacidade e logística, sono e energia) para que as quatro
> categorias tenham o mesmo número de oportunidades. Aí a contagem bruta passa a funcionar sozinha.

## Lead (Neon)

Ao fim do quiz o navegador manda perfil e respostas para `/api/lead`, que **recalcula o resultado
no servidor** (fonte única em `lib/quiz.ts`, o navegador não decide a pontuação) e grava no Neon.

Se `DATABASE_URL` não existir, a rota responde `{ ok: true, guardado: false }` e avisa no log.
**A tela de resultado nunca depende do banco:** se a gravação falhar, ela aparece do mesmo jeito.

### Ligar o banco (uma vez)

1. No [Neon](https://console.neon.tech), crie um projeto e copie a **connection string** (pooled).
2. Na Vercel, em Settings › Environment Variables, adicione `DATABASE_URL` para Production,
   Preview e Development.
3. Aqui na máquina, crie `.env.local` com a mesma linha (o arquivo já está no `.gitignore`):
   ```
   DATABASE_URL=postgresql://...
   ```
4. Crie a tabela:
   ```bash
   npm run db:init
   ```
5. Faça um redeploy na Vercel para a variável entrar em vigor.

### O que fica guardado

Tabela `leads_quiz`: `nome`, `idade`, `genero`, `whatsapp`, `satisfacao` e `disposicao` (0 a 10),
`categoria_predominante`, e em `jsonb` os `percentual_categorias`, `top_processos`,
`pontos_processos` e as `respostas` cruas. Guardar as respostas cruas permite recalcular tudo
depois, caso a pontuação ou o balanceamento do instrumento mudem.

Consulta rápida no SQL Editor do Neon:

```sql
select criado_em, nome, whatsapp, satisfacao, categoria_predominante
from leads_quiz order by criado_em desc limit 50;

-- distribuição das categorias predominantes
select categoria_predominante, count(*) from leads_quiz group by 1 order by 2 desc;
```

> Dados de saúde sexual são sensíveis. Vale definir com a equipe por quanto tempo esses registros
> ficam guardados e quem tem acesso ao banco, e deixar isso escrito na política de privacidade
> antes de rodar tráfego.

## Identidade visual

Tokens em [`app/globals.css`](app/globals.css). Cores tiradas do site e do logo:
vinho `#792A28`, grafite `#1D1E20`, off-white `#FCF8F8`, rosa `#B58585`.
Tipos: Newsreader (títulos) e DM Sans (texto e interface, mesma do site).

As quatro cores das categorias foram validadas para banda de luminância, croma, separação sob
daltonismo e contraste. A cor nunca carrega a identidade sozinha: cada fatia tem rótulo direto,
barras nomeadas e tabela.

**Pendente:** trocar a marca provisória (`MarcaSer` em `app/page.tsx`) pelo arquivo real do logo em
`public/`.
