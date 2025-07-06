import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Profile from "@/components/Profile/Profile"
// import { getProfile } from "@/actions/user.action"
import { revalidateTag } from "next/cache"
export default async function Page() {
  const session = await getServerSession(authOptions)
  // const data = 
  // console.log("data: page ", data)
  // const profile = await getProfile(session?.user?.accessToken as string)
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
  // console.log("profile: page ", profile)
  return <Profile profile={profile} />
}
