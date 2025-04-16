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

export const createProperty = async (form: FormData) => {
  const token = localStorage.getItem("token");
  
  try {
    const res = await api.post("/properties/with-files", form, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      transformRequest: (data) => data, // Prevent axios from transforming FormData
    });
    return res.data;
  } catch (err) {
    console.error("API Error");
    throw err;
  }
};

export const updateProperty = async (id: string, form: FormData) => {
  const res = await api.put(`/properties/${id}`, form, {
    // 🔁 NO Authorization header now
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};




export const deleteProperty = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/properties/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return res.data;
};


export const getPropertiesByOwnerId = async (ownerId: string): Promise<Property[]> => {
  const res = await api.get("/properties", { params: { ownerId } })
  return res.data
}