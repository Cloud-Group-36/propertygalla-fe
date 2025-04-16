"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import api from "@/services/axios";

const AddProperty = () => {
  const fileInputRef = useRef(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Rooms: 1,
    Bathrooms: 1,
    Parking: 0,
    Area: 100,
    State: "",
    City: "",
    Neighborhood: "",
    Price: 0,
  });

  useEffect(() => {
    if (user?.userId) {
      setFormData((prev) => ({
        ...prev,
        ownerId: user.userId,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["Price", "Area", "Rooms", "Bathrooms", "Parking"].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    toast({
      title: "Authentication Error",
      description: "Please log in again.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  const form = new FormData();
  form.append("Title", formData.Title);
  form.append("Description", formData.Description);
  form.append("Rooms", String(formData.Rooms));
  form.append("Bathrooms", String(formData.Bathrooms));
  form.append("Parking", String(formData.Parking));
  form.append("Area", String(formData.Area));
  form.append("State", formData.State);
  form.append("City", formData.City);
  form.append("Neighborhood", formData.Neighborhood);
  form.append("Price", String(formData.Price));
  form.append("OwnerId", userId); // ✅ required and case-sensitive

  const files = fileInputRef.current?.files;
  if (!files || files.length === 0) {
    toast({
      title: "Missing Images",
      description: "Please upload at least one image.",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
    return;
  }

  for (let i = 0; i < files.length; i++) {
    form.append("Images", files[i]); // ✅ exact match with backend
  }

  try {
    const res = await api.post("/properties/with-files", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast({
      title: "Property added!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset
    setFormData({
      Title: "",
      Description: "",
      Rooms: 1,
      Bathrooms: 1,
      Parking: 0,
      Area: 100,
      State: "",
      City: "",
      Neighborhood: "",
      Price: 0,
    });
    fileInputRef.current.value = "";
  } catch (err) {
    console.error("❌ Submit error", err);
    toast({
      title: "Submission Failed",
      description: err.response?.data?.message || "Check required fields",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};


  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Heading mb={6} size="lg" textAlign="center">
        Add Property
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {Object.keys(formData).map((key) => (
            <Input
              key={key}
              name={key}
              placeholder={key}
              type={["Rooms", "Bathrooms", "Parking", "Area", "Price"].includes(key) ? "number" : "text"}
              value={formData[key]}
              onChange={handleChange}
              isRequired
            />
          ))}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            style={{ marginTop: "8px" }}
          />
          <Button colorScheme="blue" type="submit" width="full">
            Submit Property
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProperty;