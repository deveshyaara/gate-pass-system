"use client"

import { useState, useEffect } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QrCode, Camera, StopCircle } from "lucide-react"

interface QrScannerProps {
  onScan: (data: string) => void
}

export function QrScanner({ onScan }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      if (scanner) {
        scanner.stop().catch(console.error)
      }
    }
  }, [scanner])

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader")
      setScanner(html5QrCode)

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // Success callback
          onScan(decodedText)
          stopScanner()
        },
        (errorMessage) => {
          // Error callback
          console.log(errorMessage)
        },
      )

      setIsScanning(true)
    } catch (err) {
      console.error("Error starting scanner:", err)
      alert("Could not start camera. Please check permissions and try again.")
    }
  }

  const stopScanner = () => {
    if (scanner) {
      scanner.stop().catch(console.error)
      setIsScanning(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-md overflow-hidden">
        <div id="qr-reader" className="w-full h-64 bg-gray-100 flex items-center justify-center">
          {!isScanning && (
            <div className="text-center p-4">
              <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Camera will appear here</p>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-4">
        {!isScanning ? (
          <Button onClick={startScanner} className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Start Camera
          </Button>
        ) : (
          <Button onClick={stopScanner} variant="destructive" className="flex items-center gap-2">
            <StopCircle className="h-4 w-4" />
            Stop Camera
          </Button>
        )}
      </div>
    </div>
  )
}
