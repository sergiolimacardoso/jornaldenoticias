# O Correio Global

Jornal de notícias que busca as principais manchetes do mundo (BBC, Al Jazeera, NPR)
e se atualiza sozinho a cada hora, sem precisar de chave de API.

## Como publicar na Vercel (passo a passo)

Você **não** precisa saber programar para fazer isso — são só cliques.

### Opção A — pelo site da Vercel (mais fácil)

1. Crie uma conta gratuita em https://github.com (se ainda não tiver).
2. Crie um repositório novo no GitHub (botão "New repository"), e faça upload
   de todos os arquivos desta pasta nele (dá pra arrastar e soltar pelo navegador,
   em "uploading an existing file").
3. Crie uma conta gratuita em https://vercel.com, entrando com o mesmo login do GitHub.
4. No painel da Vercel, clique em **"Add New" → "Project"**.
5. Selecione o repositório que você acabou de criar e clique em **"Deploy"**.
6. Pronto. Em cerca de 1 minuto a Vercel te dá um link do tipo
   `https://seu-projeto.vercel.app` já no ar.

A Vercel detecta sozinha que é um projeto Next.js e configura tudo automaticamente.

### Opção B — pelo terminal (se você tiver Node.js instalado)

```bash
npm install -g vercel
cd jornal-mundo
npm install
vercel
```

Siga as perguntas na tela (login, nome do projeto) e ao final ele te dá a URL pública.

## Como funciona a atualização automática

- O site usa **ISR (Incremental Static Regeneration)** do Next.js: a cada
  requisição, se já passou 1 hora desde a última vez que a página foi gerada,
  a Vercel busca as notícias de novo automaticamente (`revalidate: 3600` em
  `app/page.tsx`).
- No navegador, o carimbo circular no canto do cabeçalho mostra a contagem
  regressiva até a próxima edição e recarrega a página sozinho quando a hora vira.
- Isso significa que você não precisa configurar nenhum cron job separado —
  funciona só de estar publicado.

## Trocar as fontes de notícia

Edite `lib/sources.ts`. Cada item é um feed RSS público (não precisa de chave de API).
Já vem com BBC, Al Jazeera e NPR organizados em 4 seções: Mundo, Economia, Tecnologia e Ciência.

## Rodar localmente antes de publicar (opcional)

```bash
npm install
npm run dev
```

Depois abra http://localhost:3000 no navegador.
