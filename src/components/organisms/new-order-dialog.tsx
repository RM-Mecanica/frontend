"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/molecules/dialog";

// Organismo da feature: modal de nova OS. Formulário ainda sem persistência
// (Server Action entra no pedido do spec-kit da feature de OS).
export function NewOrderDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          <Plus className="size-4" /> Novo atendimento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>Novo atendimento</DialogDescription>
          <DialogTitle>Criar ordem de serviço</DialogTitle>
        </DialogHeader>

        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
        >
          <label className="text-xs font-bold text-foreground">
            Cliente
            <Input className="mt-2" placeholder="Nome do cliente" />
          </label>
          <label className="text-xs font-bold text-foreground">
            Placa
            <Input
              className="mt-2 uppercase"
              placeholder="ABC-1D23"
              autoCapitalize="characters"
            />
          </label>
          <label className="text-xs font-bold text-foreground sm:col-span-2">
            Veículo
            <Input className="mt-2" placeholder="Marca, modelo e ano" />
          </label>
          <label className="text-xs font-bold text-foreground sm:col-span-2">
            Serviço solicitado
            <Textarea
              className="mt-2"
              placeholder="Descreva o serviço ou problema relatado"
            />
          </label>
          <Button type="submit" variant="primary" className="mt-2 w-full sm:col-span-2">
            Salvar ordem de serviço
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
