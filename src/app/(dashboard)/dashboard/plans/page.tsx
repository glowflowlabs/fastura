import Plans from "@/features/Plans"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function PlansPage() {
  const session = await auth()
  if (!session) return redirect("/login")
  return <Plans />
}
