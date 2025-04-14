export interface User {
    id: number
    fullName: string
    email: string
    password?: string // Optional on fetch
}

export interface Property {
    id: number
    title: string
    description: string
    address: string
    price: number
    imageUrl: string
    userId: number
}

export interface SavedProperty {
    id: number
    userId: number
    propertyId: number
}

export interface Report {
    id: number
    message: string
    userId: number
}

export interface Feedback {
    id: number
    message: string
    userId: number
}


export interface CreatePropertyDTO {
    title: string
    description: string
    location: string
    price: number
    ownerId: number
    images?: string[]
}

export interface UpdatePropertyDTO extends CreatePropertyDTO {
    propertyId: string
}