"use client"

import {
  Box,
  Heading,
  IconButton,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import AdminTable from "@/components/common/AdminTable"
import SearchBar from "@/components/common/SearchBar"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import AdminPagination from "@/components/common/AdminPagination"
import { AdminProperty } from "@/types"
import { deleteProperty, getAllProperties } from "@/services/adminService"
import { toaster } from "@/components/ui/toaster"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)
  const [totalCount, setTotalCount] = useState(0)

  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const res = await getAllProperties(currentPage, pageSize, { title: search })
      setProperties(res.properties)
      setTotalCount(res.totalCount)
    } catch (err) {
      console.error("Error fetching properties:", err)
      toaster.error({
        title: "Error",
        description: "Failed to load properties",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [search, currentPage])

  const confirmDelete = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setShowDeleteDialog(true)
  }

  const handleDelete = async () => {
    if (!selectedPropertyId) return

    try {
      await deleteProperty(selectedPropertyId)
      toaster.success({
        title: "Deleted",
        description: `Property ${selectedPropertyId} has been deleted.`,
      })
      fetchProperties()
    } catch (err) {
      console.error(err)
      toaster.error({
        title: "Error",
        description: "Could not delete property",
      })
    } finally {
      setShowDeleteDialog(false)
      setSelectedPropertyId(null)
    }
  }

  const columns = ["Property ID", "Title", "Owner", "City", "Price", "Status", "Actions"]

  const data = properties.map((property) => ({
    "Property ID": property.propertyId,
    "Title": property.title,
    "Owner": property.ownerId,
    "City": property.city,
    "Price": `RM ${property.price.toLocaleString()}`,
    "Status": (
      <Text fontSize="sm" color={
        property.status === "available" ? "green.500"
        : property.status === "rented" ? "red.500"
        : "gray.500"
      }>
        {property.status}
      </Text>
    ),
    "Actions": (
      <HStack>
        <IconButton
          aria-label="Delete"
          size="sm"
          rounded="full"
          bgColor="white"
          onClick={() => confirmDelete(property.propertyId)}
        >
          <FiTrash2 />
        </IconButton>
      </HStack>
    ),
  }))

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Properties</Heading>

      <SearchBar
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <AdminTable columns={columns} data={data} />
          <AdminPagination
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Property"
        message={`Are you sure you want to delete property ${selectedPropertyId}?`}
        confirmLabel="Delete"
      />
    </Box>
  )
}
