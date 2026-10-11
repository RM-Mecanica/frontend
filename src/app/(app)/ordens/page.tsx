import { PageHeader } from "@/components/organisms/page-header";
import { OrdersTable } from "@/components/organisms/orders-table";
import { NewOrderDialog } from "@/components/organisms/new-order-dialog";
import { recentOrders } from "@/lib/mock-data";

// Página Ordens de serviço (protótipo visual — dados mock, sem Supabase).
export default function OrdensPage() {
  return (
    <div className="mx-auto max-w-[1440px] p-5 md:p-8">
      <PageHeader
        eyebrow="Operação"
        title="Ordens de serviço"
        subtitle="Controle cada veículo desde a entrada até a entrega."
        action={<NewOrderDialog />}
      />
      <OrdersTable orders={recentOrders} />
    </div>
  );
}
