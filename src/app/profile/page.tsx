"use client";

import React, { useState } from "react";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Field from "@/components/common/Field";
import BaseModal from "@/components/common/BaseModal";
import { toaster } from "@/components/ui/toaster";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isOpen, setIsOpen] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) errs.name = "Name is required";

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }

    if (formData.phone && !/^\+?[0-9]{7,15}$/.test(formData.phone)) {
      errs.phone = "Invalid phone number";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    if (validate()) {
      toaster.create({
        title: "Profile saved",
        type: "success",
        meta: { closable: true },
      });
      // TODO: Send to backend
    }
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toaster.create({
        type: "error",
        title: "All password fields are required",
        meta: { closable: true },
      });
      return;
    }

    if (newPassword.length < 6) {
      toaster.create({
        type: "error",
        title: "New password must be at least 6 characters",
        meta: { closable: true },
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toaster.create({
        type: "error",
        title: "Passwords do not match",
        meta: { closable: true },
      });
      return;
    }

    toaster.create({
      title: "Password updated successfully",
      type: "success",
      meta: { closable: true },
    });

    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsOpen(false);
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="md"
      borderRadius="xl"
      bg="gray.50"
    >
      <Heading mb={6}>My Profile</Heading>
      <VStack gap={4} align="stretch">
        <Box>
          <Field
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            isRequired
          />
          {errors.name && <Text color="red.500" fontSize="sm">{errors.name}</Text>}
        </Box>

        <Box>
          <Field
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            isRequired
          />
          {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
        </Box>

        <Box>
          <Field
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <Text color="red.500" fontSize="sm">{errors.phone}</Text>}
        </Box>

        <Button
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          onClick={handleSubmit}
        >
          Save
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          Change Password
        </Button>
      </VStack>

      <BaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Change Password"
        onSubmit={handlePasswordChange}
        submitLabel="Update"
      >
        <Field
          name="currentPassword"
          label="Current Password"
          type="password"
          value={passwordForm.currentPassword}
          onChange={handlePasswordInputChange}
          isRequired
        />
        <Field
          name="newPassword"
          label="New Password"
          type="password"
          value={passwordForm.newPassword}
          onChange={handlePasswordInputChange}
          isRequired
        />
        <Field
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={passwordForm.confirmPassword}
          onChange={handlePasswordInputChange}
          isRequired
        />
      </BaseModal>
    </Box>
  );
};

export default ProfilePage;
