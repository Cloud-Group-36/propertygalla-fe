import React from "react";
import { Button, Box, useToken } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/modal";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  showSubmit?: boolean;
  isSubmitting?: boolean;
  size?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title = "Modal",
  children,
  onSubmit,
  submitLabel = "Submit",
  showSubmit = true,
  isSubmitting = false,
  size = "md",
}) => {
  // Optional: get Chakra color tokens if you want dynamic bg
  const [modalBg] = useToken("colors", ["white"]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
      <ModalOverlay />
      <ModalContent
        bg={modalBg}
        borderRadius="xl"
        px={6}
        py={4}
        maxW="600px"
        mx="auto"
        my="auto"
        maxH="90vh"
        boxShadow="2xl"
        borderTopRadius="10px"
        borderBottomRadius="10px"
      >
        <ModalHeader fontWeight="bold">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" flexDirection="column" gap={4}>
            {children}
          </Box>
        </ModalBody>
        <ModalFooter gap={3} p={4}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          {showSubmit && (
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              onClick={onSubmit}
              loading={isSubmitting}
            >
              {submitLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
