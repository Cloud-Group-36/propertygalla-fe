"use client"

import { useParams } from "next/navigation"
import PagePlaceholder from "@/components/common/PagePlaceholder"
import { PropertyCardProps } from "@/components/common/PropertyCard"

import PropertyDetails from "@/components/common/PropertyDetails"


// This would eventually come from your backend
const sampleProperties: (PropertyCardProps & {
  description: string
  images: string[]
  status: "available" | "rented" | "hidden"
  phone: string
  email: string,
  createdAt: string
  updatedAt: string
})[] = [
  {
    id: "1",
    title: "Modern Loft",
    location: "New York",
    price: "$850,000",
    imageUrl: "/placeholder.jpeg",
    description: "Spacious modern loft in the heart of the city with great views.",
    images: ["/placeholder.jpeg", "/placeholder.jpeg"],
    status: "available",
    phone: "01768984525",
    email: "example@exmple.com",


    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-10T15:30:00Z",
  },
  {
    id: "2",
    title: "Beachside Villa",
    location: "California",
    price: "$1,200,000",
    imageUrl: "/placeholder.jpeg",
    description: "Luxury villa with ocean views and private pool.",
    images: ["/placeholder.jpeg", "/placeholder.jpeg"],
    status: "rented",
    phone: "01768984525",
    email: "example@exmple.com",
    createdAt: "2024-03-21T12:00:00Z",
    updatedAt: "2024-04-08T09:30:00Z",
  },
  {
    id: "3",
    title: "Downtown Studio",
    location: "Texas",
    price: "$480,000",
    imageUrl: "/placeholder.jpeg",
    description: "Compact studio perfect for working professionals.",
    images: ["/placeholder.jpeg", "/placeholder.jpeg"],
    status: "available",
    email: "example@exmple.com",
    phone: "01768984525",
    createdAt: "2024-04-05T11:00:00Z",
    updatedAt: "2024-04-11T17:45:00Z",
  },
]

export default function SpecificPropertyPage() {
  const params = useParams();
  const propertyId = params?.id;

  // Delay rendering until params are available
  if (!propertyId || typeof propertyId !== "string") return null;


  const property = sampleProperties.find((p) => p.id === propertyId);

  if (!property) {
    return <PagePlaceholder title="Property Not Found" />;
  }

  return (
    <PropertyDetails
      title={property.title}
      description={property.description}
      location={property.location}
      price={parseFloat(property.price.replace(/[^0-9.]/g, ""))}
      images={property.images}
      status={property.status}
      phone={property.phone}
      email={property.email}
      createdAt={property.createdAt}
      updatedAt={property.updatedAt}
    />
  );
}

