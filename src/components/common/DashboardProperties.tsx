"use client"

import { useState } from "react"
import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Button,
  Text,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import PropertyCard, { PropertyCardProps } from "@/components/common/PropertyCard"
import PropertyCardActions from "@/components/common/PropertyCardActions"
import Field from "@/components/common/Field"
import { toaster } from "@/components/ui/toaster"

export default function DashboardProperties() {
  const [properties, setProperties] = useState<PropertyCardProps[]>([
    {
      id: "1",
      title: "Modern Loft",
      address: "New York",
      price: "$850,000",
      imageUrl: "/placeholder.jpeg",
    },
    {
      id: "2",
      title: "Cozy Studio",
      address: "Los Angeles",
      price: "$520,000",
      imageUrl: "/placeholder.jpeg",
    },
  ])

  const [newProperty, setNewProperty] = useState<PropertyCardProps>({
    id: "",
    title: "",
    address: "",
    price: "",
    imageUrl: "/placeholder.jpeg",
  })

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement

    if (name === "imageUrl" && files && files.length > 0) {
      const urls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setPreviewImages(urls)
    } else {
      setNewProperty((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSetImages = () => {
    if (previewImages.length > 0) {
      setNewProperty((prev) => ({
        ...prev,
        imageUrl: previewImages[0], // use first image as primary
      }))
      toaster.success({ title: "Images set successfully!" })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editId) {
      setProperties((prev) =>
        prev.map((prop) =>
          prop.id === editId ? { ...newProperty, id: editId } : prop
        )
      )
      toaster.success({ title: "Property Updated!" })
    } else {
      const newId = (properties.length + 1).toString()
      setProperties((prev) => [...prev, { ...newProperty, id: newId }])
      toaster.success({ title: "New Property Added!" })
    }

    setNewProperty({
      id: "",
      title: "",
      address: "",
      price: "",
      imageUrl: "/placeholder.jpeg",
    })
    setPreviewImages([])
    setEditId(null)
    setShowForm(false)
  }

  const handleEdit = (property: PropertyCardProps) => {
    setNewProperty(property)
    setPreviewImages([property.imageUrl ?? ""])
    setEditId(property.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
    toaster.success({ title: "Property Deleted!" })
  }

  return (
    <Box>
      <Heading size="md" mb={4}>
        My Properties
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6} mb={10}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            onClick={() => handleEdit(property)}
            actions={
              <PropertyCardActions
                onEdit={() => handleEdit(property)}
                onDelete={() => handleDelete(property.id)}
              />
            }
          />
        ))}
      </SimpleGrid>

      <Button
        onClick={() => {
          setShowForm((prev) => !prev)
          if (!showForm) {
            setNewProperty({
              id: "",
              title: "",
              address: "",
              price: "",
              imageUrl: "/placeholder.jpeg",
            })
            setEditId(null)
            setPreviewImages([])
          }
        }}
        bg="var(--accent-sky)"
        color="white"
        _dark={{ bg: "white", color: "black" }}
        _hover={{ opacity: 0.9, transform: "scale(1.02)" }}
        transition="all 0.2s ease"
        rounded="full"
        px={6}
        py={2}
        mb={6}
      >
        {showForm ? "Cancel" : "Add New Property"}
      </Button>

      {showForm && (
        <Box
          maxW="xl"
          mx="auto"
          p={6}
          borderRadius="md"
          bg="white"
          _dark={{ bg: "gray.800" }}
          boxShadow="sm"
        >
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            {editId ? "Edit Property" : "Add New Property"}
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack gap={4} align="center">
              <Field
                name="title"
                label="Property Title"
                value={newProperty.title}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="description"
                label="Description"
                type="textarea"
                onChange={handleChange}
                isRequired
              />
              <Field
                name="address"
                label="Address"
                value={newProperty.address}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="price"
                label="Price"
                value={newProperty.price}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="imageUrl"
                label="Upload Images"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />

              {previewImages.length > 0 && (
                <VStack w="full" gap={3}>
                  <Wrap justify="center">
                    {previewImages.map((src, idx) => (
                      <WrapItem key={idx}>
                        <Image
                          src={src}
                          alt={`Preview ${idx + 1}`}
                          boxSize="120px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                  <Button
                    onClick={handleSetImages}
                    size="sm"
                    bg="var(--accent-sky)"
                    color="white"
                    _dark={{ bg: "white", color: "black" }}
                  >
                    Use These Images
                  </Button>
                </VStack>
              )}

              <Button
                type="submit"
                bg="var(--accent-sky)"
                color="white"
                _dark={{ bg: "white", color: "black" }}
              >
                {editId ? "Update Property" : "Add Property"}
              </Button>
            </VStack>
          </form>
        </Box>
      )}
    </Box>
  )
}
