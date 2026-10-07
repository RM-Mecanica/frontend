# PRD — Sistema de gestão de oficina mecânica

> **1 de 6** · Diz **o quê** e **por quê**. O como está em `arquitetura.md`; a ordem de entrega, em `tarefas.md`.
> Fontes: prompt do produto (07/10/2026) e `referencia-telas.md` (arte do Canva).
> Idioma pt-BR, moeda em Real (R$), datas em dd/mm/aaaa.

## 1. Problema

O dono da oficina não consegue responder com segurança a duas perguntas:

1. **O que está no meu pátio agora?** Quais veículos entraram, em que etapa cada um está, há quantos dias está parado e quem é o responsável.
2. **Quanto eu ganho de verdade?** Quanto cada serviço custa (peças, mão de obra, extras) e quanto sobra por serviço, por mês e por cliente.

Sem isso, carro fica parado sem ninguém perceber, o cliente contesta o estado em que deixou o veículo e não há registro, e o preço é dado sem saber a margem.

O produto resolve as duas coisas com um fluxo único: **do agendamento à garantia, cada passagem registra responsável, horário, custo e status do veículo.**

> A confirmar com a oficina: como esse controle é feito hoje (papel, planilha, WhatsApp). Isso define o que precisa ser migrado e o que o sistema tem que ser mais rápido do que.

## 2. Pra quem

Uma oficina mecânica de veículos, usada no balcão e no chão da oficina, principalmente em **celular e tablet** — muitas vezes com a mão suja e com pressa.

| Perfil | O que precisa | O que pode fazer |
|---|---|---|
| **Dono / Admin** | Ver o pátio e o resultado financeiro sem perguntar para ninguém | Tudo, incluindo financeiro, relatórios e reabrir OS entregue |
| **Atendente** | Receber o carro rápido e não esquecer nada | Cadastra clientes e veículos, abre OS, registra pagamentos |
| **Mecânico** | Saber o que é dele e avisar o andamento | Vê apenas as suas OS, atualiza status, registra peças usadas e observações técnicas |

O **cliente da oficina** não usa o sistema. Ele recebe o resultado: termo de entrada, orçamento e recibo.

## 3. Primeira versão (v1)

**A v1 é a Fase 1 — "Operação": controlar o pátio.** É o menor recorte que já serve sozinho: todo carro que entra vira uma OS, e o dono enxerga onde cada um está.

### O que a v1 entrega

- **Acesso** — login por e-mail e senha, com os três perfis acima.
- **Layout** — sidebar fixa no desktop, navegação inferior no celular, modo claro e escuro.
- **Clientes** — cadastro (nome, CPF/CNPJ, telefone/WhatsApp, e-mail, endereço, observações) e busca por nome, telefone ou CPF.
- **Veículos** — cadastro por placa (padrão antigo ABC-1234 e Mercosul ABC1D23, com máscara e validação), marca, modelo, ano, cor, combustível, chassi, km atual e dono.
- **Check-in** — o fluxo principal, em etapas:
  1. buscar o cliente ou cadastrar na hora;
  2. buscar o veículo pela placa ou cadastrar na hora;
  3. dados da entrada: data e hora automáticas, quilometragem, nível de combustível (vazio, ¼, ½, ¾, cheio) e relato do cliente;
  4. vistoria: marcação de arranhões e amassados num diagrama do carro, e checklist de pneus, estepe, macaco, triângulo, som, documentos e objetos de valor;
  5. até 8 fotos da entrada;
  6. previsão de entrega e mecânico responsável;
  7. ao salvar, gera a OS com número sequencial e o "Termo de entrada" para imprimir ou salvar em PDF, com campo de assinatura do cliente.
- **Ordens de serviço** — lista com busca e filtros (status, placa, cliente, mecânico, período) e visão **Kanban**: Aguardando Orçamento → Orçamento Enviado → Aprovado → Em Execução → Aguardando Peça → Pronto p/ Retirada → Entregue, mais Cancelada.

### Regras que já valem na v1

- Uma placa não pode ter duas OS abertas ao mesmo tempo.
- Toda mudança de status entra no histórico da OS, com quem fez e quando.
- OS parada há mais de 3 dias aparece destacada.
- OS entregue fica travada para edição; só o Admin reabre.

Na v1 a saída do veículo é registrada ao mover a OS para "Entregue" (data e hora automáticas). O check-out completo, com pagamento e garantia, é da Fase 2.

### Como saber que deu certo

Metas propostas, a validar com a oficina depois de duas semanas de uso:

- Um check-in completo é feito no celular em até 3 minutos.
- Todo veículo que está no pátio tem OS aberta no sistema.
- O dono responde "quantos carros tenho aqui e qual está parado há mais tempo" olhando uma única tela.

## 4. O que fica de fora

### Fica para as próximas fases (dentro do produto, fora da v1)

| Fase | Nome | O que entra |
|---|---|---|
| 2 | Venda | Serviços e peças na OS, custo e preço separados, margem da OS, orçamento em PDF e envio por link de WhatsApp, aprovação do orçamento, check-out com pagamentos (dinheiro, PIX, débito, crédito parcelado, fiado), km de saída, garantia e recibo |
| 3 | Controle | Estoque com entrada, baixa automática e alerta de mínimo; financeiro com entradas, saídas, contas a pagar e a receber, fluxo de caixa e DRE simplificado; rentabilidade por OS, serviço e cliente; dashboard com gráficos; exportação em CSV/Excel |
| 4 | Escala | Agenda semanal com capacidade de vagas e conversão em check-in; equipe, comissões e produtividade; alertas de revisão por km ou data; configurações da oficina, catálogos, textos padrão, usuários e permissões |

Consequências diretas para a v1: o perfil do cliente mostra veículos e OS, mas ainda não mostra total gasto nem saldo em aberto; os dados da oficina no termo de entrada são fixos em configuração do projeto, sem tela de edição; usuários são criados pelo Admin fora do sistema (seed ou painel do Supabase).

### Fora do produto (não planejado)

Proposta de limite — confirme ou risque o que não concordar:

- Emissão de nota fiscal (NF-e / NFS-e) e integração contábil.
- Cobrança automática: gateway de pagamento, geração de QR Code PIX, conciliação bancária. O pagamento é **registrado**, não processado.
- API oficial do WhatsApp. O envio é por link `wa.me` com mensagem pronta.
- Portal ou aplicativo para o cliente da oficina (inclusive agendamento feito pelo próprio cliente). Quem lança o agendamento é a oficina.
- Aplicativo nativo. O produto é web responsivo.
- Mais de uma oficina ou filial na mesma instalação.
- Consulta automática de dados do veículo pela placa (Detran, FIPE).
- Funcionamento sem internet.
- Assinatura digital com validade jurídica. O termo tem campo para assinar no papel.
