import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavigationMenu } from "@/components/navigation-menu"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SAIT College Gate Pass Management System",
  description: "Manage entries and exits of students, staff, and visitors",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="bg-blue-700 text-white py-4">
              <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-700 font-bold text-lg">SC</span>
                  </div>
                  <h1 className="text-xl font-bold hidden md:block">SAIT College Gate Pass Management System</h1>
                  <h1 className="text-xl font-bold md:hidden">SAIT College</h1>
                </div>
              </div>
            </header>
            <NavigationMenu />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-gray-100 py-4 border-t">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p>© {new Date().getFullYear()} SAIT College Gate Pass Management System</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'