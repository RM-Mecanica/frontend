import { Gauge } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/format";
import { osSummary } from "@/lib/mock-data";

// Organismo da feature: resumo de OS por status + ticket médio.
const DOT_TONE: Record<string, string> = {
  secondary: "bg-secondary",
  warning: "bg-warning",
  success: "bg-success",
  muted: "bg-muted-foreground/40",
};

export function OsSummary() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-sm">Resumo de OS</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Distribuição por status
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div
            className="relative flex size-[142px] shrink-0 items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(var(--secondary) 0 46%, var(--warning) 46% 68%, var(--success) 68% 90%, var(--muted) 90% 100%)",
            }}
          >
            <div className="flex size-[98px] flex-col items-center justify-center rounded-full bg-card">
              <span className="font-heading text-2xl tabular-nums">
                {osSummary.total}
              </span>
              <span className="text-[10px] text-muted-foreground">
                total de OS
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-3 text-xs">
            {osSummary.byStatus.map(({ label, count, tone }) => (
              <li key={label} className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", DOT_TONE[tone])} />
                <span className="text-muted-foreground">{label}</span>
                <b className="ml-auto pl-3 tabular-nums">{count}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-7 flex items-center gap-3 rounded-md bg-muted p-3">
          <div className="rounded-md bg-info/15 p-2 text-info-strong">
            <Gauge className="size-4" />
          </div>
          <div>
            <p className="text-xs font-bold">Ticket médio</p>
            <p className="font-heading text-sm text-secondary tabular-nums">
              {formatBRL(osSummary.ticketCents)}
            </p>
          </div>
          <span className="ml-auto text-[10px] font-bold text-success-strong">
            +6,8%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
