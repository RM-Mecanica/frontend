import type { ReactNode } from "react";

import { Card } from "@/components/molecules/card";

// Organismo: estado "em breve" para telas de fase futura (Relatórios,
// Configurações). Mantém a navegação coerente sem simular funcionalidade.
export function ComingSoon({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6">
        {icon}
      </div>
      <h2 className="font-heading text-xl">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      <span className="mt-1 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
        Em breve
      </span>
    </Card>
  );
}
