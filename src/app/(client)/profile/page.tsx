import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions";
import Profile from "@/components/Pages/Profile/Profile"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Profile - Kitchen Utensils',
    description: 'Manage your account settings, view order history, and update your preferences',
    robots: {
        index: false,
        follow: true,
    },
}; 

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
