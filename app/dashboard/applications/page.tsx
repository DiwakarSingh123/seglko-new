"use client";
import { useState, useEffect } from "react";

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  "In Review": "bg-blue-100 text-blue-700",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        if (data) setApplications(data);
        setLoading(false);
      });
  }, []);

  const filtered = applications.filter((a) => {
    const s = a.student.toLowerCase().includes(search.toLowerCase()) || a.university.toLowerCase().includes(search.toLowerCase());
    const f = filter === "All" || a.status === filter;
    return s && f;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Applications</h1>
          <p className="text-sm text-slate-400 mt-0.5">Track and manage all student applications</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>New Application
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input type="text" placeholder="Search student or university..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Pending", "Accepted", "Rejected", "In Review"].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Student", "University", "Course", "Status", "Date", "Fee", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                        {a.student.split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{a.student}</div>
                        <div className="text-[10px] text-slate-400">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{a.university}</td>
                  <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{a.course}</span></td>
                  <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status]}`}>{a.status}</span></td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{a.date}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{a.fee}</td>
                  <td className="px-5 py-3.5">
                    <button className="h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
                      <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-4xl block mb-2">search_off</span>
              No applications found
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Showing {filtered.length} of {applications.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">Previous</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
