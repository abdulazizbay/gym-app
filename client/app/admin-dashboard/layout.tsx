import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full">
            <DashboardSidebar />
            <main className="flex-1 ">{children}</main>
        </div>
    );
}

