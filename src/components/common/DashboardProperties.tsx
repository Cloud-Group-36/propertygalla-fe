"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Spinner,
  Button,
} from "@chakra-ui/react"
import PropertyCard from "@/components/common/PropertyCard"
import PropertyCardActions from "@/components/common/PropertyCardActions"
import PropertyForm from "@/components/common/PropertyForm"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { toaster } from "@/components/ui/toaster"
import {
  getPropertiesByOwnerId,
  deleteProperty,
} from "@/services/propertyService"
import { useAuth } from "@/context/AuthContext"
import { Property, UpdatePropertyDTO } from "@/types"
import AdminPagination from "@/components/common/AdminPagination"
import { IoIosAddCircleOutline } from "react-icons/io";


export default function DashboardProperties() {
  const { user } = useAuth()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState<UpdatePropertyDTO | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 6

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)

  const load = async () => {
    try {
      if (!user?.userId) return
      setLoading(true)
      const res = await getPropertiesByOwnerId(user.userId, currentPage, pageSize)
      setProperties(res.properties)
      setTotalCount(res.totalCount)
    } catch (err) {
      console.error(err)
      toaster.error({ title: "Failed to load properties" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [user, currentPage])

  const triggerDelete = (id: string) => {
    setPendingDeleteId(id)
    setConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!pendingDeleteId) return
    try {
      await deleteProperty(pendingDeleteId)
      toaster.success({ title: "Property deleted" })
      setConfirmOpen(false)
      setPendingDeleteId(null)
      load()
    } catch {
      toaster.error({ title: "Delete failed" })
    }
  }

  return (
    <Box>
      <Heading size="md" mb={4}>My Properties</Heading>

      <Button
        bg={"skyblue"}
        color="white"
        mb={4}
        onClick={() => {
          setShowForm(true)
          setEditData(null)
        }}
      >
        Add New Property
        <IoIosAddCircleOutline />
      </Button>

      {showForm && (
        <PropertyForm
          mode={editData ? "edit" : "add"}
          initialData={editData || undefined}
          onCancel={() => {
            setShowForm(false)
            setEditData(null)
          }}
          onSuccess={() => {
            setShowForm(false)
            load()
          }}
        />
      )}

      {loading ? (
        <Box textAlign="center" py={10}>
          <Spinner size="lg" />
        </Box>
      ) : properties.length === 0 ? (
        <Text color="gray.500">No properties found.</Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} mb={10}>
            {properties.map((p) => {
              const resolvedImageUrl =
                p.images && p.images.length > 0
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${p.images[0]}`
                  : "/placeholder.jpeg"

              return (
                <PropertyCard
                  key={p.propertyId}
                  id={p.propertyId}
                  title={p.title}
                  address={`${p.city}, ${p.state}, ${p.neighborhood}`}
                  price={`RM ${p.price.toLocaleString()}`}
                  imageUrl={resolvedImageUrl}
                  disableLink
                  actions={
                    <PropertyCardActions
                      onEdit={() => {
                        setEditData({
                          propertyId: p.propertyId,
                          title: p.title,
                          description: p.description,
                          rooms: p.rooms,
                          bathrooms: p.bathrooms,
                          parking: p.parking,
                          area: p.area,
                          state: p.state,
                          city: p.city,
                          neighborhood: p.neighborhood,
                          price: p.price,
                          ownerId: p.ownerId,
                          images: [],
                          removeImageUrls: p.images || [],
                        })
                        setShowForm(true)
                      }}
                      onDelete={() => triggerDelete(p.propertyId)}
                    />
                  }
                />
              )
            })}
          </SimpleGrid>

          <AdminPagination
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Property?"
        message="Are you sure you want to delete this property? This action cannot be undone."
        confirmLabel="Yes, Delete"
      />
    </Box>
  )
}
