import type { ReactNode } from "react";

// Template: define o esqueleto da dashboard — a posição dos organismos, sem
// conteúdo real. A página injeta os organismos preenchidos via slots
// (Atomic Design, B. Frost: template = estrutura; página = template + conteúdo).
export function DashboardTemplate({
  header,
  kpis,
  charts,
  table,
}: {
  header: ReactNode;
  kpis: ReactNode;
  charts: ReactNode;
  table: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1440px] p-5 md:p-8">
      {header}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis}</div>
      <div className="mb-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]">{charts}</div>
      {table}
    </div>
  );
}
