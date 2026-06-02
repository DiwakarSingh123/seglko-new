"use client";

import { useEffect, useState } from "react";
import { formatCount } from "@/lib/dashboard-stats";

type DashboardStatsData = {
  totalApplications: number;
  applicationsChange: { change: string; up: boolean };
  activeStudents: number;
  studentsChange: { change: string; up: boolean };
  universities: number;
  universitiesChange: { change: string; up: boolean };
  revenueFormatted: string;
  revenueChange: { change: string; up: boolean };
};

const statMeta = [
  { key: "totalApplications" as const, label: "Total Applications", icon: "assignment", bg: "#151869", changeKey: "applicationsChange" as const },
  { key: "activeStudents" as const, label: "Active Students", icon: "group", bg: "#0f7a5a", changeKey: "studentsChange" as const },
  { key: "universities" as const, label: "Universities", icon: "school", bg: "#6d28d9", changeKey: "universitiesChange" as const },
  { key: "revenueFormatted" as const, label: "Total Revenue", icon: "payments", bg: "#b45309", changeKey: "revenueChange" as const },
];

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayValue = (meta: (typeof statMeta)[number]) => {
    if (!stats) return "...";
    if (meta.key === "revenueFormatted") return stats.revenueFormatted;
    const value = stats[meta.key];
    return typeof value === "number" ? formatCount(value) : String(value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statMeta.map((s) => {
        const change = stats?.[s.changeKey];
        return (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: s.bg }}>
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </div>
              {change && (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg max-w-[110px] truncate ${change.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  {loading ? "..." : change.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? "..." : displayValue(s)}</div>
            <div className="text-xs text-slate-400 font-medium mt-1">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
