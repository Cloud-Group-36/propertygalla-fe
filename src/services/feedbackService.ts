import api from "./axios"
import { Feedback, CreateFeedbackDTO } from "@/types/index"

interface FeedbackResponse {
  total: number
  page: number
  pageSize: number
  totalPages: number
  data: Feedback[]
}

export const getFeedbackByOwner = async (
    ownerId: string,
    page = 1,
    pageSize = 10
    ): Promise<FeedbackResponse> => {
    const res = await api.get("/feedback", {
        params: { ownerId, page, pageSize },
    })
    return res.data 
}

export const giveFeedback = async (payload: CreateFeedbackDTO): Promise<Feedback> => {
    const token = localStorage.getItem("token")
    const res = await api.post("/feedback", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
}