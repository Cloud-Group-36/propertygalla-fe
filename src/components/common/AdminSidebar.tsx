"use client"

import {
    Box,
    VStack,
    Text,
    Icon,
    Link,
    } from "@chakra-ui/react"
    import NextLink from "next/link"
    import {
    FiHome,
    FiUsers,
    FiFileText,
    FiLogOut,
    FiSettings,
    FiDatabase,
    } from "react-icons/fi"

    const navItems = [
    { label: "Dashboard", href: "/admin", icon: FiHome },
    { label: "Users", href: "/admin/users", icon: FiUsers },
    { label: "Properties", href: "/admin/properties", icon: FiDatabase },
    { label: "Reports", href: "/admin/reports", icon: FiFileText },
    { label: "Account", href: "/admin/account", icon: FiSettings },
    { label: "Logout", href: "/auth", icon: FiLogOut },
    ]

    export default function AdminSidebar() {
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
            <Link
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
            </Link>
            ))}
        </VStack>
        </Box>
    )
}
