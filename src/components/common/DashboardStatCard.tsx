"use client"

import { Box, Flex, Text, Icon } from "@chakra-ui/react"
import { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
}

export default function DashboardStatCard({ label, value, icon }: StatCardProps) {
  return (
    <Box
      flex="1"
      p={5}
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="md"
      boxShadow="sm"
      minW="220px"
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="sm" color="gray.500">{label}</Text>
        <Icon as={() => icon} boxSize={6} />
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">{value}</Text>
    </Box>
  )
}
