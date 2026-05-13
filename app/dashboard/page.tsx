import Link from "next/link";

const SEG = "#151869";

const stats = [
  { label: "Total Applications", value: "12,842", change: "+12.5%", up: true, icon: "assignment", bg: "#151869" },
  { label: "Active Students", value: "45,210", change: "+8.1%", up: true, icon: "group", bg: "#0f7a5a" },
  { label: "Universities", value: "850", change: "+3.2%", up: true, icon: "school", bg: "#6d28d9" },
  { label: "Total Revenue", value: "₹12.4M", change: "+8.2%", up: true, icon: "payments", bg: "#b45309" },
];

const recentApps = [
  { id: "#AP-1284", student: "Rahul Sharma", university: "IIT Delhi", course: "B.Tech CSE", date: "Jan 15, 2024", status: "Pending", avatar: "RS", color: "from-orange-400 to-orange-600" },
  { id: "#AP-1283", student: "Priya Singh", university: "Stanford University", course: "MS CS", date: "Jan 14, 2024", status: "Accepted", avatar: "PS", color: "from-blue-400 to-blue-600" },
  { id: "#AP-1282", student: "Amit Patel", university: "Univ. of Toronto", course: "MBA", date: "Jan 13, 2024", status: "Rejected", avatar: "AP", color: "from-emerald-400 to-emerald-600" },
  { id: "#AP-1281", student: "Sneha Reddy", university: "Oxford University", course: "MSc Data Sci", date: "Jan 12, 2024", status: "In Review", avatar: "SR", color: "from-purple-400 to-purple-600" },
  { id: "#AP-1280", student: "Vikram Malhotra", university: "MIT", course: "PhD AI", date: "Jan 11, 2024", status: "Accepted", avatar: "VM", color: "from-rose-400 to-rose-600" },
];

const topUnis = [
  { name: "Stanford University", apps: 1240, pct: 85 },
  { name: "IIT Delhi", apps: 980, pct: 72 },
  { name: "MIT", apps: 850, pct: 65 },
  { name: "Oxford University", apps: 720, pct: 58 },
  { name: "Univ. of Toronto", apps: 610, pct: 45 },
];

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  "In Review": "bg-blue-100 text-blue-700",
};

const barHeights = [35, 55, 42, 70, 48, 65, 38];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Good Morning, Admin 👋</h1>
          <p className="text-sm text-slate-400 mt-0.5">Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            Jan 2024
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-xl text-sm font-semibold transition-colors shadow-md"
            style={{ backgroundColor: SEG }}
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: s.bg }}>
                <span className="material-symbols-outlined text-xl">{s.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                {s.change}
              </span>
            </div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-400 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Applications */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-800">Recent Applications</h2>
            <Link href="/dashboard/applications" className="text-xs font-bold hover:underline" style={{ color: SEG }}>See all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">University</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app) => (
                  <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${app.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                          {app.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{app.student}</div>
                          <div className="text-[10px] text-slate-400">{app.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-1 text-[10px] font-bold rounded-lg" style={{ backgroundColor: "#eef0fb", color: SEG }}>{app.course}</span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">{app.university}</td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[app.status]}`}>{app.status}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <button className="h-7 w-7 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-sm" style={{ backgroundColor: SEG }}>
                        <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Activity Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-black text-slate-800">Activity</h3>
              <span className="text-[10px] text-slate-400">Jan 2024</span>
            </div>
            <div className="text-2xl font-black text-slate-800 mb-4">
              12,842 <span className="text-sm font-medium text-emerald-500">+12.5%</span>
            </div>
            <div className="flex items-end gap-1.5 h-20">
              {barHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${h}%`,
                      backgroundColor: (i === 3 || i === 5) ? SEG : "#e8eaf6",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-slate-400">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
          </div>

          {/* Top Universities */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-800">Top Universities</h3>
              <Link href="/dashboard/universities" className="text-[10px] font-bold hover:underline" style={{ color: SEG }}>See all</Link>
            </div>
            <div className="space-y-3.5">
              {topUnis.map((u) => (
                <div key={u.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-700 truncate">{u.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">{u.apps}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${u.pct}%`, backgroundColor: SEG }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
