"use client"

import { useState, useEffect } from "react"
import { Box, Flex } from "@chakra-ui/react"
import SearchBar from "@/components/common/SearchBar"
import DropdownFilter from "@/components/common/DropdownFilter"
import PriceSlider from "@/components/common/PriceSlider"
import PropertyGrid from "@/components/common/PropertyGrid"
import { getAllProperties } from "@/services/propertyService"
import { Property } from "@/types"
import { PropertyCardProps } from "@/components/common/PropertyCard"

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [maxPrice, setMaxPrice] = useState(1000000)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties()
        setProperties(data)
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      }
    }

    fetchProperties()
  }, [])

  const displayProperties: PropertyCardProps[] = properties.map((p) => ({
    id: p.propertyId,
    title: p.title,
    address: `${p.city}, ${p.state}, ${p.neighborhood}`,
    price: `RM ${p.price.toLocaleString()}`,
    imageUrl: p.images?.[0] || "placeholder.jpeg",
  }))
  

  const filteredProperties = displayProperties.filter((property) => {
    const priceValue = parseInt(property.price.replace(/\D/g, ""))
    const matchesLocation =
      selectedLocation === "" || property.address.toLowerCase().includes(selectedLocation)
    const matchesType =
      selectedType === "" || property.title.toLowerCase().includes(selectedType)
    const matchesPrice = priceValue <= maxPrice

    return matchesLocation && matchesType && matchesPrice
  })

  return (
    <Box px={6} py={10} maxW="7xl" mx="auto">
      <SearchBar />

      <Flex
        gap={4}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        flexWrap="wrap"
        mb={8}
      >
        <DropdownFilter
          label="Location"
          options={[
            { label: "All", value: "" },
            { label: "Cyberjaya", value: "cyberjaya" },
            { label: "Petaling Jaya", value: "petaling jaya" },
          ]}
          onChange={setSelectedLocation}
        />
        <DropdownFilter
          label="Property Type"
          options={[
            { label: "All", value: "" },
            { label: "Apartment", value: "apartment" },
            { label: "Bungalow", value: "bungalow" },
            { label: "Studio", value: "studio" },
            { label: "Villa", value: "villa" },
          ]}
          onChange={setSelectedType}
        />
        <PriceSlider value={maxPrice} onChange={setMaxPrice} />
      </Flex>

      <PropertyGrid properties={filteredProperties} />
    </Box>
  )
}
