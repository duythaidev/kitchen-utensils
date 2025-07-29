import { authOptions } from "@/lib/authOptions";
// import { ChartAreaInteractive } from "@/components/shadcn/chart-area-interactive"
import { SectionCards } from "@/components/shadcn/section-cards"
import { getServerSession } from "next-auth"
import { Metadata } from "next";
import { ChartAreaInteractive } from "@/components/shadcn/chart-area-interactive";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Admin Dashboard - Kitchen Utensils',
  description: 'View admin dashboard',
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  // const data = await getDashboardData();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login?unauthorized=true')
  }
  const accessToken = session?.accessToken;
  const { range } = await searchParams;

  const query = new URLSearchParams({
    range: range?.toString() || '7d',
  });

  const { data } = await fetchWithAuth({
    url: `/statistics`,
    method: 'GET',
    accessToken: accessToken as string,
  });
  const { data: revenues } = await fetchWithAuth({
    url: `/statistics/period?${query.toString()}`,
    method: 'GET',
    accessToken: accessToken as string,
  });
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={data} />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive revenues={revenues} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;