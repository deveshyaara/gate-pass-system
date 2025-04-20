"use client"

import { useState } from "react"
import { createGatePass } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrScanner } from "@/components/qr-scanner"
import type { UserRole } from "@/lib/data"

interface EntryFormProps {
  role: UserRole
  title: string
  description: string
  onSubmitSuccess?: (data: any) => void
}

export function EntryForm({ role, title, description, onSubmitSuccess }: EntryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scannedData, setScannedData] = useState<any>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    // Add the role to the form data
    formData.append("role", role)

    // If it's a vehicle entry and we have the callback, prepare the data for the ticket
    if (role === "vehicle" && onSubmitSuccess) {
      // Generate a random ID for the ticket
      const ticketId = "VT" + Math.random().toString(36).substring(2, 9).toUpperCase()

      // Prepare the data for the ticket
      const ticketData = {
        id: ticketId,
        name: formData.get("name") as string,
        vehicleNumber: formData.get("vehicleNumber") as string,
        vehicleType: formData.get("vehicleType") as string,
        driverName: formData.get("driverName") as string,
        entryTime: formData.get("entryTime") as string,
        exitTime: formData.get("exitTime") as string,
        purpose: formData.get("purpose") as string,
      }

      // Call the callback with the ticket data
      onSubmitSuccess(ticketData)
    } else {
      // For other roles, proceed with the normal flow
      await createGatePass(formData)
    }

    setIsSubmitting(false)
  }

  const handleQrCodeScanned = (data: string) => {
    try {
      const parsedData = JSON.parse(data)
      setScannedData(parsedData)
    } catch (error) {
      console.error("Invalid QR code data:", error)
      alert("Invalid QR code. Please try again.")
    }
  }

  const isStudentOrStaff = role === "student" || role === "staff"

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {isStudentOrStaff ? (
        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">Scan ID Card</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="scan">
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Scan the QR code on the ID card to record entry</p>
              </div>

              <QrScanner onScan={handleQrCodeScanned} />

              {scannedData && (
                <div className="mt-4 p-4 border rounded-md bg-green-50">
                  <h3 className="font-medium text-green-800 mb-2">ID Card Scanned Successfully</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Name:</div>
                    <div>{scannedData.name}</div>

                    {role === "student" && (
                      <>
                        <div className="font-medium">Roll Number:</div>
                        <div>{scannedData.rollNumber}</div>
                        <div className="font-medium">Course:</div>
                        <div>{scannedData.course}</div>
                      </>
                    )}

                    {role === "staff" && (
                      <>
                        <div className="font-medium">Employee ID:</div>
                        <div>{scannedData.employeeId}</div>
                        <div className="font-medium">Department:</div>
                        <div>{scannedData.department}</div>
                      </>
                    )}
                  </div>

                  <form action={handleSubmit} className="mt-4">
                    <input type="hidden" name="name" value={scannedData.name} />

                    {role === "student" && (
                      <>
                        <input type="hidden" name="rollNumber" value={scannedData.rollNumber} />
                        <input type="hidden" name="course" value={scannedData.course} />
                      </>
                    )}

                    {role === "staff" && (
                      <>
                        <input type="hidden" name="employeeId" value={scannedData.employeeId} />
                        <input type="hidden" name="department" value={scannedData.department} />
                      </>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="entryTime">Entry Time</Label>
                        <Input
                          id="entryTime"
                          name="entryTime"
                          type="datetime-local"
                          defaultValue={new Date().toISOString().slice(0, 16)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exitTime">Exit Time</Label>
                        <Input id="exitTime" name="exitTime" type="datetime-local" required />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Recording Entry..." : "Record Entry"}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="manual">
            <form action={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>

                {role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input id="rollNumber" name="rollNumber" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Course/Department</Label>
                      <Input id="course" name="course" required />
                    </div>
                  </>
                )}

                {role === "staff" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input id="employeeId" name="employeeId" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" required />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entryTime">Entry Time</Label>
                    <Input
                      id="entryTime"
                      name="entryTime"
                      type="datetime-local"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exitTime">Exit Time</Label>
                    <Input id="exitTime" name="exitTime" type="datetime-local" required />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Recording Entry..." : "Record Entry"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      ) : (
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>

            {role === "visitor" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input id="contactInfo" name="contactInfo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="personToVisit">Person to Visit</Label>
                  <Input id="personToVisit" name="personToVisit" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleInfo">Vehicle Information (Optional)</Label>
                  <Input id="vehicleInfo" name="vehicleInfo" />
                </div>
              </>
            )}

            {role === "vehicle" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input id="vehicleNumber" name="vehicleNumber" required placeholder="e.g., ABC-123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Input id="vehicleType" name="vehicleType" required placeholder="e.g., Car, Motorcycle, Bus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input id="driverName" name="driverName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverContact">Driver Contact</Label>
                  <Input id="driverContact" name="driverContact" required />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Textarea id="purpose" name="purpose" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entryTime">Entry Time</Label>
                <Input id="entryTime" name="entryTime" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exitTime">Exit Time</Label>
                <Input id="exitTime" name="exitTime" type="datetime-local" required />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Gate Pass Request"}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}
