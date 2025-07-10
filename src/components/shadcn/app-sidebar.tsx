"use client"

import {
  Store,
  Folder,
  MessageCircleQuestion,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/shadcn/nav-main"
import { NavUser } from "@/components/shadcn/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"

const data = {
  user: {
    user_name: "shadcn",
    email: "m@example.com",
    avatar_url: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Store,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: Folder,
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: Camera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: FileText,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: FileType,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: Database,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: FileChartPie,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: FileType,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession()
  const user = session.data?.user

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/admin/dashboard">
                <div className="max-w-[30px] max-h-[30px] overflow-hidden">
                  <Image width={30} height={30} src="/favicon.ico" alt="" />
                </div>

                <p className=" font-bold font-mono">DuyThaiDev</p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
