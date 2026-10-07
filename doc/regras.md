# Regras

> **3 de 6** · Como o código é escrito, o que o agente não mexe e onde cada coisa fica.
> Vale para pessoas e para agentes de IA. O resumo inegociável está em `.specify/memory/constitution.md`, que o spec-kit lê em todo `/speckit-plan`; este arquivo é o detalhe. Se os dois divergirem, corrija os dois no mesmo commit.

## 1. Como o código é escrito

### TypeScript e React

- `strict` ligado. Sem `any`, sem `@ts-ignore`, sem `as` para calar erro. Se o tipo está errado, conserte o tipo.
- **Server Component por padrão.** `"use client"` só no componente folha que precisa de estado, evento ou API do navegador.
- Leitura de dados em Server Component, chamando `queries.ts` da feature. Nada de `useEffect` para buscar dado.
- Comentário explica o **porquê**. O que o código faz, o código diz.

### Escrita de dados: sempre por Server Action

Toda mutação segue os mesmos quatro passos, nesta ordem:

```ts
// src/features/customers/actions.ts
"use server";

export async function createCustomer(input: unknown): Promise<Result<{ id: string }>> {
  const parsed = customerSchema.safeParse(input);               // 1. valida com Zod
  if (!parsed.success) return fail("Confira os campos destacados", parsed.error);

  const user = await requireRole(["admin", "atendente"]);       // 2. confere o perfil

  const id = await customersRepo.create(parsed.data, user.id);  // 3. persiste pelo repositório

  revalidatePath("/clientes");                                  // 4. revalida a tela
  return ok({ id });
}
```

- O **mesmo schema Zod** valida o formulário (React Hook Form) e a action. Não existem duas definições do mesmo dado.
- Action devolve `Result` (`{ ok: true, data }` ou `{ ok: false, error, fieldErrors? }`). Erro esperado não vira `throw`.
- Mensagem de erro para o usuário é em português e diz o que fazer.
- Só `src/data` importa o cliente do Supabase. Feature chama repositório.

### Regras de negócio

- Cálculo e decisão de negócio ficam em `src/domain`, como função pura, **com teste** ao lado (`*.test.ts`). Exemplos: total e margem da OS, transições de status, validação de placa e de CPF/CNPJ.
- Uma regra tem um único lugar. Se a tela e a action precisam dela, as duas importam do domínio.
- Use a linguagem da oficina nos nomes: OS, placa, check-in, orçamento, fiado (linguagem ubíqua — fonte: `kh-ddd`, *DDD — referência*, E. Evans).

### Dados

- **Dinheiro em centavos**, inteiro. Formatação com um único helper (`formatBRL`) e só na borda da tela.
- **Datas** em UTC no banco; exibição em dd/mm/aaaa pelo helper de data, no fuso da oficina.
- **Placa** guardada em maiúscula e sem hífen; máscara só na exibição; aceitar padrão antigo e Mercosul.
- **Nunca apagar registro.** Exclusão é `deleted_at`, e toda consulta filtra.
- **Toda tabela nova nasce com RLS** e política por perfil na mesma migration.
- **Toda mudança de status da OS grava na timeline** (quem e quando), na mesma transação.

### Interface

- Só tokens de `design.md`. Nenhuma cor em hexadecimal solta em componente.
- Alvo de toque de no mínimo 48 px nas ações principais; campo de formulário com fonte de 16 px ou mais.
- Toda lista tem os três estados: vazio, carregando (skeleton) e erro. Toda ação que grava dá retorno (toast).
- Construa primeiro em 360 px de largura; depois ajuste para tablet e desktop.
- Texto de interface 100% em pt-BR, R$ e dd/mm/aaaa.

### Idioma do código

- Identificadores, arquivos e pastas em **inglês**.
- Termos da oficina sem tradução natural ficam em **português**: `os`, `placa`, `cpf`, `cnpj`, `pix`, `fiado`, e os valores de status (`aguardando_orcamento`, `em_execucao`…).
- Banco: tabelas com os nomes do prompt do produto, em inglês; colunas de domínio como no prompt (`km_entrada`, `entrada_em`, `previsao_entrega`); colunas técnicas em inglês (`id`, `created_at`, `updated_at`, `deleted_at`). Essa mistura veio do prompt e está marcada como decisão em aberto em `memoria.md` — feche antes da primeira migration.

### Escopo

- Só entra o que está no pedido em andamento (`tarefas.md`). Nada de adiantar fase futura "aproveitando".
- Sem abstração para um uso só e sem biblioteca nova por conveniência. Dependência nova exige registro em `memoria.md` com o motivo.

## 2. O que o agente não mexe

| Não mexer | Por quê | Se precisar |
|---|---|---|
| `.env*`, chaves e segredos | Vazamento não tem volta | Peça ao humano; documente só o nome da variável em `.env.example` |
| Migrations já aplicadas em `supabase/migrations/` | Reescrever histórico quebra os outros ambientes | Crie uma migration nova |
| Políticas de RLS, para afrouxar ou desligar | É a segurança real do sistema | Pare e explique o que a política está bloqueando |
| Banco de produção (`db reset`, `db push`, SQL manual) | Perda de dados da oficina | Só com ordem explícita, comando por comando |
| `src/components/ui/` (shadcn) | Código gerado; reescrever impede atualizar | Ajuste token ou variant; composição nova vai em `components/shared` |
| `.specify/templates`, `.specify/scripts` e `.claude/skills/speckit-*` | Gerenciados pela CLI do spec-kit | Atualize com a CLI `specify` |
| `graphify-out/` | Gerado | Rode `graphify update .` |
| `doc/prd.md`, `doc/arquitetura.md`, `doc/design.md`, `doc/regras.md` | São decisões do dono do projeto | Proponha a mudança e espere o aceite |
| `doc/Gestão de Oficina Mecânica.pdf` e `doc/referencia-telas.md` | Material de referência | — |
| `package-lock.json` editado à mão | Vira inconsistência silenciosa | Use o npm |
| Git: `push`, `--force`, `--no-verify`, merge na `main`, reescrita de histórico | Afeta o time e o remoto | Só com pedido explícito; commit também só quando pedido |

**O agente deve atualizar sem pedir:** `doc/memoria.md` ao fim de cada sessão, as caixas de `doc/tarefas.md` ao concluir um pedido, e os artefatos em `specs/`.

## 3. Estrutura

A árvore de pastas e a tabela de quem pode importar quem estão em `arquitetura.md`. Aqui, onde cada tipo de arquivo vai e como se chama.

| O que é | Onde vai | Nome |
|---|---|---|
| Página, layout, loading, error | `src/app/**` | Convenção do Next (`page.tsx`, `layout.tsx`…) |
| Componente de uma tela | `src/features/<nome>/components/` | `kebab-case.tsx`, export em `PascalCase` |
| Server Action | `src/features/<nome>/actions.ts` | Verbo + substantivo: `createCustomer` |
| Leitura | `src/features/<nome>/queries.ts` | `getCustomerById`, `listOpenOrders` |
| Schema Zod | `src/features/<nome>/schemas.ts` | `customerSchema` |
| Regra pura | `src/domain/<agregado>/` | `totals.ts`, `status.ts`, `plate.ts` |
| Teste de regra | Ao lado do arquivo | `plate.test.ts` |
| Repositório | `src/data/repositories/` | `customers.repo.ts` |
| Componente reutilizável | `src/components/shared/` | `status-badge.tsx` |
| Componente shadcn | `src/components/ui/` | Como a CLI gerar |
| Formatação e constantes | `src/lib/` | `format.ts` |
| Migration | `supabase/migrations/` | Timestamp da CLI + descrição em inglês |
| Especificação de um pedido | `specs/NNN-nome-curto/` | Criado pelo `/speckit-specify` |

Limites que não se cruzam:

- `domain` não importa nada de framework nem de outras camadas.
- Uma feature não importa outra feature.
- `components` não importa `features` nem `data`.

## 4. Fluxo de trabalho e ferramentas

### Um pedido, do início ao fim (spec-kit)

1. Leia `doc/memoria.md` e pegue o próximo pedido aberto em `doc/tarefas.md`.
2. Crie a branch do pedido: `NNN-nome-curto`.
3. `/speckit-specify` com o texto do pedido → `specs/NNN-nome-curto/spec.md`.
4. `/speckit-clarify` se sobrou ambiguidade.
5. `/speckit-plan` → `plan.md`, `data-model.md` e afins. O plano tem que respeitar `arquitetura.md` e `design.md`.
6. `/speckit-tasks` → `tasks.md`. Opcional: `/speckit-analyze` para checar coerência.
7. `/speckit-implement`.
8. Feche: marque o pedido em `tarefas.md`, atualize `memoria.md`, rode `graphify update .`.

### Graphify (mapa do código)

- Antes de procurar no código: `graphify query "<pergunta>"`. Para relações: `graphify path "A" "B"`. Para um conceito: `graphify explain "X"`.
- Antes de alterar algo compartilhado: `graphify affected "X"` mostra quem depende.
- Depois de alterar código: `graphify update .` (só AST, sem custo de API).
- Hoje o grafo cobre os documentos de `doc/` e os scripts do spec-kit; o código de produto entra nele depois do scaffold.

### MCPs de conhecimento (`kh-*`)

Consulte com `query_knowledge` e cite a fonte que voltar. Conteúdo observado na consulta de 07/10/2026:

| Dúvida | MCP | O que respondeu |
|---|---|---|
| Camadas, dependências, SOLID | `kh-architecture` | *Arquitetura Limpa* (R. Martin) |
| Modelagem, agregados, linguagem ubíqua | `kh-ddd` | *DDD — referência* (E. Evans) |
| Componentes, tokens, design system | `kh-design` | *Atomic Design* (B. Frost) e *Design Systems* (A. Kholmatova) |
| Frontend | `kh-frontend` | Só *Building Micro-Frontends* (L. Mezzalira); nada sobre Next.js App Router |
| Segurança | `kh-security` | Só material introdutório de criptografia; nada sobre RLS ou controle de acesso por perfil |
| Não sei onde procurar | `kh-router` | `route_query` indica o domínio; `federated_search` busca em todos |

`kh-backend`, `kh-devops` e `kh-ai` existem e ainda não foram consultados para este projeto.

Para Next.js, Supabase, Tailwind e shadcn, os MCPs acima não ajudam: use a documentação oficial da versão instalada.

### Commits

Formato obrigatório, igual ao dos outros repositórios do time:

```
<emoji> <type>(<afetado>): <mensagem>
```

| Tipo | Emoji | Uso |
|---|---|---|
| feat | ✨ | Nova funcionalidade |
| fix | 🐛 | Correção de bug |
| chore | 🔧 | Manutenção, configuração, dependências |
| refactor | ♻️ | Refatoração sem mudar comportamento |
| ci | 👷 | CI/CD, pipelines, workflows |
| docs | 📚 | Documentação |

Mensagem no imperativo, em minúsculas, sem ponto final, com até 72 caracteres. Corpo opcional explicando o porquê. Mudança incompatível leva `!` depois do tipo. Exemplo: `✨ feat(check-in): block second open order for the same plate`.

### Pronto é quando

- Lint, checagem de tipos e testes passam.
- Funciona em 360 px e em 1280 px, no claro e no escuro.
- Estados de vazio, carregando e erro existem.
- Tabelas novas têm RLS e política por perfil.
- `tarefas.md` e `memoria.md` estão atualizados.
