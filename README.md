# 🥬 ZeroFood — Frontend

Marketplace B2B hiperlocal que conecta pequenos estabelecimentos de alimentação (pizzarias, hamburguerias, padarias, lojas de açaí) para repassar insumos excedentes a preço de custo. O objetivo é combater o desperdício de alimentos no bairro, alinhado aos ODS 2, 11 e 12 da ONU.

## 🚀 Tecnologias

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v4
- React Router DOM v6
- Fetch API nativa

## 📁 Estrutura de Pastas

```
ZEROFOD-/
├── public/
│   ├── favicon.svg
│   └── fotos/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   ├── Titulo.tsx
│   │   └── ui.tsx
│   ├── data/
│   │   └── integrantes.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Sobre.tsx
│   │   ├── Integrantes.tsx
│   │   ├── IntegranteDetalhe.tsx
│   │   ├── Faq.tsx
│   │   ├── Contato.tsx
│   │   ├── Cadastro.tsx
│   │   ├── Entrar.tsx
│   │   ├── Ofertas.tsx
│   │   ├── NovoAnuncio.tsx
│   │   ├── Checkout.tsx
│   │   └── Impacto.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── sessao.ts
│   ├── types.ts
│   ├── utils.ts
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
└── README.md
```

## 📦 Como Usar

```bash
npm install
npm run dev
```

Crie um arquivo `.env` na raiz com a URL da API:

```
VITE_API_URL=https://zerofood-zzer.onrender.com
```

### 🔗 Links do projeto

- **Repositório GitHub:** [https://github.com/abrantes1/ZEROFOD-](https://github.com/abrantes1/ZEROFOD-)
- **Deploy Vercel:** [preencher]
- **Vídeo YouTube:** [preencher]
- **Repositório da API:** [https://github.com/di-zanon/ZeroFoodAPI](https://github.com/di-zanon/ZeroFoodAPI)

## 🌐 API

Base URL: `https://zerofood-zzer.onrender.com/api`

| Rota | Método | Descrição |
|------|--------|-----------|
| `/lojistas` | GET/POST | Listar/cadastrar estabelecimentos |
| `/categorias` | GET | Listar categorias |
| `/insumos` | GET/POST | Listar/cadastrar insumos |
| `/anuncios` | GET/POST | Listar/publicar ofertas |
| `/anuncios/:id` | GET | Detalhe da oferta |
| `/transacoes` | GET/POST | Listar/registrar compras |

## 🗺️ Rotas do site

| Rota | Página |
|------|--------|
| `/` | Home |
| `/sobre` | Sobre |
| `/integrantes` | Integrantes |
| `/integrantes/:rm` | Detalhe do integrante (rota com parâmetro) |
| `/faq` | FAQ |
| `/contato` | Contato |
| `/cadastro` | Criar conta |
| `/entrar` | Entrar pelo CNPJ |
| `/ofertas` | Ofertas |
| `/anunciar` | Novo anúncio |
| `/checkout/:id` | Confirmar compra (rota com parâmetro) |
| `/impacto` | Meu impacto |

## 👥 Autores e Créditos

| Nome | RM | Turma | GitHub | LinkedIn |
|------|----|-------|--------|----------|
| Kauan Sfrizo Mattos | 571599 | 1TDSPO | [@KauanMattos](https://github.com/KauanMattos) | — |
| Kauã de Deus Nunes | 572213 | 1TDSPO | [@Kaua056](https://github.com/Kaua056) | — |
| Diego de Oliveira Zanon Harnisch | 568945 | 1TDSPO | [@di-zanon](https://github.com/di-zanon) | — |
| Lucas Almeida Abrantes | 570546 | 1TDSPO | [@abrantes1](https://github.com/abrantes1) | — |
| Guilherme da Costa Campos | 571689 | 1TDSPO | [@guilherme-campos](https://github.com/guilherme-campos) | — |

## 📬 Contato

Dúvidas ou sugestões? Entre em contato com a equipe pelo GitHub ou pelo e-mail institucional da FIAP.

## 🤖 Uso de Inteligência Artificial

[Descrever quais ferramentas de IA foram usadas e para quê. Todo o código foi revisado e entendido pela equipe.]

## 📝 FIAP — Global Solution — 2026
