import { Card } from "@/components/molecules/card";
import { SectionTitle } from "@/components/atoms/section-title";
import { FinanceEntryRow } from "@/components/molecules/finance-entry-row";
import type { FinancialEntry } from "@/domain/finance/entry";

// Organismo: tabela de lançamentos financeiros. Cabeçalho de colunas some no
// celular (cada linha colapsa para descrição + valor na molécula).
export function FinanceLedger({ entries }: { entries: FinancialEntry[] }) {
  return (
    <Card>
      <div className="border-b border-border p-5 md:p-6">
        <SectionTitle>Lançamentos financeiros</SectionTitle>
        <p className="mt-1 text-xs text-muted-foreground">
          Histórico de receitas e despesas da operação
        </p>
      </div>

      <div className="hidden grid-cols-[1.5fr_1fr_0.7fr_0.8fr_0.8fr] gap-4 bg-muted/50 px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:grid">
        <span>Descrição</span>
        <span>Categoria</span>
        <span>Tipo</span>
        <span>Data</span>
        <span className="text-right">Valor</span>
      </div>

      <div>
        {entries.map((entry) => (
          <FinanceEntryRow key={entry.id} entry={entry} />
        ))}
      </div>
    </Card>
  );
}
