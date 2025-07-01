import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Profile from "@/components/Profile/Profile"
import { getProfile } from "@/actions/user.action"
export default async function Page() {
  const session = await getServerSession(authOptions)
  // const data = 
  // console.log("data: page ", data)
  const profile = await getProfile(session?.user?.accessToken as string)
  console.log("profile: page ", profile)
  return <Profile profile={profile} />
}