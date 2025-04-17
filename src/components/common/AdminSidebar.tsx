"use client"

import {
  Box,
  VStack,
  Text,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiLogOut,
  FiSettings,
  FiDatabase,
} from "react-icons/fi"
import { useState } from "react"
import ConfirmDialog from "@/components/common/ConfirmDialog"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: FiHome },
  { label: "Users", href: "/admin/users", icon: FiUsers },
  { label: "Properties", href: "/admin/properties", icon: FiDatabase },
  { label: "Reports", href: "/admin/reports", icon: FiFileText },
  { label: "Account", href: "/admin/account", icon: FiSettings },
]

export default function AdminSidebar() {
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setShowLogoutConfirm(false)
    router.push("/auth")
    
  }

  return (
    <Box
      w="250px"
      minH="100vh"
      bg="gray.900"
      color="white"
      py={8}
      px={4}
      boxShadow="lg"
    >
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        Admin Panel
      </Text>

      <VStack gap={4} align="start">
        {navItems.map((item) => (
          <ChakraLink
            as={NextLink}
            href={item.href}
            key={item.label}
            display="flex"
            alignItems="center"
            gap={3}
            px={3}
            py={2}
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
            w="full"
          >
            <Icon as={item.icon} boxSize={5} />
            <Text>{item.label}</Text>
          </ChakraLink>
        ))}

        <ChakraLink
          as="button"
          onClick={() => setShowLogoutConfirm(true)}
          display="flex"
          alignItems="center"
          gap={3}
          px={3}
          py={2}
          borderRadius="md"
          _hover={{ bg: "gray.700" }}
          w="full"
        >
          <Icon as={FiLogOut} boxSize={5} />
          <Text>Logout</Text>
        </ChakraLink>
      </VStack>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmLabel="Logout"
      />
    </Box>
  )
}
