# Arquitetura

> **2 de 6** · Camadas, stack e pastas. As regras de escrita estão em `regras.md`; o visual, em `design.md`.
> Nada disto existe em código ainda: é o alvo do scaffold (tarefas base em `tarefas.md`).

## 1. Visão geral

Uma aplicação Next.js (App Router) que fala com o Supabase (PostgreSQL, Auth e Storage). Não há API própria: a escrita passa por Server Actions e a segurança final é do banco, por Row Level Security.

```
Navegador (celular / tablet / desktop)
        │
        ▼
┌──────────────────────────── Next.js ────────────────────────────┐
│  app/         rotas, layouts, páginas (só composição)           │
│     │                                                           │
│     ▼                                                           │
│  features/    telas, formulários, Server Actions e consultas    │
│     │                    │                                      │
│     ▼                    ▼                                      │
│  domain/  ◄────────  data/                                      │
│  regras puras        repositórios (único lugar que              │
│  (sem framework)     importa o cliente do Supabase)             │
└──────────────────────────────┼──────────────────────────────────┘
                               ▼
        Supabase: PostgreSQL + RLS · Auth · Storage (fotos)
```

## 2. Camadas

As dependências apontam sempre **para dentro**, na direção do domínio — a regra de dependência da Arquitetura Limpa (fonte: `kh-architecture`, *Arquitetura Limpa*, R. Martin). É o mesmo princípio dos outros projetos do time (domain / use-cases / infrastructure / interface), adaptado ao Next.js.

| Camada | Pasta | Responsabilidade | Pode importar de |
|---|---|---|---|
| Domínio | `src/domain` | Regras de negócio puras: status e transições da OS, totais e margem, validação de placa e CPF/CNPJ, dinheiro | Nada do projeto. Proibido React, Next e Supabase |
| Dados | `src/data` | Repositórios e clientes do Supabase, tipos gerados do banco | `domain`, `lib` |
| Features | `src/features/<nome>` | Casos de uso: Server Actions (escrita), consultas (leitura), schemas Zod e componentes da tela | `domain`, `data`, `components`, `lib` |
| Rotas | `src/app` | URL, layout, carregamento, composição das features | `features`, `components`, `lib` |
| UI compartilhada | `src/components` | Componentes sem regra de negócio | `lib`, e `domain` só para tipos |
| Utilitários | `src/lib` | Formatação (R$, datas), constantes | Nada do projeto |

Duas consequências práticas:

- **Uma feature não importa outra feature.** O que duas features precisam sobe para `domain`, `data` ou `components/shared`.
- **Trocar o backend é trocar `src/data`.** Se um dia existir uma API própria no lugar do Supabase, as outras camadas não mudam.

## 3. Stack

Versões `latest` do npm conferidas em 07/10/2026. Use as versões estáveis do dia do scaffold e registre em `memoria.md` se precisar fixar alguma.

| Papel | Tecnologia | Versão conferida |
|---|---|---|
| Framework | Next.js (App Router) | 16.4 |
| UI | React | 19.3 |
| Linguagem | TypeScript, modo `strict` | 7.0 |
| Estilo | Tailwind CSS | 4.3 |
| Componentes | shadcn/ui (CLI `shadcn`) | 4.21 |
| Banco, Auth, Storage | Supabase: `@supabase/supabase-js` e `@supabase/ssr` | 2.117 e 0.12 |
| Formulários | React Hook Form + Zod | 7.89 e 4.6 |
| Gráficos | Recharts (a partir da Fase 3) | 3.10 |
| Runtime | Node.js via nvm, npm | 22 e 10 |

O TypeScript 7 é uma major recente. Se alguma ferramenta do scaffold não a suportar, fixe a major anterior e anote o motivo.

### Ainda sem biblioteca definida

O prompt do produto não escolhe ferramenta para estes pontos. Recomendação inicial, a confirmar no `/speckit-plan` do pedido que precisar:

| Necessidade | Recomendação | Motivo |
|---|---|---|
| Termo de entrada, orçamento e recibo em PDF | Rota de impressão com CSS `@media print` e `window.print()` | Sem dependência; no celular vira "Salvar como PDF" |
| Arrastar cards no Kanban | Uma biblioteca de drag and drop com suporte a toque e teclado | Decidir no pedido P1.7; sempre com alternativa sem arrastar |
| Testes de regras | Vitest | Só para `src/domain` na v1 |
| Fotos | Compressão no navegador antes do upload | Foto de celular é grande demais para subir crua em rede de oficina |

## 4. Pastas

```
frontend/
├── CLAUDE.md                 # porta de entrada do agente
├── doc/                      # os 6 documentos + referencia-telas.md
├── specs/                    # spec-kit: uma pasta por pedido (NNN-nome/spec.md, plan.md, tasks.md)
├── .specify/                 # spec-kit: constitution, templates, scripts
├── .claude/skills/           # skills /speckit-*
├── graphify-out/             # grafo do código (gerado)
├── supabase/
│   ├── migrations/           # SQL versionado: tabelas, RLS, funções, índices
│   └── seed.sql              # dados de exemplo
├── public/
└── src/
    ├── app/
    │   ├── (auth)/login/
    │   ├── (app)/            # área logada: layout com sidebar e navegação inferior
    │   │   ├── page.tsx      # visão geral
    │   │   ├── check-in/
    │   │   ├── os/           # lista, kanban/ e [id]/
    │   │   ├── clientes/
    │   │   └── veiculos/     # estoque, financeiro, agenda, equipe, configuracoes: fases 3 e 4
    │   ├── layout.tsx
    │   └── globals.css       # tokens de design.md
    ├── features/
    │   └── <nome>/           # auth, customers, vehicles, check-in, service-orders…
    │       ├── components/
    │       ├── actions.ts    # Server Actions (escrita)
    │       ├── queries.ts    # leituras para Server Components
    │       └── schemas.ts    # Zod, usado no formulário e na action
    ├── domain/
    │   ├── service-order/    # status, transições, totais, margem
    │   ├── vehicle/          # placa
    │   ├── customer/         # CPF/CNPJ, telefone
    │   └── shared/           # dinheiro, datas, Result
    ├── data/
    │   ├── supabase/         # clientes (server e browser) e tipos gerados
    │   └── repositories/     # um arquivo por agregado
    ├── components/
    │   ├── ui/               # shadcn (gerado pela CLI)
    │   ├── layout/           # sidebar, navegação inferior, cabeçalho de página
    │   └── shared/           # status-badge, kpi-card, plate-input, empty-state…
    ├── lib/
    └── proxy.ts              # renovação de sessão e redirecionamento (no Next 16 substitui middleware.ts)
```

As URLs são em português sem acento (`/clientes`, `/veiculos`, `/os`, `/check-in`); os nomes de pastas de código seguem `regras.md`.

## 5. Dados

### Tabelas por fase

| Fase | Tabelas |
|---|---|
| 1 | `profiles`, `customers`, `vehicles`, `mechanics`, `service_orders`, `os_checklist`, `os_photos`, `os_timeline` |
| 2 | `services_catalog`, `os_services`, `os_parts`, `payments` |
| 3 | `parts`, `suppliers`, `stock_movements`, `expenses` |
| 4 | `appointments`, e as colunas de comissão em `mechanics` |

Toda tabela tem chave estrangeira explícita, `created_at`, `updated_at`, `deleted_at` (soft delete) e RLS ligada. As colunas de cada tabela são definidas no `data-model.md` que o `/speckit-plan` gera para o pedido correspondente.

`mechanics` nasce na Fase 1 porque o check-in precisa do mecânico responsável; um mecânico pode ou não ter login (`profile_id` opcional).

### Status da OS

`aguardando_orcamento` → `orcamento_enviado` → `aprovado` → `em_execucao` ⇄ `aguardando_peca` → `pronto_retirada` → `entregue`, mais `cancelada`.

- **OS aberta** é qualquer status diferente de `entregue` e `cancelada`.
- `entregue` só é alcançado a partir de `pronto_retirada`.
- `cancelada` pode vir de qualquer status aberto.
- Sair de `entregue` (reabrir) é exclusivo do Admin.
- As transições permitidas ficam numa única função em `src/domain/service-order`, usada pelo Kanban e pelas actions.

### Convenções de dados

- **Dinheiro em centavos**, coluna inteira. Nunca `float`. A formatação em R$ acontece só na tela.
- **Datas em `timestamptz`** (UTC no banco), exibidas em dd/mm/aaaa no fuso da oficina (padrão `America/Sao_Paulo`).
- **Placa** armazenada normalizada: maiúscula e sem hífen. A máscara é só de exibição.
- **Número da OS** vem de uma sequence do banco, nunca calculado na aplicação.
- **Fotos** em bucket privado do Storage, acessadas por URL assinada; no máximo 8 por OS.

## 6. Autenticação e permissões

- Supabase Auth com e-mail e senha. Não há cadastro público.
- `profiles` estende o usuário com `role`: `admin`, `atendente` ou `mecanico`.
- A permissão é verificada em três lugares, do mais fraco para o mais forte: a interface esconde o que o perfil não usa; a Server Action confere o perfil antes de agir; a **RLS do banco decide**. Esconder na interface nunca conta como segurança.
- Mecânico só enxerga OS em que é o responsável. Tabelas financeiras (Fase 3) são só do Admin.

## 7. Onde cada regra de negócio é garantida

| Regra | No banco | Na aplicação |
|---|---|---|
| Uma placa não tem duas OS abertas | Índice único parcial em `service_orders (vehicle_id)` para status aberto e não excluído | O check-in consulta antes e leva para a OS existente |
| Mudança de status entra na timeline | Função transacional: atualiza a OS e insere em `os_timeline` no mesmo passo | `domain` valida a transição antes de chamar |
| OS entregue é travada | Política ou trigger recusa alteração se `entregue` e o perfil não for Admin | A tela desabilita a edição |
| OS parada há mais de 3 dias | — | Calculado a partir da última entrada da timeline |
| Peça usada dá baixa; cancelar devolve (Fase 3) | Função transacional sobre `stock_movements` | — |
| Lucro da OS = cobrado − (peças + comissão + extras) (Fase 2) | — | Fórmula única em `src/domain/service-order` |
| Soft delete | `deleted_at`; políticas e consultas filtram | Repositório nunca apaga fisicamente |

Regras que protegem a integridade moram no banco, porque é o único ponto por onde toda escrita passa. Regras de cálculo moram em `domain`, porque precisam de teste e são reutilizadas na tela.

## 8. Ambiente

Variáveis em `.env.local` (nunca versionado), com um `.env.example` sem valores:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # em projeto com chaves antigas: NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SECRET_KEY=                    # só no servidor e no seed; nunca em código de cliente
```

Banco local com a CLI do Supabase (usa Docker). Destino de deploy ainda não definido — ver decisões em aberto em `memoria.md`.
