"use client";
import { useState } from "react";
import GalleryTab from "../components/GalleryTab";

const institutions = [
  { id: 1, name: "Saroj Institute of Engineering & Technology", short: "SIET", type: "Engineering", estd: 2001, programs: 8, students: 4200, location: "Lucknow, UP", status: "Active", affiliation: "AKTU", color: "from-blue-500 to-blue-700" },
  { id: 2, name: "Saroj Institute of Management Studies", short: "SIMS", type: "Management", estd: 2005, programs: 4, students: 1800, location: "Lucknow, UP", status: "Active", affiliation: "AKTU", color: "from-purple-500 to-purple-700" },
  { id: 3, name: "Saroj College of Pharmacy", short: "SCP", type: "Pharmacy", estd: 2003, programs: 3, students: 900, location: "Lucknow, UP", status: "Active", affiliation: "AKTU", color: "from-emerald-500 to-emerald-700" },
  { id: 4, name: "Saroj College of Education", short: "SCOE", type: "Education", estd: 2007, programs: 3, students: 1200, location: "Lucknow, UP", status: "Active", affiliation: "LU", color: "from-amber-500 to-amber-700" },
  { id: 5, name: "Saroj Medical College & Hospital", short: "SMCH", type: "Medical", estd: 2010, programs: 5, students: 600, location: "Lucknow, UP", status: "Active", affiliation: "KGMU", color: "from-rose-500 to-rose-700" },
  { id: 6, name: "Saroj Law College", short: "SLC", type: "Law", estd: 2012, programs: 2, students: 400, location: "Lucknow, UP", status: "Active", affiliation: "LU", color: "from-teal-500 to-teal-700" },
];

export default function InstitutionsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [tab, setTab] = useState<"list" | "gallery">("list");

  const filtered = institutions.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Our Institutions</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all institutions under Saroj Educational Group</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>Add Institution
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Institutions", value: institutions.length, icon: "account_balance", color: "bg-indigo-500" },
          { label: "Total Programs", value: institutions.reduce((a, i) => a + i.programs, 0), icon: "menu_book", color: "bg-blue-500" },
          { label: "Total Students", value: institutions.reduce((a, i) => a + i.students, 0).toLocaleString(), icon: "group", color: "bg-emerald-500" },
          { label: "Est. Since", value: "2001", icon: "history_edu", color: "bg-amber-500" },
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
          { id: "list", label: "Institutions", icon: "account_balance" },
          { id: "gallery", label: "Gallery", icon: "photo_library" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "gallery" && <GalleryTab section="Institutions" categories={["SIET", "SIMS", "SCP", "SCOE", "SMCH", "General"]} />}

      {tab === "list" && (
        <>
      {/* Search */}
      <div className="relative max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
        <input type="text" placeholder="Search institutions..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((inst) => (
          <div key={inst.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <div className={`h-2 w-full bg-gradient-to-r ${inst.color}`} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-white font-black text-sm shadow-md`}>
                  {inst.short}
                </div>
                <div className="flex gap-1.5">
                  <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-black text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors leading-snug">{inst.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                <span className="material-symbols-outlined text-sm">location_on</span>{inst.location}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Programs", value: inst.programs },
                  { label: "Students", value: inst.students.toLocaleString() },
                  { label: "Est.", value: inst.estd },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-2.5 text-center">
                    <div className="text-sm font-black text-slate-800">{s.value}</div>
                    <div className="text-[10px] text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{inst.type}</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-lg">{inst.affiliation}</span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">{inst.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
