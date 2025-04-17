"use client"

import { Box, VStack, HStack, Text, Icon, Heading } from "@chakra-ui/react"
import { FaShieldAlt, FaUserCheck, FaLock } from "react-icons/fa"
import { useColorModeValue } from "../ui/color-mode"

const features = [
  {
    icon: FaShieldAlt,
    title: "List & Rent with Confidence",
    description:
      "Whether you're renting or listing, all properties undergo thorough verification for peace of mind.",
  },
  {
    icon: FaUserCheck,
    title: "Verified & Trusted Users",
    description:
      "Connect with a community of verified property owners and renters who value transparency.",
  },
  {
    icon: FaLock,
    title: "Security First",
    description:
      "Your personal data and transactions are protected by industry-standard security protocols.",
  },
]

export default function FeatureHighlights() {
  const textColor = useColorModeValue("gray.600", "gray.300")

  return (
    <Box px={6} py={16} bg={useColorModeValue("gray.50", "gray.900")}>
      <HStack
        justify="space-between"
        align="stretch"
        flexWrap="wrap"
        gap={10}
        maxW="7xl"
        mx="auto"
      >
        {features.map((feature) => (
          <VStack
            key={feature.title}
            align="center"
            textAlign="center"
            maxW="sm"
            flex={1}
            gap={4}
          >
            <Icon as={feature.icon} boxSize={10} color="var(--accent-sky)" />
            <Heading size="md">{feature.title}</Heading>
            <Text fontSize="sm" color={textColor}>
              {feature.description}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  )
}
