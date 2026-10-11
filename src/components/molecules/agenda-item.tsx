import { cn } from "@/lib/utils";

// Molécula: compromisso da agenda. Horário, barra colorida por tipo e descrição.
const BAR_TONE: Record<string, string> = {
  secondary: "bg-secondary/40",
  primary: "bg-primary/50",
  success: "bg-success/40",
};

export function AgendaItem({
  time,
  title,
  detail,
  tone = "secondary",
}: {
  time: string;
  title: string;
  detail: string;
  tone?: "secondary" | "primary" | "success";
}) {
  return (
    <div className="grid grid-cols-[42px_4px_1fr] items-center gap-3 py-2">
      <time className="font-heading text-xs text-muted-foreground">{time}</time>
      <div className={cn("h-8 rounded-sm", BAR_TONE[tone])} />
      <div>
        <p className="text-xs font-bold">{title}</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
