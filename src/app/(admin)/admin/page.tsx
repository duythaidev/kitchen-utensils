'use client'

import Spinner from "@/components/Custom/Spinner";
import { Skeleton } from "@/components/ui/skeleton";
// import { useRouter } from "next/navigation"
import { useRouter } from 'nextjs-toploader/app';

export default function Page() {
  const router = useRouter();
  router.push("/admin/dashboard");
  return (
    <div className="md:p-6 flex flex-wrap gap-6">
      {/* <h1 className="text-center"><Spinner></Spinner></h1>
       */}
      <div className="flex flex-col space-y-3 flex-1">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 flex-1">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 flex-1">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 flex-1">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <Skeleton className="h-[300px] w-full rounded-xl" />

      </div>

    </div>
  )
}
