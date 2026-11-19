# ZeroFood — Front-end

## Objetivo

O ZeroFood é um marketplace B2B hiperlocal que conecta pequenos estabelecimentos de alimentação (pizzarias, hamburguerias, padarias, lojas de açaí) para o repasse de insumos excedentes a preço de custo, combatendo o desperdício de alimentos (CitizenTech, ODS 2, 11 e 12).

## Links

| | |
|---|---|
| GitHub (front-end) | [preencher] |
| Aplicação na Vercel | [preencher] |
| API Java (URL pública) | [preencher] |
| Repositório da API | https://github.com/di-zanon/ZeroFoodAPI |
| Vídeo no YouTube | [preencher] |

## Tecnologias

- React 18 + Vite + TypeScript (SPA)
- Tailwind CSS v4
- React Router (rotas estáticas e com parâmetro)
- Fetch API (sem Axios ou outras bibliotecas de requisição)
- Back-end: Java + Spring Boot + Oracle (ZeroFoodAPI)

## Como executar

```bash
npm install
cp .env.example .env      # defina VITE_API_URL com a URL da API Java
npm run dev
```

Na Vercel, cadastre a variável de ambiente `VITE_API_URL` com a URL pública da API. O arquivo `vercel.json` faz as rotas abrirem direto pelo link.

## Estrutura de pastas

```
src/
├─ main.tsx              entrada: Router + contexto de sessão
├─ App.tsx               todas as rotas
├─ index.css             Tailwind + paleta do logo (#50b80d, #20863a, #075c2c)
├─ types.ts              interfaces iguais aos DTOs da API
├─ utils.ts              moeda, datas, máscara de CNPJ, taxa e teto de repasse
├─ data/integrantes.ts   dados da equipe
├─ services/api.ts       todas as chamadas HTTP com fetch (um CRUD por recurso)
├─ context/Sessao.tsx    lojista atual guardado no navegador
├─ components/           Header (com menu mobile), Footer, Logo, Titulo, campos de formulário
└─ pages/                uma página por rota
```

## Páginas e rotas

| Rota | Página | Tipo | Endpoints usados |
|---|---|---|---|
| `/` | Home | Institucional | — |
| `/sobre` | Sobre | Institucional | — |
| `/integrantes` | Integrantes | Institucional | — |
| `/integrantes/:rm` | Detalhe do integrante | Rota com parâmetro | — |
| `/faq` | FAQ | Institucional | — |
| `/contato` | Contato (formulário validado) | Institucional | — |
| `/cadastro` | Criar conta B2B (UC01) | Solução | `POST /api/lojistas` |
| `/entrar` | Entrar pelo CNPJ | Solução | `GET /api/lojistas` |
| `/ofertas` | Feed de ofertas (UC03) | Solução | `GET /api/anuncios`, `GET /api/categorias` |
| `/anunciar` | Novo anúncio (UC02) | Solução | `GET/POST /api/insumos`, `POST /api/anuncios` |
| `/checkout/:id` | Confirmar compra (UC04) | Solução, rota com parâmetro | `GET /api/anuncios/{id}`, `POST /api/transacoes` |
| `/impacto` | Painel de impacto (HU07) | Solução | `GET /api/transacoes`, `/api/anuncios`, `/api/avaliacoes` |

## Regras de negócio no front

- **RN02 (teto de repasse):** se o preço passar de `TETO_REPASSE` (em `utils.ts`), o botão de publicar é bloqueado com um aviso.
- **RN04 (Take Rate):** o anúncio simula o valor líquido com 10%. O valor real vem da API em `taxaTakeRate`.
- **CNPJ:** máscara `00.000.000/0000-00`, pois a API exige 18 caracteres.
- **Estados:** todas as telas com API mostram carregando, erro e lista vazia.

## Responsividade

Testar em 390 × 844 (mobile), 768 × 1024 (tablet) e 1440 × 900 (desktop). Abaixo de 1024 px o menu vira hambúrguer.

## Integrantes

| Nome | RM | Turma |
|---|---|---|
| Kauan Sfrizo Mattos | 571599 | 1TDSPO |
| Kauã de Deus Nunes | 572213 | 1TDSPO |
| Diego de Oliveira Zanon Harnisch | 568945 | 1TDSPO |
| Lucas Almeida Abrantes | 570546 | 1TDSPO |
| Guilherme da Costa Campos | 571689 | 1TDSPO |

## Contato

[e-mail de contato do grupo]

## Uso de Inteligência Artificial

[Descrever quais ferramentas de IA foram usadas e para quê, por exemplo apoio na estrutura inicial do código e revisão de texto. Todo o código foi revisado e entendido pela equipe.]

## Limitações conhecidas

- A API não tem autenticação: o "login" localiza o lojista pelo CNPJ.
- Geolocalização, upload de foto e gateway de pagamento real ainda não existem na API; a escolha Pix/cartão é visual.
- O formulário de Contato valida e confirma na tela, mas não envia para um servidor.
