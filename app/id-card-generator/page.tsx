"use client"

import type React from "react"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IdCardGeneratorPage() {
  const [role, setRole] = useState<"student" | "staff">("student")
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    course: "",
    employeeId: "",
    department: "",
  })
  const [qrData, setQrData] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setRole(value as "student" | "staff")
  }

  const generateQrCode = () => {
    let dataToEncode = {}

    if (role === "student") {
      dataToEncode = {
        name: formData.name,
        rollNumber: formData.rollNumber,
        course: formData.course,
        role: "student",
      }
    } else {
      dataToEncode = {
        name: formData.name,
        employeeId: formData.employeeId,
        department: formData.department,
        role: "staff",
      }
    }

    setQrData(JSON.stringify(dataToEncode))
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
      <html>
        <head>
          <title>SAIT College ID Card</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .id-card { border: 1px solid #ccc; padding: 20px; width: 320px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .logo { text-align: center; margin-bottom: 10px; }
            .logo-circle { width: 60px; height: 60px; background-color: #1e40af; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px; }
            .qr-code { text-align: center; margin: 20px 0; }
            .details { margin-bottom: 20px; }
            .detail-row { display: flex; margin-bottom: 8px; }
            .detail-label { font-weight: bold; width: 120px; }
            .footer { text-align: center; font-size: 12px; margin-top: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="id-card">
            <div class="header">
              <div class="logo">
                <div class="logo-circle">SC</div>
              </div>
              <h2>SAIT College</h2>
              <p>${role === "student" ? "Student ID Card" : "Staff ID Card"}</p>
            </div>
            <div class="qr-code">
              <img src="${
                document.getElementById("qr-code")?.querySelector("svg")?.outerHTML
                  ? "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(document.getElementById("qr-code")?.querySelector("svg")?.outerHTML || "")
                  : ""
              }" width="150" height="150" />
            </div>
            <div class="details">
              <div class="detail-row">
                <div class="detail-label">Name:</div>
                <div>${formData.name}</div>
              </div>
              ${
                role === "student"
                  ? `
                  <div class="detail-row">
                    <div class="detail-label">Roll Number:</div>
                    <div>${formData.rollNumber}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Course:</div>
                    <div>${formData.course}</div>
                  </div>
                  `
                  : `
                  <div class="detail-row">
                    <div class="detail-label">Employee ID:</div>
                    <div>${formData.employeeId}</div>
                  </div>
                  <div class="detail-row">
                    <div class="detail-label">Department:</div>
                    <div>${formData.department}</div>
                  </div>
                  `
              }
            </div>
            <div class="footer">
              <p>This ID card is the property of SAIT College.</p>
              <p>If found, please return to SAIT College Administration.</p>
            </div>
          </div>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ID Card Generator</h1>
        <p className="text-muted-foreground mt-2">Generate QR codes for student and staff ID cards</p>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="generate">Generate ID Card</TabsTrigger>
          <TabsTrigger value="preview" disabled={!qrData}>
            Preview ID Card
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Generate ID Card</CardTitle>
              <CardDescription>Enter details to generate an ID card with QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>

              {role === "student" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course/Department</Label>
                    <Input id="course" name="course" value={formData.course} onChange={handleInputChange} required />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={generateQrCode} className="w-full">
                Generate ID Card
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          {qrData && (
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-center">SAIT College ID Card</CardTitle>
                <CardDescription className="text-center">
                  {role === "student" ? "Student ID Card" : "Staff ID Card"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SC</span>
                  </div>

                  <div id="qr-code" className="my-4">
                    <QRCodeSVG value={qrData} size={200} level="H" includeMargin={true} />
                  </div>

                  <div className="w-full space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="font-medium">Name:</div>
                      <div>{formData.name}</div>

                      {role === "student" ? (
                        <>
                          <div className="font-medium">Roll Number:</div>
                          <div>{formData.rollNumber}</div>
                          <div className="font-medium">Course:</div>
                          <div>{formData.course}</div>
                        </>
                      ) : (
                        <>
                          <div className="font-medium">Employee ID:</div>
                          <div>{formData.employeeId}</div>
                          <div className="font-medium">Department:</div>
                          <div>{formData.department}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-printer"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect width="12" height="8" x="6" y="14"></rect>
                  </svg>
                  Print ID Card
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
