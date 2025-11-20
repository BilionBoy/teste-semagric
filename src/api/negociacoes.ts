import { api } from "@/src/lib/api"
import type { Negociacao } from "@/src/@types"

export const negociacoesApi = {
  list: () => api.get<Negociacao[]>("/e_negociacoes").then((res) => res.data),

  getById: (id: number) => api.get<Negociacao>(`/e_negociacoes/${id}`).then((res) => res.data),

  create: (data: Partial<Negociacao>) => api.post<Negociacao>("/e_negociacoes", data).then((res) => res.data),

  update: (id: number, data: Partial<Negociacao>) =>
    api.put<Negociacao>(`/e_negociacoes/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/e_negociacoes/${id}`).then((res) => res.data),
}
