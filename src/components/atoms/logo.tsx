import Image from "next/image";

import { cn } from "@/lib/utils";

// Átomo: marca da RM Mecânica. A arte tem fundo branco e wordmark preto, então
// é apresentada sobre um chip claro para funcionar sobre a sidebar navy.
export function Logo({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-md bg-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.jpg"
        alt="RM Mecânica"
        width={size}
        height={size}
        className="h-full w-full object-contain p-1"
        priority
      />
    </span>
  );
}
