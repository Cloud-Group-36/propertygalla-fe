"use client"

import { Box, Grid, Heading, VStack, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import DashboardStatCard from "@/components/common/DashboardStatCard"
import RecentReportItem from "@/components/common/RecentReportItem"
import { getAllReports, getAllUsers, getAllProperties } from "@/services/adminService"
import { FiUsers, FiHome, FiFileText } from "react-icons/fi"
import { RecentReport } from "@/types"

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalProperties, setTotalProperties] = useState(0)
  const [totalReports, setTotalReports] = useState(0)
  const [recentReports, setRecentReports] = useState<RecentReport[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers()
        const properties = await getAllProperties()
        const res = await getAllReports(1, 100)

        setTotalUsers(users.totalCount)
        setTotalProperties(properties.totalCount)
        setTotalReports(res.totalCount)

        setRecentReports(
          res.reports.slice(0, 3).map((r) => ({
            title: r.reason,
            author: r.reporterId,
            timeAgo: new Date(r.createdAt).toLocaleDateString(),
          }))
        )
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Spinner size="lg" />

  return (
    <Box>
      <Heading size="lg" mb={6}>Dashboard Overview</Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={10}>
        <DashboardStatCard label="Total Users" value={totalUsers} icon={<FiUsers />} />
        <DashboardStatCard label="Total Properties" value={totalProperties} icon={<FiHome />} />
        <DashboardStatCard label="Total Reports" value={totalReports} icon={<FiFileText />} />
      </Grid>

      <Box bg="white" _dark={{ bg: "gray.800" }} p={5} borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Recent Reports</Heading>
        <VStack align="stretch" gap={4}>
          {recentReports.map((report, i) => (
            <RecentReportItem
              key={i}
              title={report.title}
              author={report.author}
              timeAgo={report.timeAgo}
            />
          ))}
        </VStack>
      </Box>
    </Box>
  )
}
