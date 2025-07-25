import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/views/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/views/dashboard-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="h-screen w-screen flex flex-col bg-muted">
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    );
}

export default Layout;