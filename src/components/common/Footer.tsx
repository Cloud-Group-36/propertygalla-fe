"use client"

import {
    Box,
    Flex,
    Text,
    HStack,
    Link as ChakraLink,
    } from "@chakra-ui/react"
    import { useColorModeValue } from "../ui/color-mode"
    import NextLink from "next/link"
    import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa"

    export default function Footer() {
    const bg = useColorModeValue("var(--card-grey)", "#121212")
    const textColor = useColorModeValue("black", "white")
    const iconColor = useColorModeValue("black", "white")

    return (
        <Box bg={bg} px={6} py={4} mt={16}>
        <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={4}
        >
            <Text fontWeight="bold" color={textColor}>
            © {new Date().getFullYear()} PropertyGalla
            </Text>

            <HStack gap={4}>
            <ChakraLink as={NextLink} href="/" color={textColor} fontSize="sm">
                Home
            </ChakraLink>
            <ChakraLink as={NextLink} href="/properties" color={textColor} fontSize="sm">
                Properties
            </ChakraLink>
            <ChakraLink as={NextLink} href="/dashboard" color={textColor} fontSize="sm">
                Dashboard
            </ChakraLink>
            </HStack>

            <HStack gap={3}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: iconColor }}>
                <FaGithub size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: iconColor }}>
                <FaTwitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: iconColor }}>
                <FaLinkedin size={18} />
            </a>
            </HStack>
        </Flex>
        </Box>
    )
}
