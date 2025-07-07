import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 bg-gray-100 p-6 min-h-screen">{children}</main>
        </div>
    )
}
