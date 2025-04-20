import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { gatePasses } from "@/lib/data"
import Link from "next/link"
import { ArrowRight, UserPlus, UserCheck, Users, Clock, Car } from "lucide-react"

export default function Home() {
  // Count gate passes by status
  const pendingCount = gatePasses.filter((pass) => pass.status === "pending").length
  const approvedCount = gatePasses.filter((pass) => pass.status === "approved").length
  const rejectedCount = gatePasses.filter((pass) => pass.status === "rejected").length

  // Count gate passes by role
  const studentCount = gatePasses.filter((pass) => pass.role === "student").length
  const staffCount = gatePasses.filter((pass) => pass.role === "staff").length
  const visitorCount = gatePasses.filter((pass) => pass.role === "visitor").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to the SAIT College Gate Pass Management System</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gate Passes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gatePasses.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time gate passes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting admin approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Passes</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully approved passes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Passes</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Rejected gate pass requests</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/student-entry">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Student Entry
                <UserPlus className="h-5 w-5 text-blue-500" />
              </CardTitle>
              <CardDescription>Create gate passes for students</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-2xl font-bold">{studentCount}</div>
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/staff-entry">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Staff Entry
                <UserCheck className="h-5 w-5 text-green-500" />
              </CardTitle>
              <CardDescription>Create gate passes for staff</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-2xl font-bold">{staffCount}</div>
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/visitor-entry">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Visitor Entry
                <Users className="h-5 w-5 text-purple-500" />
              </CardTitle>
              <CardDescription>Create gate passes for visitors</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-2xl font-bold">{visitorCount}</div>
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/vehicle-entry">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Vehicle Entry
                <Car className="h-5 w-5 text-orange-500" />
              </CardTitle>
              <CardDescription>Create gate passes for vehicles</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-2xl font-bold">0</div>
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4">
        <Link href="/gate-pass-history">
          <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Gate Pass History</CardTitle>
              <CardDescription>View all gate passes and their status</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <ArrowRight className="h-5 w-5" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
