import type { ReactNode } from "react";

// Organismo de layout: cabeçalho de página. Título, subtítulo e a ação principal
// da tela (design.md, seção Componentes).
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-info-strong">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-2xl tracking-tight md:text-[28px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="flex gap-2">{action}</div> : null}
    </div>
  );
}
