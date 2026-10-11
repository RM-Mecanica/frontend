# Memória

> **6 de 6** · O que já foi feito e onde o projeto parou. **Atualize ao fim de toda sessão de trabalho.**
> Não confundir com `.specify/memory/`, que guarda a constituição do spec-kit.

## Onde o projeto parou

**Atualizado em 11/10/2026.**

- **Estado:** o scaffold Next.js existe e roda. Há uma **base de UI (protótipo visual)** com quatro telas navegáveis (Visão geral, Ordens de serviço, Financeiro, Clientes) e placeholders de Relatórios e Configurações. **Ainda não há Supabase, data layer, Server Actions, RLS nem testes** — tudo é mock tipado pelo domínio.
- **Repositório:** `github.com/RM-Mecanica/frontend`, branch `main`, sincronizada com `origin/main` (último push em 11/10/2026). Build, lint e typecheck passam; deploy pretendido na Vercel.
- **Fase:** base (B02/B04 feitas; B03/B05 parciais). A UI de telas é protótipo **fora do fluxo spec-kit** — ao virar feature de verdade (dados reais), cada tela entra como pedido da fase correspondente.

## Próximo passo

1. Fechar as decisões que travam o scaffold de dados: **D1** (Supabase confirmado?), **D2** (idioma das colunas), **D3** (deploy — Vercel?).
2. Completar a base: `src/data/` + clientes Supabase (B06), regra de lint de camadas (B05), Vitest + helpers de domínio com teste (B07/B09), CI (B08).
3. Abrir o primeiro pedido de produto pelo spec-kit: `/speckit-specify` com o texto de **P1.1 (Autenticação e perfis)**.
4. Conforme as features reais chegam, **substituir os mocks** (`src/lib/mock-data.ts`) por `queries`/Server Actions, e reconciliar as telas protótipo com os status e regras do domínio.

## Bloqueios

- Nenhum ativo. (O disco cheio de 07/10 não impediu o `npm install` nesta máquina.)

## O que já foi feito

### 11/10/2026 — scaffold Next.js e base de UI (protótipo)

- **Scaffold** Next.js 16.4 (App Router), React 19, TypeScript strict, Tailwind v4, ESLint. Gerado em pasta temporária e movido para a raiz do `frontend` (o `create-next-app` recusou a pasta não vazia, nem com `.` nem com espaço). `app/` movido para `src/app/`, alias `@/*` → `./src/*`.
- **Tokens de design** no `globals.css` (claro e escuro) e fontes Montserrat + Open Sans via `next/font`.
- **Migração do protótipo da v0** (`sistema-de-gestao-oficina/`, hoje removível): a dashboard monolítica foi **traduzida** para a arquitetura — decomposta em Atomic Design, sem copiar código nem cores hex da v0.
- **Atomic Design puro** adotado na camada de componentes (escolha do dono): `components/{atoms,molecules,organisms,templates}` no lugar de `{ui,shared,layout}`. Hierarquia unidirecional conferida (átomo→molécula→organismo→template).
- **Telas (protótipo visual, mock):** Visão geral (KPIs, gráfico, resumo de OS, tabela recente, movimentações, agenda), Ordens de serviço (filtros + tabela), Financeiro (KPIs + lançamentos), Clientes (grade de cards). Relatórios e Configurações como placeholder "em breve".
- **Sidebar** no layout de referência (Bolt): seções Menu principal / Gestão, workspace switcher, badge de OS abertas, perfil. Navegação por rota real (App Router), seleção única.
- **Logo real** (`public/logo.jpg`) aplicada; **paleta realinhada à logo** (navy `#1E3A8A` + cyan `#0EA5E9`), laranja removido da marca, contrastes WCAG medidos. Antes a paleta vinha da arte do Canva.
- **Domínio puro** iniciado: `service-order/status`, `customer`, `vehicle`, `finance/entry` (dinheiro em centavos). Helpers em `lib/format.ts` (`formatBRL`, `formatDate`).
- Dados de exemplo em `src/lib/mock-data.ts`, tipados pelo domínio. **Sem Supabase.**
- `doc/arquitetura.md`, `doc/design.md`, `doc/regras.md` atualizados para refletir Atomic Design e a nova paleta. Commits e push na `main` (`RM-Mecanica/frontend`).
- Consultados os MCPs `kh-design` e `kh-frontend` nas decisões de decomposição, navegação e paleta.

### 07/10/2026 — estrutura inicial

- A arte do Canva (`doc/Gestão de Oficina Mecânica.pdf`, 14 páginas) foi transcrita para `doc/referencia-telas.md`, com a lista de divergências entre a arte e o prompt do produto.
- Criados os seis documentos em `doc/`: `prd.md`, `arquitetura.md`, `regras.md`, `design.md`, `tarefas.md` e este.
- Cores e fontes de `design.md` foram extraídas do próprio PDF; os contrastes foram medidos.
- **spec-kit 1.1.1** inicializado com a integração do Claude Code (`specify init --here --integration claude --script sh`): pasta `.specify/` e dez skills `/speckit-*` em `.claude/skills/`. A constituição (`.specify/memory/constitution.md`) foi preenchida, versão 1.0.0.
- **graphify** ligado ao repositório: seção no `CLAUDE.md`, hooks do Claude Code em `.claude/settings.json`, hooks de git (`post-commit` e `post-checkout`) e grafo inicial em `graphify-out/` com pouco mais de 300 nós. Por enquanto o grafo cobre os títulos dos documentos de `doc/` e os scripts do spec-kit; `graphify query` já funciona sobre eles.
- **MCPs `kh-*`** consultados (architecture, ddd, design, frontend, security). O que cada um respondeu está em `regras.md`, seção 4.
- Criados `CLAUDE.md` (porta de entrada do agente) e um `.gitignore` mínimo.
- Tudo commitado direto na `main`, em três commits: `8d2612e` (documentos), `252303e` (spec-kit), `7a191ec` (ferramentas). Sem push.

## Decisões tomadas

| Data | Decisão | Motivo |
|---|---|---|
| 07/10/2026 | A primeira versão (v1) é a Fase 1, "Operação" | Menor recorte que já serve sozinho, e é por onde o prompt manda começar. Aguarda confirmação (D4) |
| 07/10/2026 | Quando arte e prompt divergem, o prompt vale para função e a arte para visual | A arte tem menos regras, tabelas e etapas do que o prompt |
| 07/10/2026 | Camadas com domínio puro e repositórios isolando o Supabase | Mesmo princípio dos outros projetos do time; permite trocar o backend mexendo só em `src/data` |
| 07/10/2026 | Dinheiro em centavos inteiros | Evita erro de arredondamento em total, margem e DRE |
| 07/10/2026 | Texto azul-escuro, e não branco, sobre botão laranja e pílulas claras | Branco sobre o laranja da arte dá contraste 2,61:1; o mínimo é 4,5:1 |
| 07/10/2026 | Nível de combustível em cinco botões, em vez de slider | Mesmo resultado com alvo de toque maior |
| 07/10/2026 | `.claude/settings.json` fica fora do git | O hook do graphify grava o caminho absoluto do binário, que muda de máquina para máquina |
| 07/10/2026 | Sem `.mcp.json` no repositório | Os MCPs `kh-*` são locais, configurados no usuário com caminhos absolutos |
| 07/10/2026 | `graphify-out/` fica fora do git (resolve D9) | É gerado, e o hook `post-commit` o reescreve a cada commit, deixando a árvore suja. Recria com `graphify update .` |
| 07/10/2026 | Estrutura commitada direto na `main`, em três commits | Decisão do dono do repositório; não há ninguém mais trabalhando na branch |
| 11/10/2026 | Camada de componentes em **Atomic Design puro** (`atoms/molecules/organisms/templates`) | Pedido do dono; mais fiel ao Atomic Design de B. Frost que o mapeamento `ui/shared/layout` |
| 11/10/2026 | **Paleta derivada da logo** (navy + cyan); laranja fora da marca | A logo real é azul; a paleta antiga vinha da arte do Canva e destoava da marca |
| 11/10/2026 | Telas Financeiro/Clientes/Ordens entram agora como **protótipo visual mock**, fora do spec-kit | O dono quis o design pronto; viram feature de verdade (com dados/RLS) pelo spec-kit na fase certa |
| 11/10/2026 | Custo/saída usa `danger` (vermelho), não a cor de marca | Com navy como primária, custo em azul ficava ambíguo; vermelho é semântico para saída |

## Decisões em aberto

### Travam o scaffold

- **D1 — Backend.** O prompt define Supabase como backend. O repositório se chama `frontend` e está numa organização própria, o que sugere que pode existir um `backend` separado. A documentação assume **Supabase, sem API própria**. Confirmar.
- **D2 — Idioma das colunas do banco.** O prompt mistura tabelas em inglês (`service_orders`) com colunas em português (`km_entrada`, `entrada_em`). A documentação segue o prompt como está. Padronizar agora custa nada; depois da primeira migration, custa caro.
- **D3 — Destino de deploy.** O prompt não diz onde a aplicação roda. Define variáveis de ambiente, CI e domínio.

### Podem esperar

- **D4 — Recorte da v1.** Confirmar que a v1 é só a Fase 1. A alternativa é Fase 1 + Fase 2, que já entrega orçamento, check-out e pagamento.
- **D5 — Nome e marca.** Resolvido em parte: nome "RM Mecânica" confirmado, **logo recebida** (`public/logo.jpg`) e paleta derivada dela. Falta um SVG/versão vetorial da logo (hoje é um JPG de ~1,2 MB) e definir favicon/ícones próprios.
- **D6 — Lista do que fica fora do produto** (`prd.md`, seção 4): é uma proposta, precisa de aceite.
- **D7 — Assinatura do termo de entrada.** A arte tem uma etapa "Assinatura"; o prompt pede um campo de assinatura no PDF. A documentação assume assinatura no papel. Captura na tela seria escopo novo.
- **D8 — Bibliotecas ainda sem escolha:** arrastar no Kanban e geração de PDF. Recomendações em `arquitetura.md`, seção 3.
- **D10 — Metas de sucesso da v1** (`prd.md`, seção 3): são propostas, a validar com a oficina.

## Montar o ambiente em outra máquina

O spec-kit já vem no repositório (`.specify/` e `.claude/skills/`). O que é local de cada máquina:

```bash
graphify claude install   # hooks do Claude Code
graphify hook install     # hooks de git
graphify update .         # gera o grafo
```

A CLI do spec-kit só é necessária para atualizar os templates: `uvx --from specify-cli specify --help`.

## Como atualizar este arquivo

- Reescreva **Onde o projeto parou** e **Próximo passo** para refletir o estado real.
- Acrescente uma entrada datada em **O que já foi feito** (data completa, nunca "ontem").
- Mova para **Decisões tomadas** o que foi resolvido, com o motivo.
- Registre aqui toda dependência nova e todo bloqueio.
