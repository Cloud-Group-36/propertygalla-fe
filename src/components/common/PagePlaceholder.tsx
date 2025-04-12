"use client"

import { Box, Heading, Text } from "@chakra-ui/react"

export default function PagePlaceholder({ title }: { title: string }) {
  return (
    <Box py={20} textAlign="center">
      <Heading size="lg" mb={4}>
        {title}
      </Heading>
      <Text color="gray.500">
        This page is under construction. Content will be added soon.
      </Text>
    </Box>
  )
}
