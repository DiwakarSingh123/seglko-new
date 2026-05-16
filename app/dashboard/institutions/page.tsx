"use client";
import { useState, useEffect } from "react";
import GalleryTab from "../components/GalleryTab";

interface Institution {
  id: number; title: string; code: string; tag: string;
  date: { day: string; month: string; year: string };
  approval: string; description: string; url: string;
  image: string; category: string; short: string; type: string;
  estd: number; programs: number; students: number;
  location: string; status: string; affiliation: string; color: string;
}

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"list" | "gallery">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/institutions");
      if (res.ok) setInstitutions(await res.json());
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const filtered = institutions.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase())
  );

  const updateField = (id: number, field: keyof Institution, value: any) =>
    setInstitutions(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));

  const save = async (inst: Institution) => {
    await fetch("/api/institutions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inst) });
    alert(`Saved "${inst.title}" successfully!`);
    setEditingId(null);
  };

  const del = async (id: number) => {
    if (!confirm("Delete this institution?")) return;
    await fetch(`/api/institutions?id=${id}`, { method: "DELETE" });
    setInstitutions(prev => prev.filter(i => i.id !== id));
  };

  const add = async () => {
    const newInst = {
      title: "New Institution", code: "NEW", tag: "ENGINEERING",
      date: { day: "01", month: "JAN", year: "2026" },
      approval: "Pending approval.", description: "Description here...",
      url: "https://seglko.org/", image: "program1", category: "Engineering",
      short: "NEW", type: "Engineering", estd: 2024, programs: 1,
      students: 0, location: "Lucknow, UP", status: "Active",
      affiliation: "AKTU", color: "from-blue-500 to-blue-700"
    };
    const res = await fetch("/api/institutions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newInst) });
    if (res.ok) { const saved = await res.json(); setInstitutions(prev => [...prev, saved]); setEditingId(saved.id); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Our Institutions</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all institutions under Saroj Educational Group</p>
        </div>
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>Add Institution
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Institutions", value: institutions.length, icon: "account_balance", color: "bg-indigo-500" },
          { label: "Total Programs", value: institutions.reduce((a, i) => a + i.programs, 0), icon: "menu_book", color: "bg-blue-500" },
          { label: "Total Students", value: institutions.reduce((a, i) => a + i.students, 0).toLocaleString(), icon: "group", color: "bg-emerald-500" },
          { label: "Est. Since", value: institutions.length ? Math.min(...institutions.map(i => i.estd)) : "—", icon: "history_edu", color: "bg-amber-500" },
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
        {[{ id: "list", label: "Institutions", icon: "account_balance" }, { id: "gallery", label: "Gallery", icon: "photo_library" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "gallery" && <GalleryTab section="Institutions" categories={["SIET", "SIMS", "SCP", "SCOE", "SMCH", "General"]} />}

      {tab === "list" && (
        <>
          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input type="text" placeholder="Search institutions..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm" />
          </div>

          {isLoading && <p className="text-slate-500 p-4">Loading institutions...</p>}

          <div className="space-y-4">
            {!isLoading && filtered.map(inst => (
              <div key={inst.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className={`h-1.5 w-full bg-gradient-to-r ${inst.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-white font-black text-sm shadow-md`}>{inst.short}</div>
                      <div>
                        <div className="font-black text-slate-800">{inst.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{inst.location} · {inst.affiliation}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === inst.id ? null : inst.id)} className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-xs font-semibold">
                        <span className="material-symbols-outlined text-sm">{editingId === inst.id ? "expand_less" : "edit"}</span>{editingId === inst.id ? "Collapse" : "Edit"}
                      </button>
                      {editingId === inst.id && (
                        <button onClick={() => save(inst)} className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-xs font-semibold">
                          <span className="material-symbols-outlined text-sm">save</span>Save
                        </button>
                      )}
                      <button onClick={() => del(inst.id)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  {editingId === inst.id && (
                    <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Title</label>
                          <input value={inst.title} onChange={e => updateField(inst.id, "title", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Tag</label>
                          <input value={inst.tag} onChange={e => updateField(inst.id, "tag", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Description</label>
                          <textarea rows={2} value={inst.description} onChange={e => updateField(inst.id, "description", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Approval Text</label>
                          <textarea rows={2} value={inst.approval} onChange={e => updateField(inst.id, "approval", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">URL</label>
                          <input value={inst.url} onChange={e => updateField(inst.id, "url", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Category</label>
                          <input value={inst.category} onChange={e => updateField(inst.id, "category", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Students</label>
                          <input type="number" value={inst.students} onChange={e => updateField(inst.id, "students", parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Programs</label>
                          <input type="number" value={inst.programs} onChange={e => updateField(inst.id, "programs", parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                      </div>
                    </div>
                  )}

                  {editingId !== inst.id && (
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">{inst.description}</p>
                      <div className="flex gap-4 mt-3 text-xs text-slate-400">
                        <span>📚 {inst.programs} Programs</span>
                        <span>👥 {inst.students.toLocaleString()} Students</span>
                        <span>📅 Est. {inst.estd}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
