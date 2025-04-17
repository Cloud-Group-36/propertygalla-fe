import type { Metadata } from "next"
import "./globals.css"
import { Provider } from "@/components/ui/provider"
import LayoutClientWrapper from "@/components/common/LayoutClientWrapper"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "PropertyGalla",
  description: "Cloud-based property management system",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
        <AuthProvider>
            <LayoutClientWrapper>
              {children}
              <Toaster />
            </LayoutClientWrapper>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
