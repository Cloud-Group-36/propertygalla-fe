"use client"

import { Box, Heading, Badge, Text, IconButton } from "@chakra-ui/react"
import AdminTable from "@/components/common/AdminTable"
import { FiEye, FiTrash2 } from "react-icons/fi"

export default function AdminPropertiesPage() {
  const columns = ["Property ID", "Title", "Owner", "Price", "Status", "Actions"]

  const data = [
    {
      "Property ID": "#PR001",
      "Title": <Text fontWeight="medium">Modern Villa with Pool</Text>,
      "Owner": "Khaled",
      "Price": "$850,000",
      "Status": <Badge colorScheme="green">Active</Badge>,
      "Actions": (
        <>
          <IconButton aria-label="View" size="sm" mr={2} rounded="full" bgColor="white">
            <FiEye />
          </IconButton>
          <IconButton aria-label="Delete" size="sm" rounded="full" bgColor="white">
            <FiTrash2 />
          </IconButton>
        </>
      ),
    },
    {
      "Property ID": "#PR002",
      "Title": <Text fontWeight="medium">Downtown Apartment</Text>,
      "Owner": "Sans",
      "Price": "$425,000",
      "Status": <Badge colorScheme="yellow">Pending</Badge>,
      "Actions": (
        <>
          <IconButton aria-label="View" size="sm" mr={2} rounded="full" bgColor="white">
            <FiEye />
          </IconButton>
          <IconButton aria-label="Delete" size="sm" rounded="full" bgColor="white">
            <FiTrash2 />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Properties</Heading>
      <AdminTable columns={columns} data={data} />
    </Box>
  )
}
