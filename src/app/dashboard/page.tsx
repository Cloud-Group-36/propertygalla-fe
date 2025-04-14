"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Box, Heading, Stack } from "@chakra-ui/react";

export default function Dashboard() {
  const router = useRouter();

  const goToAddProperty = () => {
    router.push("/add-property");
  };

  const goToProfile = () => {
    router.push("/profile");
  };
  const goToProperty = () => {
    router.push("/view-property");
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Dashboard
      </Heading>

      <Stack direction="row" gap={4}>
        <Button
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          onClick={goToAddProperty}
        >
          Add Property
        </Button>

        <Button
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          onClick={goToProfile}
        >
          Profile
        </Button>

        <Button
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          onClick={goToProperty}
        >
          View Property
        </Button>

      </Stack>
    </Box>
  );
}
