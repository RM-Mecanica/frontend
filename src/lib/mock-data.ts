import type { OsStatus } from "@/domain/service-order/status";

// Dados de exemplo da dashboard. Enquanto não há Supabase, ficam reunidos aqui,
// tipados com o domínio, em vez de espalhados na tela. Dinheiro em centavos.

export type RecentOrder = {
  id: string;
  createdAt: string; // ISO
  client: string;
  vehicle: string;
  plate: string;
  service: string;
  status: OsStatus;
  totalCents: number;
};

export const recentOrders: RecentOrder[] = [
  {
    id: "OS #02024",
    createdAt: "2024-06-12",
    client: "Marcos Oliveira",
    vehicle: "Honda Civic 2020",
    plate: "RMT-4F82",
    service: "Revisão completa",
    status: "em_execucao",
    totalCents: 128000,
  },
  {
    id: "OS #02023",
    createdAt: "2024-06-12",
    client: "Juliana Costa",
    vehicle: "Toyota Corolla 2022",
    plate: "GQV-9A17",
    service: "Troca de óleo e filtros",
    status: "orcamento_enviado",
    totalCents: 46000,
  },
  {
    id: "OS #02022",
    createdAt: "2024-06-11",
    client: "André Souza",
    vehicle: "Chevrolet Onix 2019",
    plate: "KLM-2D45",
    service: "Freios e suspensão",
    status: "pronto_retirada",
    totalCents: 214000,
  },
  {
    id: "OS #02021",
    createdAt: "2024-06-11",
    client: "Carla Mendes",
    vehicle: "VW T-Cross 2021",
    plate: "QWE-8B31",
    service: "Diagnóstico eletrônico",
    status: "em_execucao",
    totalCents: 78000,
  },
];

/** Altura relativa (0–100) das barras do fluxo financeiro, por mês. */
export const financeSeries: { month: string; value: number }[] = [
  { month: "Jul", value: 58 },
  { month: "Ago", value: 74 },
  { month: "Set", value: 61 },
  { month: "Out", value: 85 },
  { month: "Nov", value: 68 },
  { month: "Dez", value: 92 },
  { month: "Jan", value: 78 },
  { month: "Fev", value: 88 },
  { month: "Mar", value: 75 },
  { month: "Abr", value: 96 },
  { month: "Mai", value: 83 },
  { month: "Jun", value: 100 },
];

export const osSummary = {
  total: 48,
  byStatus: [
    { label: "Em andamento", count: 22, tone: "secondary" as const },
    { label: "Aguardando", count: 11, tone: "warning" as const },
    { label: "Concluídas", count: 10, tone: "success" as const },
    { label: "Canceladas", count: 5, tone: "muted" as const },
  ],
  ticketCents: 114550,
};
