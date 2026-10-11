"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/atoms/input";
import { cn } from "@/lib/utils";

// Molécula: campo de busca (ícone + input). O exemplo canônico de molécula do
// Atomic Design (B. Frost): átomos juntos com um propósito único — buscar.
export function SearchField({
  value,
  onChange,
  placeholder = "Buscar...",
  label,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="h-11 pl-9 text-sm"
      />
    </div>
  );
}
