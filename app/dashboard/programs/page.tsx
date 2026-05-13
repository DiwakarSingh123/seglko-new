"use client";
import { useState } from "react";
import GalleryTab from "../components/GalleryTab";

interface Program {
  id: number;
  name: string;
  level: string;
  duration: string;
  seats: number;
  institution: string;
  status: string;
  fee: string;
}

const initialPrograms: Program[] = [
  { id: 1, name: "B.Tech Computer Science & Engineering", level: "UG", duration: "4 Years", seats: 120, institution: "SIET", status: "Active", fee: "₹85,000/yr" },
  { id: 2, name: "B.Tech Electronics & Communication", level: "UG", duration: "4 Years", seats: 60, institution: "SIET", status: "Active", fee: "₹85,000/yr" },
  { id: 3, name: "B.Tech Mechanical Engineering", level: "UG", duration: "4 Years", seats: 60, institution: "SIET", status: "Active", fee: "₹80,000/yr" },
  { id: 4, name: "MBA (Master of Business Administration)", level: "PG", duration: "2 Years", seats: 60, institution: "SIMS", status: "Active", fee: "₹95,000/yr" },
  { id: 5, name: "MCA (Master of Computer Applications)", level: "PG", duration: "2 Years", seats: 60, institution: "SIET", status: "Active", fee: "₹75,000/yr" },
  { id: 6, name: "BBA (Bachelor of Business Administration)", level: "UG", duration: "3 Years", seats: 60, institution: "SIMS", status: "Active", fee: "₹65,000/yr" },
  { id: 7, name: "B.Pharm (Bachelor of Pharmacy)", level: "UG", duration: "4 Years", seats: 60, institution: "SCP", status: "Active", fee: "₹90,000/yr" },
  { id: 8, name: "D.Pharm (Diploma in Pharmacy)", level: "Diploma", duration: "2 Years", seats: 60, institution: "SCP", status: "Active", fee: "₹55,000/yr" },
  { id: 9, name: "B.Ed (Bachelor of Education)", level: "UG", duration: "2 Years", seats: 100, institution: "SCOE", status: "Active", fee: "₹50,000/yr" },
  { id: 10, name: "M.Ed (Master of Education)", level: "PG", duration: "2 Years", seats: 50, institution: "SCOE", status: "Active", fee: "₹55,000/yr" },
];

const levelColors: Record<string, string> = {
  UG: "bg-blue-100 text-blue-700",
  PG: "bg-purple-100 text-purple-700",
  Diploma: "bg-amber-100 text-amber-700",
};

export default function ProgramsPage() {
  const [tab, setTab] = useState<"list" | "gallery">("list");
  const [programsList, setProgramsList] = useState<Program[]>(initialPrograms);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");

  const filtered = programsList.filter((p) => {
    const s = p.name.toLowerCase().includes(search.toLowerCase()) || p.institution.toLowerCase().includes(search.toLowerCase());
    const l = level === "All" || p.level === level;
    return s && l;
  });

  const addProgram = () => {
    const nextId = programsList.length ? Math.max(...programsList.map((p) => p.id)) + 1 : 1;
    setProgramsList([...programsList, { id: nextId, name: "New Program", level: "UG", duration: "0 Years", seats: 0, institution: "New Institution", status: "Active", fee: "₹0/yr" }]);
  };

  const updateProgram = (id: number, field: keyof Program, value: string | number) => {
    setProgramsList(programsList.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const deleteProgram = (id: number) => {
    setProgramsList(programsList.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Programs</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all academic programs offered by SEG institutions</p>
        </div>
        <button onClick={addProgram} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>Add Program
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Programs", value: programsList.length, icon: "menu_book", color: "bg-indigo-500" },
          { label: "UG Programs", value: programsList.filter(p => p.level === "UG").length, icon: "school", color: "bg-blue-500" },
          { label: "PG Programs", value: programsList.filter(p => p.level === "PG").length, icon: "workspace_premium", color: "bg-purple-500" },
          { label: "Total Seats", value: programsList.reduce((a, p) => a + p.seats, 0), icon: "chair", color: "bg-emerald-500" },
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

      <div className="flex gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
        {[
          { id: "list", label: "Programs List", icon: "menu_book" },
          { id: "gallery", label: "Gallery", icon: "photo_library" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "gallery" && <GalleryTab section="Programs" categories={["Engineering", "Management", "Pharmacy", "Education", "General"]} />}

      {tab === "list" && (
        <div className="space-y-4">
          {programsList.map((program) => (
            <div key={program.id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Program {program.id}: {program.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">Edit this program content.</p>
                </div>
                <button onClick={() => deleteProgram(program.id)} className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors">
                  <span className="material-symbols-outlined">delete</span>Delete
                </button>
              </div>
              <div className="grid gap-4 lg:grid-cols-3 mt-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Name</label>
                  <input type="text" value={program.name} onChange={(e) => updateProgram(program.id, "name", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Level</label>
                  <input type="text" value={program.level} onChange={(e) => updateProgram(program.id, "level", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Duration</label>
                  <input type="text" value={program.duration} onChange={(e) => updateProgram(program.id, "duration", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-3 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Seats</label>
                  <input type="number" value={program.seats} onChange={(e) => updateProgram(program.id, "seats", Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Institution</label>
                  <input type="text" value={program.institution} onChange={(e) => updateProgram(program.id, "institution", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Fee</label>
                  <input type="text" value={program.fee} onChange={(e) => updateProgram(program.id, "fee", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Status</label>
                <input type="text" value={program.status} onChange={(e) => updateProgram(program.id, "status", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 max-w-xs" />
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input type="text" placeholder="Search programs..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>
              <div className="flex gap-2">
                {["All", "UG", "PG", "Diploma"].map((l) => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${level === l ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Program Name", "Level", "Duration", "Institution", "Seats", "Fee", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{p.name}</td>
                      <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${levelColors[p.level]}`}>{p.level}</span></td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">{p.duration}</td>
                      <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{p.institution}</span></td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{p.seats}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">{p.fee}</td>
                      <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">{p.status}</span></td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1.5">
                          <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button onClick={() => deleteProgram(p.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Showing {filtered.length} of {programsList.length} programs</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
