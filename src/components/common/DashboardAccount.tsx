"use client"

import { Box, Text, Button, VStack } from "@chakra-ui/react"
import Field from "@/components/common/Field"
import { useState } from "react"
import { toaster } from "@/components/ui/toaster"

export default function DashboardAccount() {
  const [formData, setFormData] = useState({
    name: "Khaled",
    email: "khaled@example.com",
    currentPassword: "",
    newPassword: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toaster.success({
      title: "Profile updated.",
      description: "Your account information has been saved.",
    })
  }

  return (
    <Box
      maxW="lg"
      mx="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      p={6}
      borderRadius="md"
      boxShadow="sm"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Edit Account Details
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Field
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            isRequired
          />
          <Field
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />
          <Field
            name="currentPassword"
            label="Current Password"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <Field
            name="newPassword"
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            mt={4}
            bg="var(--accent-sky)"
            color="white"
            _dark={{ bg: "white", color: "black" }}
          >
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
