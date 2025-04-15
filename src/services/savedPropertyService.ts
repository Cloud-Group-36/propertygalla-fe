import api from "./axios"
import { SavedPropertyDto } from "@/types"

export const getSavedProperties = async (): Promise<SavedPropertyDto[]> => {
    const token = localStorage.getItem("token")
    const res = await api.get("/savedproperties", {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
    return res.data
}

export const saveProperty = async (dto: SavedPropertyDto): Promise<void> => {
    const token = localStorage.getItem("token")
    await api.post("/savedproperties", dto, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
}

export const removeSavedProperty = async (propertyId: string): Promise<void> => {
    const token = localStorage.getItem("token")
    await api.delete(`/savedproperties/${propertyId}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })
}
