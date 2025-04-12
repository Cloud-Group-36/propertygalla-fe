"use client"

import {
    Box,
    VStack,
    Field,
    Input,
    Button,
    Text,
    } from "@chakra-ui/react"
    import { toaster } from "@/components/ui/toaster"
    import { useState } from "react"

    export default function AccountForm() {
    const [formData, setFormData] = useState({
        name: "Admin User",
        email: "admin@propertygalla.com",
        currentPassword: "",
        newPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // TODO: Connect this to API
        toaster.success({
        title: "Account updated.",
        description: "Your profile changes have been saved.",
        })
    }

    return (
        <Box
        maxW="lg"
        p={6}
        borderRadius="md"
        bg="white"
        _dark={{ bg: "gray.800" }}
        boxShadow="md"
        >
        <Text fontSize="xl" fontWeight="bold" mb={6}>
            Edit Account Details
        </Text>

        <form onSubmit={handleSubmit}>
            <VStack gap={4} align="stretch">
            <Field.Root required>
                <Field.Label>
                Full Name
                <Field.RequiredIndicator />
                </Field.Label>
                <Input name="name" value={formData.name} onChange={handleChange} />
            </Field.Root>

            <Field.Root required>
                <Field.Label>
                Email Address
                <Field.RequiredIndicator />
                </Field.Label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} />
            </Field.Root>

            <Field.Root>
                <Field.Label>Current Password</Field.Label>
                <Input name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} />
            </Field.Root>

            <Field.Root>
                <Field.Label>New Password</Field.Label>
                <Input name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
            </Field.Root>

            <Button type="submit" mt={4} bg="black" color="white" _dark={{ bg: "white", color: "black" }}>
                Save Changes
            </Button>
            </VStack>
        </form>
        </Box>
    )
}
