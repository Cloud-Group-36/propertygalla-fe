// src/components/auth/AuthForm.tsx
"use client"

import {
  Box,
  Button,
  Input,
  VStack,
  Field,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")

  const isSignup = mode === "signup"

  return (
    <Box
      maxW="md"
      mx="auto"
      p={6}
      bg="white"
      _dark={{ bg: "gray.700" }}
      borderRadius="md"
      boxShadow="md"
      mt={10}
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center"  _dark={{ bg: "gray.700" }}>
        {isSignup ? "Create Account" : "Sign In"}
      </Text>

      <VStack gap={4} align="stretch">
        {isSignup && (
          <Field.Root required>
            <Field.Label>
              Full Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="John Doe" />
          </Field.Root>
        )}

        <Field.Root required>
          <Field.Label>
            Email
            <Field.RequiredIndicator />
          </Field.Label>
          <Input type="email" placeholder="me@example.com" />
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Password
            <Field.RequiredIndicator />
          </Field.Label>
          <Input type="password" placeholder="********" />
        </Field.Root>

        {isSignup && (
          <Field.Root required>
            <Field.Label>
              Confirm Password
              <Field.RequiredIndicator />
            </Field.Label>
            <Input type="password" placeholder="********" />
          </Field.Root>
        )}

        <Button
            mt={4}
            bg="var(--accent-sky)"
            color="white"
            _hover={{ bg: "#6abfe0" }}
            _dark={{ bg: "white", color: "black" }}
            >
            {isSignup ? "Sign Up" : "Sign In"}
        </Button>

        <Button
          variant="ghost"
          mt={2}
          onClick={() => setMode(isSignup ? "signin" : "signup")}
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </Button>
      </VStack>
    </Box>
  )
}
