"use client"

import {
  Accordion,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react"
import { useColorModeValue } from "../ui/color-mode"


const faqs = [
  {
    question: "Can I rent and list properties as a user?",
    answer:
      "Yes! PropertyGalla allows users to both search for properties and list their own properties using the dashboard after logging in.",
  },
  {
    question: "How do I upload images for my listing?",
    answer:
      "When adding or editing a property, you can upload multiple images. These will be displayed in your property’s detail page carousel.",
  },
  {
    question: "Do I need to verify my identity to list a property?",
    answer:
      "No formal ID verification is needed. However, accounts are monitored and suspicious activity may be flagged to ensure listing authenticity.",
  },
  {
    question: "Is there a fee to use PropertyGalla?",
    answer:
      "No upfront cost! You can use the platform freely to browse and list properties. We may introduce premium features in the future.",
  },
  {
    question: "How secure is my information?",
    answer:
      "We use encrypted APIs and follow best security practices to protect your account and property data from unauthorized access.",
  },
]

export default function FAQAccordion() {
  const textColor = useColorModeValue("black", "white")
  const contentBg = useColorModeValue("white", "gray.800")

  return (
    <Box px={6} py={12}>
      <VStack gap={6} align="center" maxW="4xl" mx="auto">
        <Heading size="2xl" textAlign="center">
          Frequently Asked Questions
        </Heading>

        <Accordion.Root typeof="single" collapsible width="100%">
          {faqs.map((faq, index) => (
            <Accordion.Item key={index} value={faq.question}>
              <Accordion.ItemTrigger
                style={{
                  background: "var(--accent-sky)",
                  padding: "1rem",
                  fontWeight: "600",
                  borderRadius: "8px",
                  color: textColor,
                  transition: "all 0.2s",
                }}
              >
                <Box flex="1" textAlign="left">
                  {faq.question}
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>

              <Accordion.ItemContent
                style={{
                  padding: "1rem",
                  background: contentBg,
                  borderRadius: "0 0 8px 8px",
                  color: textColor,
                  border: "1px solid var(--chakra-colors-gray-200)",
                  borderTop: "none",
                }}
              >
                {faq.answer}
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </VStack>
    </Box>
  )
}
