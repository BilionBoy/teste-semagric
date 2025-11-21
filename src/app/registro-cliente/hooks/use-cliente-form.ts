"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { clientesApi } from "@/app/expositor/api/clientes";

export function useClienteForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    interesse: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const expositorId = localStorage.getItem("currentExpositorId");

      if (!expositorId) {
        toast({
          title: "Erro",
          description: "ID do expositor não encontrado.",
          variant: "destructive",
        });
        router.push("/cadastro-expositor");
        return;
      }

      await clientesApi.create({
        e_cliente: {
          e_expositor_id: Number.parseInt(expositorId),
          ...formData,
        },
      });

      toast({
        title: "Cliente Registrado!",
        description: "Cliente cadastrado com sucesso.",
      });

      setTimeout(() => router.push("/painel-expositor"), 1500);
    } catch (error: any) {
      toast({
        title: "Erro ao Registrar",
        description: error.message || "Não foi possível registrar o cliente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    handleChange,
    handleSubmit,
  };
}
