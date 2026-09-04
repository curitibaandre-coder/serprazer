// Dados e pontuacao do quiz "O que pode estar interferindo no seu desejo sexual?"
// Fonte: [SER] DOCS GESTAO (3).docx. Redacao das perguntas, alternativas e textos
// explicativos preservada exatamente como validada pela equipe clinica.

export type CategoriaId = "emocoes" | "relacionamento" | "contexto" | "autoconhecimento";

export type Categoria = {
  id: CategoriaId;
  nome: string;
  /** rotulo interno usado pela equipe clinica no documento de origem */
  rotuloInterno: string;
  cor: string;
  corEscura: string;
  texto: string;
};

export const CATEGORIAS: Record<CategoriaId, Categoria> = {
  emocoes: {
    id: "emocoes",
    nome: "Emoções e crenças",
    rotuloInterno: "laranja",
    cor: "#D4785A",
    corEscura: "#D4785A",
    texto:
      "É o que acontece dentro de você na hora íntima. As ideias sobre como o sexo “deveria” ser, a cobrança de sentir vontade de um jeito certo, a ansiedade que não desliga e a atenção presa em como o seu corpo está sendo visto. Quanto mais espaço isso ocupa, menos espaço sobra para perceber o prazer.",
  },
  relacionamento: {
    id: "relacionamento",
    nome: "Relacionamento",
    rotuloInterno: "amarelo",
    cor: "#2E8FC4",
    corEscura: "#3B95C8",
    texto:
      "É o que acontece entre vocês dois. A proximidade e o carinho do dia a dia, conseguir conversar sobre sexo sem que vire briga, e conseguir dizer na hora o que você quer e o que não quer. Quando isso trava, a vontade costuma travar junto.",
  },
  contexto: {
    id: "contexto",
    nome: "Contexto de vida",
    rotuloInterno: "verde",
    cor: "#2C7A3E",
    corEscura: "#3C8B50",
    texto:
      "É tudo o que acontece antes de qualquer clima existir. Cansaço, excesso de tarefas, pressa, falta de privacidade e uma rotina que não deixa sobrar espaço para vocês. Quando não sobra espaço na vida, é difícil sobrar vontade.",
  },
  autoconhecimento: {
    id: "autoconhecimento",
    nome: "Autoconhecimento sexual",
    rotuloInterno: "rosa",
    cor: "#6B2F94",
    corEscura: "#8449B0",
    texto:
      "É o quanto o que acontece na cama funciona para você. Se o sexo tem sido realmente prazeroso, se os toques e o ritmo combinam com o que você gosta, e se existe alguma variedade. É difícil querer repetir algo que dá pouco prazer.",
  },
};

export type ProcessoId =
  | "crencas"
  | "regulacao"
  | "autoimagem"
  | "assertividade"
  | "comunicacao"
  | "intimidade"
  | "estilo"
  | "repertorio"
  | "desconexao"
  | "estimulacao";

export type Processo = {
  id: ProcessoId;
  nome: string;
  categoria: CategoriaId;
  texto: string;
};

export const PROCESSOS: Record<ProcessoId, Processo> = {
  crencas: {
    id: "crencas",
    nome: "Crenças e regras sexuais",
    categoria: "emocoes",
    texto:
      "Algumas ideias sobre como o sexo, o desejo ou uma mulher “deveriam” funcionar podem estar trazendo cobrança para a sua experiência. Talvez você espere sentir vontade de uma determinada maneira, se preocupe quando isso não acontece ou sinta que precisa corresponder a certas expectativas. Quanto mais o sexo fica cercado de regras, cobranças e obrigações, mais difícil pode ser se conectar com curiosidade, prazer e desejo.",
  },
  regulacao: {
    id: "regulacao",
    nome: "Regulação emocional",
    categoria: "emocoes",
    texto:
      "Ansiedade, preocupação, culpa, irritação, tristeza ou outras emoções podem estar ocupando bastante espaço na sua experiência sexual. Isso não significa que seja necessário estar completamente tranquila para sentir desejo. Porém, quando determinadas emoções tomam conta da atenção, pode se tornar mais difícil perceber estímulos, sensações prazerosas e interesse sexual.",
  },
  autoimagem: {
    id: "autoimagem",
    nome: "Autoimagem corporal e automonitoramento",
    categoria: "emocoes",
    texto:
      "Durante situações íntimas, sua atenção pode estar muito voltada para avaliar a aparência do próprio corpo ou imaginar como ele está sendo visto. Quando grande parte da atenção fica direcionada para essa observação, pode sobrar menos espaço para perceber aquilo que está acontecendo no corpo, nos estímulos e no prazer.",
  },
  assertividade: {
    id: "assertividade",
    nome: "Assertividade sexual",
    categoria: "relacionamento",
    texto:
      "Pode existir uma dificuldade maior para expressar seus desejos e limites durante as experiências sexuais. Isso envolve conseguir pedir mudanças, mostrar o que gosta, dizer aquilo que não quer ou interromper uma situação quando necessário. Quanto mais difícil é ajustar a experiência às próprias necessidades, mais difícil também pode ser construir experiências realmente prazerosas.",
  },
  comunicacao: {
    id: "comunicacao",
    nome: "Comunicação sexual",
    categoria: "relacionamento",
    texto:
      "Conversar sobre sexualidade pode estar sendo difícil. Desejos, preferências, insatisfações e diferenças podem acabar ficando pouco falados. Quando isso acontece, cada pessoa pode tentar adivinhar aquilo que a outra precisa, dificultando a construção conjunta de uma vida sexual mais satisfatória.",
  },
  intimidade: {
    id: "intimidade",
    nome: "Intimidade e conexão relacional",
    categoria: "relacionamento",
    texto:
      "Seu desejo pode estar sendo influenciado pela forma como você tem vivido a conexão com sua parceria. Conflitos, ressentimentos, afastamento ou pouca proximidade podem diminuir a disponibilidade para a intimidade sexual. Isso não significa que o desejo sempre dependa de conexão emocional, mas esse aspecto pode ser especialmente importante para algumas pessoas.",
  },
  estilo: {
    id: "estilo",
    nome: "Estilo de vida sexualmente disfuncional",
    categoria: "contexto",
    texto:
      "Talvez uma parte importante da dificuldade esteja acontecendo antes mesmo de qualquer situação sexual. Cansaço, excesso de responsabilidades, falta de privacidade, preocupações e pouco espaço dedicado à intimidade podem tornar mais difícil perceber e desenvolver o desejo.",
  },
  repertorio: {
    id: "repertorio",
    nome: "Repertório sexual restrito",
    categoria: "autoconhecimento",
    texto:
      "Sua vida sexual pode estar oferecendo poucas possibilidades que realmente despertem sua curiosidade ou interesse. Isso não significa que seja preciso buscar experiências muito diferentes ou ousadas. Às vezes, ampliar o repertório envolve simplesmente conhecer melhor aquilo que você gosta, variar formas de intimidade, experimentar outros estímulos ou descobrir contextos que façam mais sentido para você.",
  },
  desconexao: {
    id: "desconexao",
    nome: "Desconexão com o prazer",
    categoria: "autoconhecimento",
    texto:
      "Suas respostas sugerem que as experiências sexuais podem não estar sendo suficientemente prazerosas ou recompensadoras. E isso é importante: pode ser difícil sentir vontade de repetir algo que oferece pouco prazer. Em alguns casos, aquilo que parece apenas “falta de desejo” também precisa ser compreendido a partir da qualidade das experiências sexuais que estão acontecendo.",
  },
  estimulacao: {
    id: "estimulacao",
    nome: "Estimulação sexual inadequada",
    categoria: "autoconhecimento",
    texto:
      "Talvez o tipo, a quantidade, o ritmo ou o tempo de estimulação que você recebe nem sempre sejam suficientes para despertar seu interesse e prazer. Cada pessoa responde de maneira diferente aos estímulos sexuais, e compreender melhor aquilo que funciona para você pode ser uma parte importante da construção do desejo.",
  },
};

export type Alternativa = { letra: string; texto: string; processo: ProcessoId };
export type Pergunta = { id: number; enunciado: string; alternativas: Alternativa[] };

export const PERGUNTAS: Pergunta[] = [
  {
    id: 1,
    enunciado:
      "Quando você percebe que está com pouca vontade de ter relações sexuais, o que mais parece explicar isso?",
    alternativas: [
      { letra: "A", texto: "Muitas vezes, o sexo não tem sido especialmente prazeroso para mim.", processo: "desconexao" },
      { letra: "B", texto: "Sinto que deveria ter mais vontade e fico preocupada porque meu desejo não aparece como acho que deveria.", processo: "crencas" },
      { letra: "C", texto: "Estou tão cansada ou sobrecarregada que parece não sobrar espaço para pensar em sexo.", processo: "estilo" },
      { letra: "D", texto: "Sinto que a distância ou algumas dificuldades na relação diminuíram minha vontade de me aproximar sexualmente.", processo: "intimidade" },
      { letra: "E", texto: "As experiências sexuais costumam ser parecidas entre si e já não despertam tanta curiosidade ou interesse.", processo: "repertorio" },
    ],
  },
  {
    id: 2,
    enunciado: "Quando uma situação íntima começa, o que mais costuma dificultar que você entre no clima?",
    alternativas: [
      { letra: "A", texto: "Tenho dificuldade de conversar com minha parceria sobre o que gostaria que acontecesse.", processo: "comunicacao" },
      { letra: "B", texto: "Começo a pensar na minha aparência e em como meu corpo está sendo visto.", processo: "autoimagem" },
      { letra: "C", texto: "Os estímulos que recebo nem sempre são suficientes para despertar meu interesse.", processo: "estimulacao" },
      { letra: "D", texto: "Tenho dificuldade de dizer como gostaria de ser tocada ou o que gostaria que mudasse.", processo: "assertividade" },
      { letra: "E", texto: "Fico ansiosa, preocupada ou pensando em outras coisas e não consigo me conectar com o momento.", processo: "regulacao" },
    ],
  },
  {
    id: 3,
    enunciado: "O que mais costuma acontecer quando você começa a receber estímulos sexuais?",
    alternativas: [
      { letra: "A", texto: "Os toques, ritmos ou formas de estimulação nem sempre combinam com aquilo de que gosto.", processo: "estimulacao" },
      { letra: "B", texto: "Tenho dificuldade de prestar atenção ao que estou sentindo porque minha cabeça continua acelerada.", processo: "regulacao" },
      { letra: "C", texto: "Tenho dificuldade de explicar para a outra pessoa aquilo que funciona melhor para mim.", processo: "comunicacao" },
      { letra: "D", texto: "Fico me observando, pensando no meu corpo ou imaginando como estou sendo vista.", processo: "autoimagem" },
      { letra: "E", texto: "Às vezes percebo que estou fazendo sexo sem estar realmente conectada ao prazer.", processo: "desconexao" },
    ],
  },
  {
    id: 4,
    enunciado: "Se você pudesse mudar uma coisa na sua vida sexual hoje, qual destas faria mais diferença?",
    alternativas: [
      { letra: "A", texto: "Ter mais momentos de proximidade, carinho e conexão com minha parceria.", processo: "intimidade" },
      { letra: "B", texto: "Ter mais liberdade para experimentar coisas diferentes e descobrir novos interesses.", processo: "repertorio" },
      { letra: "C", texto: "Conseguir falar mais claramente sobre meus limites e preferências.", processo: "assertividade" },
      { letra: "D", texto: "Sentir menos cobrança sobre como uma mulher “deveria” viver ou sentir a sexualidade.", processo: "crencas" },
      { letra: "E", texto: "Ter uma rotina menos cansativa e mais espaço para intimidade.", processo: "estilo" },
    ],
  },
  {
    id: 5,
    enunciado: "Durante uma experiência sexual, qual destas situações acontece com mais frequência?",
    alternativas: [
      { letra: "A", texto: "Tenho dificuldade de permanecer presente e minha atenção vai para preocupações, tarefas ou outros pensamentos.", processo: "regulacao" },
      { letra: "B", texto: "Percebo que o estímulo não está funcionando muito bem para mim, mas a situação continua daquele jeito.", processo: "estimulacao" },
      { letra: "C", texto: "Fico preocupada com barriga, peso, posição, aparência ou alguma parte do meu corpo.", processo: "autoimagem" },
      { letra: "D", texto: "Sinto pouco prazer e acabo participando mais por hábito ou para acompanhar a outra pessoa.", processo: "desconexao" },
      { letra: "E", texto: "Evito falar sobre alguma insatisfação porque tenho receio de como minha parceria vai reagir.", processo: "comunicacao" },
    ],
  },
  {
    id: 6,
    enunciado: "Quando sua vontade de sexo diminui, qual pensamento ou sensação aparece com mais facilidade?",
    alternativas: [
      { letra: "A", texto: "“Alguma coisa deve estar errada comigo, porque eu deveria sentir mais vontade.”", processo: "crencas" },
      { letra: "B", texto: "“Nós estamos distantes demais para eu conseguir me conectar sexualmente agora.”", processo: "intimidade" },
      { letra: "C", texto: "“Parece que já sei exatamente como o sexo vai acontecer.”", processo: "repertorio" },
      { letra: "D", texto: "“Estou simplesmente exausta e sem cabeça para isso.”", processo: "estilo" },
      { letra: "E", texto: "“Eu queria conseguir pedir aquilo de que preciso, mas não sei como.”", processo: "assertividade" },
    ],
  },
  {
    id: 7,
    enunciado: "O que mais faria você sentir curiosidade ou vontade de se aproximar sexualmente?",
    alternativas: [
      { letra: "A", texto: "Ter experiências mais variadas e menos previsíveis.", processo: "repertorio" },
      { letra: "B", texto: "Ter mais energia, descanso e espaço na rotina.", processo: "estilo" },
      { letra: "C", texto: "Sentir que o sexo pode ser realmente prazeroso, e não apenas algo que precisa acontecer.", processo: "desconexao" },
      { letra: "D", texto: "Receber estímulos que façam mais sentido para meu corpo e minhas preferências.", processo: "estimulacao" },
      { letra: "E", texto: "Sentir mais conforto e liberdade em relação ao meu corpo.", processo: "autoimagem" },
    ],
  },
  {
    id: 8,
    enunciado: "Quando você percebe que uma experiência sexual não está boa, o que costuma acontecer?",
    alternativas: [
      { letra: "A", texto: "Tenho dificuldade de dizer que quero mudar alguma coisa ou interromper.", processo: "assertividade" },
      { letra: "B", texto: "Até gostaria de conversar depois, mas acabo evitando o assunto.", processo: "comunicacao" },
      { letra: "C", texto: "Começo a pensar que deveria estar gostando ou reagindo de uma determinada maneira.", processo: "crencas" },
      { letra: "D", texto: "Fico ansiosa ou frustrada e tenho dificuldade de voltar a me conectar com o momento.", processo: "regulacao" },
      { letra: "E", texto: "Sinto que aquela experiência aumenta ainda mais a distância entre mim e minha parceria.", processo: "intimidade" },
    ],
  },
];

/**
 * Teto de pontos de cada categoria, contado direto das perguntas que existem
 * hoje. Fica derivado do instrumento de proposito: se uma pergunta entrar ou
 * sair, o teto se corrige sozinho e o grafico continua honesto.
 */
export const TETO_POR_CATEGORIA: Record<CategoriaId, number> = (() => {
  const t: Record<CategoriaId, number> = {
    emocoes: 0,
    relacionamento: 0,
    contexto: 0,
    autoconhecimento: 0,
  };
  for (const pergunta of PERGUNTAS) {
    for (const alt of pergunta.alternativas) t[PROCESSOS[alt.processo].categoria] += 1;
  }
  return t;
})();

export type Respostas = Record<number, ProcessoId[]>;

export type Resultado = {
  pontosProcesso: Record<ProcessoId, number>;
  pontosCategoria: Record<CategoriaId, number>;
  /** percentual normalizado pelo teto de cada categoria, somando 100 */
  percentualCategoria: Record<CategoriaId, number>;
  topProcessos: ProcessoId[];
  categoriaPredominante: CategoriaId;
  totalEscolhas: number;
};

const ORDEM_CATEGORIAS: CategoriaId[] = ["emocoes", "relacionamento", "contexto", "autoconhecimento"];
const ORDEM_PROCESSOS = Object.keys(PROCESSOS) as ProcessoId[];

/**
 * Pontuacao normalizada.
 *
 * Cada alternativa vale 1 ponto para o seu processo. As categorias, porem, tem
 * tamanhos diferentes: "contexto de vida" reune 1 processo (teto 5) enquanto as
 * outras tres reunem 3 processos cada (teto 15). Comparar pontos brutos deixaria
 * "contexto" com no maximo 1/3 do peso das demais, e o grafico ficaria enviesado
 * por construcao. Por isso cada categoria e convertida na fracao do proprio teto
 * que a mulher endossou, e so entao as quatro fracoes sao levadas a somar 100.
 */
export function calcular(respostas: Respostas): Resultado {
  const pontosProcesso = Object.fromEntries(ORDEM_PROCESSOS.map((p) => [p, 0])) as Record<ProcessoId, number>;

  for (const pergunta of PERGUNTAS) {
    for (const processo of respostas[pergunta.id] ?? []) pontosProcesso[processo] += 1;
  }

  const pontosCategoria = Object.fromEntries(ORDEM_CATEGORIAS.map((c) => [c, 0])) as Record<CategoriaId, number>;
  for (const p of ORDEM_PROCESSOS) pontosCategoria[PROCESSOS[p].categoria] += pontosProcesso[p];

  const fracoes = ORDEM_CATEGORIAS.map((c) => pontosCategoria[c] / TETO_POR_CATEGORIA[c]);
  const soma = fracoes.reduce((a, b) => a + b, 0);

  const percentualCategoria = Object.fromEntries(
    ORDEM_CATEGORIAS.map((c, i) => [c, soma === 0 ? 25 : (fracoes[i] / soma) * 100]),
  ) as Record<CategoriaId, number>;

  arredondarPara100(percentualCategoria);

  const topProcessos = [...ORDEM_PROCESSOS]
    .filter((p) => pontosProcesso[p] > 0)
    .sort((a, b) => pontosProcesso[b] - pontosProcesso[a] || ORDEM_PROCESSOS.indexOf(a) - ORDEM_PROCESSOS.indexOf(b))
    .slice(0, 3);

  const categoriaPredominante = [...ORDEM_CATEGORIAS].sort(
    (a, b) => percentualCategoria[b] - percentualCategoria[a],
  )[0];

  return {
    pontosProcesso,
    pontosCategoria,
    percentualCategoria,
    topProcessos,
    categoriaPredominante,
    totalEscolhas: Object.values(pontosProcesso).reduce((a, b) => a + b, 0),
  };
}

/** Arredonda os quatro percentuais para inteiros que somam exatamente 100 (maior resto). */
function arredondarPara100(p: Record<CategoriaId, number>) {
  const chaves = ORDEM_CATEGORIAS;
  const pisos = chaves.map((c) => Math.floor(p[c]));
  let resto = 100 - pisos.reduce((a, b) => a + b, 0);
  const ordemResto = chaves
    .map((c, i) => ({ c, i, frac: p[c] - pisos[i] }))
    .sort((a, b) => b.frac - a.frac);
  chaves.forEach((c, i) => (p[c] = pisos[i]));
  for (const item of ordemResto) {
    if (resto <= 0) break;
    p[item.c] += 1;
    resto -= 1;
  }
}

export const ORDEM_CATEGORIAS_EXIBICAO = ORDEM_CATEGORIAS;
