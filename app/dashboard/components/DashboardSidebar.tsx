"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SEG = "#151869";

type SidebarData = {
  topInstitutions: { name: string; short: string; students: number; programs: number; pct: number }[];
  weeklyActivity: number[];
  activityTotal: string;
  activityChange: { change: string; up: boolean };
};

export default function DashboardSidebar({ currentMonthYear }: { currentMonthYear: string }) {
  const [stats, setStats] = useState<SidebarData | null>(null);
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

  const weekly = stats?.weeklyActivity ?? [0, 0, 0, 0];
  const peak = Math.max(...weekly, 1);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-black text-slate-800">Activity</h3>
          <span className="text-[10px] text-slate-400">{currentMonthYear}</span>
        </div>
        <div className="text-2xl font-black text-slate-800 mb-4">
          {loading ? "..." : stats?.activityTotal ?? "0"}{" "}
          {stats?.activityChange && (
            <span className={`text-sm font-medium ${stats.activityChange.up ? "text-emerald-500" : "text-rose-500"}`}>
              {stats.activityChange.change}
            </span>
          )}
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {weekly.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${Math.max(h, 4)}%`,
                  backgroundColor: h === peak && h > 0 ? SEG : "#e8eaf6",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-slate-400">
          <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-800">Top Institutions</h3>
          <Link href="/dashboard/institutions" className="text-[10px] font-bold hover:underline" style={{ color: SEG }}>
            See all
          </Link>
        </div>
        {loading ? (
          <p className="text-xs text-slate-400">Loading...</p>
        ) : stats?.topInstitutions.length ? (
          <div className="space-y-3.5">
            {stats.topInstitutions.map((inst) => (
              <div key={inst.name}>
                <div className="flex items-center justify-between mb-1 gap-2">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-700 truncate block">{inst.name}</span>
                    {inst.short && (
                      <span className="text-[10px] text-slate-400">{inst.short}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">
                    {inst.students.toLocaleString("en-IN")} students
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${inst.pct}%`, backgroundColor: SEG }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No institutions added yet.</p>
        )}
      </div>
    </div>
  );
}
