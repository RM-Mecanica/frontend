import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatBRL, formatDate } from "@/lib/format";
import { ENTRY_KIND_LABEL, type FinancialEntry } from "@/domain/finance/entry";

// Molécula: linha da tabela de lançamentos financeiros. No celular colapsa para
// descrição + valor (as colunas do meio somem via CSS no organismo).
export function FinanceEntryRow({ entry }: { entry: FinancialEntry }) {
  const isRevenue = entry.kind === "receita";
  const toneText = isRevenue ? "text-success-strong" : "text-danger-strong";

  return (
    <div className="grid grid-cols-[1.5fr_1fr_auto] items-center gap-4 border-t border-border px-6 py-4 text-xs md:grid-cols-[1.5fr_1fr_0.7fr_0.8fr_0.8fr]">
      <div className="flex min-w-0 items-center gap-2.5">
        <div
          className={cn(
            "flex size-7 items-center justify-center rounded-md [&_svg]:size-4",
            isRevenue
              ? "bg-success/15 text-success-strong"
              : "bg-danger/15 text-danger-strong",
          )}
        >
          {isRevenue ? <ArrowUpRight /> : <ArrowDownRight />}
        </div>
        <strong className="truncate font-bold">{entry.description}</strong>
      </div>
      <span className="hidden text-muted-foreground md:block">
        {entry.category}
      </span>
      <span className={cn("hidden font-bold md:block", toneText)}>
        {ENTRY_KIND_LABEL[entry.kind]}
      </span>
      <span className="hidden text-muted-foreground md:block">
        {formatDate(entry.date)}
      </span>
      <strong className={cn("text-right tabular-nums", toneText)}>
        {isRevenue ? "+" : "-"} {formatBRL(entry.amountCents)}
      </strong>
    </div>
  );
}
