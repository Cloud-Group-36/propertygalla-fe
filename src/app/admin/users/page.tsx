"use client"

import {
  Box,
  Heading,
  Avatar,
  Text,
  IconButton,
  Spinner,
  HStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import AdminTable from "@/components/common/AdminTable"
import SearchBar from "@/components/common/SearchBar"
import AdminPagination from "@/components/common/AdminPagination"
import { AdminUser } from "@/types"
import { deleteUser, getAllUsers } from "@/services/adminService"
import { toaster } from "@/components/ui/toaster"
import ConfirmDialog from "@/components/common/ConfirmDialog"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const [totalUsers, setTotalUsers] = useState(0)

  // 🔐 delete modal state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await getAllUsers(page, pageSize, search)
      setUsers(res.users)
      setTotalUsers(res.totalCount)
    } catch (err) {
      console.error("Error fetching users:", err)
      toaster.error({
        title: "Error",
        description: "Failed to load users",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [search, page])

  const confirmDelete = (userId: string) => {
    setSelectedUserId(userId)
    setShowConfirm(true)
  }

  const handleDelete = async () => {
    if (!selectedUserId) return

    try {
      await deleteUser(selectedUserId)
      toaster.success({
        title: "User Deleted",
        description: `User ${selectedUserId} has been removed.`,
      })
      setShowConfirm(false)
      setSelectedUserId(null)
      fetchUsers()
    } catch (err) {
      console.error(err)
      toaster.error({
        title: "Error",
        description: "Could not delete user",
      })
    }
  }

  const columns = ["User ID", "Name", "Email", "Actions"]

  const data = users.map((user) => ({
    "User ID": user.userId,
    "Name": (
      <HStack>
        <Avatar.Root>
          <Avatar.Fallback>{user.name?.charAt(0) ?? "U"}</Avatar.Fallback>
        </Avatar.Root>
        <Text fontWeight="medium">{user.name}</Text>
      </HStack>
    ),
    "Email": user.email,
    "Actions": (
      <>

        <IconButton
          aria-label="Delete"
          size="sm"
          rounded="full"
          bgColor="white"
          onClick={() => confirmDelete(user.userId)}
        >
          <FiTrash2 />
        </IconButton>
      </>
    ),
  }))

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Users</Heading>

      <SearchBar
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <AdminTable columns={columns} data={data} />
          <AdminPagination
            totalCount={totalUsers}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={(page) => setPage(page)}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete user ${selectedUserId}?`}
        confirmLabel="Delete"
      />
    </Box>
  )
}
