import { CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { AgendaItem } from "@/components/molecules/agenda-item";
import { agenda } from "@/lib/mock-data";

// Organismo: agenda do dia.
export function AgendaPanel() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-sm">Agenda de hoje</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Próximos compromissos
          </CardDescription>
        </div>
        <CalendarDays className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="pt-0">
        {agenda.map((item) => (
          <AgendaItem key={item.time} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}
