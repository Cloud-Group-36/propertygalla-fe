"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Text,
  Button,
  VStack,
  Spinner,
} from "@chakra-ui/react"
import Field from "@/components/common/Field"
import { toaster } from "@/components/ui/toaster"
import { useAuth } from "@/context/AuthContext"
import { getUserById, changePassword } from "@/services/userService"
import { User } from "@/types"
import { isAxiosError } from "axios"

export default function DashboardAccount() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<User | null>(null)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          const data = await getUserById(user.userId)
          setFormData(data)
        }
      } catch (err) {
        console.error(err)
        toaster.error({ title: "Error", description: "Failed to fetch user info" })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [user])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (!formData) return
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!formData) {
      toaster.error({ title: "Missing user data." })
      return
    }
  
    try {
      if (newPassword && oldPassword) {
        await changePassword(formData.email, oldPassword, newPassword)
        toaster.success({
          title: "Password changed successfully",
        })
        setOldPassword("")
        setNewPassword("")
      }
  
      toaster.success({
        title: "Profile updated.",
        description: "Your account information has been saved.",
      })
    } catch (err: unknown) {
      const message =
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Password change failed."
  
      toaster.error({
        title: "Error",
        description: message,
      })
    }
  }
  

  if (loading || !formData) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="lg" />
      </Box>
    )
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
            disabled={true}
          />
          <Field
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            isRequired
            disabled={true}

          />
          <Field
            name="phone"
            label="Phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            disabled={true}

          />

          <Text fontWeight="semibold" mt={6}>Change Password</Text>

          <Field
            name="oldPassword"
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <Field
            name="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
