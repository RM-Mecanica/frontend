import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatBRL, formatDate } from "@/lib/format";
import type { FinancialEntry } from "@/domain/finance/entry";

// Molécula: linha de movimentação financeira (receita ou custo). Ícone com
// sentido, descrição + categoria/data, e valor com sinal e cor por token.
export function ActivityItem({ entry }: { entry: FinancialEntry }) {
  const isRevenue = entry.kind === "receita";
  return (
    <div className="flex items-center gap-3 border-t border-border py-3">
      <div
        className={cn(
          "flex size-8 items-center justify-center rounded-md [&_svg]:size-4",
          isRevenue
            ? "bg-success/15 text-success-strong"
            : "bg-danger/15 text-danger-strong",
        )}
      >
        {isRevenue ? <ArrowUpRight /> : <ArrowDownRight />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold">{entry.description}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          {entry.category} · {formatDate(entry.date)}
        </p>
      </div>
      <b
        className={cn(
          "text-xs tabular-nums",
          isRevenue ? "text-success-strong" : "text-danger-strong",
        )}
      >
        {isRevenue ? "+" : "-"} {formatBRL(entry.amountCents)}
      </b>
    </div>
  );
}
