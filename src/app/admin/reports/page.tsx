"use client"

import {
  Box,
  Heading,
  Text,
  IconButton,
  Spinner,
  HStack,
} from "@chakra-ui/react"
import {  useEffect, useState } from "react"
import DropdownFilter from "@/components/common/DropdownFilter"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { Report } from "@/types"
import { getAllReports, deleteReport, updateReportStatus } from "@/services/adminService"
import AdminTable from "@/components/common/AdminTable"
import AdminPagination from "@/components/common/AdminPagination"
import { toaster } from "@/components/ui/toaster"
import SearchBar from "@/components/common/SearchBar"
import ConfirmDialog from "@/components/common/ConfirmDialog" // make reusable version of logout dialog

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchReports = async () => {
    try {
      setLoading(true)
      const res = await getAllReports(page, pageSize, {
        status: statusFilter,
        reporterId: search,
      })
      setReports(res.reports)
      setTotalCount(res.totalCount)
    } catch (err) {
      console.error("Error loading reports:", err)
      toaster.error({ title: "Error", description: "Failed to load reports." })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [page, search, statusFilter])

  const handleDelete = async (id: string) => {
    try {
      await deleteReport(id)
      toaster.success({ title: "Deleted", description: "Report deleted." })
      fetchReports()
    } catch (err) {
      console.error(err)
      toaster.error({ title: "Error", description: "Failed to delete report." })
    }
  }

  const columns = ["Report ID", "Property", "Reason", "Status", "Actions"]

  const data = reports.map((r) => ({
    "Report ID": r.reportId,
    "Property":  r.propertyId,
    "Reason": r.reason,
    "Status": (
      <Text textTransform="capitalize" fontWeight="medium" color={r.status === "pending" || r.status === "dismissed" ? "red.500" : r.status === "handled" || r.status === "reviewed" ? "green.500" : "gray.300"}>
        {r.status}
      </Text>
    ),
    "Actions": (
      <HStack>
        <IconButton
          aria-label="Edit"
          size="sm"
          rounded="full"
          bgColor="white"
          onClick={() => {
            updateReportStatus({
              reportId: r.reportId,
              status: "handled", 
              note: "Marked as handled by admin", 
            })
              .then(() => fetchReports())
              .catch(() =>
                toaster.error({ title: "Failed", description: "Could not update status." })
              )
          }}
        >
          <FiEdit />
        </IconButton>

        <IconButton
          aria-label="Delete"
          size="sm"
          rounded="full"
          bgColor="white"
          onClick={() => setDeleteId(r.reportId)}
        >
          <FiTrash2 />
        </IconButton>
      </HStack>
    ),
  }))

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Reports</Heading>

      <SearchBar
        placeholder="Search by Reporter ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DropdownFilter 

        label="Status"
        value={statusFilter}
        onChange={setStatusFilter}
        options={[
          {label: 'All', value: ""},
          {label: "Pending", value: "pending"},
          { label: "Approved", value: "approved" },
          { label: "Reviewed", value: "reviewed" },
          { label: "Dismissed", value: "dismissed" },
        ]}
      
      />




      {loading ? (
        <Spinner />
      ) : (
        <>
          <AdminTable columns={columns} data={data} />
          <AdminPagination
            totalCount={totalCount}
            currentPage={page}
            pageSize={pageSize}
            onPageChange={(page) => setPage(page)}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) handleDelete(deleteId)
          setDeleteId(null)
        }}
        title="Confirm Deletion"
        message="Are you sure you want to delete this report?"
        confirmLabel="Delete"
      />
    </Box>
  )
}
