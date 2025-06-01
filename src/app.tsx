import {AppSidebar} from "@/components/app-sidebar"
import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {useLocation, useNavigate} from "react-router-dom";
import Parts from "@/pages/Parts/Parts.tsx";
import Home from "@/pages/Home.tsx";
import {Breadcrumbs} from "@/components/Breadcrumbs.tsx";
import PartsLowStock from "@/pages/Parts/PartsLowStock.tsx";
import {useEffect} from "react";
import PartsAll from "@/pages/Parts/PartsAll.tsx";
import PartTypes from "@/pages/Data/PartTypes.tsx";
import Storage from "@/pages/Data/Storage.tsx";
import Footprints from "./pages/Data/Footprints";
import Data from "@/pages/Data/Data.tsx";
import Manufacturers from "@/pages/Data/Manufacturers.tsx";

export default function App() {
    const location = useLocation()
    const navigate = useNavigate();
    const path = location.pathname
    let RenderedPart
    let redirectHome = false

    if (path.match('/parts/all')) {
        RenderedPart = <PartsAll/>
    } else if (path.match('/parts/low')) {
        RenderedPart = <PartsLowStock/>
    } else if (path.match('/data/footprints')) {
        RenderedPart = <Footprints/>
    } else if (path.match('/data/manufacturers')) {
        RenderedPart = <Manufacturers/>
    } else if (path.match('/data/parttypes')) {
        RenderedPart = <PartTypes/>
    } else if (path == ('/data/storage')) {
        RenderedPart = <Storage/>
    } else if (path.match('/home')) {
        RenderedPart = <Home/>
    } else if (path.match('/data')) {
        RenderedPart = <Data/>
    } else if (path.match('/parts')) {
        RenderedPart = <Parts/>
    } else {
        redirectHome = true
    }

    useEffect(() => {
        if (redirectHome) {
            navigate("/home");
        }
    }, [navigate]);

    return (<SidebarProvider>
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
        </SidebarProvider>)
}
