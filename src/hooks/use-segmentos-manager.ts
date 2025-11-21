"use client"

import { useState } from "react"
import { segmentosApi } from "@/src/api/segmentos"
import type { Segmento } from "@/src/@types"

export function useSegmentosManager() {
  const [isAdding, setIsAdding] = useState(false)

  const addSegmento = async (data: Partial<Segmento>) => {
    setIsAdding(true)
    try {
      const created = await segmentosApi.create(data)
      return created
    } finally {
      setIsAdding(false)
    }
  }

  const deleteSegmento = async (id: number) => {
    await segmentosApi.delete(id)
  }

  return {
    addSegmento,
    deleteSegmento,
    isAdding,
  }
}
