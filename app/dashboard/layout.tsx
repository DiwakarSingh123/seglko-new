import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AuthGuard from "./components/AuthGuard";

export const metadata: Metadata = {
  title: "Dashboard | AdmissionX",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#f0f2f5] overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
