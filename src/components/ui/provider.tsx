// src/components/ui/provider.tsx
"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import { GlobalStyles } from "./global-styles"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <GlobalStyles />
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
