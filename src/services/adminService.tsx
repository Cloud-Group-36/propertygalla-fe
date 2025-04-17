import api from "./axios"
import {
  AdminUser,
  AdminProperty,
  DashboardStats,
  GetReportsResponse,
  UpdateReportStatusDTO
} from "@/types"

const authHeader = () => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

interface GetUsersResponse {
    users: AdminUser[]
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
}

interface GetPropertiesResponse {
    properties: AdminProperty[]
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
}



export const getAdminDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get("/admin/dashboard", authHeader())
  return res.data
}

export const getAllUsers = async (
    page = 1,
    pageSize = 5,
    search = ""
  ): Promise<GetUsersResponse> => {
    const token = localStorage.getItem("token")
    const res = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageSize,
        name: search, // ✅ Only filter by name
      },
    })
    return res.data
}



export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/users/${id}`, authHeader())
}

export const getAllProperties = async (
    page = 1,
    pageSize = 100,
    filters: { title?: string } = {}
  ): Promise<GetPropertiesResponse> => {
    const token = localStorage.getItem("token")
    const res = await api.get("/properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageSize,
        title: filters.title || "",
      },
    })
  
    // Fallback if backend pagination isn’t implemented yet
    if (!res.data.properties) {
      return {
        properties: res.data,
        currentPage: 1,
        totalPages: 1,
        totalCount: res.data.length,
        pageSize,
      }
    }
  
    return res.data
  }

export const deleteProperty = async (id: string): Promise<void> => {
  await api.delete(`/properties/${id}`, authHeader())
}

export const getAllReports = async (
    page = 1,
    pageSize = 5,
    filters: {
      reporterId?: string
      propertyId?: string
      status?: string
      startDate?: string
      endDate?: string
    } = {}
  ): Promise<GetReportsResponse> => {
    const token = localStorage.getItem("token")
  
    const res = await api.get("/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageSize,
        ...filters,
      },
    })
  
    return res.data
  }
  
  
  export const deleteReport = async (id: string): Promise<void> => {
    await api.delete(`/reports/${id}`, authHeader())
  }
  
  export const updateReportStatus = async (dto: UpdateReportStatusDTO): Promise<void> => {
    await api.put("/reports", dto, authHeader())
  }
