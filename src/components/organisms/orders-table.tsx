"use client";

import { useMemo, useState } from "react";
import { CarFront, Tag } from "lucide-react";

import { Card } from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import { StatusBadge } from "@/components/molecules/status-badge";
import { cn } from "@/lib/utils";
import { formatBRL, formatDate } from "@/lib/format";
import { isOpen, type OsStatus } from "@/domain/service-order/status";
import type { RecentOrder } from "@/lib/mock-data";

// Organismo da tela de Ordens: abas de filtro + tabela. No layout de referência
// (Bolt) as abas são Todas / Em andamento / Aguardando / Finalizadas.
type Filter = "todas" | "abertas" | "aguardando" | "finalizadas";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "abertas", label: "Em andamento" },
  { key: "aguardando", label: "Aguardando aprovação" },
  { key: "finalizadas", label: "Finalizadas" },
];

function matches(status: OsStatus, filter: Filter): boolean {
  switch (filter) {
    case "todas":
      return true;
    case "abertas":
      return status === "em_execucao" || status === "aprovado";
    case "aguardando":
      return status === "orcamento_enviado" || status === "aguardando_orcamento";
    case "finalizadas":
      return !isOpen(status);
  }
}

export function OrdersTable({ orders }: { orders: RecentOrder[] }) {
  const [filter, setFilter] = useState<Filter>("todas");

  const counts = useMemo(
    () => ({
      todas: orders.length,
      abertas: orders.filter((o) => matches(o.status, "abertas")).length,
    }),
    [orders],
  );

  const visible = useMemo(
    () => orders.filter((o) => matches(o.status, filter)),
    [orders, filter],
  );

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 overflow-x-auto rounded-md bg-muted p-1">
          {FILTERS.map(({ key, label }) => {
            const selected = filter === key;
            const count =
              key === "todas"
                ? counts.todas
                : key === "abertas"
                  ? counts.abertas
                  : undefined;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-2 text-xs font-bold transition-colors",
                  selected
                    ? "bg-card text-secondary shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
                {typeof count === "number" ? (
                  <b className="text-muted-foreground">{count}</b>
                ) : null}
              </button>
            );
          })}
        </div>
        <Button variant="outline" size="sm" className="self-start sm:self-auto">
          <Tag className="size-4" /> Filtrar
        </Button>
      </div>

      <Card>
        <div className="hidden grid-cols-[1.5fr_1.2fr_1fr_0.8fr_0.8fr] gap-4 bg-muted/50 px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:grid">
          <span>Veículo / cliente</span>
          <span>Serviço</span>
          <span>Status</span>
          <span className="text-right">Valor</span>
          <span className="text-right">Entrada</span>
        </div>

        {visible.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-border px-6 py-4 text-xs md:grid-cols-[1.5fr_1.2fr_1fr_0.8fr_0.8fr]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-info/15 text-info-strong">
                <CarFront className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold">{order.vehicle}</p>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                  {order.plate} · {order.client}
                </p>
              </div>
            </div>
            <span className="hidden truncate text-muted-foreground md:block">
              {order.service}
            </span>
            <span className="justify-self-end md:justify-self-start">
              <StatusBadge status={order.status} />
            </span>
            <strong className="hidden text-right tabular-nums md:block">
              {formatBRL(order.totalCents)}
            </strong>
            <span className="hidden text-right text-muted-foreground md:block">
              {formatDate(order.createdAt)}
            </span>
          </div>
        ))}
      </Card>
    </>
  );
}
