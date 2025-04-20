// Types for our application
export type UserRole = "student" | "staff" | "visitor" | "admin" | "vehicle"

export type GatePassStatus = "pending" | "approved" | "rejected"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  password: string // In a real app, this would be hashed
}

export interface GatePass {
  id: string
  userId: string
  name: string
  role: UserRole
  purpose: string
  entryTime: string
  exitTime: string
  dateOfIssue: string
  status: GatePassStatus
  additionalInfo: Record<string, any>
}

// Mock data
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@sait.edu",
    role: "admin",
    password: "admin123",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@sait.edu",
    role: "student",
    password: "password",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@sait.edu",
    role: "staff",
    password: "password",
  },
]

export const gatePasses: GatePass[] = [
  {
    id: "gp1",
    userId: "2",
    name: "John Doe",
    role: "student",
    purpose: "Project Meeting",
    entryTime: "2023-04-15T09:00:00",
    exitTime: "2023-04-15T17:00:00",
    dateOfIssue: "2023-04-14T14:30:00",
    status: "approved",
    additionalInfo: {
      rollNumber: "S12345",
      course: "Computer Science",
      guardianContact: "9876543210",
    },
  },
  {
    id: "gp2",
    userId: "3",
    name: "Jane Smith",
    role: "staff",
    purpose: "Faculty Meeting",
    entryTime: "2023-04-16T10:00:00",
    exitTime: "2023-04-16T16:00:00",
    dateOfIssue: "2023-04-15T11:20:00",
    status: "approved",
    additionalInfo: {
      employeeId: "E789",
      department: "Computer Science",
    },
  },
  {
    id: "gp3",
    userId: "",
    name: "Robert Johnson",
    role: "visitor",
    purpose: "Campus Tour",
    entryTime: "2023-04-17T13:00:00",
    exitTime: "2023-04-17T15:00:00",
    dateOfIssue: "2023-04-16T09:45:00",
    status: "pending",
    additionalInfo: {
      contactInfo: "robert@example.com",
      personToVisit: "Dean of Admissions",
      vehicleInfo: "Toyota Camry, License: ABC123",
    },
  },
]

// Helper functions to work with the mock data
export function getGatePassById(id: string): GatePass | undefined {
  return gatePasses.find((pass) => pass.id === id)
}

export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email)
}
