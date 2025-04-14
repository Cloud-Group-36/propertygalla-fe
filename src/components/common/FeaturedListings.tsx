"use client"

import { Box, Heading, VStack } from "@chakra-ui/react"
import PropertyGrid from "./PropertyGrid"
import { PropertyCardProps } from "./PropertyCard"

const featuredData: PropertyCardProps[] = [
    {
        id: "1",
        title: "Modern Downtown Apartment",
        address: "New York, NY",
        price: "$850,000",
        imageUrl: "/placeholder.jpeg",
    },
    {
        id: "2",
        title: "Luxury Villa",
        address: "Miami, FL",
        price: "$1,200,000",
        imageUrl: "/placeholder.jpeg",
    },
    {
        id: "3",
        title: "Cozy Studio",
        address: "San Francisco, CA",
        price: "$495,000",
        imageUrl: "/placeholder.jpeg",
    },
    ]

    export default function FeaturedListings() {
    return (
        <Box px={6} py={12}>
        <VStack gap={6} align="center" maxW="7xl" mx="auto" textAlign="center">
            <Heading size="2xl" fontWeight="bold">
            Featured Properties
            </Heading>
            <PropertyGrid properties={featuredData} />
        </VStack>
        </Box>
    )
}
