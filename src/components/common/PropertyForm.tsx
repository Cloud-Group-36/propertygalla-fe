"use client";

import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import Field from "@/components/common/Field";
import { CreatePropertyDTO, UpdatePropertyDTO } from "@/types";
import { toaster } from "@/components/ui/toaster";
import { createProperty, updateProperty } from "@/services/propertyService";
import { useAuth } from "@/context/AuthContext";
import { CiSaveUp2 } from "react-icons/ci";

interface PropertyFormProps {
  mode: "add" | "edit";
  initialData?: UpdatePropertyDTO;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PropertyForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: PropertyFormProps) {
  const { user } = useAuth();

  const [formData, setFormData] = useState<CreatePropertyDTO>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    rooms: initialData?.rooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    parking: initialData?.parking || 1,
    area: initialData?.area || 100,
    state: initialData?.state || "",
    city: initialData?.city || "",
    neighborhood: initialData?.neighborhood || "",
    price: initialData?.price || 0,
    ownerId: user?.userId || "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "rooms", "bathrooms", "parking", "area"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
  };

  const handleSubmit = async () => {
    try {

      const form = new FormData();
      form.append("Title", formData.title);
      form.append("Description", formData.description);
      form.append("Rooms", String(formData.rooms));
      form.append("Bathrooms", String(formData.bathrooms));
      form.append("Parking", String(formData.parking));
      form.append("Area", String(formData.area));
      form.append("State", formData.state);
      form.append("City", formData.city);
      form.append("Neighborhood", formData.neighborhood);
      form.append("Price", String(formData.price));
      form.append("OwnerId", formData.ownerId);

      if (mode === "edit" && initialData?.propertyId) {
        form.append("PropertyId", initialData.propertyId);
        if (initialData.removeImageUrls) {
          initialData.removeImageUrls.forEach((url) => {
            form.append("RemoveImageUrls", url);
          });
        }
      }

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((img) => {
          form.append("Images", img);
        });
      }

      if (mode === "edit" && initialData?.propertyId) {
        await updateProperty(initialData.propertyId, form);
      } else {
        await createProperty(form);
      }

      toaster.success({
        title: `Property ${mode === "add" ? "added" : "updated"} successfully`,
      });
      onSuccess();
    } catch (err) {
      console.error("Submission error:", err);
      toaster.error({
        title: "Submission failed",
        description: "Please check your inputs",
      });
    }
  };

  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      p={5}
      borderRadius="md"
      shadow="md"
      mb={6}
    >
      <Text fontWeight="bold" mb={4}>
        {mode === "add" ? "Add New Property" : "Edit Property"}
      </Text>

      <VStack gap={4} align="stretch">
        <Field
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <Field
          name="description"
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
        />
        <Field
          name="state"
          label="State"
          value={formData.state}
          onChange={handleChange}
        />
        <Field
          name="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
        />
        <Field
          name="neighborhood"
          label="Neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
        />
        <Field
          name="location"
          label="Location"
          value={`${formData.city}, ${formData.state}, ${formData.neighborhood}`}
          onChange={() => {}}
          disabled
        />
        <Field
          name="rooms"
          label="Rooms"
          type="number"
          value={formData.rooms}
          onChange={handleChange}
        />
        <Field
          name="bathrooms"
          label="Bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={handleChange}
        />
        <Field
          name="parking"
          label="Parking Spaces"
          type="number"
          value={formData.parking}
          onChange={handleChange}
        />
        <Field
          name="area"
          label="Area (sq ft)"
          type="number"
          value={formData.area}
          onChange={handleChange}
        />
        <Field
          name="price"
          label="Price (RM)"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
        <Field
          name="images"
          label="Upload Images"
          type="file"
          onChange={(e) =>
            handleImageChange(e as React.ChangeEvent<HTMLInputElement>)
          }
          accept="image/*"
          multiple
        />

        <Button colorScheme="blue" onClick={handleSubmit} bg={"skyblue"} color={"white"}>
          {mode === "add" ? "Add Property" : "Save Changes"}
          <CiSaveUp2 />
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
