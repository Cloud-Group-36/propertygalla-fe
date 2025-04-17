"use client"

import {
  Pagination,
  ButtonGroup,
  IconButton,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationPageText,
} from "@chakra-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface AdminPaginationProps {
  totalCount: number
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function AdminPagination({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
}: AdminPaginationProps) {
  return (
    <Pagination.Root
      count={totalCount}
      pageSize={pageSize}
      page={currentPage}
      onPageChange={({ page }) => onPageChange(page)}
      >
      <ButtonGroup gap="4" size="sm" variant="ghost" justifyContent="center" mt={8}>
        <PaginationPrevTrigger asChild>
          <IconButton aria-label="Previous page">
            <HiChevronLeft />
          </IconButton>
        </PaginationPrevTrigger>

        <PaginationPageText />

        <PaginationNextTrigger asChild>
          <IconButton aria-label="Next page">
            <HiChevronRight />
          </IconButton>
        </PaginationNextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  )
}
