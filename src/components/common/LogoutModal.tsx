"use client"

import { Box, Button, Text, Flex } from "@chakra-ui/react"

interface LogoutDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      bg="blackAlpha.600"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.700" }}
        p={6}
        rounded="md"
        shadow="lg"
        maxW="sm"
        textAlign="center"
      >
        <Text fontWeight="bold" mb={2}>Confirm Logout</Text>
        <Text mb={4}>Are you sure you want to log out?</Text>
        <Flex justify="center" gap={4}>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button colorScheme="red" onClick={onConfirm}>Logout</Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default LogoutDialog
