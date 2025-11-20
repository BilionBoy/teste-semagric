"use client";

import type React from "react";
import { Building2, User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import type { Segmento } from "@/src/@types";

interface ExpositorFormProps {
  loading: boolean;
  segmentos: Segmento[];
  exhibitorType: "juridica" | "fisica";
  formData: {
    displayName: string;
    document: string;
    segment: string;
    responsibleName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
  };
  onTypeChange: (value: "juridica" | "fisica") => void;
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ExpositorForm({
  loading,
  segmentos,
  exhibitorType,
  formData,
  onTypeChange,
  onChange,
  onSubmit,
}: ExpositorFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label className="text-green-800 font-semibold">
          Tipo de Expositor *
        </Label>
        <RadioGroup
          value={exhibitorType}
          onValueChange={onTypeChange}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="juridica" id="r1" />
            <Label htmlFor="r1">Pessoa Jurídica (Empresa)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fisica" id="r2" />
            <Label htmlFor="r2">Pessoa Física (Autônomo)</Label>
          </div>
        </RadioGroup>
      </div>

      {exhibitorType === "juridica" ? (
        <>
          <div className="space-y-2">
            <Label
              htmlFor="companyName"
              className="text-green-800 font-semibold"
            >
              Nome da Empresa *
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-5 h-5 text-green-600" />
              <Input
                id="companyName"
                required
                value={formData.displayName}
                onChange={(e) => onChange("displayName", e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
                placeholder="Ex: Agro Máquinas Ltda"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-green-800 font-semibold">
              CNPJ *
            </Label>
            <Input
              id="cnpj"
              required
              value={formData.document}
              onChange={(e) => onChange("document", e.target.value)}
              className="border-green-200 focus:border-green-500"
              placeholder="00.000.000/0000-00"
              maxLength={18}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="responsibleName"
              className="text-green-800 font-semibold"
            >
              Nome do Responsável *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
              <Input
                id="responsibleName"
                required
                value={formData.responsibleName}
                onChange={(e) => onChange("responsibleName", e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
                placeholder="Nome completo"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-green-800 font-semibold">
              Nome Completo *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
              <Input
                id="fullName"
                required
                value={formData.displayName}
                onChange={(e) => onChange("displayName", e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
                placeholder="Seu nome completo"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-green-800 font-semibold">
              CPF *
            </Label>
            <Input
              id="cpf"
              required
              value={formData.document}
              onChange={(e) => onChange("document", e.target.value)}
              className="border-green-200 focus:border-green-500"
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="segment" className="text-green-800 font-semibold">
          Segmento Principal *
        </Label>
        <Select
          value={formData.segment}
          onValueChange={(value) => onChange("segment", value)}
          required
        >
          <SelectTrigger className="border-green-200 focus:border-green-500">
            <SelectValue placeholder="Selecione seu segmento de atuação" />
          </SelectTrigger>
          <SelectContent>
            {segmentos.map((segment) => (
              <SelectItem key={segment.id} value={String(segment.id)}>
                {segment.descricao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-green-800 font-semibold">
            E-mail de Contato *
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
              placeholder="email@contato.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-green-800 font-semibold">
            Telefone/WhatsApp *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-green-600" />
            <Input
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500"
              placeholder="(69) 99999-9999"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-green-800 font-semibold">
            Cidade *
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-green-600" />
            <Input
              id="city"
              required
              value={formData.city}
              onChange={(e) => onChange("city", e.target.value)}
              className="pl-10 border-green-200 focus:border-green-500"
              placeholder="Porto Velho"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-green-800 font-semibold">
            Estado *
          </Label>
          <Input
            id="state"
            required
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            className="border-green-200 focus:border-green-500"
            placeholder="RO"
            maxLength={2}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full amazon-gradient hover:opacity-90 text-lg py-6"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Finalizar Cadastro"}
      </Button>
    </form>
  );
}
