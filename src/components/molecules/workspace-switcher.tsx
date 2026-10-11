import { ChevronDown } from "lucide-react";

// Molécula: seletor de oficina no topo da sidebar (como no layout de referência).
// Visual apenas — a troca de oficina é fase futura.
export function WorkspaceSwitcher({
  name,
  initials,
}: {
  name: string;
  initials: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-2.5 rounded-md border border-sidebar-border/60 p-2.5">
      <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-accent text-[10px] font-bold text-white">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-sidebar-foreground/70">Oficina ativa</p>
        <p className="truncate text-xs font-bold text-white">{name}</p>
      </div>
      <ChevronDown className="size-4 text-sidebar-foreground/70" />
    </div>
  );
}
