// Regra pura do domínio: status da OS e seus rótulos (linguagem ubíqua da oficina).
// Sem React, Next ou Supabase. Fonte dos valores e rótulos: design.md / arquitetura.md.

export const OS_STATUSES = [
  "aguardando_orcamento",
  "orcamento_enviado",
  "aprovado",
  "em_execucao",
  "aguardando_peca",
  "pronto_retirada",
  "entregue",
  "cancelada",
] as const;

export type OsStatus = (typeof OS_STATUSES)[number];

/** Rótulo em pt-BR exibido na pílula e no título da coluna do Kanban. */
export const OS_STATUS_LABEL: Record<OsStatus, string> = {
  aguardando_orcamento: "Ag. orçamento",
  orcamento_enviado: "Orçamento enviado",
  aprovado: "Aprovado",
  em_execucao: "Em execução",
  aguardando_peca: "Ag. peça",
  pronto_retirada: "Pronto p/ retirada",
  entregue: "Entregue",
  cancelada: "Cancelada",
};

/** OS aberta é qualquer status diferente de entregue e cancelada. */
export function isOpen(status: OsStatus): boolean {
  return status !== "entregue" && status !== "cancelada";
}
