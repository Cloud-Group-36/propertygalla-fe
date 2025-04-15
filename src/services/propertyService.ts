import api from "./axios"
import {
    Property,

} from "@/types/index"

export const getAllProperties = async (
    filters?: {
      state?: string
      city?: string
      rooms?: number
      bathrooms?: number
      status?: string
      page?: number
      pageSize?: number
    }
  ): Promise<Property[]> => {
    const res = await api.get<Property[]>("/properties", { params: filters })
    return res.data
}

export const getPropertyById = async (id: string): Promise<Property> => {
    const res = await api.get<Property>(`/properties/${id}`)
    return res.data
}

export const createProperty = async (data: FormData): Promise<Property> => {
  const token = localStorage.getItem("token")
  const res = await api.post("/properties/with-files", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT include 'Content-Type' here
    },
  })
  return res.data
}

export const updateProperty = async (id: string, data: FormData): Promise<void> => {
  const token = localStorage.getItem("token")
  await api.put(`/properties/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      // ❌ DO NOT include 'Content-Type' here
    },
  })
}



export const deleteProperty = async (id: string): Promise<void> => {
  const token = localStorage.getItem("token")

  await api.delete(`/properties/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const getPropertiesByOwnerId = async (ownerId: string): Promise<Property[]> => {
  const res = await api.get("/properties", { params: { ownerId } })
  return res.data
}