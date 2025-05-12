"use client"

import { useEffect, useState } from "react"
import { Box, Heading, Spinner, VStack } from "@chakra-ui/react"
import PropertyGrid from "./PropertyGrid"
import { PropertyCardProps } from "./PropertyCard"
import { getAllProperties } from "@/services/propertyService"

export default function FeaturedListings() {
  const [featured, setFeatured] = useState<PropertyCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await getAllProperties({ page: 1, pageSize: 3 })
        const transformed: PropertyCardProps[] = res.properties.map((p) => {
          const firstImage = p.images?.[0]?.imageUrl ?? null;

          return {
            id: p.propertyId,
            title: p.title,
            address: `${p.city}, ${p.state}, ${p.neighborhood}`,
            price: `RM ${p.price.toLocaleString()}`,
            imageUrl: firstImage || "/placeholder.jpeg",
          };
        });

        setFeatured(transformed)
      } catch (err) {
        console.error("Failed to load featured listings:", err)
      } finally {
        setLoading(false)
      }
    }

    loadFeatured()
  }, [])

  return (
    <Box px={6} py={12}>
      <VStack gap={6} align="center" maxW="7xl" mx="auto" textAlign="center">
        <Heading size="2xl" fontWeight="bold">
          Featured Properties
        </Heading>
        {loading ? <Spinner size="lg" /> : <PropertyGrid properties={featured} />}
      </VStack>
    </Box>
  )
}
