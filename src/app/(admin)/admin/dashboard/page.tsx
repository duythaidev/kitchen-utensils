import { authOptions } from "@/lib/authOptions";
// import { ChartAreaInteractive } from "@/components/shadcn/chart-area-interactive"
import { SectionCards } from "@/components/shadcn/section-cards"
import { getServerSession } from "next-auth"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Admin Dashboard - Kitchen Utensils',
    description: 'View admin dashboard',
};

export default async function Page() {
  // const data = await getDashboardData();
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const res = await fetch(`${process.env.BACKEND_API}/statistics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // 
    },
    cache: 'no-store', //  test

    next: { tags: ['list-users'] }
  });
  const data = await res.json()
  console.log("true data ", data)
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={data} />
          <div className="px-4 lg:px-6">
            {/* <ChartAreaInteractive /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
