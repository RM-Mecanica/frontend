// Tipo puro do domínio: lançamento financeiro. Dinheiro em centavos (inteiro),
// nunca float (regras.md). Sem framework.
export type EntryKind = "receita" | "custo";

export const ENTRY_KIND_LABEL: Record<EntryKind, string> = {
  receita: "Receita",
  custo: "Custo",
};

export type FinancialEntry = {
  id: string;
  kind: EntryKind;
  description: string;
  category: string;
  amountCents: number;
  date: string; // ISO
};
