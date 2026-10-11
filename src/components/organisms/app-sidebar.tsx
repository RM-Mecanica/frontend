"use client";

import { useState } from "react";
import {
  BarChart3,
  CircleDollarSign,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Settings,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/logo";
import { WorkspaceSwitcher } from "@/components/molecules/workspace-switcher";
import { SidebarNavItem } from "@/components/molecules/sidebar-nav-item";
import { openOrdersCount } from "@/lib/mock-data";

// Organismo de layout: sidebar navy da área logada, com a divisão do layout de
// referência — MENU PRINCIPAL e GESTÃO. Drawer abaixo de 1024px, fixa acima.
type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
};

const MAIN_ITEMS: NavItem[] = [
  { label: "Visão geral", icon: LayoutDashboard, href: "/" },
  {
    label: "Ordens de serviço",
    icon: FileText,
    href: "/ordens",
    badge: openOrdersCount,
  },
  { label: "Financeiro", icon: CircleDollarSign, href: "/financeiro" },
  { label: "Clientes", icon: Users, href: "/clientes" },
];

const MANAGEMENT_ITEMS: NavItem[] = [
  { label: "Relatórios", icon: BarChart3, href: "/relatorios" },
  { label: "Configurações", icon: Settings, href: "/configuracoes" },
];

/** Ativo: match exato na raiz; prefixo nas demais. Garante seleção única. */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <>
      <button
        aria-label="Abrir menu"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-20 rounded-md p-2 text-foreground hover:bg-accent lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      {open ? (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={close}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col overflow-y-auto bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <div>
              <p className="font-heading text-[15px] tracking-wide text-white">
                RM MECÂNICA
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/70">
                Gestão inteligente
              </p>
            </div>
          </div>
          <button aria-label="Fechar menu" onClick={close} className="lg:hidden">
            <X className="size-5" />
          </button>
        </div>

        <WorkspaceSwitcher name="RM Mecânica" initials="RM" />

        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/60">
          Menu principal
        </p>
        <nav className="flex flex-col gap-1">
          {MAIN_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.label}
              {...item}
              active={isActive(pathname, item.href)}
              onNavigate={close}
            />
          ))}
        </nav>

        <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/60">
          Gestão
        </p>
        <nav className="flex flex-col gap-1">
          {MANAGEMENT_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.label}
              {...item}
              active={isActive(pathname, item.href)}
              onNavigate={close}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <div className="flex items-start gap-2.5 rounded-lg bg-sidebar-accent p-3.5">
            <Sparkles className="mt-0.5 size-4 text-sidebar-primary" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white">Tenha mais controle</p>
              <p className="mt-1 text-[11px] leading-relaxed text-sidebar-foreground/80">
                Veja onde sua oficina mais lucra.
              </p>
            </div>
            <ArrowUpRight className="size-4 text-sidebar-foreground/70" />
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-1 pt-4">
            <div className="flex size-8 items-center justify-center rounded-full bg-warning text-xs font-bold text-sidebar">
              RC
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                Rafael Costa
              </p>
              <p className="text-[10px] text-sidebar-foreground/70">
                Administrador
              </p>
            </div>
            <MoreHorizontal className="size-4 text-sidebar-foreground/70" />
          </div>
        </div>
      </aside>
    </>
  );
}
