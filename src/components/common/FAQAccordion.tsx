"use client"

import {
  Accordion,
  Box,
  Heading,
  VStack,
} from "@chakra-ui/react"

const faqs = [
    {
        question: "How do I list my property?",
        answer:
        "To list your property, register an account and use the 'Add Property' feature on your dashboard. Fill in all the necessary details and upload images.",
    },
    {
        question: "What are the service charges?",
        answer:
        "Our platform charges a small commission only when your property is successfully rented or sold. There are no upfront listing fees.",
    },
    {
        question: "Is my data secure?",
        answer:
        "Absolutely. We follow industry best practices and use encryption to ensure your data and transactions are secure.",
    },
]

export default function FAQAccordion() {
    return (
        <Box px={6} py={12}>
        <VStack gap={6} align="center">
            <Heading size="2xl" >Frequently Asked Questions</Heading>
            <Accordion.Root typeof="single" collapsible width="100%">
            {faqs.map((faq, index) => (
                <Accordion.Item key={index} value={faq.question}>
                <Accordion.ItemTrigger>
                    <Box flex="1" textAlign="center" fontWeight="medium" py={3}>
                    {faq.question}
                    </Box>
                    <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent color="gray.600" py={2}>
                    {faq.answer}
                </Accordion.ItemContent>
                </Accordion.Item>
            ))}
            </Accordion.Root>
        </VStack>
        </Box>
    )
}
