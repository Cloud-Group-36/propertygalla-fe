"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Box, Heading } from "@chakra-ui/react";

export default function Dashboard() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/add-property"); // ✅ adjust the route if needed
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Dashboard</Heading>

      <Button colorScheme="blue" onClick={handleNavigate}>
        Add Property
      </Button>
    </Box>
  );
}
