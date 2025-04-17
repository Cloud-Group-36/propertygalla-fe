"use client"

import { Box, Flex, Text } from "@chakra-ui/react"
import { useColorModeValue } from "../ui/color-mode"

export default function Footer() {
  const bg = useColorModeValue("gray.100", "#121212")
  const textColor = useColorModeValue("gray.700", "gray.400")

  return (
    <Box bg={bg} py={6} mt={16} textAlign="center">
      <Flex justify="center">
        <Text fontSize="sm" color={textColor}>
          © {new Date().getFullYear()} Team 36. All rights reserved.
        </Text>
      </Flex>
    </Box>
  )
}
