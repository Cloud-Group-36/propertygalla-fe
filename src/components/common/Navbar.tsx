"use client"

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Drawer,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  VStack,
  Spacer,
  HStack,
} from "@chakra-ui/react"
import {  useColorModeValue } from "../ui/color-mode"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { HiMenu } from "react-icons/hi"
import { FaHome, FaBuilding, FaUserCircle, FaHeart, FaDoorOpen, FaSignOutAlt } from "react-icons/fa"
import ConfirmDialog from "./ConfirmDialog"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const { user, logout } = useAuth()
    const pathname = usePathname()

    const bg = useColorModeValue("var(--accent-sky)", "#1a1a1a")
    const textColor = useColorModeValue("white", "white")

    const links = [
        { label: "Home", href: "/", icon: <FaHome />, protected: false },
        { label: "Properties", href: "/properties", icon: <FaBuilding />, protected: false },
        { label: "Dashboard", href: "/dashboard", icon: <FaUserCircle />, protected: true },
        { label: "My List", href: "/my-list", icon: <FaHeart />, protected: true },
    ]
    

    const isActive = (href: string) => pathname === href

    return (
        <Box bg={bg} px={6} py={4} zIndex={100} position="sticky" top={0}>
        <Flex align="center">
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
            PropertyGalla
            </Text>

            <Spacer />

            <HStack gap={4} display={{ base: "none", md: "flex" }}>
            {links
                .filter((link) => !link.protected || user)
                .map((link) => (
                    <Link key={link.href} href={link.href}>
                <Button
                    variant="ghost"
                    color={textColor}
                    _hover={{ bg: "whiteAlpha.300" }}
                    fontWeight={isActive(link.href) ? "bold" : "normal"}
                    borderBottom={isActive(link.href) ? "2px solid white" : "none"}
                >
                    <Flex align="center" gap={2}>
                    {link.icon}
                    {link.label}
                    </Flex>
                </Button>
                </Link>
            ))}

            {user ? (
                <Button
                variant="ghost"
                color={textColor}
                _hover={{ bg: "whiteAlpha.300" }}
                onClick={() => setShowLogoutDialog(true)}
                >
                <Flex align="center" gap={2}>
                    <FaSignOutAlt />
                    Logout
                </Flex>
                </Button>
            ) : (
                <Link href="/auth">
                <Button variant="ghost" color={textColor} _hover={{ bg: "whiteAlpha.300" }}>
                    <Flex align="center" gap={2}>
                    <FaDoorOpen />
                    Login / Sign Up
                    </Flex>
                </Button>
                </Link>
            )}

            </HStack>

            <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            variant="ghost"
            display={{ base: "inline-flex", md: "none" }}
            >
            <HiMenu />
            </IconButton>
        </Flex>

        {/* Mobile Drawer */}
        <Drawer.Root open={open} onOpenChange={({ open }) => setOpen(open)}>
            <DrawerContent>
            <DrawerCloseTrigger />
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Quick navigation</DrawerDescription>
            <DrawerBody>
                <VStack align="start" gap={4}>
                {links
                    .filter((link) => !link.protected || user)
                    .map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                    <Button
                        variant="ghost"
                        fontWeight={isActive(link.href) ? "bold" : "normal"}
                    >
                        <Flex align="center" gap={2}>
                        {link.icon}
                        {link.label}
                        </Flex>
                    </Button>
                    </Link>
                ))}

                {user ? (
                    <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => {
                        setShowLogoutDialog(true)
                        setOpen(false)
                    }}
                    >
                    <Flex align="center" gap={2}>
                        <FaSignOutAlt />
                        Logout
                    </Flex>
                    </Button>
                ) : (
                    <Link href="/auth">
                    <Button
                        variant="ghost"
                        onClick={() => setOpen(false)}
                    >
                        <Flex align="center" gap={2}>
                        <FaDoorOpen />
                        Login / Sign Up
                        </Flex>
                    </Button>
                    </Link>
                )}

                </VStack>
            </DrawerBody>
            </DrawerContent>
        </Drawer.Root>

        <ConfirmDialog
            isOpen={showLogoutDialog}
            onClose={() => setShowLogoutDialog(false)}
            onConfirm={() => {
            logout()
            setShowLogoutDialog(false)
            }}
        />
        </Box>
    )
}
