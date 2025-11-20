"use client";

import type React from "react";
import { User, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

interface ClienteFormProps {
  loading: boolean;
  formData: {
    nome: string;
    telefone: string;
    email: string;
    endereco: string;
    interesse: string;
  };
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ClienteForm({
  loading,
  formData,
  onChange,
  onSubmit,
}: ClienteFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-green-800 font-semibold">
          Nome Completo *
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
          <Input
            id="nome"
            required
            value={formData.nome}
            onChange={(e) => onChange("nome", e.target.value)}
            className="pl-10 border-green-200 focus:border-green-500"
            placeholder="Nome do cliente"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-green-800 font-semibold">
            E-mail *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-green-600" />
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500"
              placeholder="email@exemplo.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone" className="text-green-800 font-semibold">
            Telefone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-green-600" />
            <Input
              id="telefone"
              required
              value={formData.telefone}
              onChange={(e) => onChange("telefone", e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500"
              placeholder="(69) 99999-9999"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="endereco" className="text-green-800 font-semibold">
          Endereço *
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-600" />
          <Input
            id="endereco"
            required
            value={formData.endereco}
            onChange={(e) => onChange("endereco", e.target.value)}
            className="pl-10 border-green-200 focus:border-green-500"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interesse" className="text-green-800 font-semibold">
          Interesse *
        </Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-green-600" />
          <Textarea
            id="interesse"
            required
            value={formData.interesse}
            onChange={(e) => onChange("interesse", e.target.value)}
            className="pl-10 border-green-200 focus:border-green-500 min-h-[100px]"
            placeholder="Descreva o interesse do cliente (produtos, serviços, etc.)"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full amazon-gradient hover:opacity-90 text-lg py-6"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrar Cliente"}
      </Button>
    </form>
  );
}
