"use client"

import {
    Box,
    Image,
    Text,
    Heading,
    VStack,
    HStack,
    } from "@chakra-ui/react"
    import { useRouter } from "next/navigation"
    import { FaMapMarkerAlt, FaTag, FaHome } from "react-icons/fa"

    export interface PropertyCardProps {
    id: string
    title: string
    location: string
    price: string
    imageUrl?: string
    }

    export default function PropertyCard({
    id,
    title,
    location,
    price,
    imageUrl = "/placeholder.png",
    }: PropertyCardProps) {
    const router = useRouter()

    return (
        <Box
        onClick={() => router.push(`/properties/${id}`)}
        cursor="pointer"
        borderRadius="lg"
        overflow="hidden"
        borderWidth="1px"
        borderColor="black"
        _dark={{ borderColor: "white", bg: "var(--card-dark)" }}
        bg="var(--card-grey)"
        color="var(--text-regular)"
        transition="all 0.3s ease"
        _hover={{
            boxShadow: "lg",
            transform: "scale(1.015)",
        }}
        >
        <Image
            src={imageUrl}
            alt={title}
            w="100%"
            h="200px"
            objectFit="cover"
        />
        <VStack align="start" px={4} py={3} gap={2}>
            <HStack align="center" gap={2}>
            <FaHome />
            <Heading size="md" color="var(--text-heading)">
                {title}
            </Heading>
            </HStack>

            <HStack align="center" gap={2}>
            <FaMapMarkerAlt size={14} />
            <Text fontSize="sm" color="gray.500">
                {location}
            </Text>
            </HStack>

            <HStack align="center" gap={2}>
            <FaTag size={14} />
            <Text fontWeight="bold" fontSize="md">
                {price}
            </Text>
            </HStack>
        </VStack>
        </Box>
    )
}
