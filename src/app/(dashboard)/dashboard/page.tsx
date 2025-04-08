import Dashboard from "@/features/Dashboard"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) return redirect("/login")
  return <Dashboard />
}
