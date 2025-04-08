import Education from "@/features/Education"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function EducationPage() {
  const session = await auth()
  if (!session) return redirect("/login")
  return <Education />
}
