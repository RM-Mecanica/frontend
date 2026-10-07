# Tarefas

> **5 de 6** · As tarefas base e os pedidos, divididos em fase.
> Marque `[x]` ao concluir. O estado do momento (o que está em andamento, o que travou) fica em `memoria.md`.

**Tarefa base** é fundação: feita uma vez, direto, sem especificação.
**Pedido** é uma entrega de produto. Cada pedido passa pelo spec-kit: o texto dele é a entrada do `/speckit-specify`, que cria `specs/NNN-nome-curto/` (fluxo completo em `regras.md`, seção 4).

Um pedido só começa quando os anteriores de que ele depende estão fechados. Uma fase só começa quando a anterior foi validada pelo dono.

---

## Base — antes de qualquer pedido

- [x] **B00** Documentação inicial, spec-kit e graphify configurados (07/10/2026).
- [ ] **B01** Fechar as decisões em aberto de `memoria.md` que travam o scaffold (nomes de colunas, destino de deploy).
- [ ] **B02** Criar o projeto Next.js: App Router, TypeScript, Tailwind, pasta `src/`, alias `@/`. O `create-next-app` pode recusar a pasta por não estar vazia; nesse caso gere numa pasta temporária e mova os arquivos, preservando `doc/`, `.specify/`, `.claude/`, `CLAUDE.md` e `.gitignore`.
- [ ] **B03** `shadcn init` e os componentes base: button, input, label, card, badge, dialog, sheet, select, checkbox, toggle-group, tabs, table, skeleton, sonner, command, popover, sidebar.
- [ ] **B04** Aplicar os tokens de `design.md` no `globals.css` (claro e escuro) e carregar Montserrat e Open Sans com `next/font`.
- [ ] **B05** Criar as pastas de `arquitetura.md` (`domain`, `data`, `features`, `components/{layout,shared}`, `lib`) e uma regra de lint que barre import fora dos limites das camadas.
- [ ] **B06** Supabase: projeto, CLI local, `.env.example`, clientes de servidor e de navegador em `src/data/supabase`, e `src/proxy.ts` renovando a sessão.
- [ ] **B07** Qualidade: ESLint, checagem de tipos, Vitest, scripts no `package.json` (`dev`, `build`, `lint`, `typecheck`, `test`) e commitlint com o padrão de `regras.md`.
- [ ] **B08** CI no GitHub Actions: lint, tipos, testes e build a cada pull request.
- [ ] **B09** Helpers de domínio com teste: dinheiro em centavos, placa (antiga e Mercosul), CPF/CNPJ, telefone, datas, `Result`.
- [ ] **B10** `graphify update .` depois do scaffold e conferir que o grafo foi gerado; preencher a seção de comandos do `CLAUDE.md`.

---

## Fase 1 — Operação (é a v1)

Objetivo: todo carro que entra vira uma OS e o dono enxerga onde cada um está.

- [ ] **P1.1 — Autenticação e perfis**
  Login por e-mail e senha, logout e sessão persistente. Tabela `profiles` com perfil `admin`, `atendente` ou `mecanico`. Área logada protegida. Função de perfil para as políticas de RLS e verificação de perfil nas Server Actions. Sem cadastro público.
  *Pronto quando:* um usuário de cada perfil entra e vê só o que pode; sem sessão, qualquer rota da área logada leva ao login.

- [ ] **P1.2 — Layout e navegação** · depende de P1.1
  Sidebar fixa no desktop, barra inferior no celular, cabeçalho de página, alternância claro/escuro, toasts, skeleton e estado vazio padrão.
  *Pronto quando:* navega em 360 px e em 1280 px; o menu respeita o perfil; o tema escolhido se mantém ao recarregar.

- [ ] **P1.3 — Clientes** · depende de P1.2
  Lista com busca por nome, telefone ou CPF/CNPJ. Criar, editar e excluir (soft delete). Campos: nome, CPF/CNPJ, telefone/WhatsApp, e-mail, endereço, observações. Página do cliente com veículos vinculados e OS.
  *Pronto quando:* CPF/CNPJ e telefone inválidos são recusados com mensagem clara; cliente excluído some das listas e continua no histórico das OS. Total gasto e saldo em aberto ficam para a Fase 2.

- [ ] **P1.4 — Veículos** · depende de P1.3
  Cadastro com placa (antiga e Mercosul, com máscara e validação, única), marca, modelo, ano, cor, combustível, chassi, km atual e cliente dono. Lista com busca por placa. Página do veículo com as OS dele.
  *Pronto quando:* `ABC-1234`, `abc1234` e `ABC1D23` são aceitas e normalizadas; placa repetida é recusada. Linha do tempo completa e alertas de revisão ficam para a Fase 4.

- [ ] **P1.5 — Check-in** · depende de P1.3 e P1.4
  Fluxo em etapas: cliente (buscar ou cadastrar na hora) → veículo (buscar pela placa ou cadastrar na hora) → dados da entrada (data e hora automáticas, km, combustível em 5 níveis, relato do cliente) → vistoria (avarias no diagrama do carro; checklist de pneus, estepe, macaco, triângulo, som, documentos, objetos de valor) → fotos (até 8) → previsão de entrega e mecânico responsável → salvar. Salvar cria a OS com número sequencial, status "Aguardando orçamento" e a primeira entrada na timeline, e abre o "Termo de entrada" para imprimir ou salvar em PDF, com campo de assinatura.
  *Pronto quando:* um check-in inteiro é feito num celular de 360 px; a segunda tentativa com uma placa que já tem OS aberta é barrada e mostra a OS existente; voltar uma etapa não perde o que foi digitado.

- [ ] **P1.6 — Lista e detalhe da OS** · depende de P1.5
  Lista com busca e filtros por status, placa, cliente, mecânico e período. Detalhe mínimo: resumo da entrada, checklist, fotos e histórico.
  *Pronto quando:* o mecânico vê apenas as OS dele — conferido no banco, não só na tela. As abas de serviços, peças e pagamentos ficam para a Fase 2.

- [ ] **P1.7 — Kanban** · depende de P1.6
  Colunas: Aguardando orçamento, Orçamento enviado, Aprovado, Em execução, Aguardando peça, Pronto p/ retirada, Entregue; canceladas à parte. Mover por arrasto e também por menu "mover para…". Toda mudança valida a transição, grava na timeline quem fez e quando, e mover para "Entregue" registra a data e hora de saída.
  *Pronto quando:* transição inválida é recusada com explicação; OS parada há mais de 3 dias aparece destacada; OS entregue não pode mais ser editada, e só o Admin consegue reabrir.

- [ ] **P1.8 — Dados de exemplo da Fase 1** · depende de P1.7
  Seed com um usuário de cada perfil, mecânicos, 10 clientes, 15 veículos com placas válidas nos dois padrões e 20 OS em status variados, incluindo algumas paradas há mais de 3 dias.
  *Pronto quando:* um banco novo, depois do seed, mostra o Kanban cheio e com alertas.

**Fim da fase:** o dono usa por alguns dias e valida as metas de `prd.md` antes de liberar a Fase 2.

---

## Fase 2 — Venda

Objetivo: a OS vira orçamento, depois cobrança, e já mostra a margem.

- [ ] **P2.1 — Catálogo de serviços** — serviços com preço padrão; seed com 15 (troca de óleo, alinhamento, freios, suspensão, revisão completa…).
- [ ] **P2.2 — Detalhe completo da OS** — abas Resumo, Serviços, Peças, Fotos, Pagamentos e Histórico.
- [ ] **P2.3 — Serviços na OS** — escolher do catálogo, quantidade, mecânico e desconto.
- [ ] **P2.4 — Peças na OS** — peça avulsa digitada, com **custo de compra e preço de venda separados**. A seleção a partir do estoque entra na Fase 3.
- [ ] **P2.5 — Totais e margem** — serviços + peças − desconto = total; custo real e margem da OS, com a fórmula em `domain` e testada.
- [ ] **P2.6 — Orçamento** — PDF para o cliente e botão "Enviar por WhatsApp" (link `wa.me` com mensagem pronta).
- [ ] **P2.7 — Aprovação do orçamento** — registrar quando e quem aprovou.
- [ ] **P2.8 — Check-out** — botão "Finalizar e entregar", habilitado só em "Pronto p/ retirada": resumo, saldo a pagar, formas de pagamento (dinheiro, PIX, débito, crédito com parcelas, fiado), data, hora e km de saída, observações, garantia em dias ou km com vencimento calculado, recibo em PDF. A OS trava ao entregar.
- [ ] **P2.9 — Cliente com valores** — total gasto e saldo em aberto no perfil do cliente.

---

## Fase 3 — Controle

Objetivo: o dono sabe quanto gasta e quanto lucra por serviço, por mês e por cliente.

- [ ] **P3.1 — Estoque** — peças (código, nome, categoria, fornecedor, custo, preço de venda, quantidade, mínimo, localização), fornecedores, entrada por compra; seed com 30 peças.
- [ ] **P3.2 — Baixa automática** — peça usada na OS dá baixa; cancelar a OS devolve; alerta de estoque baixo.
- [ ] **P3.3 — Entradas** — pagamentos de OS e outras receitas.
- [ ] **P3.4 — Saídas** — despesas com categoria, fornecedor, vencimento, pagamento, status (pendente ou pago) e recorrência mensal.
- [ ] **P3.5 — Contas a receber e a pagar** — fiado e parcelas; vencidas em destaque.
- [ ] **P3.6 — Fluxo de caixa** — diário e mensal.
- [ ] **P3.7 — DRE simplificado** — receita bruta − custo de peças − mão de obra − despesas fixas = lucro, por mês.
- [ ] **P3.8 — Rentabilidade** — custo e lucro por OS, por serviço e por cliente; ticket médio, margem média, serviços mais lucrativos.
- [ ] **P3.9 — Dashboard** — os sete indicadores, receita × despesa dos últimos 6 meses, serviços mais realizados, veículos parados, atalho "+ Novo atendimento".
- [ ] **P3.10 — Exportação** — tudo em CSV/Excel.
- [ ] **P3.11 — Dados de exemplo** — 3 meses de movimentação financeira para os gráficos.

---

## Fase 4 — Escala

Objetivo: planejar a semana, medir a equipe e deixar a oficina configurar o próprio sistema.

- [ ] **P4.1 — Agenda** — calendário semanal, capacidade de vagas e elevadores, e conversão do agendamento em check-in com um clique.
- [ ] **P4.2 — Equipe e comissões** — cadastro, comissão em % sobre a mão de obra, produtividade (OS concluídas, tempo médio, faturamento gerado).
- [ ] **P4.3 — Histórico por placa** — linha do tempo completa de manutenções do veículo.
- [ ] **P4.4 — Alertas de revisão** — "próxima troca de óleo em X km" ou em uma data.
- [ ] **P4.5 — Configurações** — dados da oficina (nome, CNPJ, logo, endereço, telefone), categorias de despesa, formas de pagamento, textos padrão do termo de entrada e do orçamento.
- [ ] **P4.6 — Usuários e permissões** — o Admin cria e desativa usuários pelo sistema.
