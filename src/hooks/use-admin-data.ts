"use client"

import { useState, useEffect } from "react"
import type { Expositor, Cliente, Negociacao, Segmento, TipoExpositor } from "@/src/@types"
import { expositoresApi } from "@/src/api/expositores"
import { clientesApi } from "@/src/api/clientes"
import { negociacoesApi } from "@/src/api/negociacoes"
import { segmentosApi } from "@/src/api/segmentos"
import { tiposExpositoresApi } from "@/src/api/tipos-expositores"

export function useAdminData() {
  const [expositores, setExpositores] = useState<Expositor[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [negociacoes, setNegociacoes] = useState<Negociacao[]>([])
  const [segmentos, setSegmentos] = useState<Segmento[]>([])
  const [tiposExpositores, setTiposExpositores] = useState<TipoExpositor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [expositoresData, clientesData, negociacoesData, segmentosData, tiposData] = await Promise.all([
        expositoresApi.list(),
        clientesApi.list(),
        negociacoesApi.list(),
        segmentosApi.list(),
        tiposExpositoresApi.list(),
      ])

      setExpositores(expositoresData)
      setClientes(clientesData)
      setNegociacoes(negociacoesData)
      setSegmentos(segmentosData)
      setTiposExpositores(tiposData)
    } catch (error) {
      console.error("[v0] Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    expositores,
    clientes,
    negociacoes,
    segmentos,
    tiposExpositores,
    loading,
    setExpositores,
    setClientes,
    setNegociacoes,
    setSegmentos,
    setTiposExpositores,
    refresh: loadAllData,
  }
}
