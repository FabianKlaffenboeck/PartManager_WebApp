import {AppSidebar} from "@/components/app-sidebar"
import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {redirect, useLocation} from "react-router-dom";
import Parts from "@/Parts.tsx";
import Home from "@/Home.tsx";
import {Breadcrumbs} from "@/components/Breadcrumbs.tsx";
import PartsLowStock from "@/PartsLowStock.tsx";

export default function App() {
    const location = useLocation()
    const path = location.pathname

    let RenderedPart
    if (path.includes('/home')) {
        RenderedPart = <Home/>
    } else if (path.includes('/parts/all')) {
        RenderedPart = <Parts/>
    } else if (path.includes('/parts/low')) {
        RenderedPart = <PartsLowStock/>
    } else {
        redirect("/home")
        RenderedPart = <div>Default Content</div>
    }

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>

                        <Breadcrumbs/>

                    </div>
                </header>

                {RenderedPart}

            </SidebarInset>
        </SidebarProvider>
    )
}
