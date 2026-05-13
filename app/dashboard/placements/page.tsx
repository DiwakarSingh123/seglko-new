"use client";
import { useState, Fragment } from "react";
import GalleryTab from "../components/GalleryTab";

type PlacementRecord = {
  id: number; student: string; program: string; company: string;
  pkg: string; role: string; year: string; institution: string; color: string;
};

const initialRecords: PlacementRecord[] = [
  { id: 1, student: "Rahul Sharma", program: "B.Tech CSE", company: "TCS", pkg: "₹6.5 LPA", role: "Software Engineer", year: "2024", institution: "SIET", color: "from-blue-400 to-blue-600" },
  { id: 2, student: "Priya Singh", program: "MBA", company: "HDFC Bank", pkg: "₹8.2 LPA", role: "Management Trainee", year: "2024", institution: "SIMS", color: "from-purple-400 to-purple-600" },
  { id: 3, student: "Amit Patel", program: "B.Tech ECE", company: "Infosys", pkg: "₹5.5 LPA", role: "Systems Engineer", year: "2024", institution: "SIET", color: "from-emerald-400 to-emerald-600" },
  { id: 4, student: "Sneha Reddy", program: "MCA", company: "Wipro", pkg: "₹6.0 LPA", role: "Project Engineer", year: "2024", institution: "SIET", color: "from-orange-400 to-orange-600" },
  { id: 5, student: "Vikram Malhotra", program: "B.Tech CSE", company: "HCL Technologies", pkg: "₹7.0 LPA", role: "Software Developer", year: "2023", institution: "SIET", color: "from-rose-400 to-rose-600" },
  { id: 6, student: "Anjali Gupta", program: "MBA", company: "Deloitte", pkg: "₹9.5 LPA", role: "Business Analyst", year: "2023", institution: "SIMS", color: "from-teal-400 to-teal-600" },
];

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
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [expandedRecordId, setExpandedRecordId] = useState<number | null>(null);
  const [records, setRecords] = useState<PlacementRecord[]>(initialRecords);
  const [editingRecord, setEditingRecord] = useState<PlacementRecord | null>(null);
  const [newStudent, setNewStudent] = useState("");
  const [newProgram, setNewProgram] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPkg, setNewPkg] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [formError, setFormError] = useState("");

  const sessions = ["All", "2024", "2023"];
  const filtered = records.filter((p) => session === "All" || p.year === session);

  const handleDelete = (id: number) => setRecords((prev) => prev.filter((p) => p.id !== id));

  const handleEditSave = () => {
    if (!editingRecord) return;
    setRecords((prev) => prev.map((p) => p.id === editingRecord.id ? editingRecord : p));
    setEditingRecord(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setNewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveRecord = () => {
    if (session === "All") { setFormError("Please choose a specific session before saving."); return; }
    if (!newStudent || !newProgram || !newCompany || !newRole || !newPkg) { setFormError("Please fill in all required fields."); return; }
    const newRecord: PlacementRecord = {
      id: Date.now(), student: newStudent, program: newProgram, company: newCompany,
      pkg: newPkg, role: newRole, year: session, institution: "SIET", color: "from-indigo-400 to-indigo-600",
    };
    setRecords((prev) => [...prev, newRecord]);
    setFormError("");
    setShowAddRecord(false);
    setNewStudent(""); setNewProgram(""); setNewCompany(""); setNewRole(""); setNewPkg(""); setNewImage(null);
  };

  return (
    <div className="space-y-5">
      {/* Edit Modal */}
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
              <input value={editingRecord.student} onChange={(e) => setEditingRecord({ ...editingRecord, student: e.target.value })} placeholder="Student name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={editingRecord.program} onChange={(e) => setEditingRecord({ ...editingRecord, program: e.target.value })} placeholder="Program" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={editingRecord.company} onChange={(e) => setEditingRecord({ ...editingRecord, company: e.target.value })} placeholder="Company" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={editingRecord.role} onChange={(e) => setEditingRecord({ ...editingRecord, role: e.target.value })} placeholder="Role" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={editingRecord.pkg} onChange={(e) => setEditingRecord({ ...editingRecord, pkg: e.target.value })} placeholder="Package" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={editingRecord.year} onChange={(e) => setEditingRecord({ ...editingRecord, year: e.target.value })} placeholder="Year" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
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

      {showAddRecord ? (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Adding record for session</p>
              <p className="text-lg font-black text-slate-800">{session === "All" ? "Please choose a specific session" : session}</p>
            </div>
            <button onClick={() => setShowAddRecord(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-semibold">
              <span className="material-symbols-outlined text-base">close</span>Cancel
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] font-semibold text-slate-400">Session</div>
              <div className="flex flex-wrap gap-2 mt-3">
                {sessions.map((s) => (
                  <button key={s} onClick={() => setSession(s)}
                    className={`px-3 py-2 rounded-2xl text-xs font-semibold transition-all ${session === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={newStudent} onChange={(e) => setNewStudent(e.target.value)} type="text" placeholder="Student name" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={newProgram} onChange={(e) => setNewProgram(e.target.value)} type="text" placeholder="Program" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} type="text" placeholder="Company" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={newRole} onChange={(e) => setNewRole(e.target.value)} type="text" placeholder="Role" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <input value={newPkg} onChange={(e) => setNewPkg(e.target.value)} type="text" placeholder="Package (e.g. ₹6.5 LPA)" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Session: <span className="font-semibold text-slate-800">{session === "All" ? "Select session above" : session}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-700" />
              </div>
              {newImage && (
                <div className="rounded-2xl border border-slate-200 p-3 bg-slate-50">
                  <img src={newImage} alt="Preview" className="h-32 w-full object-cover rounded-2xl" />
                </div>
              )}
            </div>
            {formError && <div className="text-sm text-rose-600">{formError}</div>}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button onClick={() => setShowAddRecord(false)} className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={handleSaveRecord} className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">Save Record</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Students Placed", value: "1,284", icon: "work", color: "bg-indigo-500" },
              { label: "Avg Package", value: "₹6.8 LPA", icon: "payments", color: "bg-emerald-500" },
              { label: "Highest Package", value: "₹24 LPA", icon: "trending_up", color: "bg-amber-500" },
              { label: "Recruiters", value: recruiters.length + "+", icon: "business", color: "bg-purple-500" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                  <span className="material-symbols-outlined text-lg">{s.icon}</span>
                </div>
                <div className="text-2xl font-black text-slate-800">{s.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
            {[
              { id: "records", label: "Placement Records", icon: "work_history" },
              { id: "recruiters", label: "Recruiters", icon: "business" },
              { id: "stats", label: "Statistics", icon: "bar_chart" },
              { id: "gallery", label: "Gallery", icon: "photo_library" },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
                <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          {tab === "records" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Session</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {sessions.map((s) => (
                    <button key={s} onClick={() => setSession(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${session === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {["Student", "Program", "Company", "Role", "Package", "Year", ""].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <Fragment key={p.id}>
                        <tr className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                                {p.student.split(" ").map((n) => n[0]).join("")}
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
                              <button onClick={() => setEditingRecord(p)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                                <span className="material-symbols-outlined text-sm">edit</span>
                              </button>
                              <button onClick={() => handleDelete(p.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                              <button onClick={() => setExpandedRecordId(expandedRecordId === p.id ? null : p.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
                                <span className="material-symbols-outlined text-sm">visibility</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRecordId === p.id && (
                          <tr className="bg-slate-50">
                            <td colSpan={7} className="px-5 py-4 text-sm text-slate-700">
                              <div className="grid gap-3 md:grid-cols-3">
                                <div>
                                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Session</div>
                                  <div className="mt-1 font-semibold text-slate-800">{p.year}</div>
                                </div>
                                <div>
                                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Institution</div>
                                  <div className="mt-1 font-semibold text-slate-800">{p.institution}</div>
                                </div>
                                <div>
                                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Package</div>
                                  <div className="mt-1 font-semibold text-slate-800">{p.pkg}</div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "recruiters" && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-black text-slate-800">Top Recruiters</h2>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>Add Recruiter
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recruiters.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className={`h-12 w-12 rounded-xl ${r.color} flex items-center justify-center text-white font-black text-lg shadow-md`}>
                      {r.logo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{r.name}</div>
                      <div className="text-xs text-slate-400">{r.count} students placed</div>
                    </div>
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
                  {[
                    { name: "SIET", placed: 680, total: 800, color: "bg-indigo-500" },
                    { name: "SIMS", placed: 320, total: 360, color: "bg-purple-500" },
                    { name: "SCP", placed: 180, total: 200, color: "bg-emerald-500" },
                    { name: "SCOE", placed: 104, total: 120, color: "bg-amber-500" },
                  ].map((i) => (
                    <div key={i.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">{i.name}</span>
                        <span className="text-slate-400">{`${i.placed}/${i.total}`}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${i.color} rounded-full`} style={{ width: `${(i.placed / i.total) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-sm font-black text-slate-800 mb-4">Package Distribution</h3>
                <div className="space-y-3">
                  {[
                    { range: "Above ₹10 LPA", count: 124, pct: 10, color: "bg-emerald-500" },
                    { range: "₹7 - ₹10 LPA", count: 380, pct: 30, color: "bg-blue-500" },
                    { range: "₹5 - ₹7 LPA", count: 510, pct: 40, color: "bg-indigo-500" },
                    { range: "Below ₹5 LPA", count: 270, pct: 20, color: "bg-slate-400" },
                  ].map((p) => (
                    <div key={p.range}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">{p.range}</span>
                        <span className="text-slate-400">{p.count} students</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === "gallery" && <GalleryTab section="Placements" categories={["Placement Drive", "Award Ceremony", "Company Visit", "General"]} />}
        </div>
      )}
    </div>
  );
}
