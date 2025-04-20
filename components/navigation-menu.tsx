"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, UserPlus, Users, UserCheck, History, ShieldCheck, Menu, X, Car, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Student Entry", href: "/student-entry", icon: UserPlus },
  { name: "Staff Entry", href: "/staff-entry", icon: UserCheck },
  { name: "Visitor Entry", href: "/visitor-entry", icon: Users },
  { name: "Vehicle Entry", href: "/vehicle-entry", icon: Car },
  { name: "Gate Pass History", href: "/gate-pass-history", icon: History },
  { name: "ID Card Generator", href: "/id-card-generator", icon: CreditCard },
  { name: "Admin Panel", href: "/admin", icon: ShieldCheck },
]

export function NavigationMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="md:hidden flex justify-end py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        <div className={cn("md:flex md:items-center md:space-x-4 py-1", isOpen ? "block" : "hidden")}>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
