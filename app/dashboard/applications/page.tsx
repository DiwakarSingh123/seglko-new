"use client";
import { useState, useEffect } from "react";
import { resolveInstitutionName, type InstitutionRecord } from "@/lib/institution-utils";

const statusStyle: Record<string, string> = {
  Accepted: "bg-emerald-100 text-emerald-700",
  accepted: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  pending: "bg-amber-100 text-amber-700",
  Rejected: "bg-rose-100 text-rose-700",
  rejected: "bg-rose-100 text-rose-700",
  "In Review": "bg-blue-100 text-blue-700",
  "in review": "bg-blue-100 text-blue-700",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [applicationType, setApplicationType] = useState("admission"); // "admission" or "job"
  const [admissionApps, setAdmissionApps] = useState<any[]>([]);
  const [jobApps, setJobApps] = useState<any[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, jobAppsRes, instsRes] = await Promise.all([
          fetch("/api/applications"),
          fetch("/api/job-applications"),
          fetch("/api/institutions"),
        ]);
        const apps = await appsRes.json();
        const jobAppsData = await jobAppsRes.json();
        const insts = await instsRes.json();
        
        if (Array.isArray(apps)) setAdmissionApps(apps);
        if (Array.isArray(jobAppsData)) setJobApps(jobAppsData);
        if (Array.isArray(insts)) setInstitutions(insts);
        console.log('Fetched applications:', { apps: apps?.length, jobApps: jobAppsData?.length });
      } catch (err) {
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Auto-refresh every 3 seconds to see new applications
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getInstitutionLabel = (university: string) =>
    resolveInstitutionName(university, institutions);

  const applications = applicationType === "admission" ? admissionApps : jobApps;

  const filtered = applications.filter((a) => {
    if (applicationType === "admission") {
      const institutionLabel = getInstitutionLabel(a.university || "").toLowerCase();
      const s =
        (a.student || "").toLowerCase().includes(search.toLowerCase()) ||
        institutionLabel.includes(search.toLowerCase());
      const f = filter === "All" || a.status === filter;
      return s && f;
    } else {
      const s =
        (a.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (a.position || "").toLowerCase().includes(search.toLowerCase());
      const f = filter === "All" || (a.status || "pending") === filter.toLowerCase();
      return s && f;
    }
  });

  const renderAdmissionRow = (a: any) => (
    <tr key={a.id || a._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
            {(a.student || "").split(" ").map((n: string) => n[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{a.student}</div>
            <div className="text-[10px] text-slate-400">{a.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500 max-w-[220px]">
        <span className="line-clamp-2">{getInstitutionLabel(a.university)}</span>
      </td>
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
  );

  const renderJobRow = (a: any) => (
    <tr key={a._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
            {(a.name || "").split(" ").map((n: string) => n[0]).join("").substring(0, 2)}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{a.name}</div>
            <div className="text-[10px] text-slate-400">{a.email}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-500">{a.position}</td>
      <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{a.qualification}</span></td>
      <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status]}`}>{a.status || "pending"}</span></td>
      <td className="px-5 py-3.5 text-sm text-slate-400">{new Date(a.createdAt).toLocaleDateString()}</td>
      <td className="px-5 py-3.5 text-sm text-slate-600">{a.experience || "—"}</td>
      <td className="px-5 py-3.5">
        <button className="h-7 w-7 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors">
          <span className="material-symbols-outlined text-white text-sm">arrow_forward</span>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Applications</h1>
          <p className="text-sm text-slate-400 mt-0.5">Track and manage all {applicationType === "admission" ? "student" : "job"} applications</p>
        </div>
      </div>

      {/* Application Type Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => { setApplicationType("admission"); setFilter("All"); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${applicationType === "admission" ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          <span className="material-symbols-outlined inline mr-2 text-base align-text-bottom">school</span>
          Admission Applications ({admissionApps.length})
        </button>
        <button
          onClick={() => { setApplicationType("job"); setFilter("All"); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${applicationType === "job" ? "bg-indigo-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          <span className="material-symbols-outlined inline mr-2 text-base align-text-bottom">work_outline</span>
          Job Applications ({jobApps.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input type="text" placeholder={applicationType === "admission" ? "Search student or institution..." : "Search applicant or position..."}
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {applicationType === "admission" ? (
              ["All", "Pending", "Accepted", "Rejected", "In Review"].map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                  {s}
                </button>
              ))
            ) : (
              ["All", "pending", "Accepted", "Rejected"].map((s) => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                  {s}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {applicationType === "admission" ? (
                  ["Student", "Institution", "Course", "Status", "Date", "Fee", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))
                ) : (
                  ["Applicant", "Position", "Qualification", "Status", "Date", "Experience", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (applicationType === "admission" ? renderAdmissionRow(a) : renderJobRow(a)))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-4xl block mb-2">search_off</span>
              No {applicationType} applications found
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
