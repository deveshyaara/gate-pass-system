"use server"

import clientPromise from "./mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { gatePasses, type GatePassStatus, type UserRole } from "./data";

// Update gate pass status
export async function updateGatePassStatus(id: string, status: GatePassStatus) {
  // In a real app, this would be a database operation
  const gatePass = gatePasses.find((pass) => pass.id === id)

  if (gatePass) {
    gatePass.status = status
    revalidatePath("/gate-pass-history")
    revalidatePath("/admin/dashboard")
  }

  return { success: !!gatePass }
}

// Delete gate pass
export async function deleteGatePass(id: string) {
  // In a real app, this would be a database operation
  const index = gatePasses.findIndex((pass) => pass.id === id)

  if (index !== -1) {
    gatePasses.splice(index, 1)
    revalidatePath("/gate-pass-history")
    revalidatePath("/admin/dashboard")
  }

  return { success: index !== -1 }
}

// Admin login
export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // In a real app, this would check against a database and use proper authentication
  if (email === "admin@sait.edu" && password === "admin123") {
    // In a real app, this would set a session or token
    redirect("/admin/dashboard")
  }

  return { success: false, error: "Invalid email or password" }
}

// Create a new gate pass
export async function createGatePass(formData: FormData) {
  const client = await clientPromise;
  const db = client.db();
  const gatePassesCollection = db.collection("gatePasses");

  // Extract form data
  const role = formData.get("role") as string;
  const name = formData.get("name") as string;
  const entryTime = formData.get("entryTime") as string;
  const exitTime = formData.get("exitTime") as string;
  const purpose = formData.get("purpose") as string;

  // Additional info based on role
  const additionalInfo: Record<string, any> = {};
  if (role === "student") {
    additionalInfo.rollNumber = formData.get("rollNumber");
    additionalInfo.course = formData.get("course");
  } else if (role === "staff") {
    additionalInfo.employeeId = formData.get("employeeId");
    additionalInfo.department = formData.get("department");
  } else if (role === "visitor") {
    additionalInfo.contactInfo = formData.get("contactInfo");
    additionalInfo.personToVisit = formData.get("personToVisit");
  }

  // Auto-approve for students and staff
  const status = role === "student" || role === "staff" ? "approved" : "pending";

  const newGatePass = {
    userId: "", // Replace with authenticated user's ID if applicable
    name,
    role,
    purpose,
    entryTime,
    exitTime,
    dateOfIssue: new Date().toISOString(),
    status,
    additionalInfo,
  };

  // Insert the new gate pass into the database
  await gatePassesCollection.insertOne(newGatePass);

  console.log("New Gate Pass Created:", newGatePass);

  // Revalidate the gate pass history page
  revalidatePath("/gate-pass-history");

  // Redirect to the gate pass history page
  redirect("/gate-pass-history");
}
