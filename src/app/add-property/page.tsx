"use client";

import React, { useRef, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import Field from "@/components/common/field";

interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  price: number;
  image_urls: string[];
  status: "available" | "hidden";
}

const AddProperty: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    location: "",
    price: 0,
    image_urls: [],
    status: "available",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const owner_id = localStorage.getItem("userId");
      const payload = { ...formData, owner_id };

      await axios.post("https://your-api-url.com/api/properties", payload);

      toaster.create({
        type: "success",
        title: "Success!",
        description: "Property added successfully.",
        meta: { closable: true },
      });

      setFormData({
        title: "",
        description: "",
        location: "",
        price: 0,
        image_urls: [],
        status: "available",
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      toaster.create({
        type: "error",
        title: "Error",
        description: "Failed to add property.",
        meta: { closable: true },
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updated = formData.image_urls.filter((_, i) => i !== indexToRemove);
    setFormData((prev) => ({ ...prev, image_urls: updated }));

    if (updated.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading size="lg" mb={6} textAlign="center">
        Add New Property
      </Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          label="Title"
          placeholder="e.g. Cozy Studio Apartment"
          value={formData.title}
          onChange={handleChange}
          isRequired
        />
        <Field
          name="description"
          label="Description"
          type="textarea"
          placeholder="Describe the property..."
          value={formData.description}
          onChange={handleChange}
          isRequired
        />
        <Field
          name="location"
          label="Location"
          placeholder="e.g. Kuala Lumpur, Malaysia"
          value={formData.location}
          onChange={handleChange}
          isRequired
        />
        <Field
          name="price"
          label="Price (per month)"
          type="number"
          min={1}
          value={formData.price}
          onChange={handleChange}
          isRequired
        />
<Box mt={4}>
  <Heading size="sm" mb={2}>Upload Images</Heading>

  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    multiple
    ref={fileInputRef}
    style={{ display: "none" }}
    onChange={(e) => {
      const files = Array.from(e.target.files || []);
      const urls = files.map((file) => URL.createObjectURL(file as File));

      setFormData((prev) => ({
        ...prev,
        image_urls: [...prev.image_urls, ...urls],
      }));

      if (fileInputRef.current) fileInputRef.current.value = "";
    }}
  />

  {/* Styled upload button */}
  <Button
    colorScheme="blue"
    onClick={() => fileInputRef.current?.click()}
  >
    Upload Images
  </Button>
</Box>


        {/* Image Previews */}
        <Box mt={4} display="flex" flexWrap="wrap" gap={3}>
          {formData.image_urls.map((url, index) => (
            <Box
              key={index}
              position="relative"
              boxSize="100px"
              borderRadius="md"
              overflow="hidden"
              border="1px solid #CBD5E0"
            >
              <img
                src={url}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Button
                size="xs"
                colorScheme="red"
                position="absolute"
                top="2px"
                right="2px"
                borderRadius="full"
                onClick={() => removeImage(index)}
              >
                ✖
              </Button>
            </Box>
          ))}
        </Box>

        <Field
          name="status"
          label="Status"
          type="select"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "available", label: "Available" },
            { value: "hidden", label: "Hidden" },
          ]}
        />

        <Button colorScheme="blue" type="submit" width="full" mt={6}>
          Add Property
        </Button>
      </form>
    </Box>
  );
};

export default AddProperty;
