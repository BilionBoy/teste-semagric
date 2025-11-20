"use client"

import { DollarSign } from "lucide-react"
import type { Negociacao } from "@/src/@types"

interface NegociacoesTableProps {
  negociacoes: Negociacao[]
}

export function NegociacoesTable({ negociacoes }: NegociacoesTableProps) {
  const formatDateTime = (isoString: string) => {
    if (!isoString) return "-"
    const date = new Date(isoString)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (negociacoes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <h2 className="text-xl font-bold text-green-800 mb-4">Negociações</h2>
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma negociação registrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
      <h2 className="text-xl font-bold text-green-800 mb-4">Negociações</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-100">
              <th className="text-left py-3 px-4 text-green-800 font-semibold">Item</th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">Quantidade</th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">Valor</th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-green-800 font-semibold">Data</th>
            </tr>
          </thead>
          <tbody>
            {negociacoes.map((neg) => (
              <tr key={neg.id} className="border-b border-green-50 hover:bg-green-50">
                <td className="py-3 px-4 font-medium">{neg.item}</td>
                <td className="py-3 px-4">{neg.quantidade}</td>
                <td className="py-3 px-4 font-semibold text-green-700">
                  R$ {Number.parseFloat(String(neg.valor)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {neg.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{formatDateTime(neg.data_hora)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
