import { ArrowDownRight, ArrowUpRight, Plus, TrendingUp } from "lucide-react";

import { PageHeader } from "@/components/organisms/page-header";
import { KpiCard } from "@/components/molecules/kpi-card";
import { FinanceLedger } from "@/components/organisms/finance-ledger";
import { Button } from "@/components/atoms/button";
import { formatBRL } from "@/lib/format";
import { financeTotals, financialEntries } from "@/lib/mock-data";

// Página Financeiro (protótipo visual — fase futura; dados mock, sem Supabase).
export default function FinanceiroPage() {
  const { revenueCents, costCents } = financeTotals;
  const profitCents = revenueCents - costCents;

  return (
    <div className="mx-auto max-w-[1440px] p-5 md:p-8">
      <PageHeader
        eyebrow="Visão financeira"
        title="Financeiro"
        subtitle="Entenda o que entra, o que sai e o que sobra."
        action={
          <Button variant="primary" size="sm">
            <Plus className="size-4" /> Novo lançamento
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <KpiCard
          icon={<ArrowUpRight />}
          label="Receitas"
          value={formatBRL(revenueCents)}
          detail="12,8%"
          note="neste mês"
          tone="success"
        />
        <KpiCard
          icon={<ArrowDownRight />}
          label="Custos"
          value={formatBRL(costCents)}
          detail="4,2%"
          note="neste mês"
          tone="danger"
          trend="down"
        />
        <KpiCard
          icon={<TrendingUp />}
          label="Resultado líquido"
          value={formatBRL(profitCents)}
          detail="18,5%"
          note="neste mês"
          tone="primary"
        />
      </div>

      <FinanceLedger entries={financialEntries} />
    </div>
  );
}
