import { CarFront, FileText } from "lucide-react";

import { Card } from "@/components/molecules/card";
import { initials, type Customer } from "@/domain/customer/customer";

// Molécula: cartão de cliente. Avatar com iniciais, contato, contadores de
// veículos e OS, e as placas atendidas.
export function CustomerCard({
  customer,
  vehicleCount,
  orderCount,
  plates,
}: {
  customer: Customer;
  vehicleCount: number;
  orderCount: number;
  plates: string[];
}) {
  return (
    <Card className="p-5">
      <div className="flex size-10 items-center justify-center rounded-md bg-info/15 text-sm font-bold text-info-strong">
        {initials(customer.name)}
      </div>
      <h3 className="mt-4 font-heading text-base">{customer.name}</h3>
      <p className="text-xs text-muted-foreground">{customer.phone}</p>

      <div className="mt-4 flex gap-5 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CarFront className="size-4" />
          {vehicleCount} {vehicleCount === 1 ? "veículo" : "veículos"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FileText className="size-4" />
          {orderCount} OS
        </span>
      </div>

      {plates.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {plates.map((plate) => (
            <span
              key={plate}
              className="rounded-sm bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground"
            >
              {plate}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
