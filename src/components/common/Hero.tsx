"use client"

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa"
import { useColorModeValue } from "../ui/color-mode"

export default function Hero() {
  const router = useRouter()
  const headingColor = useColorModeValue("gray.800", "white")
  const subTextColor = useColorModeValue("gray.600", "gray.300")

  return (
    <Box
      bg="var(--accent-sky)"
      color={headingColor}
      minH={{ base: "60vh", md: "75vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={12}
      textAlign="center"
    >
      <VStack gap={6}>
        <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="extrabold">
          Find Your Next Property with Ease
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="600px" color={subTextColor}>
          Discover, compare, and manage listings — all in one place.
          Whether you are looking for a dream home or posting your own, we’ve got you covered.
        </Text>
        <Button
          size="lg"
          bg="white"
          color="black"
          _hover={{ bg: "gray" }}
          onClick={() => router.push("/properties")}
        >
          Explore Properties
          {<FaSearch />}

        </Button>
      </VStack>
    </Box>
  )
}
