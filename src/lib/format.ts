// Formatação na borda da tela. Regra do projeto (regras.md):
// dinheiro em centavos (inteiro) e exibição em R$; datas exibidas em dd/mm/aaaa
// no fuso da oficina.

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Centavos (inteiro) → "R$ 1.234,56". */
export function formatBRL(cents: number): string {
  return BRL.format(cents / 100);
}

const DATE = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Date/ISO → "08/02/2025". */
export function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return DATE.format(date);
}
