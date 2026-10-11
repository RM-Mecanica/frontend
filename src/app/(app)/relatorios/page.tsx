import { BarChart3 } from "lucide-react";

import { PageHeader } from "@/components/organisms/page-header";
import { ComingSoon } from "@/components/organisms/coming-soon";

export default function RelatoriosPage() {
  return (
    <div className="mx-auto max-w-[1440px] p-5 md:p-8">
      <PageHeader
        eyebrow="Gestão"
        title="Relatórios"
        subtitle="Indicadores e análises da operação."
      />
      <ComingSoon
        icon={<BarChart3 />}
        title="Relatórios em breve"
        description="Os relatórios de desempenho e faturamento chegam nas próximas fases do projeto."
      />
    </div>
  );
}
