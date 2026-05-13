"use client";
import { useState } from "react";

const data = [
  { id: "#AP-1284", student: "Rahul Sharma", email: "rahul@email.com", university: "IIT Delhi", course: "B.Tech CSE", date: "Jan 15, 2024", status: "Pending", fee: "₹2,500", color: "from-orange-400 to-orange-600" },
  { id: "#AP-1283", student: "Priya Singh", email: "priya@email.com", university: "Stanford University", course: "MS Computer Science", date: "Jan 14, 2024", status: "Accepted", fee: "₹5,000", color: "from-blue-400 to-blue-600" },
  { id: "#AP-1282", student: "Amit Patel", email: "amit@email.com", university: "Univ. of Toronto", course: "MBA", date: "Jan 13, 2024", status: "Rejected", fee: "₹3,500", color: "from-emerald-400 to-emerald-600" },
  { id: "#AP-1281", student: "Sneha Reddy", email: "sneha@email.com", university: "Oxford University", course: "MSc Data Science", date: "Jan 12, 2024", status: "In Review", fee: "₹4,500", color: "from-purple-400 to-purple-600" },
  { id: "#AP-1280", student: "Vikram Malhotra", email: "vikram@email.com", university: "MIT", course: "PhD AI", date: "Jan 11, 2024", status: "Accepted", fee: "₹5,000", color: "from-rose-400 to-rose-600" },
  { id: "#AP-1279", student: "Anjali Gupta", email: "anjali@email.com", university: "IIT Bombay", course: "B.Tech ECE", date: "Jan 10, 2024", status: "Pending", fee: "₹2,500", color: "from-amber-400 to-amber-600" },
  { id: "#AP-1278", student: "Rohan Verma", email: "rohan@email.com", university: "NUS Singapore", course: "MS Finance", date: "Jan 9, 2024", status: "In Review", fee: "₹4,000", color: "from-teal-400 to-teal-600" },
  { id: "#AP-1277", student: "Kavya Nair", email: "kavya@email.com", university: "Cambridge University", course: "LLM", date: "Jan 8, 2024", status: "Accepted", fee: "₹5,000", color: "from-pink-400 to-pink-600" },
];

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  "In Review": "bg-blue-100 text-blue-700",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = data.filter((a) => {
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
                        {a.student.split(" ").map(n => n[0]).join("")}
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
          <span className="text-xs text-slate-400">Showing {filtered.length} of {data.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">Previous</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
