<!--
Sync Impact Report
- Versão: (modelo) → 1.0.0 — primeira ratificação
- Princípios: I a VI definidos
- Seções: Restrições técnicas, Fluxo de desenvolvimento, Governança
- Templates em .specify/templates: sem alteração necessária
- Detalhamento: doc/regras.md (manter os dois em sincronia)
-->

# Constituição — RM Mecânica · Sistema de gestão de oficina

Princípios inegociáveis do projeto. Todo `plan.md` passa pela checagem destes itens. O detalhe de cada um está em `doc/regras.md`.

## Princípios

### I. Dependências apontam para o domínio

Regra de negócio vive em `src/domain`, como função pura, sem React, Next ou Supabase, e com teste. Só `src/data` conversa com o Supabase. Uma feature não importa outra feature. Um plano que coloque regra de negócio em componente, página ou repositório está reprovado.

### II. O banco é a última linha de segurança

Toda tabela nasce com Row Level Security e política por perfil (`admin`, `atendente`, `mecanico`) na mesma migration. Server Action confere o perfil antes de agir. Esconder algo na interface nunca conta como controle de acesso. Afrouxar ou desligar uma política para "fazer funcionar" é proibido.

### III. Dado da oficina não se perde nem se corrompe

Dinheiro em centavos inteiros, nunca ponto flutuante. Exclusão é sempre lógica (`deleted_at`). Toda mudança de status da OS grava na timeline quem fez e quando, na mesma transação. Regras de integridade — uma placa sem duas OS abertas, OS entregue travada, baixa de estoque — são garantidas no banco. Migration aplicada não é editada.

### IV. Feito para o chão da oficina

Primeiro o celular de 360 px, depois tablet e desktop. Ações principais com alvo de toque de pelo menos 48 px. Só tokens de `doc/design.md`, com contraste de texto de no mínimo 4,5:1. Toda lista tem estado vazio, de carregamento e de erro. Interface em pt-BR, R$ e dd/mm/aaaa.

### V. Especificação antes de código, uma fase por vez

Nenhum código de produto sem um pedido de `doc/tarefas.md` e sua especificação em `specs/`. Nada de fase futura entra antes da hora. O que o pedido não pede, não se constrói.

### VI. Simplicidade

A solução mais simples que atende ao pedido. Sem abstração para um uso só. Dependência nova exige motivo registrado em `doc/memoria.md`.

## Restrições técnicas

- Stack: Next.js (App Router), TypeScript em modo `strict`, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL, Auth, Storage), React Hook Form com Zod, Recharts.
- Estrutura de pastas e limites de import conforme `doc/arquitetura.md`.
- Escrita de dados somente por Server Action, no formato validar → autorizar → persistir pelo repositório → revalidar.
- Um único schema Zod por dado, usado no formulário e na action.
- Segredos fora do repositório; a chave secreta do Supabase nunca chega a código de cliente.

## Fluxo de desenvolvimento

- Um pedido por vez: `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`.
- Um pedido está pronto quando lint, tipos e testes passam, funciona em 360 px e 1280 px nos dois temas, e `doc/tarefas.md` e `doc/memoria.md` foram atualizados.
- Commits no padrão `<emoji> <type>(<afetado>): <mensagem>` de `doc/regras.md`.
- Depois de alterar código, `graphify update .`.

## Governança

Esta constituição prevalece sobre preferência pessoal e sobre sugestão de ferramenta. Alterá-la exige aceite do dono do projeto, atualização de `doc/regras.md` no mesmo commit e nova versão: mudança incompatível de princípio sobe a major, princípio novo sobe a minor, ajuste de redação sobe o patch. Um plano que precise violar um princípio registra a justificativa em "Complexity Tracking" e só segue com aceite explícito.

**Version**: 1.0.0 | **Ratified**: 2026-10-07 | **Last Amended**: 2026-10-07
