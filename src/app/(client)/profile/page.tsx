import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions";
import Profile from "@/components/Pages/Profile/Profile"
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

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
  if (!session || !session.user) {
    redirect('/login?unauthorized=true');
  }
  const { ok, data } = await fetchWithAuth({
    url: '/users/me',
    method: 'GET',
    accessToken: session?.user?.accessToken as string,
    tag: 'profile',
  })

  return <Profile profile={data} />
}
