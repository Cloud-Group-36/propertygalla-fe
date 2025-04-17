"use client"

import {
    Box,
    HStack,
    Slider,
    } from "@chakra-ui/react"

    interface PriceSliderProps {
    value: number
    onChange: (value: number) => void
    min?: number
    max?: number
    }

    export default function PriceSlider({
    value,
    onChange,
    min = 0,
    max = 1000000,
    }: PriceSliderProps) {
    return (
        <Box minW="250px" w="40%">
        <Slider.Root
            min={min}
            max={max}
            step={50000}
            value={[value]}
            onValueChange={(details) => onChange(details.value[0])}
            size="sm"
            maxW="full"
        >
            <HStack justify="space-between" mb={2}>
            <Slider.Label>Price Range</Slider.Label>
            <Slider.ValueText>{`RM${value.toLocaleString()}`}</Slider.ValueText>
            </HStack>

            <Slider.Control>
            <Slider.Track bg="gray.200" height="6px" borderRadius="full">
                <Slider.Range bg="var(--accent-sky)" />
            </Slider.Track>
            <Slider.Thumbs rounded="full" />
            </Slider.Control>
        </Slider.Root>
        </Box>
    )
}
