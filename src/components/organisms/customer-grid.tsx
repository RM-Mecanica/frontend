import { CustomerCard } from "@/components/molecules/customer-card";
import type { Customer } from "@/domain/customer/customer";
import type { Vehicle } from "@/domain/vehicle/vehicle";
import type { RecentOrder } from "@/lib/mock-data";

// Organismo: grade de clientes. Deriva contadores de veículos e OS por cliente.
export function CustomerGrid({
  customers,
  vehicles,
  orders,
}: {
  customers: Customer[];
  vehicles: Vehicle[];
  orders: RecentOrder[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {customers.map((customer) => {
        const owned = vehicles.filter((v) => v.customerId === customer.id);
        const plates = owned.map((v) => v.plate);
        const orderCount = orders.filter((o) =>
          plates.includes(o.plate),
        ).length;
        return (
          <CustomerCard
            key={customer.id}
            customer={customer}
            vehicleCount={owned.length}
            orderCount={orderCount}
            plates={plates}
          />
        );
      })}
    </div>
  );
}
