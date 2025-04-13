"use client"

import { Box, Table } from "@chakra-ui/react"

interface AdminTableProps {
  columns: string[]
  data: Record<string, React.ReactNode>[]
}

export default function AdminTable({ columns, data }: AdminTableProps) {
    return (
        <Box overflowX="auto" borderRadius="md" bg="white" _dark={{ bg: "gray.800" }} boxShadow="sm">
        <Table.Root>
            <Table.Header>
            <Table.Row>
                {columns.map((col, index) => (
                <Table.ColumnHeader key={index} fontSize="sm" fontWeight="medium">
                    {col}
                </Table.ColumnHeader>
                ))}
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {data.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                {columns.map((col, colIndex) => (
                    <Table.Cell key={colIndex}>
                    {row[col]}
                    </Table.Cell>
                ))}
                </Table.Row>
            ))}
            </Table.Body>
        </Table.Root>
        </Box>
    )
}
