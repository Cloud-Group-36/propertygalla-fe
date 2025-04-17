"use client"

import {
  Box,
  Text,
  Menu,
  Button,
} from "@chakra-ui/react"
import { HiChevronDown } from "react-icons/hi"
import { useEffect, useState } from "react"

interface DropdownFilterProps {
    label: string
    options: { label: string; value: string }[]
    onChange?: (value: string) => void
    value?: string
    }

    export default function DropdownFilter({
    label,
    options,
    value,
    onChange,
    }: DropdownFilterProps) {
    const [selected, setSelected] = useState("")

    useEffect(() =>{
        if (value !== undefined){
            setSelected(value)
        }
    }, [value])

    const handleSelect = (value: string) => {
        setSelected(value)
        onChange?.(value)
    }

    return (
        <Box>
        <Text fontSize="sm" mb={1}>{label}</Text>
        <Menu.Root>
            {/* ✅ use asChild to prevent double button */}
            <Menu.Trigger asChild>
            <Button variant="outline" display="flex" alignItems="center" gap={2}>
                {options.find((opt) => opt.value === selected)?.label || `Select ${label}`}
                <HiChevronDown />
            </Button>
            </Menu.Trigger>

            <Menu.Positioner>
            <Menu.Content>
                {options.map((opt) => (
                <Menu.Item
                    key={opt.value}
                    value={opt.value}
                    onClick={() => handleSelect(opt.value)}
                >
                    {opt.label}
                </Menu.Item>
                ))}
            </Menu.Content>
            </Menu.Positioner>
        </Menu.Root>
        </Box>
    )
}
