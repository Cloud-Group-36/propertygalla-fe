import { ReactNode } from "react"
import { Box, Flex } from "@chakra-ui/react"
import AdminSidebar from "@/components/common/AdminSidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Flex minH="100vh">
          <AdminSidebar />
          <Box flex="1" p={6} bg="gray.50" _dark={{ bg: "gray.800" }}>
            {children}
          </Box>
        </Flex>
      </body>
    </html>
  )
}
