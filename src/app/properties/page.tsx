// src/app/properties/page.tsx
"use client"

import { useState } from "react"
import { Box, Flex } from "@chakra-ui/react"
import SearchBar from "@/components/common/SearchBar"
import DropdownFilter from "@/components/common/DropdownFilter"
import PriceSlider from "@/components/common/PriceSlider"
import PropertyGrid from "@/components/common/PropertyGrid"
import { PropertyCardProps } from "@/components/common/PropertyCard"

const sampleProperties: PropertyCardProps[] = [
  {
    id: "1",
    title: "Modern Loft",
    location: "New York",
    price: "$850,000",
    imageUrl: "/placeholder.jpeg",
  },
  {
    id: "2",
    title: "Beachside Villa",
    location: "California",
    price: "$1,200,000",
    imageUrl: "/placeholder.jpeg",
  },
  {
    id: "3",
    title: "Downtown Studio",
    location: "Texas",
    price: "$480,000",
    imageUrl: "/placeholder.jpeg",
  },
]

export default function PropertiesPage() {
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [maxPrice, setMaxPrice] = useState(1000000)

  // Filter logic (basic client-side filtering)
  const filteredProperties = sampleProperties.filter((property) => {
    const priceValue = parseInt(property.price.replace(/\D/g, ""))
    const matchesLocation = selectedLocation === "" || property.location.toLowerCase() === selectedLocation
    const matchesType = selectedType === "" || property.title.toLowerCase().includes(selectedType)
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
            { label: "New York", value: "new york" },
            { label: "California", value: "california" },
            { label: "Texas", value: "texas" },
          ]}
          onChange={setSelectedLocation}
        />
        <DropdownFilter
          label="Property Type"
          options={[
            { label: "All", value: "" },
            { label: "Apartment", value: "apartment" },
            { label: "House", value: "house" },
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
