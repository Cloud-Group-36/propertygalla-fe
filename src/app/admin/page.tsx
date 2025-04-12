import { Box, Grid, Heading, VStack } from "@chakra-ui/react"
import DashboardStatCard from "@/components/common/DashboardStatCard"
import RecentReportItem from "@/components/common/RecentReportItem"
import { FiUsers, FiHome, FiFileText } from "react-icons/fi"

export default function AdminDashboardPage() {
  return (
    <Box>
      <Heading size="lg" mb={6}>Dashboard Overview</Heading>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} mb={10}>
        <DashboardStatCard label="Total Users" value="2,453" icon={<FiUsers />} />
        <DashboardStatCard label="Total Properties" value="1,789" icon={<FiHome />} />
        <DashboardStatCard label="Total Reports" value="892" icon={<FiFileText />} />
      </Grid>

      <Box bg="white" _dark={{ bg: "gray.800" }} p={5} borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Recent Reports</Heading>
        <VStack align="stretch" gap={4}>
          <RecentReportItem title="Monthly Revenue Report" author="Khaled" timeAgo="2 hours ago" />
          <RecentReportItem title="Property Maintenance Summary" author="Muayad" timeAgo="5 hours ago" />
          <RecentReportItem title="User Activity Analysis" author="Qusai" timeAgo="1 day ago" />
        </VStack>
      </Box>
    </Box>
  )
}
