export interface User {
    userId: string
    name: string
    email: string
    phone: string
    role: string
    createdAt: string
}

export interface LoginDto {
    email: string
    password: string
}
  
export interface RegisterDto {
    name: string
    email: string
    password: string
    phone: string
    role: string
}
  
export interface UserResponse {
    userId: string
    name: string
    email: string
    phone: string
    role: string
    createdAt: string
}
  
export interface LoginResponse {
    token: string
    user: UserResponse
}


export interface Property {
    propertyId: string
    ownerId: string
    title: string
    description: string
    rooms: number
    bathrooms: number
    parking: number
    area: number
    state: string
    city: string
    neighborhood: string
    price: number
    status: "available" | "rented" | "hidden"
    createdAt: string
    updatedAt: string
    images: { imageUrl: string }[]}


export interface SavedPropertyDto {
    userId: string
    propertyId: string
}

export interface Report {
    id: number
    message: string
    userId: number
}

export interface Feedback {
    feedbackId: string
    reviewerId: string
    reviewerName: string
    ownerId: string
    rating: number
    comment: string
    submittedAt: string
}

export interface CreateFeedbackDTO {
    reviewerId: string
    ownerId: string
    rating: number
    comment: string
}



export interface CreatePropertyDTO {
    title: string
    description: string
    rooms: number
    bathrooms: number
    parking: number
    area: number
    state: string
    city: string
    neighborhood: string
    price: number
    ownerId: string
    images?: File[]
  }
  
export interface UpdatePropertyDTO extends CreatePropertyDTO {
    propertyId: string
    removeImageUrls?: string[]
}
  

// Admin types:
export interface AdminUser {
    userId: string
    name: string
    email: string
    phone: string
    role: string
    createdAt: string
}

export interface AdminProperty {
    propertyId: string
    title: string
    ownerId: string
    price: number
    status: string
    city: string
}


export interface Report {
    reportId: string
    reporterId: string
    propertyId: string
    reason: string
    status: "pending" | "reviewed" | "dismissed" | "handled"
    note?: string
    createdAt: string
}


export interface DashboardStats {
    totalUsers: number
    totalProperties: number
    totalReports: number
    recentReports: {
        title: string
        author: string
        createdAt: string
    }[]
}

export interface RecentReport {
    title: string
    author: string
    timeAgo: string
}

export interface GetReportsResponse {
    reports: Report[]
    currentPage: number
    totalPages: number
    totalCount: number
    pageSize: number
}
  
export interface UpdateReportStatusDTO {
    reportId: string
    status: string
    note: string
}