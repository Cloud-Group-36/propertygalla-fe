"use client"

import { Box, Flex, Input, Icon } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <Box w="100%" maxW="6xl" mx="auto" mb={6}>
      <Flex
        align="center"
        bg="white"
        _dark={{ bg: "gray.800" }}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        px={3}
        py={2}
        gap={3}
      >
        <Icon as={FaSearch} color="gray.400" boxSize={4} />
        <Input
          placeholder={placeholder || "Search..."}
          _placeholder={{ color: "gray.500" }}
          value={value}
          onChange={onChange}
        />
      </Flex>
    </Box>
  )
}
