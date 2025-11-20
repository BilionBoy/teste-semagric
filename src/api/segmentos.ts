import { api } from "@/src/lib/api"
import type { Segmento } from "@/src/@types"

export const segmentosApi = {
  list: () => api.get<Segmento[]>("/e_segmentos").then((res) => res.data),

  getById: (id: number) => api.get<Segmento>(`/e_segmentos/${id}`).then((res) => res.data),

  create: (data: Partial<Segmento>) => api.post<Segmento>("/e_segmentos", data).then((res) => res.data),

  update: (id: number, data: Partial<Segmento>) =>
    api.put<Segmento>(`/e_segmentos/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/e_segmentos/${id}`).then((res) => res.data),
}
