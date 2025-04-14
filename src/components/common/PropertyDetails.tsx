import { useState } from "react";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  HStack,
  Button,
  Textarea,
  Flex,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";

import BaseModal from "@/components/common/BaseModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PropertyDetailsProps {
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  status: "available" | "rented" | "hidden";
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const feedbacks = [
  {
    name: "Sarah Johnson",
    date: "2025-01-15",
    comment:
      "Great location and beautiful interior! The natural lighting is amazing.",
  },
  {
    name: "Mike Brown",
    date: "2025-01-10",
    comment:
      "The apartment is well-maintained and the amenities are excellent.",
  },
];

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title,
  description,
  location,
  price,
  images,
  status,
  email,
  phone,
  createdAt,
  updatedAt,
}) => {
  const [saved, setSaved] = useState(false);
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  const toggleSaved = () => setSaved((prev) => !prev);
  const bg = useColorModeValue("white", "gray.800");

  const statusColor = {
    available: "green",
    rented: "red",
    hidden: "gray",
  }[status];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box maxW="7xl" mx="auto" mt={8} px={{ base: 4, md: 8 }} py={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={10}
        align="start"
        justify="center"
      >
        {/* Image Slider */}
        <Box flex={1.5} maxW={{ base: "100%", md: "60%" }} overflow="hidden">
          <Slider {...sliderSettings}>
            {images.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Property image ${index + 1}`}
                borderRadius="xl"
                maxH="400px"
                objectFit="cover"
                w="full"
              />
            ))}
          </Slider>
        </Box>

        {/* Property Info */}
        <VStack
          flex={1}
          align="start"
          gap={4}
          w="full"
          maxW={{ base: "100%", md: "35%" }}
        >
          <Flex w="full" align="center" justify="space-between">
            <Heading size="md">{title}</Heading>
            <Button size="sm" bg={statusColor} color={"white"} cursor="default">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          </Flex>

          <Text fontSize="sm" color="pink.500">
            📍 {location}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })} /
            month
          </Text>
          <Text>{description}</Text>

          <HStack gap={3} pt={2}>
            <Avatar name="John Smith" />
            <Box>
              <Text fontWeight="bold">John Smith</Text>
              <Text fontSize="sm" color="gray.500">
                Property Owner
              </Text>
            </Box>
          </HStack>

          <Button
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            w="full"
            onClick={onOpen}
          >
            Contact Owner
          </Button>

          <Button
            variant={saved ? "solid" : "outline"}
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            w="full"
            onClick={toggleSaved}
          >
            {saved ? "Saved" : "Save to My List"}
          </Button>

          <HStack fontSize="sm" color="gray.500" gap={4}>
            <Text>Created: {new Date(createdAt).toLocaleDateString()}</Text>
            <Text>Updated: {new Date(updatedAt).toLocaleDateString()}</Text>
          </HStack>
        </VStack>
      </Flex>

      {/* Contact Owner Modal */}
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title="Contact Owner"
        showSubmit={false}
      >
        <Text>
          📧{" "}
          <Link
            href={`mailto:${email}`}
            color="blue.500"
            target="_blank"
            rel="noopener noreferrer"
          >
            {email}
          </Link>
        </Text>
        <Text>
          📞{" "}
          <Link href={`tel:${phone}`} color="blue.500">
            {phone}
          </Link>
        </Text>
      </BaseModal>

      {/* Feedback Section */}
      <Box mt={16}>
        <Heading size="md" mb={4}>
          Owner Feedback
        </Heading>
        <Textarea
          placeholder="Share your thoughts about this property..."
          mb={4}
        />
        <Button bg="blue.500" color="white" _hover={{ bg: "blue.600" }} mb={8}>
          Submit Feedback
        </Button>

        <VStack gap={6} align="stretch">
          {feedbacks.map((fb, i) => (
            <Box key={i} borderWidth="1px" borderRadius="lg" p={4} bg={bg}>
              <HStack gap={4} mb={2}>
                <Avatar name={fb.name} />
                <Box>
                  <Text fontWeight="bold">{fb.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    Posted on {new Date(fb.date).toLocaleDateString()}
                  </Text>
                </Box>
              </HStack>
              <Text>{fb.comment}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
