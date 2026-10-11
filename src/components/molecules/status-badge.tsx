import { Badge } from "@/components/atoms/badge";
import { cn } from "@/lib/utils";
import { OS_STATUS_LABEL, type OsStatus } from "@/domain/service-order/status";

// Molécula: pílula de status da OS. Cores da tabela de status (design.md),
// via tokens. Cor nunca é o único sinal — o rótulo escrito acompanha sempre.
// Cada status com cor distinguível na paleta azul. Status semânticos
// (aviso/sucesso/erro) reforçam o significado; o rótulo escrito acompanha sempre.
const STATUS_CLASS: Record<OsStatus, string> = {
  aguardando_orcamento: "bg-muted-foreground text-white",
  orcamento_enviado: "bg-info text-white",
  aprovado: "bg-secondary text-white",
  em_execucao: "bg-primary text-white",
  aguardando_peca: "bg-warning text-sidebar",
  pronto_retirada: "bg-success text-white",
  entregue: "bg-sidebar text-white",
  cancelada: "bg-danger-strong text-white",
};

export function StatusBadge({
  status,
  className,
}: {
  status: OsStatus;
  className?: string;
}) {
  return (
    <Badge className={cn(STATUS_CLASS[status], className)}>
      {OS_STATUS_LABEL[status]}
    </Badge>
  );
}
