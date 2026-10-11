import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { MiniChart } from "@/components/molecules/mini-chart";
import { financeTrend } from "@/lib/mock-data";

// Organismo: saúde financeira (card com o mini-gráfico de linha).
export function FinanceTrendCard() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-sm">Saúde financeira</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Receitas x custos nos últimos 6 meses
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <MiniChart series={financeTrend} />
      </CardContent>
    </Card>
  );
}
