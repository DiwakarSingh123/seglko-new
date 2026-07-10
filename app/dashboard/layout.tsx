import type { Metadata } from "next";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AuthGuard from "./components/AuthGuard";
import MobileLayout from "./components/MobileLayout";

export const metadata: Metadata = {
  title: "Dashboard | Saroj Educational Group",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <MobileLayout>{children}</MobileLayout>
    </AuthGuard>
  );
}
