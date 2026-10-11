import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { ActivityItem } from "@/components/molecules/activity-item";
import type { FinancialEntry } from "@/domain/finance/entry";

// Organismo: movimentações recentes (entradas e saídas).
export function ActivityPanel({ entries }: { entries: FinancialEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-sm">Movimentações recentes</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Últimas entradas e saídas registradas
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {entries.map((entry) => (
          <ActivityItem key={entry.id} entry={entry} />
        ))}
      </CardContent>
    </Card>
  );
}
