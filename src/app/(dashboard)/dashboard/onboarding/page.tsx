import Onboarding from "@/features/Onboarding"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function OnboardingPage() {
  const session = await auth()
  if (!session) return redirect("/login")
  return <Onboarding />
}
