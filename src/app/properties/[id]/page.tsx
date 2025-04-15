"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import PropertyDetails from "@/components/common/PropertyDetails"
import PagePlaceholder from "@/components/common/PagePlaceholder"
import { getPropertyById } from "@/services/propertyService"
import { Property } from "@/types"

export default function SpecificPropertyPage() {
  const params = useParams()
  const propertyId = params?.id as string

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPropertyById(propertyId)
        setProperty(data)
      } catch {
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    if (propertyId) fetch()
  }, [propertyId])

  if (loading) return <PagePlaceholder title="Loading Property..." />
  if (!property) return <PagePlaceholder title="Property Not Found" />

  return (
    <PropertyDetails
      {...property}
      phone="N/A" // Replace with actual contact later
      email="N/A"
    />
  )
}
