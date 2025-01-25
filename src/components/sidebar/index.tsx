
import React from "react";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export function Sidebar({children}: {children?: React.ReactNode}) {
    return (
        <div>
            <SidebarProvider >
                <AppSidebar />
                <div>
                    <SidebarTrigger />
                    { children }
                </div>
            </SidebarProvider>
        </div>
    );
}
