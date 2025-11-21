import { api } from "@/lib/api"
import type { TipoExpositor } from "@/@types"

export const tiposExpositoresApi = {
  list: () => api.get<TipoExpositor[]>("/e_tipo_expositores").then((res) => res.data),

  getById: (id: number) => api.get<TipoExpositor>(`/e_tipo_expositores/${id}`).then((res) => res.data),

  create: (data: Partial<TipoExpositor>) =>
    api.post<TipoExpositor>("/e_tipo_expositores", data).then((res) => res.data),

  update: (id: number, data: Partial<TipoExpositor>) =>
    api.put<TipoExpositor>(`/e_tipo_expositores/${id}`, data).then((res) => res.data),

  delete: (id: number) => api.delete(`/e_tipo_expositores/${id}`).then((res) => res.data),
}
