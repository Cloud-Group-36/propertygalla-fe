import { ReactNode } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <Flex minH="100vh">

        <Box flex="1" p={6} bg="white" _dark={{ bg: "gray.900" }}>
            {children ?? (
            <Box py={20} textAlign="center">
                <Text fontSize="lg" color="gray.500">
                This admin section is under construction.
                </Text>
            </Box>
            )}
        </Box>
        </Flex>
    )
}
