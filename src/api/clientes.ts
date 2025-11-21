import { api } from "@/lib/api"
import type { Cliente } from "@/@types"

export const clientesApi = {
  list: () => api.get<Cliente[]>("/e_clientes").then((res) => res.data),

  getById: (id: number) => api.get<Cliente>(`/e_clientes/${id}`).then((res) => res.data),

  create: (data: Partial<Cliente>) => api.post<Cliente>("/e_clientes", data).then((res) => res.data),

  update: (id: number, data: Partial<Cliente>) => api.put<Cliente>(`/e_clientes/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/e_clientes/${id}`).then((res) => res.data),
}
