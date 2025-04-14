"use client"

import { Box, Heading, Tabs } from "@chakra-ui/react"
import DashboardOverview from "@/components/common/DashboardOverview"
import DashboardAccount from "@/components/common/DashboardAccount"
import DashboardProperties from "@/components/common/DashboardProperties"

export default function UserDashboardPage() {
  return (
    <Box px={6} py={10} maxW="7xl" mx="auto">
      <Heading size="lg" mb={6}>My Dashboard</Heading>

      <Tabs.Root defaultValue="dashboard">
        <Tabs.List>
          <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="properties">My Properties</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="dashboard">
          <DashboardOverview />
        </Tabs.Content>
        <Tabs.Content value="account">
          <DashboardAccount />
        </Tabs.Content>
        <Tabs.Content value="properties">
          <DashboardProperties />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}
