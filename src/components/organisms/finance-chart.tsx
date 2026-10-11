import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Badge } from "@/components/atoms/badge";
import { financeSeries } from "@/lib/mock-data";

// Organismo da feature: fluxo financeiro dos últimos 12 meses.
// Barras em CSS puro (Recharts só a partir da Fase 3, por design.md).
export function FinanceChart() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-sm">Fluxo financeiro</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Entradas e saídas nos últimos 12 meses
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex items-end gap-3">
          <span className="font-heading text-2xl tabular-nums">R$ 24.170</span>
          <Badge className="mb-1 bg-success/15 text-success-strong">
            +18,4%
          </Badge>
        </div>
        <div className="relative h-[190px] w-full">
          <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-muted-foreground">
            <span>R$ 40k</span>
            <span>R$ 30k</span>
            <span>R$ 20k</span>
            <span>R$ 10k</span>
            <span>R$ 0</span>
          </div>
          <div className="ml-9 flex h-full items-end gap-2 border-b border-l border-border px-2 pb-0 pt-3">
            {financeSeries.map(({ month, value }) => (
              <div
                key={month}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-md bg-chart-1/30 transition-colors group-hover:bg-chart-1"
                  style={{ height: `${value * 0.78}%` }}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-muted-foreground">
                  {month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
