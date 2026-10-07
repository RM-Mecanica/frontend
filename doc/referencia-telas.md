# Gestão de Oficina Mecânica — guia de telas (transcrição do PDF)

> Transcrição em texto de `Gestão de Oficina Mecânica.pdf` (14 páginas, 1440×810, arte gerada no Canva).
> O PDF é temporário; **este arquivo é a referência permanente das telas**.
> Todos os dados são fictícios (marca "OFICINA PRO", nomes, placas, valores, datas de 2025).
> Trechos marcados com **Obs.** são anotações da transcrição, não estão no PDF.

**Regra de leitura:** quando a arte e o prompt do produto divergem, o prompt vale para **função** (ver `prd.md`) e a arte vale para **visual** (ver `design.md`). As divergências conhecidas estão listadas no fim deste arquivo.

---

## Moldura comum (páginas 3 a 12)

- **Sidebar fixa à esquerda**, fundo azul-escuro, marca "OFICINA PRO" com quadrado laranja.
- Itens, nesta ordem: **VISÃO GERAL** · Atendimentos · Ordens de serviço · Agenda · Estoque · Financeiro · Equipe · **CONFIGURAÇÕES**.
- **Cabeçalho da página:** título grande, subtítulo cinza abaixo, e à direita uma pílula azul "ADMIN • ONLINE".
- **Ação principal** da tela em botão laranja em formato de pílula, no canto inferior direito ou no cabeçalho.
- Conteúdo em cards brancos sobre fundo cinza-azulado bem claro.

**Obs.** A sidebar da arte não tem itens "Clientes" nem "Veículos", embora exista a tela "Cliente e veículo" (página 8).

---

## Página 1 — Capa

GUIA DE TELAS • PRODUTO DIGITAL

**Sistema de Gestão de Oficina**

Wireframes e mockups para uma operação mais rápida, rentável e previsível.

GUIA DE TELAS E PROMPT DE DESIGN • 06 FEV 2025 — Produto & UX — Versão de referência

---

## Página 2 — Mapa da operação

**Do agendamento à garantia, sem perder o controle.**
Cada passagem registra responsável, horário, custo e status do veículo.

Fluxo em 9 passos:

1. Agendamento
2. Check-in
3. Orçamento
4. Aprovação
5. Execução
6. Retirada
7. Check-out
8. Pagamento
9. Garantia

- **ENTRADAS E SAÍDAS** — Visibilidade do pátio, tempo parado e capacidade disponível.
- **CUSTOS SOB CONTROLE** — Peças, comissão e extras compõem a margem real de cada OS.

---

## Página 3 — Dashboard principal

Subtítulo: "Quarta-feira, 06 de fevereiro • operação em tempo real"

Cards de indicador (número grande + rótulo em caixa alta):

| Valor | Rótulo | Cor do número |
|---|---|---|
| 18 | VEÍCULOS AGORA | azul |
| 27 | OS ABERTAS | laranja |
| 6 | AGUARDANDO PEÇA | âmbar |
| 4 | PRONTAS P/ RETIRADA | verde |
| R$ 128 mil | FATURAMENTO DO MÊS | verde |

**Gráfico de linhas "Receita x despesa — 6 meses"** — eixo X: Set, Out, Nov, Dez, Jan, Fev; eixo Y: R$ 0 mil a R$ 140 mil (passo de 20). Receita em laranja, Despesa em azul-escuro.

**Card "SERVIÇOS MAIS REALIZADOS"**

- Troca de óleo — 34
- Alinhamento — 21
- Freios — 18
- Revisão preventiva — 15

**Alerta** (vermelho, com ícone de aviso): "3 veículos parados há mais de 3 dias"

**Botão principal:** "+ NOVO ATENDIMENTO"

**Obs.** Na arte, o card "Faturamento do mês" está sobreposto ao card "Prontas p/ retirada" (erro de diagramação do Canva). Trate como cinco cards separados.

---

## Página 4 — Check-in de veículo

Subtítulo: "Novo atendimento • etapa 2 de 4"

**Etapas:** 1 Cliente · 2 Veículo · 3 Vistoria · 4 Assinatura

**Card "Dados do veículo"**

- PLACA * — ABC1D23
- QUILOMETRAGEM — 82.450 km
- NÍVEL DE COMBUSTÍVEL — ◉ ¼ ○ ½ ○ ¾ ○ Cheio
- RELATO DO CLIENTE — "Ruído ao frear e vibração acima de 80 km/h."
- PREVISÃO DE ENTREGA — 08/02/2025 • 17:00
- MECÂNICO — Rafael Santos

**Card "Vistoria visual"**

- DIAGRAMA DO VEÍCULO — retângulo representando o carro visto de cima, com pontos marcáveis; um ponto marcado com a legenda "risco porta D".
- FOTOS DA VISTORIA • 3/8 anexadas
- "+ Adicionar fotos"

**Botão principal:** "SALVAR E CONTINUAR"

---

## Página 5 — Ordens de serviço (Kanban)

Subtítulo: "Kanban operacional • arraste para atualizar o status"

Sete colunas, cada uma com título colorido. Cada card mostra: placa, cliente, "mecânico • N dias" e uma pílula colorida.

| Coluna | Cor | Cards |
|---|---|---|
| AG. ORÇAMENTO | cinza | ABC1D23 · Marina Lima · Rafael • 1 dias · EM DIA — BRA2E19 · Paulo Reis · Rafael • 2 dias · EM DIA |
| ENVIADO | azul-claro | BRA2E19 · Paulo Reis · Rafael • 2 dias · EM DIA — KLM-4821 · João Alves · Rafael • 3 dias · EM DIA |
| APROVADO | laranja | KLM-4821 · João Alves · Rafael • 3 dias · EM DIA — ABC1D23 · Marina Lima · Rafael • 4 dias · EM DIA |
| EM EXECUÇÃO | azul-escuro | ABC1D23 · Marina Lima · Rafael • 4 dias · EM DIA — BRA2E19 · Paulo Reis · Rafael • 5 dias · EM DIA |
| AG. PEÇA | âmbar | BRA2E19 · Paulo Reis · Rafael • 5 dias · ATENÇÃO — KLM-4821 · João Alves · Rafael • 6 dias · ATENÇÃO |
| PRONTO | verde | KLM-4821 · João Alves · Rafael • 6 dias · EM DIA |
| ENTREGUE | azul quase preto | ABC1D23 · Marina Lima · Rafael • 7 dias · EM DIA |

**Obs.** A pílula do card usa a cor da coluna e o texto "EM DIA"/"ATENÇÃO". Na arte, "ATENÇÃO" só aparece na coluna "Ag. peça", e há cards com 4 a 7 dias marcados "EM DIA" — isso não bate com a regra do produto (alertar OS parada há mais de 3 dias). A regra do produto prevalece. Não existe coluna "Cancelada" na arte.

---

## Página 6 — Detalhe da OS

Título: "OS #02481 • ABC1D23" — Subtítulo: "Marina Lima • Hatch compacto 2020 • Em execução"

**Botão principal:** "ENVIAR ORÇAMENTO"

**Abas:** RESUMO · SERVIÇOS · PEÇAS · FOTOS · PAGAMENTOS · HISTÓRICO

**Card "Serviços e peças"**

| Item | Qtd. | Valor |
|---|---|---|
| Troca de pastilhas dianteiras | 1 | R$ 420,00 |
| Jogo de pastilhas | 1 | R$ 286,00 |
| Alinhamento e balanceamento | 1 | R$ 180,00 |

Observação: "cliente aprovou via WhatsApp às 10:42."

**Card "RESUMO FINANCEIRO"**

| | |
|---|---|
| Serviços | R$ 600,00 |
| Peças | R$ 286,00 |
| Desconto | −R$ 40,00 |
| **TOTAL** | **R$ 846,00** |
| Custo real | R$ 392,00 |
| **MARGEM** | **53,7%** |

**Obs.** As contas fecham: 600 + 286 − 40 = 846; (846 − 392) ÷ 846 = 53,7%.

---

## Página 7 — Check-out do veículo

Subtítulo: "OS #02481 • conferência final e recebimento"

**Botão principal:** "CONFIRMAR ENTREGA"

**Card "Resumo da saída"**

- PLACA — ABC1D23
- KM DE SAÍDA — 82.486 km
- GARANTIA — Válida até 08/05/2025
- ✓ Vistoria final concluída
- ✓ Recibo em PDF pronto
- ✓ OS será travada após a entrega

**Card "Pagamento"**

- SALDO A PAGAR — R$ 846,00
- Forma: ○ Dinheiro ◉ PIX ○ Débito ○ Crédito parcelado ○ Fiado
- CHAVE PIX — 12.345.678/0001-00
- Status: aguardando confirmação

---

## Página 8 — Cliente e veículo

Subtítulo: "Cadastro, relacionamento e histórico por placa"

**Faixa de alerta:** "PRÓXIMA TROCA DE ÓLEO EM 1.250 KM"

**Cliente** — Marina Lima · CPF 123.456.789-00 · (11) 99999-1234 · marina@email.com
ENDEREÇO — Rua das Palmeiras, 120 · São Paulo — SP

**VEÍCULO PRINCIPAL** — ABC1D23 · Hatch compacto • 2020 · 82.486 km

**Histórico de manutenções**

| Data | Serviço | Valor |
|---|---|---|
| 08 FEV 2025 | Freios + alinhamento | R$ 846,00 |
| 12 OUT 2024 | Troca de óleo e filtros | R$ 398,00 |
| 03 MAI 2024 | Revisão preventiva | R$ 720,00 |
| 18 NOV 2023 | Bateria | R$ 560,00 |

---

## Página 9 — Estoque de peças

Subtítulo: "Saldo, custo e reposição conectados às ordens de serviço"

**Botão principal:** "+ NOVA PEÇA"

**Filtros:** busca "Buscar peça, código ou fornecedor…" · Categoria: Todas · Status: Todos

| Código | Peça / categoria | Fornecedor | Custo | Venda | Qtd. | Mín. |
|---|---|---|---|---|---|---|
| PT-001 | Pastilha freio dianteira | AutoParts | R$ 168,00 | R$ 286,00 | 2 | 4 |
| OL-020 | Óleo sintético 5W30 | LubriMax | R$ 34,00 | R$ 58,00 | 18 | 10 |
| FT-012 | Filtro de óleo | Filtros BR | R$ 18,00 | R$ 39,00 | 3 | 5 |
| BT-070 | Bateria 70Ah | Energia Auto | R$ 380,00 | R$ 560,00 | 6 | 2 |
| CR-044 | Correia dentada | Motor Peças | R$ 126,00 | R$ 220,00 | 1 | 3 |

**Rodapé:** "⚠ 3 itens abaixo do estoque mínimo • Baixa automática vinculada à OS"

---

## Página 10 — Financeiro

Subtítulo: "Caixa, resultados e rentabilidade em uma única visão"

**Indicadores:** R$ 128 mil RECEITA · R$ 47 mil LUCRO · 36,7% MARGEM MÉDIA

**Gráfico "Fluxo de caixa mensal"** — Entradas e Saídas; eixo X: Set a Fev; eixo Y: R$ 0 mil a R$ 140 mil.

**Card "DRE SIMPLIFICADO"**

| | |
|---|---|
| Receita bruta | R$ 128.420 |
| Custo de peças | −R$ 38.600 |
| Mão de obra | −R$ 21.300 |
| Despesas fixas | −R$ 21.520 |
| **LUCRO** | **R$ 47.000** |
| Ticket médio | R$ 846 |

**Obs.** As contas fecham: 128.420 − 38.600 − 21.300 − 21.520 = 47.000; 47.000 ÷ 128.420 = 36,6%.

---

## Página 11 — Agenda semanal

Subtítulo: "Capacidade dos elevadores • 03 a 08 de fevereiro"

**Botão principal:** "CONVERTER EM CHECK-IN"

| Horário | SEG 03 | TER 04 | QUA 05 | QUI 06 | SEX 07 | SÁB 08 |
|---|---|---|---|---|---|---|
| 08:00 | ABC1D23 · Revisão | BRA2E19 · Freios | — | JKL4M56 · Óleo | — | NOP7Q89 · Diagnóstico |
| 10:00 | Elevador 2 · Suspensão | — | KLM-4821 · Alinhamento | — | RST3U21 · Embreagem | — |
| 13:00 | — | VWX5Y67 · Ar-cond. | Elevador 1 · Revisão | DEF-9087 · Pneus | — | GHI1J23 · Freios |
| 15:00 | LMN2O34 · Diagnóstico | — | PQR6S78 · Óleo | — | TUV9W01 · Revisão | — |

**Rodapé:** "CAPACIDADE AGORA • Elevador 1: ocupado • Elevador 2: livre • Pátio: 18/24"

---

## Página 12 — Equipe e comissões

Subtítulo: "Produtividade técnica • fevereiro de 2025"

| Mecânico | Concluídas | Tempo médio | Faturamento | Comissão |
|---|---|---|---|---|
| Rafael Santos | 18 OS | 4h12 | R$ 28.400 | 8% |
| Bianca Souza | 15 OS | 3h48 | R$ 24.900 | 8% |
| Carlos Melo | 12 OS | 5h05 | R$ 19.600 | 6% |

**Rodapé:** "Comissões calculadas automaticamente após o pagamento da OS."

---

## Página 13 — Fundação do produto: modelo de dados e regras de negócio

**REGRAS CRÍTICAS**

1. Uma placa não pode ter duas OS abertas.
2. Peças usadas geram baixa automática.
3. Lucro = cobrado − peças − comissão − extras.
4. OS entregue: edição somente por Admin.

**Tabelas citadas:** customers · vehicles · service_orders · os_services · os_parts · payments · expenses · parts · stock_movements · appointments · mechanics

---

## Página 14 — Plano de entrega: roadmap em quatro fases

Evolução do núcleo operacional até a gestão completa da oficina.

| Fase | Nome | Conteúdo |
|---|---|---|
| 01 | OPERAÇÃO | Autenticação, clientes, veículos, check-in e Kanban. |
| 02 | VENDA | Serviços, peças, orçamento em PDF, check-out e pagamentos. |
| 03 | CONTROLE | Estoque, financeiro, dashboard e relatórios. |
| 04 | ESCALA | Agenda, equipe, alertas e configurações. |

PRÓXIMO PASSO • validar fluxos com operação e priorizar o MVP

---

## Divergências entre a arte e o prompt do produto

| Assunto | Na arte (PDF) | No prompt | O que vale |
|---|---|---|---|
| Etapas do check-in | 4: Cliente, Veículo, Vistoria, Assinatura | 7 passos (inclui fotos, previsão/mecânico e geração da OS) | Conteúdo dos 7 passos; o agrupamento em telas é decisão de design |
| Nível de combustível | 4 opções de rádio: ¼, ½, ¾, Cheio | Slider com 5 níveis: vazio, ¼, ½, ¾, cheio | 5 níveis (falta "vazio" na arte) |
| Colunas do Kanban | 7, sem "Cancelada" | 7 + Cancelada | 7 + Cancelada |
| Pílula do card | "EM DIA" / "ATENÇÃO" sem regra clara | Alertar OS parada há mais de 3 dias | Regra dos 3 dias |
| Cards do dashboard | 4 + faturamento | 7 (inclui custo e lucro do mês) | 7 |
| Regras de negócio | 4 regras | 6 regras | 6 |
| Tabelas | 11 | 17 (inclui profiles, os_photos, os_checklist, os_timeline, services_catalog, suppliers) | 17 |
| Menu lateral | Sem "Clientes" e "Veículos" | Módulos Clientes e Veículos existem | Incluir os dois no menu |
| Base da comissão | Mostrada ao lado do faturamento | "% sobre mão de obra" | % sobre mão de obra |
