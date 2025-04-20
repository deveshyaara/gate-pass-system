"use client"

import { useState } from "react"
import { EntryForm } from "@/components/entry-form"
import { VehicleTicket } from "@/components/vehicle-ticket"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VehicleEntryPage() {
  const [ticketData, setTicketData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("form")

  const handleFormSubmit = (data: any) => {
    setTicketData(data)
    setActiveTab("ticket")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vehicle Entry</h1>
        <p className="text-muted-foreground mt-2">Create a gate pass for vehicles entering the campus</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="form">Entry Form</TabsTrigger>
          <TabsTrigger value="ticket" disabled={!ticketData}>
            Parking Ticket
          </TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <EntryForm
            role="vehicle"
            title="Vehicle Gate Pass Request"
            description="Fill out the form below to request a gate pass for a vehicle"
            onSubmitSuccess={handleFormSubmit}
          />
        </TabsContent>
        <TabsContent value="ticket">{ticketData && <VehicleTicket ticketData={ticketData} />}</TabsContent>
      </Tabs>
    </div>
  )
}
