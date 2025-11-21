"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cliente } from "@/@types";

interface ClientesTableProps {
  clientes: Cliente[];
  onAddCliente: () => void;
}

export function ClientesTable({ clientes, onAddCliente }: ClientesTableProps) {
  if (clientes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Clientes Registrados
        </h2>
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Nenhum cliente registrado ainda</p>
          <Button
            onClick={onAddCliente}
            className="amazon-gradient hover:opacity-90"
          >
            Registrar Primeiro Cliente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100 mb-8">
      <h2 className="text-xl font-bold text-green-800 mb-4">
        Clientes Registrados
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-100">
              <th className="text-left py-3 px-4 text-green-800 font-semibold">
                Nome
              </th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">
                Contato
              </th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">
                Endereço
              </th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">
                Interesse
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <motion.tr
                key={cliente.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-green-50 hover:bg-green-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{cliente.nome}</td>
                <td className="py-3 px-4">
                  <div>{cliente.email}</div>
                  <div className="text-gray-500">{cliente.telefone}</div>
                </td>
                <td className="py-3 px-4 text-gray-600">{cliente.endereco}</td>
                <td className="py-3 px-4">{cliente.interesse}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
