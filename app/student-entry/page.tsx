import { EntryForm } from "@/components/entry-form"

export default function StudentEntryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Entry</h1>
        <p className="text-muted-foreground mt-2">Create a gate pass for students entering the campus</p>
      </div>

      <EntryForm
        role="student"
        title="Student Gate Pass Request"
        description="Fill out the form below to request a gate pass for a student"
      />
    </div>
  )
}
