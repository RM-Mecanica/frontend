import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/molecules/card";
import { cn } from "@/lib/utils";

export type KpiTone = "primary" | "secondary" | "success" | "danger";

// Molécula: cartão de indicador. Ícone, rótulo em caixa alta, número grande
// (Montserrat), variação com seta e nota. Cor por token (nunca hex).
const ICON_TONE: Record<KpiTone, string> = {
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-success/15 text-success-strong",
  danger: "bg-danger/15 text-danger-strong",
};

export function KpiCard({
  icon,
  label,
  value,
  detail,
  note,
  tone = "secondary",
  trend = "up",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail?: string;
  note?: string;
  tone?: KpiTone;
  trend?: "up" | "down";
}) {
  const down = trend === "down";
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-md [&_svg]:size-5",
            ICON_TONE[tone],
          )}
        >
          {icon}
        </div>
        {detail ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-bold",
              down ? "text-danger-strong" : "text-success-strong",
            )}
          >
            {down ? (
              <ArrowDownRight className="size-3.5" />
            ) : (
              <ArrowUpRight className="size-3.5" />
            )}
            {detail}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-heading text-3xl tabular-nums">{value}</p>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
    </Card>
  );
}
