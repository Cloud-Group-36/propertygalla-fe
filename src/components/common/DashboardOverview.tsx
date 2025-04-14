"use client"

import { Box, SimpleGrid, Text } from "@chakra-ui/react"
import DashboardStatCard from "./DashboardStatCard"
import { FaHome, FaEnvelope, FaEye } from "react-icons/fa"

export default function DashboardOverview() {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Welcome back, Slime!
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Heres whats happening with your properties today.
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
        <DashboardStatCard label="Active Listings" value={12} icon={<FaHome />} />
        <DashboardStatCard label="New Messages" value={5} icon={<FaEnvelope />} />
        <DashboardStatCard label="Total Views" value="1,234" icon={<FaEye />} />
      </SimpleGrid>
    </Box>
  )
}
