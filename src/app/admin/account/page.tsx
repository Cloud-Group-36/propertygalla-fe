"use client"

import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Spinner,
  Separator,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { getUserById, changePassword } from "@/services/userService"
import { User } from "@/types"
import Field from "@/components/common/Field"
import { toaster } from "@/components/ui/toaster"

export default function AdminAccountPage() {
  const [admin, setAdmin] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const fetchAdminData = async () => {
    try {
      const stored = localStorage.getItem("user")
      const parsed = stored ? JSON.parse(stored) : null
      if (!parsed?.userId) return

      const data = await getUserById(parsed.userId)
      setAdmin(data)
    } catch (err) {
      console.error("Failed to fetch admin info:", err)
      toaster.error({ title: "Error", description: "Could not load admin data." })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  const handleChangePassword = async () => {
    if (!admin?.email) return

    try {
      await changePassword(admin.email, oldPassword, newPassword)
      toaster.success({ title: "Success", description: "Password updated!" })
      setOldPassword("")
      setNewPassword("")
    } catch (err) {
      console.error("Password change failed:", err)
      toaster.error({ title: "Error", description: "Failed to change password" })
    }
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>Account Settings</Heading>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Box mb={10}>
            <Heading size="md" mb={4}>Profile Info</Heading>
            <VStack gap={4} align="stretch">
              <Field
                label="Name"
                name="name"
                value={admin?.name || ""}
                onChange={() => {}}
                disabled
              />
              <Field
                label="Email"
                name="email"
                value={admin?.email || ""}
                onChange={() => {}}
                disabled
              />
              <Field
                label="Phone"
                name="phone"
                value={admin?.phone || ""}
                onChange={() => {}}
                disabled
              />
            </VStack>
          </Box>

          <Separator mb={10} />

          <Box>
            <Heading size="md" mb={4}>Change Password</Heading>
            <VStack gap={4} align="stretch">
              <Field
                label="Old Password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Field
                label="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <HStack justify="flex-end">
                <Button bg={"black"} onClick={handleChangePassword} color={"white"}>
                  Update Password
                </Button>
              </HStack>
            </VStack>
          </Box>
        </>
      )}
    </Box>
  )
}
