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
    import { ColorModeButton, useColorModeValue } from "../ui/color-mode"
    import Link from "next/link"
    import { useState } from "react"
    import { HiMenu } from "react-icons/hi"
    import { FaHome, FaBuilding, FaUserCircle, FaHeart, FaDoorOpen } from "react-icons/fa"

    const links = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "Properties", href: "/properties", icon: <FaBuilding /> },
    { label: "Dashboard", href: "/dashboard", icon: <FaUserCircle /> },
    { label: "My List", href: "/my-list", icon: <FaHeart /> },
    { label: "Login/Sign up", href: "/auth", icon: <FaDoorOpen /> },
    ]

    export default function Navbar() {
    const [open, setOpen] = useState(false)
    const bg = useColorModeValue("var(--accent-sky)", "#1a1a1a")
    const textColor = useColorModeValue("white", "white")

    return (
        <Box bg={bg} px={6} py={4}>
        <Flex align="center">
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
            PropertyGalla
            </Text>

            <Spacer />

            <HStack gap={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
                <Link key={link.href} href={link.href}>
                <Button variant="ghost" color={textColor} _hover={{ bg: "whiteAlpha.300" }}>
                    <Flex align="center" gap="2">
                    {link.icon}
                    {link.label}
                    </Flex>
                </Button>
                </Link>
            ))}
            <ColorModeButton />
            </HStack>

            {/* Mobile Toggle Button */}
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
                {links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                    <Button variant="ghost">
                        <Flex align="center" gap={2}>
                        {link.icon}
                        {link.label}
                        </Flex>
                    </Button>
                    </Link>
                ))}
                <ColorModeButton />
                </VStack>
            </DrawerBody>
            </DrawerContent>
        </Drawer.Root>
        </Box>
    )
}
