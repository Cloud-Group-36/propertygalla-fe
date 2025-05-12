"use client"

import {
  Box,
  Button,
  Input,
  VStack,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { loginUser, registerUser } from "@/services/userService"
import { LoginDto, RegisterDto } from "@/types/index"
import { toaster } from "@/components/ui/toaster"
import { useAuth } from "@/context/AuthContext"
import { isAxiosError } from "axios"
import router from "next/router"

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  const { login } = useAuth()
  const isSignup = mode === "signup"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          toaster.create({
            type: "error",
            title: "Passwords do not match",
          })
          return
        }
  
        const payload: RegisterDto = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: "user", // default role
        }
  
        await registerUser(payload)
  
        toaster.create({
          type: "success",
          title: "Registration successful",
          description: "You can now sign in",
        })
  
        setMode("signin")
      } else {
        const payload: LoginDto = {
          email: formData.email,
          password: formData.password,
        }
  
        const response = await loginUser(payload)
        login(response.user, response.token)
  
        await router.push("/dashboard")
  

      }
    } catch (err: unknown) {
      const message =
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Something went wrong"

         console.error(message);
  
      // toaster.create({
      //   type: "error",
      //   title: "Authentication failed",
      //   description: message,
      // })
    }
  }
  

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
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        {isSignup ? "Create Account" : "Sign In"}
      </Text>

      <VStack gap={4} align="stretch">
        {isSignup && (
          <>
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </>
        )}

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isSignup && (
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <Button
          mt={4}
          bg="var(--accent-sky)"
          color="white"
          onClick={handleSubmit}
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
