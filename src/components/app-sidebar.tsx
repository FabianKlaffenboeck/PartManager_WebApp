import * as React from "react"
import {CircuitBoard, DatabaseZap, Frame,} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavProjects} from "@/components/nav-projects"
import {NavUser} from "@/components/nav-user"
import {Sidebar, SidebarContent, SidebarFooter, SidebarRail,} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Parts",
            url: "parts",
            icon: CircuitBoard,
            isActive: true,
            items: [
                {
                    title: "Show all",
                    url: "all",
                },
                {
                    title: "Low Stock",
                    url: "lowstock",
                },
            ],
        },
        {
            title: "Data",
            url: "data",
            icon: DatabaseZap,
            items: [
                {
                    title: "Footprints",
                    url: "footprints",
                },
                {
                    title: "Manufacturers",
                    url: "manufacturers",
                },
                {
                    title: "Part Types",
                    url: "parttypes",
                },
                {
                    title: "Storage",
                    url: "storage",
                }
            ],
        },
    ],

    projects: [
        {
            name: "Test Project",
            url: "#",
            icon: Frame,
        }
    ]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
