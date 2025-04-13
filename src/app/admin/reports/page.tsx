"use client"

import { Box, Heading, Text, IconButton } from "@chakra-ui/react"
import AdminTable from "@/components/common/AdminTable"
import { FiEye } from "react-icons/fi"

export default function AdminReportsPage() {
  const columns = ["Report ID", "Property", "Reason", "Submitted By", "Actions"]

  const data = [
    {
      "Report ID": "#REP001",
      "Property": <Text fontWeight="medium">Sunset Villa</Text>,
      "Reason": "Inaccurate Listing Info",
      "Submitted By": "Muayad",
      "Actions": (
        <IconButton aria-label="View Report" size="sm" rounded="full" bgColor="white">
          <FiEye />
        </IconButton>
      ),
    },
    {
      "Report ID": "#REP002",
      "Property": <Text fontWeight="medium">Oceanview Condo</Text>,
      "Reason": "Spam Content",
      "Submitted By": "Qusai",
      "Actions": (
        <IconButton aria-label="View Report" size="sm" rounded="full" bgColor="white">
          <FiEye />
        </IconButton>
      ),
    },
  ]

  return (
    <Box>
      <Heading size="lg" mb={6}>Handle Reports</Heading>
      <AdminTable columns={columns} data={data} />
    </Box>
  )
}
