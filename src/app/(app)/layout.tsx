import { AppSidebar } from "@/components/organisms/app-sidebar";

// Layout da área logada: sidebar fixa a partir de 1024px, conteúdo deslocado.
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar />
      <div className="min-h-screen lg:pl-[248px]">{children}</div>
    </div>
  );
}
