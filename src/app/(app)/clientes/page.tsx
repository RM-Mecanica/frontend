import { Plus } from "lucide-react";

import { PageHeader } from "@/components/organisms/page-header";
import { CustomerGrid } from "@/components/organisms/customer-grid";
import { Button } from "@/components/atoms/button";
import { customers, vehicles, recentOrders } from "@/lib/mock-data";

// Página Clientes (protótipo visual — dados mock, sem Supabase).
export default function ClientesPage() {
  return (
    <div className="mx-auto max-w-[1440px] p-5 md:p-8">
      <PageHeader
        eyebrow="Relacionamento"
        title="Clientes"
        subtitle="Sua base de clientes e os veículos atendidos."
        action={
          <Button variant="primary" size="sm">
            <Plus className="size-4" /> Novo cliente
          </Button>
        }
      />

      <CustomerGrid
        customers={customers}
        vehicles={vehicles}
        orders={recentOrders}
      />
    </div>
  );
}
