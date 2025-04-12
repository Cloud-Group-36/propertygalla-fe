"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Box } from "@chakra-ui/react"

export default function LayoutClientWrapper({
    children,
    }: {
    children: React.ReactNode
    }) {
    const pathname = usePathname()
    const isAdminRoute = pathname.startsWith("/admin")

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
        {!isAdminRoute && <Navbar />}
        <Box flex="1">{children}</Box>
        {!isAdminRoute && <Footer />}
        </Box>
    )
}
