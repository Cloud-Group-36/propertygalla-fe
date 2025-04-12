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

    export default function Hero() {
    const router = useRouter()

    return (
        <Box
        bg="var(--card-dark)"
        minH={{ base: "60vh", md: "75vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={6}
        py={10}
        textAlign="center"
        >
        <VStack gap={6}>
            <Heading fontSize={{ base: "3xl", md: "5xl" }}>
            Find Your Next Property with Ease
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} maxW="600px">
            Discover, compare, and manage listings all in one place.
            Your dream home or ideal investment is just a click away.
            </Text>
            <Button
            colorScheme="whiteAlpha"
            variant="outline"
            size="lg"
            onClick={() => router.push("/properties")}
            >
            <FaSearch style={{ marginRight: "8px" }} />
            Explore Properties
            </Button>
        </VStack>
        </Box>
    )
}
