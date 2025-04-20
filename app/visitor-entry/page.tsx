import { EntryForm } from "@/components/entry-form"

export default function VisitorEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visitor Entry</h1>
        <p className="text-muted-foreground mt-2">Create a gate pass for visitors entering the campus</p>
      </div>

      <EntryForm
        role="visitor"
        title="Visitor Gate Pass Request"
        description="Fill out the form below to request a gate pass for a visitor"
      />
    </div>
  )
}
