"use client";

import type { ComponentType } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

// Molécula: item de navegação da sidebar. Ícone + rótulo, badge opcional de
// contagem, e estado ativo com indicador laranja (cor de marca da sidebar).
export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  active,
  badge,
  onNavigate,
}: {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  active: boolean;
  badge?: number;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex min-h-11 items-center gap-3 rounded-md px-3 py-3 text-[13px] font-bold transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-white/10",
      )}
    >
      {active ? (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary" />
      ) : null}
      <Icon
        className={cn("size-[18px]", active ? "text-sidebar-primary" : undefined)}
        strokeWidth={1.8}
      />
      <span className="flex-1">{label}</span>
      {typeof badge === "number" && badge > 0 ? (
        <b className="rounded-full bg-sidebar-primary px-2 py-0.5 text-[10px] text-sidebar-primary-foreground">
          {badge}
        </b>
      ) : null}
    </Link>
  );
}
