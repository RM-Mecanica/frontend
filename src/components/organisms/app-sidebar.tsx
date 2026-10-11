"use client";

import { useState } from "react";
import {
  BarChart3,
  CarFront,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/atoms/logo";

// Organismo de layout: sidebar navy da área logada. Drawer abaixo de 1024px,
// fixa a partir daí (design.md, seção Layout).
type NavItem = { label: string; icon: typeof LayoutDashboard };

const NAV_ITEMS: NavItem[] = [
  { label: "Visão geral", icon: LayoutDashboard },
  { label: "Ordens de serviço", icon: ClipboardList },
  { label: "Veículos", icon: CarFront },
  { label: "Clientes", icon: Users },
  { label: "Financeiro", icon: CircleDollarSign },
  { label: "Relatórios", icon: BarChart3 },
];

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Visão geral");

  return (
    <>
      {/* Botão de abrir no mobile */}
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
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-sidebar px-4 py-5 text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <Logo size={44} />
            <div>
              <p className="font-heading text-[15px] tracking-wide text-white">
                RM MECÂNICA
              </p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-sidebar-foreground/70">
                Gestão inteligente
              </p>
            </div>
          </div>
          <button
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/60">
          Menu principal
        </p>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setActive(label);
                setOpen(false);
              }}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-md px-3 py-3 text-left text-[13px] font-bold transition-colors",
                active === label
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-white/10",
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-lg bg-sidebar-accent p-4">
          <div className="mb-3 flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <ShieldCheck className="size-5" />
          </div>
          <p className="text-xs font-bold text-white">Tudo sob controle</p>
          <p className="mt-1 text-[11px] leading-relaxed text-sidebar-foreground/80">
            Acompanhe o desempenho da sua oficina em um só lugar.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-2 pt-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-warning text-xs font-bold text-sidebar">
            RM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-white">
              Roberto Martins
            </p>
            <p className="text-[10px] text-sidebar-foreground/70">
              Administrador
            </p>
          </div>
          <Settings className="size-4 text-sidebar-foreground/70" />
        </div>
      </aside>
    </>
  );
}
