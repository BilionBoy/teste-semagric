"use client"

import { useState } from "react"
import { tiposExpositoresApi } from "@/src/api/tipos-expositores"
import type { TipoExpositor } from "@/src/@types"

export function useTiposManager() {
  const [isAdding, setIsAdding] = useState(false)

  const addTipo = async (data: Partial<TipoExpositor>) => {
    setIsAdding(true)
    try {
      const created = await tiposExpositoresApi.create(data)
      return created
    } finally {
      setIsAdding(false)
    }
  }

  const deleteTipo = async (id: number) => {
    await tiposExpositoresApi.delete(id)
  }

  return {
    addTipo,
    deleteTipo,
    isAdding,
  }
}
