# Design

> **4 de 6** · Cores, fontes e componentes.
> As cores e fontes desta página foram **extraídas do PDF do Canva** (`referencia-telas.md` tem o conteúdo das telas). O que não existe na arte está marcado como **proposta**.
> Identidade: azul-escuro e laranja, visual limpo, cards com bastante respiro, pensado para celular e tablet no chão da oficina.

## 1. Cores

### Paleta da arte

| Token | Hex | Onde aparece na arte |
|---|---|---|
| `navy-900` | `#0B1F3A` | Sidebar; pílula "Entregue" |
| `navy-700` | `#173F6D` | Azul principal: pílula do usuário, números, linha de despesa, "Em execução" |
| `orange-500` | `#FF7A1A` | Marca, botão principal, linha de receita, "Aprovado" |
| `ink` | `#142033` | Texto principal |
| `slate` | `#68758A` | Texto secundário; "Ag. orçamento" |
| `canvas` | `#F4F7FB` | Fundo da página |
| `surface` | `#FFFFFF` | Cards |
| `subtle` | `#E9EEF5` | Fundo das colunas do Kanban |
| `on-dark` | `#C5D2E5` | Texto sobre a sidebar |
| `success` | `#20A36A` | "Pronto", faturamento |
| `warning` | `#F2B84B` | "Ag. peça", atenção |
| `danger` | `#D94B5B` | Alerta de veículo parado |
| `info` | `#2F8FC9` | "Orçamento enviado" |

### Ajustes de contraste (medidos)

A arte usa texto branco sobre laranja, âmbar, verde e azul-claro. Medindo pela fórmula da WCAG, essas combinações ficam abaixo de 4,5:1, o mínimo para texto normal — e esta interface é usada com pressa, sob luz forte. As cores continuam as mesmas; muda só a cor do texto que vai por cima.

| Combinação | Na arte | Contraste | Usar | Contraste |
|---|---|---|---|---|
| Texto no botão laranja | branco | 2,61 | `navy-900` | 6,33 |
| Texto na pílula âmbar | branco | 1,79 | `navy-900` | 9,23 |
| Texto na pílula verde | branco | 3,23 | `navy-900` | 5,12 |
| Texto na pílula azul-claro | branco | 3,56 | `navy-900` | 4,64 |
| Texto secundário sobre o fundo `canvas` | `#68758A` | 4,34 | `#5C697D` | 5,18 |
| Texto vermelho pequeno sobre branco | `#D94B5B` | 4,11 | `#B83242` | 5,88 |

Para texto colorido **pequeno** sobre fundo claro, use a variante forte: sucesso `#14784C` (5,50), aviso `#8A5A00` (5,93), informação `#1C6A9C` (5,85), laranja `#B84E00` (5,09). As cores originais continuam valendo para preenchimentos, ícones e números grandes (a partir de 24 px em negrito, onde o mínimo é 3:1).

### Tokens para o `globals.css`

Variáveis no formato que o shadcn espera. O `shadcn init` gera o bloco `@theme inline`; troque só os valores abaixo e acrescente os tokens de status.

```css
:root {
  --radius: 0.375rem;

  --background: #F4F7FB;
  --foreground: #142033;
  --card: #FFFFFF;
  --card-foreground: #142033;
  --popover: #FFFFFF;
  --popover-foreground: #142033;

  --primary: #FF7A1A;            /* ação principal */
  --primary-foreground: #0B1F3A;
  --secondary: #173F6D;
  --secondary-foreground: #FFFFFF;
  --muted: #E9EEF5;
  --muted-foreground: #5C697D;
  --accent: #E9EEF5;
  --accent-foreground: #142033;
  --destructive: #B83242;

  --border: #D5DEEA;             /* proposta: divisória decorativa */
  --input: #8A97AB;              /* proposta: contorno de campo, 2,96:1 sobre branco */
  --ring: #173F6D;               /* foco: 9,93:1 sobre o fundo */

  --sidebar: #0B1F3A;
  --sidebar-foreground: #C5D2E5;
  --sidebar-primary: #FF7A1A;
  --sidebar-primary-foreground: #0B1F3A;
  --sidebar-accent: #173F6D;
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: #173F6D;
  --sidebar-ring: #FF7A1A;

  --success: #20A36A;  --success-strong: #14784C;
  --warning: #F2B84B;  --warning-strong: #8A5A00;
  --danger:  #D94B5B;  --danger-strong:  #B83242;
  --info:    #2F8FC9;  --info-strong:    #1C6A9C;

  --chart-1: #FF7A1A;            /* receita, entradas */
  --chart-2: #173F6D;            /* despesa, saídas */
  --chart-3: #20A36A;
  --chart-4: #2F8FC9;
  --chart-5: #F2B84B;
}
```

### Modo escuro (proposta)

A arte só tem modo claro. Ponto de partida derivado da mesma paleta, com contraste medido; valide na tela antes de dar por fechado.

```css
.dark {
  --background: #081627;
  --foreground: #E9EEF5;           /* 15,60:1 */
  --card: #0F2744;
  --card-foreground: #E9EEF5;      /* 12,92:1 */
  --popover: #0F2744;
  --popover-foreground: #E9EEF5;

  --primary: #FF7A1A;              /* 5,78:1 sobre o card */
  --primary-foreground: #0B1F3A;
  --secondary: #173F6D;
  --secondary-foreground: #FFFFFF;
  --muted: #0F2744;
  --muted-foreground: #91A4BE;     /* 5,92:1 sobre o card */
  --accent: #173F6D;
  --accent-foreground: #FFFFFF;
  --destructive: #F0707F;          /* 5,26:1 */

  --border: #1F3B5F;
  --input: #5B7BA6;                /* 3,46:1 */
  --ring: #FF7A1A;

  --success: #3CC98B;  --success-strong: #3CC98B;   /* 7,12:1 */
  --warning: #F2B84B;  --warning-strong: #F2B84B;
  --danger:  #F0707F;  --danger-strong:  #F0707F;
  --info:    #5AAEE0;  --info-strong:    #5AAEE0;   /* 6,14:1 */

  --chart-2: #5AAEE0;              /* o azul-escuro some no fundo escuro */
}
```

A sidebar mantém as mesmas cores nos dois modos.

### Status da OS

Uma cor por status, usada no título da coluna do Kanban e no `StatusBadge`.

| Status | Rótulo | Fundo | Texto |
|---|---|---|---|
| `aguardando_orcamento` | Ag. orçamento | `#68758A` | branco |
| `orcamento_enviado` | Orçamento enviado | `#2F8FC9` | `#0B1F3A` |
| `aprovado` | Aprovado | `#FF7A1A` | `#0B1F3A` |
| `em_execucao` | Em execução | `#173F6D` | branco |
| `aguardando_peca` | Ag. peça | `#F2B84B` | `#0B1F3A` |
| `pronto_retirada` | Pronto p/ retirada | `#20A36A` | `#0B1F3A` |
| `entregue` | Entregue | `#0B1F3A` | branco |
| `cancelada` | Cancelada | `#B83242` | branco |

"Cancelada" não existe na arte: é proposta. No modo escuro, "Entregue" precisa de contorno, porque o fundo dele se confunde com o card.

Cor nunca é o único sinal: todo status aparece com o rótulo escrito.

## 2. Fontes

As duas fontes da arte estão no Google Fonts; carregue com `next/font/google`.

| Papel | Fonte | Pesos |
|---|---|---|
| Títulos, números de indicador, marca | **Montserrat** | 700 |
| Texto, rótulos, tabelas, formulários | **Open Sans** | 400 e 700 |

| Estilo | Fonte | Tamanho | Uso |
|---|---|---|---|
| Indicador | Montserrat 700 | 2,25 rem (36 px) | Número grande dos cards |
| Título de página | Montserrat 700 | 1,75 rem (28 px) | Um por tela |
| Título de card | Montserrat 700 | 1,25 rem (20 px) | Seções dentro da tela |
| Corpo | Open Sans 400 | 1 rem (16 px) | Padrão; mínimo em campos de formulário |
| Apoio | Open Sans 400 | 0,875 rem (14 px) | Subtítulos, texto secundário |
| Rótulo | Open Sans 700 | 0,75 rem (12 px), caixa alta, espaçamento 0,06 em | Rótulos de campo e de indicador |

Na arte, o título de página tem 28 px e o corpo fica entre 14 e 17 px; a tabela acima arredonda para uma escala só. Números de dinheiro e quilometragem em colunas usam `tabular-nums`.

## 3. Forma e espaço

- **Cantos:** cards e campos com raio pequeno (`--radius`, 6 px); botões principais e pílulas totalmente arredondados, como na arte.
- **Cards:** fundo branco, borda de 1 px, sem sombra.
- **Respiro:** padding de card de 16 px no celular e 24 px a partir do tablet; espaço entre cards igual ao padding.
- **Toque:** ações principais com pelo menos 48 px de altura (o botão principal da arte tem cerca de 56 px); qualquer alvo com pelo menos 44 px. É uso com mão suja, em tablet.
- **Foco:** contorno visível de 2 px em todo elemento interativo.

## 4. Layout

| Largura | Navegação | Conteúdo |
|---|---|---|
| Até 1023 px (celular e tablet em pé) | Barra inferior fixa com até 5 itens | Uma coluna; listas viram cards; Kanban rola na horizontal, uma coluna por vez |
| A partir de 1024 px | Sidebar fixa de 240 px | Grade de cards; Kanban com todas as colunas |

- **Sidebar** (ordem da arte, mais Clientes e Veículos): Visão geral · Atendimentos · Ordens de serviço · Clientes · Veículos · Agenda · Estoque · Financeiro · Equipe · Configurações. Item de fase futura fica **oculto** até existir; nada de item desabilitado.
- **Barra inferior** (proposta): Início · OS · **+ Novo atendimento** (central, laranja) · Clientes · Mais.
- **Cabeçalho de página:** título, subtítulo, e a ação principal da tela. No celular a ação principal fica fixa no rodapé, acima da barra de navegação.
- O menu respeita o perfil: o mecânico vê só o que usa.

## 5. Componentes

Base em shadcn/ui. Os compostos ficam em `src/components/shared` (reutilizáveis) ou na feature (específicos). A organização segue a ideia de átomos → moléculas → organismos (fonte: `kh-design`, *Atomic Design*, B. Frost): `ui/` são os átomos, `shared/` as moléculas, e as telas montam os organismos.

### Estrutura

| Componente | Base shadcn | Observação |
|---|---|---|
| `AppSidebar` | `sidebar` | Fundo `navy-900`, marca com quadrado laranja |
| `BottomNav` | — | Só abaixo de 1024 px |
| `PageHeader` | — | Título, subtítulo, ação |
| `KpiCard` | `card` | Número grande colorido + rótulo em caixa alta |
| `EmptyState` | — | Ícone, uma frase e a ação que resolve |
| Skeletons | `skeleton` | Um por formato de lista |
| Toasts | `sonner` | Confirmação de toda gravação |

### Entrada de dados

| Componente | Base shadcn | Observação |
|---|---|---|
| `PlateInput` | `input` | Máscara e validação dos dois padrões; sempre em maiúsculas |
| `CpfCnpjInput`, `PhoneInput`, `MoneyInput`, `KmInput` | `input` | Máscara brasileira; teclado numérico no celular |
| `FuelLevel` | `toggle-group` | Cinco botões: vazio, ¼, ½, ¾, cheio. O prompt pede slider e a arte mostra rádio; botões segmentados dão o mesmo resultado com alvo de toque maior |
| `Stepper` | — | Etapas do check-in, com a atual destacada |
| `VehicleDiagram` | — | Carro visto de cima, com pontos de avaria marcáveis e legenda |
| `ChecklistItem` | `checkbox` | Linha inteira clicável |
| `PhotoUploader` | — | Até 8 fotos, com contador "3/8", câmera do celular e miniaturas |
| `CustomerSearch`, `VehicleSearch` | `command` | Busca com opção "cadastrar novo" no fim da lista |

### Ordens de serviço

| Componente | Base shadcn | Observação |
|---|---|---|
| `StatusBadge` | `badge` | Cores da tabela de status |
| `DelayBadge` | `badge` | "Em dia" neutro; "Parada há N dias" em vermelho quando passa de 3 dias |
| `OsCard` | `card` | Placa, cliente, mecânico e dias; menu "mover para…" como alternativa a arrastar |
| `KanbanBoard`, `KanbanColumn` | — | Coluna com fundo `subtle` e título na cor do status |
| `OsFilters` | `select`, `input`, `popover` | Status, placa, cliente, mecânico, período |
| `Timeline` | — | Histórico da OS: o que, quem, quando |
| `SummaryRows` | — | Linhas rótulo–valor com total em destaque (resumo financeiro, DRE) |
| `DataTable` | `table` | No celular, cada linha vira um card |

### Botões

| Variante | Aparência | Uso |
|---|---|---|
| Principal | Laranja, texto `navy-900`, pílula, 48 px ou mais | Uma por tela: "+ Novo atendimento", "Salvar e continuar" |
| Secundário | `navy-700`, texto branco | Ações de apoio |
| Contorno | Borda e texto `navy-700` | Cancelar, voltar |
| Destrutivo | `#B83242`, texto branco | Cancelar OS, excluir — sempre com confirmação |

### Gráficos (Fase 3)

Recharts com as variáveis `--chart-*`: receita e entradas em laranja, despesa e saídas em azul. Eixo de valores em "R$ 20 mil", meses abreviados (Set, Out, Nov), legenda acima do gráfico, como na arte.

## 6. Texto de interface

- Português do Brasil, direto, sem jargão de sistema: "Novo atendimento", não "Criar registro".
- "OS" sempre em maiúsculas; número com cerquilha e zeros à esquerda: "OS #02481".
- Dinheiro "R$ 1.234,56"; quilometragem "82.450 km"; data "08/02/2025"; data e hora "08/02/2025 • 17:00".
- Placa antiga com hífen (KLM-4821), Mercosul sem (ABC1D23).
- Botão diz o que acontece: "Salvar e continuar", "Confirmar entrega".
