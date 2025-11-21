"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { validateCNPJ, validateCPF } from "@/lib/validators";
import { segmentosApi } from "@/api/segmentos";
import { expositoresApi } from "@/api/expositores";
import type { Segmento } from "@/@types";

export function useExpositorForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [segmentos, setSegmentos] = useState<Segmento[]>([]);
  const [exhibitorType, setExhibitorType] = useState<"juridica" | "fisica">(
    "juridica"
  );
  const [formData, setFormData] = useState({
    displayName: "",
    document: "",
    segment: "",
    responsibleName: "",
    email: "",
    phone: "",
    city: "Porto Velho",
    state: "RO",
  });

  useEffect(() => {
    loadSegmentos();
  }, []);

  const loadSegmentos = async () => {
    try {
      const data = await segmentosApi.list();
      setSegmentos(data);
    } catch (error) {
      toast({
        title: "Erro ao Carregar Segmentos",
        description:
          "Não foi possível carregar os segmentos. Verifique a conexão com a API.",
        variant: "destructive",
      });
      setSegmentos([]);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (value: "juridica" | "fisica") => {
    setExhibitorType(value);
    setFormData({
      displayName: "",
      document: "",
      segment: "",
      responsibleName: "",
      email: "",
      phone: "",
      city: "Porto Velho",
      state: "RO",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (exhibitorType === "juridica" && !validateCNPJ(formData.document)) {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, verifique o CNPJ informado.",
        variant: "destructive",
      });
      return;
    }

    if (exhibitorType === "fisica" && !validateCPF(formData.document)) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, verifique o CPF informado.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        e_expositor: {
          e_evento_id: 1,
          e_tipo_expositor_id: exhibitorType === "juridica" ? 2 : 1,
          e_segmento_id: Number.parseInt(formData.segment),
          status: "ativo",
          empresa: exhibitorType === "juridica" ? formData.displayName : null,
          cnpj: exhibitorType === "juridica" ? formData.document : null,
          nome_completo:
            exhibitorType === "fisica" ? formData.displayName : null,
          cpf: exhibitorType === "fisica" ? formData.document : null,
          responsavel:
            exhibitorType === "juridica"
              ? formData.responsibleName
              : formData.displayName,
          email_contato: formData.email,
          telefone_contato: formData.phone,
          cidade: formData.city,
          estado: formData.state,
        },
      };

      const response = await expositoresApi.create(payload);

      localStorage.setItem("currentExpositorId", String((response as any).id));

      toast({
        title: "Cadastro Realizado!",
        description:
          "Seu cadastro foi realizado com sucesso na AGROTEC PVH 2025.",
      });

      setTimeout(() => router.push("/painel-expositor"), 1500);
    } catch (error: any) {
      toast({
        title: "Erro ao Cadastrar",
        description: error.message || "Não foi possível completar o cadastro.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    segmentos,
    exhibitorType,
    formData,
    handleChange,
    handleTypeChange,
    handleSubmit,
  };
}
