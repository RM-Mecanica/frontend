import {
  ArrowDownLeft,
  ArrowUpRight,
  CarFront,
  ClipboardList,
} from "lucide-react";

import { DashboardTemplate } from "@/components/templates/dashboard-template";
import { PageHeader } from "@/components/organisms/page-header";
import { KpiCard } from "@/components/molecules/kpi-card";
import { FinanceChart } from "@/components/organisms/finance-chart";
import { OsSummary } from "@/components/organisms/os-summary";
import { RecentOrdersTable } from "@/components/organisms/recent-orders-table";
import { NewOrderDialog } from "@/components/organisms/new-order-dialog";
import { recentOrders } from "@/lib/mock-data";

// Página (Server Component): preenche o DashboardTemplate com conteúdo real.
// Sem estrutura de layout aqui — isso é responsabilidade do template.
export default function DashboardPage() {
  return (
    <DashboardTemplate
      header={
        <PageHeader
          eyebrow="Painel de controle"
          title="Visão geral"
          subtitle="Acompanhe os principais indicadores da sua oficina."
          action={<NewOrderDialog />}
        />
      }
      kpis={
        <>
          <KpiCard
            icon={<ClipboardList />}
            label="OS abertas"
            value="24"
            detail="+12,5%"
            note="vs. mês anterior"
            tone="secondary"
          />
          <KpiCard
            icon={<CarFront />}
            label="Veículos no pátio"
            value="12"
            detail="3 entradas"
            note="hoje"
            tone="primary"
          />
          <KpiCard
            icon={<ArrowUpRight />}
            label="Entradas"
            value="R$ 38.450"
            detail="+8,2%"
            note="este mês"
            tone="success"
          />
          <KpiCard
            icon={<ArrowDownLeft />}
            label="Saídas"
            value="R$ 14.280"
            detail="-4,6%"
            note="este mês"
            tone="danger"
            trend="down"
          />
        </>
      }
      charts={
        <>
          <FinanceChart />
          <OsSummary />
        </>
      }
      table={<RecentOrdersTable orders={recentOrders} />}
    />
  );
}
