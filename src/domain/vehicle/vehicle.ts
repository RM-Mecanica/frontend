// Tipo puro do domínio: veículo vinculado a um cliente. Sem framework.
export type Vehicle = {
  id: string;
  customerId: string;
  plate: string;
  model: string;
  year: number | null;
};
