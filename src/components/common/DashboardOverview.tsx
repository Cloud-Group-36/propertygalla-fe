"use client"

import { Box, SimpleGrid, Text, Spinner } from "@chakra-ui/react"
import DashboardStatCard from "./DashboardStatCard"
import { FaHome, FaEnvelope, FaEye } from "react-icons/fa"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { getPropertiesByOwnerId } from "@/services/propertyService"
import { toaster } from "@/components/ui/toaster"

export default function DashboardOverview() {
  const { user } = useAuth()
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user?.userId) return
        const res = await getPropertiesByOwnerId(user.userId, 1, 1) // only fetching to get totalCount
        setTotalCount(res.totalCount)
      } catch (error) {
        console.error(error)
        toaster.error({ title: "Failed to load stats" })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Welcome back, {user?.name?.split(" ")[0] || "User"}!
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Here’s what’s happening with your properties today.
      </Text>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
          <DashboardStatCard label="Active Listings" value={totalCount} icon={<FaHome />} />
          <DashboardStatCard label="New Messages" value={0} icon={<FaEnvelope />} />
          <DashboardStatCard label="Total Views" value="1,234" icon={<FaEye />} />
        </SimpleGrid>
      )}
    </Box>
  )
}
