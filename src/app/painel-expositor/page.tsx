"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/hooks/use-toast";
import { useExpositorData } from "@/src/app/expositor/hooks/use-expositor-data";
import { ExpositorStatsCards } from "@/src/app/expositor/components/expositor-stats-cards";
import { ClientesTable } from "./components/clientes-table";
import { NegociacoesTable } from "./components/negociacoes-table";

export default function ExhibitorDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [expositorId, setExpositorId] = useState<number | null>(null);
  const { clientes, negociacoes, loading, expositor } = useExpositorData();

  useEffect(() => {
    const id = localStorage.getItem("currentExpositorId");

    if (!id) {
      toast({
        title: "Acesso Negado",
        description: "Você precisa estar cadastrado como expositor.",
        variant: "destructive",
      });
      router.push("/cadastro-expositor");
      return;
    }

    setExpositorId(Number.parseInt(id));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentExpositorId");
    toast({
      title: "Logout Realizado",
      description: "Você foi desconectado com sucesso.",
    });
    router.push("/");
  };

  const stats = {
    totalClientes: clientes.length,
    totalValue: negociacoes.reduce(
      (sum, n) => sum + Number.parseFloat(String(n.valor)),
      0
    ),
    dealsClosed: negociacoes.filter((n) => n.status === "fechada").length,
  };

  if (loading || !expositorId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <header className="amazon-gradient text-white py-4 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-white hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-green-100">Expositor</p>
              <p className="font-semibold">
                {expositor?.empresa || expositor?.nome_completo}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-green-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-green-800">
              Painel de Controle
            </h1>
            <Button
              onClick={() => router.push("/registro-cliente")}
              className="amazon-gradient hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" /> Registrar Cliente
            </Button>
          </div>

          <ExpositorStatsCards {...stats} />
          <ClientesTable
            clientes={clientes}
            onAddCliente={() => router.push("/registro-cliente")}
          />
          <NegociacoesTable negociacoes={negociacoes} />
        </motion.div>
      </div>
    </div>
  );
}
