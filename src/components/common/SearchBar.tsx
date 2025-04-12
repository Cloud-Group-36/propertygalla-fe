"use client"

import {
    Box,
    Flex,
    Input,
    Icon,
} from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

export default function SearchBar() {
    return (
        <Box w="100%" maxW="6xl" mx="auto" mb={6}>
        <Flex
            align="center"
            bg="white"
            _dark={{ bg: "var(--card-dark)" }}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
            px={3}
            py={2}
            gap={3}
        >
            <Icon as={FaSearch} color="gray.400" boxSize={4} />
            <Input
            placeholder="Search by city, location, or property name"
            _placeholder={{ color: "gray.500" }}
            />
        </Flex>
        </Box>
    )
}
