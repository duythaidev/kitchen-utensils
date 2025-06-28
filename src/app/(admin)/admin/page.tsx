'use client'

import Spinner from "@/components/Custom/Spinner";
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter();
  router.push("/admin/dashboard");
  return (
    <div>
      <h1 className="text-center"><Spinner></Spinner></h1>
    </div>
  )
}
