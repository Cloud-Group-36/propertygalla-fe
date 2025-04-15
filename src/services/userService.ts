import api from "./axios"
import { LoginDto, RegisterDto, LoginResponse, User } from "@/types/index"

export const loginUser = async (data: LoginDto): Promise<LoginResponse> => {
    const res = await api.post("/users/login", data)
    return res.data
}

export const registerUser = async (data: RegisterDto): Promise<{ message: string; userId: string }> => {
    const res = await api.post("/users", data)
    return res.data
}

export const getUserById = async (id: string): Promise<User> => {
    const token = localStorage.getItem("token") 
        const res = await api.get(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
    return res.data
  }

export const changePassword = async (email: string, oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    const token = localStorage.getItem("token")
        const res = await api.post(
            "/users/change-password",
            { email, oldPassword, newPassword },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
    )
    return res.data
}