"use client"

import { useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer } from "lucide-react"

interface VehicleTicketProps {
  ticketData: {
    id: string
    name: string
    vehicleNumber: string
    vehicleType: string
    driverName: string
    entryTime: string
    exitTime: string
    purpose: string
  }
}

export function VehicleTicket({ ticketData }: VehicleTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const handlePrint = () => {
    const content = ticketRef.current
    if (!content) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
      <html>
        <head>
          <title>SAIT College Parking Ticket</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .ticket { border: 1px solid #ccc; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .qr-code { text-align: center; margin: 20px 0; }
            .details { margin-bottom: 20px; }
            .detail-row { display: flex; margin-bottom: 8px; }
            .detail-label { font-weight: bold; width: 140px; }
            .footer { text-align: center; font-size: 12px; margin-top: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <h2>SAIT College Parking Ticket</h2>
              <p>Ticket ID: ${ticketData.id}</p>
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
                <div>${ticketData.name}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Vehicle Number:</div>
                <div>${ticketData.vehicleNumber}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Vehicle Type:</div>
                <div>${ticketData.vehicleType}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Driver Name:</div>
                <div>${ticketData.driverName}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Entry Time:</div>
                <div>${formatDate(ticketData.entryTime)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Exit Time:</div>
                <div>${formatDate(ticketData.exitTime)}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Purpose:</div>
                <div>${ticketData.purpose}</div>
              </div>
            </div>
            <div class="footer">
              <p>Please display this ticket on your vehicle dashboard.</p>
              <p>For assistance, contact SAIT College Security at 123-456-7890.</p>
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

  // Generate QR code data
  const qrData = JSON.stringify({
    id: ticketData.id,
    vehicleNumber: ticketData.vehicleNumber,
    entryTime: ticketData.entryTime,
    exitTime: ticketData.exitTime,
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">SAIT College Parking Ticket</CardTitle>
      </CardHeader>
      <CardContent ref={ticketRef}>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Ticket ID: {ticketData.id}</p>
          </div>

          <div className="flex justify-center" id="qr-code">
            <QRCodeSVG value={qrData} size={200} level="H" includeMargin={true} />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Name:</div>
              <div>{ticketData.name}</div>

              <div className="font-medium">Vehicle Number:</div>
              <div>{ticketData.vehicleNumber}</div>

              <div className="font-medium">Vehicle Type:</div>
              <div>{ticketData.vehicleType}</div>

              <div className="font-medium">Driver Name:</div>
              <div>{ticketData.driverName}</div>

              <div className="font-medium">Entry Time:</div>
              <div>{formatDate(ticketData.entryTime)}</div>

              <div className="font-medium">Exit Time:</div>
              <div>{formatDate(ticketData.exitTime)}</div>

              <div className="font-medium">Purpose:</div>
              <div>{ticketData.purpose}</div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Please display this ticket on your vehicle dashboard.</p>
            <p>For assistance, contact SAIT College Security at 123-456-7890.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          Print Ticket
        </Button>
      </CardFooter>
    </Card>
  )
}
