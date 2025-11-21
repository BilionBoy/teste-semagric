import { api } from "@/lib/api"
import type { Expositor } from "@/@types"

export const expositoresApi = {
  list: () => api.get<Expositor[]>("/e_expositores").then((res) => res.data),

  getById: (id: number) => api.get<Expositor>(`/e_expositores/${id}`).then((res) => res.data),

  create: (data: Partial<Expositor>) => api.post<Expositor>("/e_expositores", data).then((res) => res.data),

  update: (id: number, data: Partial<Expositor>) =>
    api.put<Expositor>(`/e_expositores/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/e_expositores/${id}`).then((res) => res.data),
}
