import {AppSidebar} from "@/components/app-sidebar"
import {Separator} from "@/components/ui/separator"
import {SidebarInset, SidebarProvider, SidebarTrigger,} from "@/components/ui/sidebar"
import {Navigate, Route, Routes} from "react-router-dom";
import Parts from "@/pages/Parts/Parts.tsx";
import Home from "@/pages/Home.tsx";
import {Breadcrumbs} from "@/components/Breadcrumbs.tsx";
import PartsLowStock from "@/pages/Parts/PartsLowStock.tsx";
import PartsAll from "@/pages/Parts/PartsAll.tsx";
import PartTypes from "@/pages/Data/PartTypes.tsx";
import Storage from "@/pages/Data/Storage.tsx";
import Footprints from "./pages/Data/Footprints";
import Data from "@/pages/Data/Data.tsx";
import Manufacturers from "@/pages/Data/Manufacturers.tsx";
import {Toaster} from "sonner";
import Login from "./pages/Login/Login";
import {useEffect, useState} from "react";


export default function App() {

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    function onLoginSuccess(token: string) {
        localStorage.setItem('token', token);
        setToken(token);
    }

    function logOutHandler() {
        localStorage.removeItem('token');
        setToken(null);
        console.log("asd")
    }

    if (!token) {
        return (
            <div>
                <Login onLoginSuccess={onLoginSuccess}/>
                <Toaster/>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar logOutHandler={logOutHandler}/>
            <SidebarInset>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumbs/>
                    </div>
                </header>

                <Routes>
                    <Route path="/parts/all" element={<PartsAll/>}/>
                    <Route path="/parts/lowstock" element={<PartsLowStock/>}/>
                    <Route path="/parts" element={<Parts/>}/>

                    <Route path="/data/footprints" element={<Footprints/>}/>
                    <Route path="/data/manufacturers" element={<Manufacturers/>}/>
                    <Route path="/data/parttypes" element={<PartTypes/>}/>
                    <Route path="/data/storage" element={<Storage/>}/>
                    <Route path="/data" element={<Data/>}/>

                    <Route path="/home" element={<Home/>}/>

                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </SidebarInset>
            <Toaster/>
        </SidebarProvider>
    )
}
