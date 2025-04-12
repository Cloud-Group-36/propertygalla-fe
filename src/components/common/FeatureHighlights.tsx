"use client"

import { Box, VStack, HStack, Text, Icon, Heading } from "@chakra-ui/react"
import { FaShieldAlt, FaUserCheck, FaLock } from "react-icons/fa"

const features = [
    {
        icon: FaShieldAlt,
        title: "Verified Listings",
        description: "All our properties are verified by our expert team for authenticity.",
    },
    {
        icon: FaUserCheck,
        title: "Trusted Owners",
        description: "Connect with verified property owners and trusted agencies.",
    },
    {
        icon: FaLock,
        title: "Secure Transactions",
        description: "Your payments and personal data are always protected.",
    },
    ]

    export default function FeatureHighlights() {
    return (
        <Box px={6} py={12}>
        <HStack
            justify="space-between"
            align="stretch"
            flexWrap="wrap"
            gap={8}
        >
            {features.map((feature) => (
            <VStack
                key={feature.title}
                align="center"
                textAlign="center"
                maxW="sm"
                flex={1}
                gap={3}
            >
                <Icon as={feature.icon} boxSize={8} />
                <Heading size="md">{feature.title}</Heading>
                <Text fontSize="sm" color="gray.600">
                {feature.description}
                </Text>
            </VStack>
            ))}
        </HStack>
        </Box>
    )
}
