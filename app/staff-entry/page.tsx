import { EntryForm } from "@/components/entry-form"

export default function StaffEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Staff Entry</h1>
        <p className="text-muted-foreground mt-2">Create a gate pass for staff members entering the campus</p>
      </div>

      <EntryForm
        role="staff"
        title="Staff Gate Pass Request"
        description="Fill out the form below to request a gate pass for a staff member"
      />
    </div>
  )
}
