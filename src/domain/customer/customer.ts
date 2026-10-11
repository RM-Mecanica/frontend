// Tipo puro do domínio: cliente da oficina. Sem framework.
export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

/** Iniciais para o avatar (até 2 letras). */
export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
