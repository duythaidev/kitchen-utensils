import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Profile from "@/components/Profile/Profile"
export default async function Page() {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${process.env.BACKEND_API}/users/me`, {
    headers: {
      'Authorization': `Bearer ${session?.user?.accessToken}`
    },
    cache: "no-store",
    next: {
      tags: ["profile"]
    }
  })
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Server Error');
  }
  const profile = await res.json()
  return <Profile profile={profile} />
}
