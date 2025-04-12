// src/app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { Provider } from "@/components/ui/provider"
import LayoutClientWrapper from "@/components/common/LayoutClientWrapper"

export const metadata: Metadata = {
  title: "PropertyGalla",
  description: "Cloud-based property management system",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <LayoutClientWrapper>
            {children}
          </LayoutClientWrapper>
        </Provider>
      </body>
    </html>
  )
}
