import { Box, Flex, Heading } from "@chakra-ui/react"
import AccountForm from "@/components/common/AccountForm"

export default function AdminAccountPage() {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box w="full" maxW="lg">
        <Heading size="lg" mb={6} textAlign="center">
          Manage My Account
        </Heading>
        <AccountForm />
      </Box>
    </Flex>
  )
}


