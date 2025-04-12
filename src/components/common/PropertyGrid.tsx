"use client"

import { SimpleGrid } from "@chakra-ui/react"
import PropertyCard, { PropertyCardProps } from "./PropertyCard"

export default function PropertyGrid({ properties }: { properties: PropertyCardProps[] }) {
    return (
        <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        gap={6}
        mt={6}
        >
        {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
        ))}
        </SimpleGrid>
    )
}
