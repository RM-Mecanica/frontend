# Memória

> **6 de 6** · O que já foi feito e onde o projeto parou. **Atualize ao fim de toda sessão de trabalho.**
> Não confundir com `.specify/memory/`, que guarda a constituição do spec-kit.

## Onde o projeto parou

**Atualizado em 07/10/2026.**

- **Estado:** documentação e ferramentas montadas. **Nenhuma linha de código de produto existe.** Não há `package.json`, nem projeto Supabase.
- **Repositório:** `github.com/RM-Mecanica/frontend`, branch `main`, um commit ("Initial commit", só o README). Tudo o que foi criado em 07/10/2026 está **sem commit**.
- **Fase:** antes da Fase 1. Tarefa base B00 concluída; B01 é a próxima.

## Próximo passo

1. Liberar espaço em disco na máquina de desenvolvimento (ver Bloqueios).
2. Fechar as três decisões que travam o scaffold: D1, D2 e D3 abaixo.
3. Revisar os documentos e commitar a estrutura. Sugestão de mensagem: `📚 docs(specs): add product docs, spec-kit and graphify setup`.
4. Seguir `tarefas.md` a partir de B02 (criar o projeto Next.js).
5. Com a base pronta, abrir o primeiro pedido: `/speckit-specify` com o texto de P1.1.

## Bloqueios

- **Disco cheio.** Na máquina onde a estrutura foi montada, o disco de 228 GB tinha cerca de 120 MB livres em 07/10/2026. Um `npm install` de projeto Next.js não cabe nisso. Durante a montagem, a instalação do spec-kit pelo GitHub falhou por falta de espaço (foi instalado pelo PyPI) e um comando chegou a falhar com "no space left on device".

## O que já foi feito

### 07/10/2026 — estrutura inicial

- A arte do Canva (`doc/Gestão de Oficina Mecânica.pdf`, 14 páginas) foi transcrita para `doc/referencia-telas.md`, com a lista de divergências entre a arte e o prompt do produto.
- Criados os seis documentos em `doc/`: `prd.md`, `arquitetura.md`, `regras.md`, `design.md`, `tarefas.md` e este.
- Cores e fontes de `design.md` foram extraídas do próprio PDF; os contrastes foram medidos.
- **spec-kit 1.1.1** inicializado com a integração do Claude Code (`specify init --here --integration claude --script sh`): pasta `.specify/` e dez skills `/speckit-*` em `.claude/skills/`. A constituição (`.specify/memory/constitution.md`) foi preenchida, versão 1.0.0.
- **graphify** ligado ao repositório: seção no `CLAUDE.md`, hooks do Claude Code em `.claude/settings.json`, hooks de git (`post-commit` e `post-checkout`) e grafo inicial em `graphify-out/` com pouco mais de 300 nós. Por enquanto o grafo cobre os títulos dos documentos de `doc/` e os scripts do spec-kit; `graphify query` já funciona sobre eles.
- **MCPs `kh-*`** consultados (architecture, ddd, design, frontend, security). O que cada um respondeu está em `regras.md`, seção 4.
- Criados `CLAUDE.md` (porta de entrada do agente) e um `.gitignore` mínimo.

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

## Decisões em aberto

### Travam o scaffold

- **D1 — Backend.** O prompt define Supabase como backend. O repositório se chama `frontend` e está numa organização própria, o que sugere que pode existir um `backend` separado. A documentação assume **Supabase, sem API própria**. Confirmar.
- **D2 — Idioma das colunas do banco.** O prompt mistura tabelas em inglês (`service_orders`) com colunas em português (`km_entrada`, `entrada_em`). A documentação segue o prompt como está. Padronizar agora custa nada; depois da primeira migration, custa caro.
- **D3 — Destino de deploy.** O prompt não diz onde a aplicação roda. Define variáveis de ambiente, CI e domínio.

### Podem esperar

- **D4 — Recorte da v1.** Confirmar que a v1 é só a Fase 1. A alternativa é Fase 1 + Fase 2, que já entrega orçamento, check-out e pagamento.
- **D5 — Nome e marca.** "OFICINA PRO" é o nome fictício da arte. A documentação usa "RM Mecânica" por causa do nome da organização no GitHub. Falta logo.
- **D6 — Lista do que fica fora do produto** (`prd.md`, seção 4): é uma proposta, precisa de aceite.
- **D7 — Assinatura do termo de entrada.** A arte tem uma etapa "Assinatura"; o prompt pede um campo de assinatura no PDF. A documentação assume assinatura no papel. Captura na tela seria escopo novo.
- **D8 — Bibliotecas ainda sem escolha:** arrastar no Kanban e geração de PDF. Recomendações em `arquitetura.md`, seção 3.
- **D9 — Versionar `graphify-out/`?** Hoje não está no `.gitignore` nem commitado.
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
