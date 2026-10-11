"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import { StatusBadge } from "@/components/molecules/status-badge";
import { SearchField } from "@/components/molecules/search-field";
import { SectionTitle } from "@/components/atoms/section-title";
import { formatBRL, formatDate } from "@/lib/format";
import type { RecentOrder } from "@/lib/mock-data";

// Organismo da feature: tabela de OS recentes com busca. Client porque filtra
// localmente. No celular cada linha vira card (regras.md); aqui a tabela rola.
export function RecentOrdersTable({ orders }: { orders: RecentOrder[] }) {
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((o) =>
      [o.id, o.client, o.vehicle, o.plate, o.service].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [orders, search]);

  return (
    <Card>
      <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <SectionTitle>Ordens de serviço recentes</SectionTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Acompanhe os últimos atendimentos registrados
          </p>
        </div>
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Buscar OS, cliente..."
          label="Buscar ordens de serviço"
          className="md:w-56"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-3 font-bold">OS</th>
              <th className="px-4 py-3 font-bold">Cliente / veículo</th>
              <th className="px-4 py-3 font-bold">Serviço</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 text-right font-bold">Valor</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {visible.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border transition-colors hover:bg-muted/40"
              >
                <td className="px-6 py-4 font-bold text-secondary">
                  {order.id}
                  <p className="mt-1 text-[10px] font-normal text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-bold">{order.client}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {order.vehicle} · {order.plate}
                  </p>
                </td>
                <td className="px-4 py-4 text-muted-foreground">
                  {order.service}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-4 text-right font-bold tabular-nums">
                  {formatBRL(order.totalCents)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="link" size="sm" className="h-auto px-0">
                    Abrir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border px-6 py-4">
        <p className="text-[11px] text-muted-foreground">
          Exibindo {visible.length} de {orders.length} ordens
        </p>
        <Button variant="link" size="sm" className="h-auto px-0">
          Ver todas as ordens <ArrowUpRight className="size-3" />
        </Button>
      </div>
    </Card>
  );
}
