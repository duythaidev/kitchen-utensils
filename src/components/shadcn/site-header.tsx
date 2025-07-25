'use client'
import { Button } from "@/components/shadcn/button"
import { Separator } from "@/components/shadcn/separator"
import { SidebarTrigger } from "@/components/shadcn/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium capitalize">{pathname.substring(7).length === 0 ? "Admin" : pathname.substring(7)}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Link
              href="/"
              className="dark:text-foreground"
            >
              Home Page
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
