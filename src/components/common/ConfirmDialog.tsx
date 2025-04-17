// components/common/ConfirmDialog.tsx
"use client"

import { Box, Button, Text, Flex } from "@chakra-ui/react"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmLabel?: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
}) => {
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
      color={"black"}
    >
      <Box
        bg="white"
        _dark={{ bg: "gray.700" }}
        p={6}
        rounded="md"
        shadow="lg"
        maxW="sm"
        textAlign="center"
        color={"black"}
      >
        <Text fontWeight="bold" mb={2}>{title}</Text>
        <Text mb={4}>{message}</Text>
        <Flex justify="center" gap={4}>
          <Button bg={"black"} color={"red"} onClick={onClose} variant="outline">Cancel</Button>
          <Button bg={"black"} color={"white"} onClick={onConfirm}>{confirmLabel}</Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default ConfirmDialog
