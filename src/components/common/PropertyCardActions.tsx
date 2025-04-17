"use client";

import { HStack, IconButton } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface PropertyCardActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PropertyCardActions({ onEdit, onDelete }: PropertyCardActionsProps) {
  return (
    <HStack gap={2}>
      <IconButton
        aria-label="Edit Property"
        size="sm"
        rounded="full"
        bgColor="white"
        _dark={{ bgColor: "gray.700" }}
        onClick={onEdit}
        >
          <FiEdit />

        </IconButton>

      <IconButton
        aria-label="Delete Property"
        size="sm"
        rounded="full"
        bgColor="white"
        _dark={{ bgColor: "gray.700" }}
        onClick={onDelete}
      > 
        <FiTrash2 color="red"/>
      
      </IconButton>
    </HStack>
  );
}
