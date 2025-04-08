import Profile from "@/features/Profile"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()
  if (!session) return redirect("/login")
  return <Profile />
}
