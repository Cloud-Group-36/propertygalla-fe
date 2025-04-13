"use client"

import { Box, Flex, Text, Avatar } from "@chakra-ui/react"

interface ReportItemProps {
  title: string
  author: string
  timeAgo: string
}

export default function RecentReportItem({ title, author, timeAgo }: ReportItemProps) {
  return (
    <Flex align="center" justify="space-between" py={3}>
      <Flex align="center" gap={4}>
        <Avatar.Root>
          <Avatar.Fallback>{author.charAt(0)}</Avatar.Fallback>
        </Avatar.Root>

        <Box>
          <Text fontWeight="medium">{title}</Text>
          <Text fontSize="sm" color="gray.500">
            Generated by {author}
          </Text>
        </Box>
      </Flex>
      <Text fontSize="sm" color="gray.400">{timeAgo}</Text>
    </Flex>
  )
}
