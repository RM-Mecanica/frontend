import { Settings } from "lucide-react";

import { PageHeader } from "@/components/organisms/page-header";
import { ComingSoon } from "@/components/organisms/coming-soon";

export default function ConfiguracoesPage() {
  return (
    <div className="mx-auto max-w-[1440px] p-5 md:p-8">
      <PageHeader
        eyebrow="Gestão"
        title="Configurações"
        subtitle="Preferências da oficina e da conta."
      />
      <ComingSoon
        icon={<Settings />}
        title="Configurações em breve"
        description="O ajuste de perfis, permissões e dados da oficina chega nas próximas fases."
      />
    </div>
  );
}
