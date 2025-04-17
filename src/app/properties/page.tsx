"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import SearchBar from "@/components/common/SearchBar"
import DropdownFilter from "@/components/common/DropdownFilter"
import PriceSlider from "@/components/common/PriceSlider"
import PropertyGrid from "@/components/common/PropertyGrid"
import AdminPagination from "@/components/common/AdminPagination"
import { getAllProperties } from "@/services/propertyService"
import { PropertyCardProps } from "@/components/common/PropertyCard"
export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyCardProps[]>([])
  const [search, setSearch] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [maxPrice, setMaxPrice] = useState(1000000)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize =5
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const res = await getAllProperties({ page: currentPage, pageSize })
        setTotalCount(res.totalCount)
        const transformed = res.properties.map((p) => ({
          id: p.propertyId,
          title: p.title,
          address: `${p.city}, ${p.state}, ${p.neighborhood}`,
          price: `RM ${p.price.toLocaleString()}`,
          imageUrl:
          p.images && p.images.length > 0
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${p.images[0]}`
            : "/placeholder.jpeg",        }))
        setProperties(transformed)
      } catch (err) {
        console.error("Failed to fetch properties:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [currentPage, pageSize])

  const filteredProperties = properties.filter((property) => {
    const priceValue = parseInt(property.price.replace(/\D/g, ""))
    const matchesSearch =
      search === "" || property.title.toLowerCase().includes(search.toLowerCase())

    const matchesLocation =
      selectedLocation === "" || property.address.toLowerCase().includes(selectedLocation)

    const matchesType =
      selectedType === "" || property.title.toLowerCase().includes(selectedType)

    const matchesPrice = priceValue <= maxPrice

    return matchesSearch && matchesLocation && matchesType && matchesPrice
  })

  return (
    <Box px={6} py={10} maxW="7xl" mx="auto">
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by location or property name"
      />

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

      {loading ? (
        <Spinner size="xl" mx="auto" />
      ) : (
        <>
          <PropertyGrid properties={filteredProperties} />
          <AdminPagination
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Box>
  )
}
