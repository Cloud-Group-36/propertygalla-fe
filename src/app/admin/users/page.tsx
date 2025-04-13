// src/app/admin/users/page.tsx
import { Box, Heading, Avatar, IconButton, Text } from "@chakra-ui/react"
import AdminTable from "@/components/common/AdminTable"
import { FiEye, FiTrash2 } from "react-icons/fi"

export default function AdminUsersPage() {
  const columns = ["User ID", "Name", "Email", "Actions"]

  const data = [
    {
      "User ID": "#USR001",
      "Name": (
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar.Root><Avatar.Fallback>K</Avatar.Fallback></Avatar.Root>
          <Text fontWeight="medium">Khaled</Text>
        </Box>
      ),
      "Email": "khaled@example.com",
      "Actions": (
        <>
        <IconButton aria-label="View" size="sm" mr={2} rounded={"full"} bgColor={"white"}>
            <FiEye />
        </IconButton>
        <IconButton aria-label="Delete" size="sm" rounded={"full"} bgColor={"white"}>
            <FiTrash2 />
        </IconButton>


        </>
      ),
    },
    {
      "User ID": "#USR002",
      "Name": (
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar.Root><Avatar.Fallback>M</Avatar.Fallback></Avatar.Root>
          <Text fontWeight="medium">Muayad</Text>
        </Box>
      ),
      "Email": "muayad@example.com",
      "Actions": (
        <>
        <IconButton aria-label="View" size="sm" mr={2} rounded={"full"} bgColor={"white"}>
            <FiEye />
        </IconButton>
        <IconButton aria-label="Delete" size="sm" rounded={"full"} bgColor={"white"}>
            <FiTrash2 />
        </IconButton>
        </>
      ),
    },
  ]

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Users</Heading>
      <AdminTable columns={columns} data={data} />
    </Box>
  )
}
