import { cn } from "@/lib/utils";

// Átomo: placeholder de carregamento. Todo listagem tem estado de loading
// (regras.md): usar este bloco com pulse enquanto os dados não chegam.
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden
    />
  );
}
