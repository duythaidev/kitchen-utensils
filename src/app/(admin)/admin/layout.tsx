import { AppSidebar } from "@/components/shadcn/app-sidebar"
import { SiteHeader } from "@/components/shadcn/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/shadcn/sidebar"

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {/* <NextTopLoader showSpinner={false} height={2} /> */}
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}
