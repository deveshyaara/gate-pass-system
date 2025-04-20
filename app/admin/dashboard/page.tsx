import { GatePassTable } from "@/components/gate-pass-table"
import { gatePasses } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, XCircle } from "lucide-react"

export default function AdminDashboardPage() {
  // Count gate passes by status
  const pendingCount = gatePasses.filter((pass) => pass.status === "pending").length
  const approvedCount = gatePasses.filter((pass) => pass.status === "approved").length
  const rejectedCount = gatePasses.filter((pass) => pass.status === "rejected").length

  // Get pending gate passes
  const pendingPasses = gatePasses.filter((pass) => pass.status === "pending")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage gate passes and user roles</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Passes</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Passes</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Pending Approvals</h2>
        <GatePassTable passes={pendingPasses} isAdmin={true} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">All Gate Passes</h2>
        <GatePassTable passes={gatePasses} isAdmin={true} />
      </div>
    </div>
  )
}
