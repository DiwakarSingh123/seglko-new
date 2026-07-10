"use client";
import { useState } from "react";

const students = [
  { id: "STU-001", name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 98765 43210", city: "Delhi", apps: 3, status: "Active", joined: "Jan 2024", color: "from-orange-400 to-orange-600" },
  { id: "STU-002", name: "Priya Singh", email: "priya@email.com", phone: "+91 87654 32109", city: "Mumbai", apps: 5, status: "Active", joined: "Dec 2023", color: "from-blue-400 to-blue-600" },
  { id: "STU-003", name: "Amit Patel", email: "amit@email.com", phone: "+91 76543 21098", city: "Ahmedabad", apps: 2, status: "Inactive", joined: "Nov 2023", color: "from-emerald-400 to-emerald-600" },
  { id: "STU-004", name: "Sneha Reddy", email: "sneha@email.com", phone: "+91 65432 10987", city: "Hyderabad", apps: 4, status: "Active", joined: "Jan 2024", color: "from-purple-400 to-purple-600" },
  { id: "STU-005", name: "Vikram Malhotra", email: "vikram@email.com", phone: "+91 54321 09876", city: "Chandigarh", apps: 1, status: "Active", joined: "Feb 2024", color: "from-rose-400 to-rose-600" },
  { id: "STU-006", name: "Anjali Gupta", email: "anjali@email.com", phone: "+91 43210 98765", city: "Lucknow", apps: 3, status: "Active", joined: "Jan 2024", color: "from-amber-400 to-amber-600" },
  { id: "STU-007", name: "Rohan Verma", email: "rohan@email.com", phone: "+91 32109 87654", city: "Pune", apps: 2, status: "Inactive", joined: "Oct 2023", color: "from-teal-400 to-teal-600" },
  { id: "STU-008", name: "Kavya Nair", email: "kavya@email.com", phone: "+91 21098 76543", city: "Kochi", apps: 6, status: "Active", joined: "Dec 2023", color: "from-pink-400 to-pink-600" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">Students</h1>
          <p className="text-sm text-slate-400 mt-0.5">{students.length} registered students</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 w-full sm:w-auto">
          <span className="material-symbols-outlined text-lg">person_add</span>Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: "45,210", icon: "group", bg: "bg-indigo-500" },
          { label: "Active", value: "38,420", icon: "check_circle", bg: "bg-emerald-500" },
          { label: "New This Month", value: "1,284", icon: "person_add", bg: "bg-violet-500" },
          { label: "Avg Applications", value: "3.2", icon: "assignment", bg: "bg-amber-500" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center text-white mb-3 shadow-md`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </div>
            <div className="text-xl font-black text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex gap-3 items-center">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input type="text" placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
          <div className="flex gap-1.5">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`p-2 rounded-xl transition-colors ${view === v ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                <span className="material-symbols-outlined text-lg">{v === "grid" ? "grid_view" : "view_list"}</span>
              </button>
            ))}
          </div>
        </div>

        {view === "grid" ? (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((s) => (
              <div key={s.id} className="border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {s.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{s.name}</div>
                    <div className="text-[10px] text-slate-400">{s.id}</div>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-slate-300">mail</span>{s.email}</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-slate-300">location_on</span>{s.city}</div>
                  <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-slate-300">assignment</span>{s.apps} Applications</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{s.status}</span>
                  <span className="text-[10px] text-slate-400">{s.joined}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Student", "Email", "Phone", "City", "Apps", "Status", "Joined"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                          {s.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                          <div className="text-[10px] text-slate-400">{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{s.email}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{s.phone}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">{s.city}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{s.apps}</td>
                    <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${s.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{s.status}</span></td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{s.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
