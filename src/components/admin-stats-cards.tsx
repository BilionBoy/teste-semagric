import { Building2, UsersRound, DollarSign, Handshake } from "lucide-react"

interface AdminStatsCardsProps {
  totalExpositores: number
  totalClientes: number
  totalNegociacoes: number
  totalValue: number
}

export function AdminStatsCards({
  totalExpositores,
  totalClientes,
  totalNegociacoes,
  totalValue,
}: AdminStatsCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Expositores</p>
            <p className="text-3xl font-bold text-green-800">{totalExpositores}</p>
          </div>
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Visitantes</p>
            <p className="text-3xl font-bold text-green-800">{totalClientes}</p>
          </div>
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <UsersRound className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Volume Total</p>
            <p className="text-2xl font-bold text-orange-700">
              R$ {totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Negócios</p>
            <p className="text-3xl font-bold text-green-800">{totalNegociacoes}</p>
          </div>
          <div className="amazon-gradient w-12 h-12 rounded-full flex items-center justify-center">
            <Handshake className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
