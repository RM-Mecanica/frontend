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

// --- Clientes, veículos e financeiro (telas Clientes e Financeiro) ---

import type { Customer } from "@/domain/customer/customer";
import type { Vehicle } from "@/domain/vehicle/vehicle";
import type { FinancialEntry } from "@/domain/finance/entry";

export const customers: Customer[] = [
  { id: "c1", name: "Marcos Oliveira", phone: "(11) 98888-1020", email: "marcos@email.com" },
  { id: "c2", name: "Juliana Costa", phone: "(11) 97777-3344", email: "juliana@email.com" },
  { id: "c3", name: "André Souza", phone: "(11) 96666-7788", email: "andre@email.com" },
  { id: "c4", name: "Carla Mendes", phone: "(11) 95555-9900", email: "carla@email.com" },
  { id: "c5", name: "Roberto Dias", phone: "(11) 94444-1212", email: "roberto@email.com" },
  { id: "c6", name: "Patrícia Lima", phone: "(11) 93333-4545", email: "patricia@email.com" },
];

export const vehicles: Vehicle[] = [
  { id: "v1", customerId: "c1", plate: "RMT-4F82", model: "Honda Civic", year: 2020 },
  { id: "v2", customerId: "c2", plate: "GQV-9A17", model: "Toyota Corolla", year: 2022 },
  { id: "v3", customerId: "c3", plate: "KLM-2D45", model: "Chevrolet Onix", year: 2019 },
  { id: "v4", customerId: "c4", plate: "QWE-8B31", model: "VW T-Cross", year: 2021 },
  { id: "v5", customerId: "c1", plate: "ABC-1D23", model: "Honda Fit", year: 2018 },
  { id: "v6", customerId: "c5", plate: "FTR-2C88", model: "Jeep Renegade", year: 2023 },
];

export const financialEntries: FinancialEntry[] = [
  { id: "f1", kind: "receita", description: "OS #02022 - Freios e suspensão", category: "Serviço", amountCents: 214000, date: "2026-10-10" },
  { id: "f2", kind: "custo", description: "Compra de pastilhas de freio", category: "Peças", amountCents: 48000, date: "2026-10-09" },
  { id: "f3", kind: "receita", description: "OS #02020 - Revisão completa", category: "Serviço", amountCents: 132000, date: "2026-10-08" },
  { id: "f4", kind: "custo", description: "Óleo lubrificante (lote)", category: "Insumos", amountCents: 36000, date: "2026-10-07" },
  { id: "f5", kind: "receita", description: "OS #02018 - Diagnóstico eletrônico", category: "Serviço", amountCents: 78000, date: "2026-10-06" },
  { id: "f6", kind: "custo", description: "Energia elétrica", category: "Fixo", amountCents: 52000, date: "2026-10-05" },
];

/** KPIs financeiros derivados (dinheiro em centavos). */
export const financeTotals = {
  revenueCents: financialEntries
    .filter((e) => e.kind === "receita")
    .reduce((sum, e) => sum + e.amountCents, 0),
  costCents: financialEntries
    .filter((e) => e.kind === "custo")
    .reduce((sum, e) => sum + e.amountCents, 0),
};

/** Série do mini-gráfico de linha: receita x custo nos últimos 6 meses. */
export const financeTrend: {
  month: string;
  revenue: number;
  cost: number;
}[] = [
  { month: "Mai", revenue: 62, cost: 38 },
  { month: "Jun", revenue: 70, cost: 42 },
  { month: "Jul", revenue: 66, cost: 40 },
  { month: "Ago", revenue: 82, cost: 50 },
  { month: "Set", revenue: 88, cost: 48 },
  { month: "Out", revenue: 96, cost: 55 },
];

/** Compromissos da agenda do dia (tela Visão geral). */
export const agenda: {
  time: string;
  title: string;
  detail: string;
  tone: "secondary" | "primary" | "success";
}[] = [
  { time: "09:30", title: "Entrega de veículo", detail: "Jeep Renegade · FTR-2C88", tone: "secondary" },
  { time: "11:00", title: "Avaliação e orçamento", detail: "Ford Ka · Cliente novo", tone: "primary" },
  { time: "14:30", title: "Retorno programado", detail: "Honda Civic · GRA-4E21", tone: "success" },
];

import { isOpen } from "@/domain/service-order/status";

/** Nº de OS abertas — usado no badge do item "Ordens de serviço" da sidebar. */
export const openOrdersCount = recentOrders.filter((o) =>
  isOpen(o.status),
).length;
