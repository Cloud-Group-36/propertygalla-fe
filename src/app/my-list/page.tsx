"use client"

import { useEffect, useState } from "react"
import { Box, Button, Heading, Spinner, Text } from "@chakra-ui/react"
import PropertyGrid from "@/components/common/PropertyGrid"
import { getSavedProperties, removeSavedProperty } from "@/services/savedPropertyService"
import { getPropertyById } from "@/services/propertyService"
import { Property } from "@/types"
import { FiTrash } from "react-icons/fi"

export default function MySavedListPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await getSavedProperties()

        const promises = saved.map((item) => getPropertyById(item.propertyId))
        const results = await Promise.all(promises)
        setProperties(results)
      } catch (err) {
        console.error("Failed to load saved properties", err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <Box px={6} py={10}>
      <Heading size="lg" mb={6}>My Saved Listings</Heading>

      {loading ? (
        <Spinner />
      ) : properties.length === 0 ? (
        <Text color="gray.500">You haven’t saved any properties yet.</Text>
      ) : (
        <PropertyGrid
          properties={properties.map((p) => ({
            id: p.propertyId,
            title: p.title,
            address: `${p.city}, ${p.state}, ${p.neighborhood}`,
            price: `RM ${p.price.toLocaleString()}`,
            imageUrl:p.images && p.images.length > 0
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${p.images[0]}`
              : "/placeholder.jpeg",
            actions: (
              <Button
                size="sm"
                colorScheme="red"
                bg="skyblue"
                onClick={async () => {
                  await removeSavedProperty(p.propertyId)
                  setProperties((prev) =>
                    prev.filter((x) => x.propertyId !== p.propertyId)
                  )
                }}
              >
                <FiTrash />
              </Button>
            ),
          }))}
        />
      )}
    </Box>
  )
}
