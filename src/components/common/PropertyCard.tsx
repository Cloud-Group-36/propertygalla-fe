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
  address: string
  price: string
  imageUrl?: string
  actions?: React.ReactNode
  onClick?: () => void
  disableLink?: boolean
}

export default function PropertyCard({
  id,
  title,
  address,
  price,
  imageUrl = "/placeholder.png",
  actions,
  onClick,
  disableLink = false,
}: PropertyCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (disableLink) return; 
  
    if (onClick) {
      onClick();
    } else {
      router.push(`/properties/${id}`); 
    }
  };

  return (
    <Box
      onClick={handleClick}
      cursor={disableLink ? "default" : "pointer"}
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
        transform: disableLink ? "none" : "scale(1.015)",
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        w="100%"
        h="200px"
        objectFit="cover"
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = "/placeholder.jpeg"
        }}
      />

      <VStack align="start" px={4} py={3} gap={2}>
        <HStack gap={2}>
          <FaHome />
          <Heading size="md" color="var(--text-heading)">
            {title}
          </Heading>
        </HStack>

        <HStack gap={2}>
          <FaMapMarkerAlt size={14} />
          <Text fontSize="sm" color="gray.500">
            {address}
          </Text>
        </HStack>

        <HStack gap={2}>
          <FaTag size={14} />
          <Text fontWeight="bold" fontSize="md">
            {price}
          </Text>
        </HStack>

        {actions && <Box pt={2}>{actions}</Box>}
      </VStack>
    </Box>
  )
}
