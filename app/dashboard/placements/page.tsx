"use client";
import { useState, useEffect, Fragment } from "react";
import GalleryTab from "../components/GalleryTab";

type PlacementRecord = {
  id: number; student: string; program: string; company: string;
  pkg: string; role: string; year: string; institution: string; color: string;
};

const recruiters = [
  { name: "TCS", logo: "T", color: "bg-blue-600", count: 45 },
  { name: "Infosys", logo: "I", color: "bg-indigo-600", count: 38 },
  { name: "Wipro", logo: "W", color: "bg-violet-600", count: 32 },
  { name: "HCL", logo: "H", color: "bg-emerald-600", count: 28 },
  { name: "Deloitte", logo: "D", color: "bg-green-700", count: 22 },
  { name: "HDFC Bank", logo: "H", color: "bg-rose-600", count: 18 },
];

export default function PlacementsPage() {
  const [tab, setTab] = useState<"records" | "recruiters" | "stats" | "gallery">("records");
  const [session, setSession] = useState("All");
  const [records, setRecords] = useState<PlacementRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState<PlacementRecord | null>(null);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [expandedRecordId, setExpandedRecordId] = useState<number | null>(null);
  const [newRecord, setNewRecord] = useState({ student: "", program: "", company: "", role: "", pkg: "" });
  const [formError, setFormError] = useState("");

  const sessions = ["All", "2024", "2023"];
  const filtered = records.filter(p => session === "All" || p.year === session);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/placements");
      if (res.ok) setRecords(await res.json());
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/placements?id=${id}`, { method: "DELETE" });
    setRecords(prev => prev.filter(p => p.id !== id));
  };

  const handleEditSave = async () => {
    if (!editingRecord) return;
    await fetch("/api/placements", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingRecord) });
    setRecords(prev => prev.map(p => p.id === editingRecord.id ? editingRecord : p));
    setEditingRecord(null);
  };

  const handleSaveRecord = async () => {
    if (session === "All") { setFormError("Please choose a specific session before saving."); return; }
    if (!newRecord.student || !newRecord.program || !newRecord.company || !newRecord.role || !newRecord.pkg) {
      setFormError("Please fill in all required fields."); return;
    }
    const payload = { ...newRecord, year: session, institution: "SIET", color: "from-indigo-400 to-indigo-600" };
    const res = await fetch("/api/placements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      const saved = await res.json();
      setRecords(prev => [...prev, saved]);
    }
    setFormError(""); setShowAddRecord(false);
    setNewRecord({ student: "", program: "", company: "", role: "", pkg: "" });
  };

  return (
    <div className="space-y-5">
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Record</h2>
              <button onClick={() => setEditingRecord(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(["student", "program", "company", "role", "pkg", "year"] as const).map(field => (
                <input key={field} value={editingRecord[field]} onChange={e => setEditingRecord({ ...editingRecord, [field]: e.target.value })}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingRecord(null)} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleEditSave} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Placements</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage placement session records, recruiters and statistics</p>
        </div>
        <button onClick={() => setShowAddRecord(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>Add Record
        </button>
      </div>

      {showAddRecord && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-black text-slate-800">New Placement Record</p>
            <button onClick={() => setShowAddRecord(false)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sessions.map(s => <button key={s} onClick={() => setSession(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${session === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{s}</button>)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[["student", "Student Name"], ["program", "Program"], ["company", "Company"], ["role", "Role"], ["pkg", "Package (e.g. ₹6.5 LPA)"]].map(([key, label]) => (
              <input key={key} value={(newRecord as any)[key]} onChange={e => setNewRecord({ ...newRecord, [key]: e.target.value })}
                placeholder={label} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            ))}
          </div>
          {formError && <p className="text-sm text-rose-600">{formError}</p>}
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowAddRecord(false)} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700">Cancel</button>
            <button onClick={handleSaveRecord} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save Record</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Students Placed", value: records.length, icon: "work", color: "bg-indigo-500" },
          { label: "Avg Package", value: "₹6.8 LPA", icon: "payments", color: "bg-emerald-500" },
          { label: "Highest Package", value: "₹24 LPA", icon: "trending_up", color: "bg-amber-500" },
          { label: "Recruiters", value: recruiters.length + "+", icon: "business", color: "bg-purple-500" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center text-white mb-3 shadow-md`}>
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{isLoading ? "..." : s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
        {[{ id: "records", label: "Records", icon: "work_history" }, { id: "recruiters", label: "Recruiters", icon: "business" }, { id: "stats", label: "Statistics", icon: "bar_chart" }, { id: "gallery", label: "Gallery", icon: "photo_library" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "records" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <div className="flex flex-wrap gap-2">
              {sessions.map(s => <button key={s} onClick={() => setSession(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${session === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{s}</button>)}
            </div>
          </div>
          {isLoading ? <p className="p-5 text-slate-500">Loading placement records...</p> : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-slate-100">
                  {["Student", "Program", "Company", "Role", "Package", "Year", ""].map(h => <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>)}
                </tr></thead>
                <tbody>
                  {filtered.map(p => (
                    <Fragment key={p.id}>
                      <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                              {p.student.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="text-sm font-semibold text-slate-800">{p.student}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{p.program}</span></td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{p.company}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-500">{p.role}</td>
                        <td className="px-5 py-3.5 text-sm font-black text-emerald-600">{p.pkg}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-400">{p.year}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex gap-1.5">
                            <button onClick={() => setEditingRecord(p)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100">
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                            <button onClick={() => setExpandedRecordId(expandedRecordId === p.id ? null : p.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100">
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRecordId === p.id && (
                        <tr className="bg-slate-50">
                          <td colSpan={7} className="px-5 py-4 text-sm text-slate-700">
                            <div className="grid gap-3 md:grid-cols-3">
                              <div><div className="text-xs uppercase tracking-wider text-slate-400">Session</div><div className="mt-1 font-semibold">{p.year}</div></div>
                              <div><div className="text-xs uppercase tracking-wider text-slate-400">Institution</div><div className="mt-1 font-semibold">{p.institution}</div></div>
                              <div><div className="text-xs uppercase tracking-wider text-slate-400">Package</div><div className="mt-1 font-semibold text-emerald-600">{p.pkg}</div></div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "recruiters" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-slate-800 mb-5">Top Recruiters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {recruiters.map(r => (
              <div key={r.name} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className={`h-12 w-12 rounded-xl ${r.color} flex items-center justify-center text-white font-black text-lg shadow-md`}>{r.logo}</div>
                <div><div className="text-sm font-bold text-slate-800">{r.name}</div><div className="text-xs text-slate-400">{r.count} students placed</div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "stats" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-800 mb-4">Placement by Institution</h3>
            <div className="space-y-3">
              {[{ name: "SIET", placed: 680, total: 800, color: "bg-indigo-500" }, { name: "SIMS", placed: 320, total: 360, color: "bg-purple-500" }, { name: "SCP", placed: 180, total: 200, color: "bg-emerald-500" }, { name: "SCOE", placed: 104, total: 120, color: "bg-amber-500" }].map(i => (
                <div key={i.name}>
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-700">{i.name}</span><span className="text-slate-400">{i.placed}/{i.total}</span></div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${i.color} rounded-full`} style={{ width: `${(i.placed / i.total) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h3 className="text-sm font-black text-slate-800 mb-4">Package Distribution</h3>
            <div className="space-y-3">
              {[{ range: "Above ₹10 LPA", count: 124, pct: 10, color: "bg-emerald-500" }, { range: "₹7 - ₹10 LPA", count: 380, pct: 30, color: "bg-blue-500" }, { range: "₹5 - ₹7 LPA", count: 510, pct: 40, color: "bg-indigo-500" }, { range: "Below ₹5 LPA", count: 270, pct: 20, color: "bg-slate-400" }].map(p => (
                <div key={p.range}>
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-700">{p.range}</span><span className="text-slate-400">{p.count} students</span></div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "gallery" && <GalleryTab section="Placements" categories={["Placement Drive", "Award Ceremony", "Company Visit", "General"]} />}
    </div>
  );
}
