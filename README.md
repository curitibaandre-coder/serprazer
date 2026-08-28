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
| `/` | O quiz inteiro: abertura, cadastro, 10 perguntas e resultado |
| `/proximo-passo` | Destino do CTA do resultado. Placeholder até a mini VSL entrar |
| `/api/lead` | Recebe o lead ao fim do quiz |

## Como o resultado é calculado

Ficam todos em [`lib/quiz.ts`](lib/quiz.ts): perguntas, alternativas, processos, categorias e pontuação.

São **10 perguntas × 5 alternativas**. Cada alternativa vale 1 ponto para **um dos 10 processos**,
e cada processo aparece exatamente 5 vezes, uma vez em cada posição (A a E). Os 10 processos se
agrupam em **4 categorias**, que são as fatias do gráfico:

| Categoria | Rótulo interno | Processos |
|---|---|---|
| Emoções e crenças | laranja | crenças e regras · regulação emocional · autoimagem |
| Relacionamento | amarelo | assertividade · comunicação · intimidade |
| Contexto de vida | verde | estilo de vida sexualmente disfuncional |
| Autoconhecimento sexual | rosa | repertório · desconexão com o prazer · estimulação |

### Por que o gráfico não usa a contagem bruta

As categorias têm tamanhos diferentes: **contexto de vida reúne 1 processo (teto de 5 pontos)** e
as outras três reúnem 3 processos cada (**teto de 15**). Em contagem bruta, contexto nunca passaria
de um terço do peso das demais, e o gráfico ficaria enviesado por construção.

Por isso cada categoria vira a **fração do próprio teto** que a pessoa endossou, e só então as
quatro frações são levadas a somar 100. A tela de resultado mostra essa conta aberta em
"ver os números por trás do gráfico".

> **Decisão a confirmar com a equipe clínica.** A normalização corrige o viés do instrumento, mas
> muda a leitura: uma escolha em contexto (1 de 5) pesa mais que uma escolha em emoções (1 de 15).
> A alternativa estruturalmente melhor é **rebalancear o instrumento**, dando a contexto de vida
> mais dois processos (por exemplo privacidade e logística, sono e energia) para que as quatro
> categorias tenham o mesmo número de oportunidades. Aí a contagem bruta passa a funcionar sozinha.

## Lead

`app/api/lead/route.ts` registra o lead no log e, se existir a variável abaixo, encaminha:

```
LEAD_WEBHOOK_URL=https://...
```

**Sem essa variável nenhum lead fica guardado.** Configurar antes de rodar tráfego.

## Identidade visual

Tokens em [`app/globals.css`](app/globals.css). Cores tiradas do site e do logo:
vinho `#792A28`, grafite `#1D1E20`, off-white `#FCF8F8`, rosa `#B58585`.
Tipos: Newsreader (títulos) e DM Sans (texto e interface, mesma do site).

As quatro cores das categorias foram validadas para banda de luminância, croma, separação sob
daltonismo e contraste. A cor nunca carrega a identidade sozinha: cada fatia tem rótulo direto,
barras nomeadas e tabela.

**Pendente:** trocar a marca provisória (`MarcaSer` em `app/page.tsx`) pelo arquivo real do logo em
`public/`.
