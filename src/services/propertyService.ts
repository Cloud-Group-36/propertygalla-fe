import api from "./axios"
import {
  Property,
  CreatePropertyDTO,
  UpdatePropertyDTO
} from "@/types"

export const getAllProperties = async (params?: {
    title?: string
    location?: string
    minPrice?: number
    maxPrice?: number
    startDate?: string
    endDate?: string
    page?: number
    pageSize?: number
    }): Promise<Property[]> => {
        const res = await api.get<Property[]>("/properties", { params })
        console.log("Response isss", res.data)
        return res.data
    }

    export const getPropertyById = async (id: string): Promise<Property> => {
        const res = await api.get<Property>(`/properties/${id}`)
        return res.data
    }

    export const createProperty = async (data: CreatePropertyDTO): Promise<Property> => {
        const res = await api.post<Property>("/properties", data)
        return res.data
    }

    export const updateProperty = async (id: string, data: UpdatePropertyDTO): Promise<void> => {
        await api.put(`/properties/${id}`, data)
    }

    export const deleteProperty = async (id: string): Promise<void> => {
        await api.delete(`/properties/${id}`)
    }
