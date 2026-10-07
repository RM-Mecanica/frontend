# CLAUDE.md — RM Mecânica · frontend

Sistema web de gestão de oficina mecânica: check-in e check-out de veículos e controle financeiro. Interface em pt-BR, moeda em R$, datas em dd/mm/aaaa.

## Leia antes de qualquer tarefa, nesta ordem

1. `doc/memoria.md` — onde o projeto parou e qual é o próximo passo.
2. `doc/regras.md` — como o código é escrito e o que não se mexe.
3. `doc/tarefas.md` — o pedido da vez.

Consulte quando o assunto pedir:

- `doc/prd.md` — problema, público, escopo da primeira versão e o que fica de fora.
- `doc/arquitetura.md` — camadas, stack, pastas, dados e permissões.
- `doc/design.md` — cores, fontes e componentes.
- `doc/referencia-telas.md` — conteúdo das telas da arte original.
- `.specify/memory/constitution.md` — princípios que o spec-kit confere em todo plano.

## Como se trabalha aqui

- Cada entrega é um **pedido** de `doc/tarefas.md`, levado pelo spec-kit: `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`. O passo a passo está em `doc/regras.md`, seção 4.
- Não implemente nada fora do pedido em andamento nem de fase futura.
- Commits só quando pedidos, no formato `<emoji> <type>(<afetado>): <mensagem>` descrito em `doc/regras.md`.

## Ao terminar uma sessão

1. Marque o que foi concluído em `doc/tarefas.md`.
2. Atualize `doc/memoria.md`: o que foi feito, onde parou, próximo passo, decisões novas.
3. Se mexeu em código, rode `graphify update .`.

## Comandos

Ainda não há aplicação: o scaffold é a tarefa base B02. Preencha esta seção quando os scripts existirem (`dev`, `build`, `lint`, `typecheck`, `test`).

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
