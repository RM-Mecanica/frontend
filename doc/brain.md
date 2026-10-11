# Brain — RM Mecânica (frontend)

> Visão consolidada do projeto num só lugar: o que é, como está montado e onde cada coisa vive. Para o detalhe, siga os documentos citados. Atualizado em 11/10/2026.

## O que é

Sistema web de gestão de oficina mecânica (**RM Mecânica**): check-in/check-out de veículos e controle financeiro. Interface em pt-BR, moeda em R$, datas dd/mm/aaaa. Pensado para celular e tablet no chão da oficina.

- **Problema e escopo:** `doc/prd.md`
- **Fases do produto:** `doc/tarefas.md` (Fase 1 Operação → 2 Venda → 3 Controle → 4 Escala)

## Estado atual (11/10/2026)

- Scaffold Next.js rodando + **base de UI protótipo** (mock, sem backend).
- Telas navegáveis: Visão geral, Ordens de serviço, Financeiro, Clientes. Relatórios/Configurações = "em breve".
- **Sem Supabase, sem Server Actions, sem RLS, sem testes.** Dados em `src/lib/mock-data.ts`.
- `main` sincronizada com `origin` (`RM-Mecanica/frontend`); deploy pretendido na Vercel.
- Onde parou e próximos passos: `doc/memoria.md`.

## Stack

| Papel | Tecnologia |
|---|---|
| Framework | Next.js 16.4 (App Router) |
| UI | React 19, TypeScript strict |
| Estilo | Tailwind CSS v4 (tokens em `globals.css`) |
| Ícones | lucide-react |
| Primitivos | Radix (`@radix-ui/react-dialog`, `react-slot`) |
| Backend (planejado) | Supabase (PostgreSQL + RLS + Auth + Storage) — ainda não ligado |

## Arquitetura (Clean Architecture + Atomic Design)

Dependências apontam **para dentro** (domínio). Detalhe em `doc/arquitetura.md` e `doc/regras.md`.

```
src/
├── app/
│   ├── layout.tsx            # root: fontes, metadata
│   └── (app)/                # área logada (sidebar + conteúdo)
│       ├── page.tsx          # Visão geral
│       ├── ordens/           # Ordens de serviço
│       ├── financeiro/       # Financeiro
│       ├── clientes/         # Clientes
│       ├── relatorios/       # placeholder "em breve"
│       └── configuracoes/    # placeholder "em breve"
├── components/               # Atomic Design (unidirecional)
│   ├── atoms/                # button, input, textarea, badge, logo, section-title, skeleton
│   ├── molecules/            # card, dialog, kpi-card, status-badge, search-field,
│   │                         #   workspace-switcher, sidebar-nav-item, mini-chart,
│   │                         #   customer-card, activity-item, agenda-item, finance-entry-row
│   ├── organisms/            # app-sidebar, page-header, finance-chart, os-summary,
│   │                         #   recent-orders-table, new-order-dialog, orders-table,
│   │                         #   activity-panel, agenda-panel, finance-ledger,
│   │                         #   finance-trend-card, customer-grid, coming-soon
│   └── templates/            # dashboard-template
├── domain/                   # regras PURAS (sem React/Next/Supabase)
│   ├── service-order/status  # status da OS + rótulos
│   ├── customer/             # Customer, iniciais
│   ├── vehicle/              # Vehicle
│   └── finance/entry         # FinancialEntry (centavos)
├── lib/                      # format.ts (formatBRL/formatDate), utils.ts (cn), mock-data.ts
└── (futuro) data/            # repositórios + clientes Supabase — AINDA NÃO EXISTE
```

**Regra de dependência (inquebrável):**
- `domain` não importa framework nem outras camadas.
- `components` não importa `features`/`data`.
- Dentro de `components`: átomo → molécula → organismo → template (só para baixo).
- Uma feature não importa outra feature.

## Design system

Fonte da verdade visual: `doc/design.md`. Tokens em `src/app/globals.css` (claro + escuro). **Nenhum hex solto em componente.**

- **Marca (da logo `public/logo.jpg`):** primária navy `#1E3A8A`, acento cyan `#0EA5E9` (ícone/foco/gráfico, nunca texto; variante texto `#0369A1`). Laranja **não** faz mais parte da marca.
- **Status (semânticos):** success `#20A36A`, warning `#F2B84B`, danger `#D94B5B`. Cor nunca é o único sinal — rótulo escrito sempre acompanha.
- **Fontes:** Montserrat (títulos/números), Open Sans (corpo).
- **Acessibilidade:** contrastes WCAG medidos; alvo de toque ≥ 48px nas ações; campos ≥ 16px.

## Domínio essencial

- **Status da OS:** `aguardando_orcamento → orcamento_enviado → aprovado → em_execucao ⇄ aguardando_peca → pronto_retirada → entregue`, mais `cancelada`. OS aberta = diferente de entregue/cancelada.
- **Dinheiro em centavos** (inteiro), formatado só na borda da tela.
- **Placa** normalizada (maiúscula, sem hífen); aceita padrão antigo e Mercosul.

## Como trabalhar aqui

- Fluxo de feature pelo **spec-kit**: `/speckit-specify → plan → tasks → implement` (detalhe em `regras.md` §4). Só o pedido da vez; nada de adiantar fase futura.
- **Commits** no padrão `<emoji> <type>(<escopo>): <msg>` (ver `regras.md` e steering `git-workflow`). Commit só quando pedido.
- **MCPs `kh-*`** para conhecimento: `kh-architecture` (Clean Arch), `kh-ddd`, `kh-design` (Atomic Design, Design Systems), `kh-frontend`. Para Next/Supabase/Tailwind/shadcn, usar a doc oficial.
- **graphify:** `graphify query "<pergunta>"` antes de procurar no código; `graphify update .` depois de mexer.
- Comandos: `npm run dev`, `npm run build`, `npm run lint`, `npx tsc --noEmit`.

## Dívidas e decisões em aberto (ver `memoria.md`)

- **Protótipo ≠ produto:** as telas atuais são mock. Ao virar feature real, trocar `mock-data.ts` por `queries`/Server Actions e reconciliar com o domínio.
- **Faltam na base:** `src/data/` + Supabase (B06), regra de lint de camadas (B05), Vitest + testes de domínio (B07/B09), CI (B08). Componentes shadcn foram feitos à mão (B03 parcial).
- **Decisões que travam dados:** D1 (Supabase?), D2 (idioma das colunas), D3 (deploy).
- **Marca:** falta logo vetorial (SVG) e favicon próprio — hoje `logo.jpg` ~1,2 MB.

## Mapa dos documentos

| Doc | Para quê |
|---|---|
| `CLAUDE.md` | Porta de entrada do agente |
| `doc/brain.md` | **Este** — visão consolidada |
| `doc/prd.md` | Problema, público, escopo |
| `doc/arquitetura.md` | Camadas, stack, pastas, dados, permissões |
| `doc/regras.md` | Como o código é escrito; o que não se mexe |
| `doc/design.md` | Cores, fontes, componentes |
| `doc/referencia-telas.md` | Conteúdo das telas da arte |
| `doc/tarefas.md` | Tarefas base e pedidos por fase |
| `doc/memoria.md` | Onde parou, próximo passo, decisões |
