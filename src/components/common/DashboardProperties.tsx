"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Button,
} from "@chakra-ui/react"
import PropertyCard from "@/components/common/PropertyCard"
import PropertyCardActions from "@/components/common/PropertyCardActions"
import PropertyForm from "@/components/common/PropertyForm"
import { toaster } from "@/components/ui/toaster"
import {
  getPropertiesByOwnerId,
  deleteProperty,
} from "@/services/propertyService"
import { useAuth } from "@/context/AuthContext"
import { Property, UpdatePropertyDTO } from "@/types"

export default function DashboardProperties() {
  const { user } = useAuth()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<UpdatePropertyDTO | null>(null)

  const load = async () => {
    try {
      if (!user?.userId) return
      const data = await getPropertiesByOwnerId(user.userId)
      setProperties(data)
    } catch (err) {
      console.error(err)
      toaster.error({ title: "Failed to load properties" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [user])

  const handleDelete = async (id: string) => {
    try {
      await deleteProperty(id)
      toaster.success({ title: "Property deleted" })
      load()
    } catch {
      toaster.error({ title: "Delete failed" })
    }
  }

  return (
    <Box>
      <Heading size="md" mb={4}>My Properties</Heading>

      <Button
        colorScheme="blue"
        mb={4}
        onClick={() => {
          setShowForm(true)
          setEditData(null)
        }}
      >
        Add New Property
      </Button>

      {showForm && (
        <PropertyForm
          mode={editData ? "edit" : "add"}
          initialData={editData || undefined}
          onCancel={() => {
            setShowForm(false)
            setEditData(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            load()
          }}
        />
      )}

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="lg" />
        </Box>
      ) : properties.length === 0 ? (
        <Text color="gray.500">No properties found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} mb={10}>
          {properties.map((p) => (
            <PropertyCard
              key={p.propertyId}
              id={p.propertyId}
              title={p.title}
              address={`${p.city}, ${p.state}, ${p.neighborhood}`}
              price={`RM ${p.price.toLocaleString()}`}
              imageUrl={p.images?.[0] || "/placeholder.jpeg"}
              disableLink
              actions={
                <PropertyCardActions
                onEdit={() => {
                  setEditData({
                    propertyId: p.propertyId,
                    title: p.title,
                    description: p.description,
                    rooms: p.rooms,
                    bathrooms: p.bathrooms,
                    parking: p.parking,
                    area: p.area,
                    state: p.state,
                    city: p.city,
                    neighborhood: p.neighborhood,
                    price: p.price,
                    ownerId: p.ownerId,
                    images: [], // no pre-populated file objects
                    removeImageUrls: p.images || []
                  })
                  setShowForm(true)
                  }}
                  onDelete={() => handleDelete(p.propertyId)}
                />
              }
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  )
}
