import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Átomo: título de seção (card). Padroniza os headings repetidos dos organismos
// ("Fluxo financeiro", "Resumo de OS"...), em Montserrat (design.md).
export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("font-heading text-sm leading-none", className)}>
      {children}
    </h3>
  );
}
