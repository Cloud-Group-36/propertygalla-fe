"use client"

import {
  Box, Text, Image, Heading, VStack, HStack, Button, Textarea,
  Flex, useDisclosure, Link, Spinner, Badge, SimpleGrid,
} from "@chakra-ui/react"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { useEffect, useState } from "react"
import { Feedback, Property } from "@/types"
import { getFeedbackByOwner, giveFeedback } from "@/services/feedbackService"
import { saveProperty } from "@/services/savedPropertyService"
import BaseModal from "@/components/common/BaseModal"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useAuth } from "@/context/AuthContext"
import { isAxiosError } from "axios"

interface PropertyDetailsProps extends Property {
  phone: string
  email: string
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  title, description, price, images = [], status, email, phone,
  createdAt, updatedAt, ownerId, rooms, bathrooms, parking, area,
  state, city, neighborhood, propertyId,
}) => {
  const [saved, setSaved] = useState(false)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const disclosure = useDisclosure()
  const bg = useColorModeValue("white", "gray.800")

  const statusColor = {
    available: "green",
    rented: "red",
    hidden: "gray",
  }[status]

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }


  const fetchFeedbacks = async () => {
    try {
      const { data } = await getFeedbackByOwner(ownerId)
      setFeedbacks(data)
    } catch (err) {
      console.error("Failed to fetch feedbacks", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [ownerId])

  const handleSubmitFeedback = async () => {
    if (!user?.userId) {
      alert("You must be logged in to leave feedback.")
      return
    }

    try {
      setSubmitting(true)
      await giveFeedback({
        reviewerId: user.userId,
        ownerId,
        comment,
        rating: 5,
      })
      setComment("")
      await fetchFeedbacks()
    } catch (err: unknown) {
      const message = isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : "Failed to submit feedback"
      alert(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSaveProperty = async () => {
    if (!user?.userId || saved) return

    try {
      await saveProperty({ userId: user.userId, propertyId })
      setSaved(true)
    } catch (err) {
      const msg = isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : "Failed to save property"
      alert(msg)
    }
  }

  return (
    <Box maxW="7xl" mx="auto" mt={8} px={{ base: 4, md: 8 }} py={10}>
      <Flex direction={{ base: "column", md: "row" }} gap={10} align="start">
        <Box flex={1.5} maxW={{ base: "100%", md: "60%" }}>
          <Slider {...sliderSettings}>
            {images.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Property image ${index + 1}`}
                borderRadius="xl"
                maxH="450px"
                objectFit="cover"
                w="full"
              />
            ))}
          </Slider>
        </Box>

        <VStack flex={1} align="start" gap={4} w="full" maxW="35%">
          <Flex w="full" justify="space-between" align="center">
            <Heading size="lg">{title}</Heading>
            <Badge colorScheme={statusColor} fontSize="sm" px={3} py={1} borderRadius="md">
              {status.toUpperCase()}
            </Badge>
          </Flex>

          <Text color="pink.500" fontWeight="medium">📍 {neighborhood}, {city}, {state}</Text>
          <Text fontSize="2xl" fontWeight="bold">RM {price.toLocaleString()}</Text>
          <Text>{description}</Text>

          <Box h="1px" bg="gray.300" w="full" />

          <SimpleGrid columns={2} gap={4} fontSize="sm" w="full">
            <Text><strong>Rooms:</strong> {rooms}</Text>
            <Text><strong>Bathrooms:</strong> {bathrooms}</Text>
            <Text><strong>Parking:</strong> {parking}</Text>
            <Text><strong>Area:</strong> {area} sqft</Text>
          </SimpleGrid>

          <Box h="1px" bg="gray.300" w="full" />

          <Box>
            <Text fontWeight="semibold">Property Owner</Text>
            <Text fontSize="sm" color="gray.500">Contact info available below</Text>
          </Box>

          <Button bg="blue.500" color="white" _hover={{ bg: "blue.600" }} w="full" onClick={disclosure.onOpen}>
            Contact Owner
          </Button>

          <Button
            variant={saved ? "solid" : "outline"}
            bg={saved ? "blue.500" : undefined}
            color={saved ? "white" : "blue.500"}
            _hover={{ bg: "blue.600", color: "white" }}
            w="full"
            onClick={handleSaveProperty}
            disabled={!user}
          >
            {saved ? "Saved" : "Save to My List"}
          </Button>

          <HStack fontSize="xs" color="gray.500" gap={4}>
            <Text>Created: {new Date(createdAt).toLocaleDateString()}</Text>
            <Text>Updated: {new Date(updatedAt).toLocaleDateString()}</Text>
          </HStack>
        </VStack>
      </Flex>

      <BaseModal isOpen={disclosure.open} onClose={disclosure.onClose} title="Contact Owner" showSubmit={false}>
        <VStack align="start" gap={3}>
          <Text>📧 <Link href={`mailto:${email}`} color="blue.500">{email}</Link></Text>
          <Text>📞 <Link href={`tel:${phone}`} color="blue.500">{phone}</Link></Text>
        </VStack>
      </BaseModal>

      <Box mt={16}>
        <Heading size="md" mb={4}>Owner Feedback</Heading>
        <Textarea
          placeholder="Share your thoughts..."
          mb={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          loading={submitting}
          onClick={handleSubmitFeedback}
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          mb={8}
        >
          Submit Feedback
        </Button>

        {loading ? (
          <Spinner />
        ) : (
          <VStack gap={6} align="stretch">
            {feedbacks.map((fb) => (
              <Box key={fb.feedbackId} borderWidth="1px" borderRadius="lg" p={4} bg={bg}>
                <HStack gap={4} mb={2}>
                  <Box>
                    <Text fontWeight="bold">{fb.reviewerName}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Posted on {new Date(fb.submittedAt).toLocaleDateString()}
                    </Text>
                  </Box>
                </HStack>
                <Text>{fb.comment}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  )
}

export default PropertyDetails
