import RecentApplications from "./components/RecentApplications";
import DashboardStats from "./components/DashboardStats";
import DashboardSidebar from "./components/DashboardSidebar";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardPage() {
  const currentMonthYear = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">{greeting}, Admin 👋</h1>
          <p className="text-sm text-slate-400 mt-0.5">Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-lg">calendar_today</span>
          {currentMonthYear}
        </button>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RecentApplications />
        <DashboardSidebar currentMonthYear={currentMonthYear} />
      </div>
    </div>
  );
}
