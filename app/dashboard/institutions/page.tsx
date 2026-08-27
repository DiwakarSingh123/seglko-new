"use client";
import { useState, useEffect } from "react";
import GalleryTab from "../components/GalleryTab";

interface Institution {
  _id: string; title: string; code: string; tag: string;
  date: { day: string; month: string; year: string };
  approval: string; description: string; url: string;
  image: string; category: string; short: string; type: string;
  estd: number; programs: number; students: number;
  location: string; status: string; affiliation: string; color: string;
  customImage?: string;
}

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"list">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [newInst, setNewInst] = useState({
    title: "", code: "", tag: "ENGINEERING", short: "",
    date: { day: "01", month: "JAN", year: "2026" },
    approval: "", description: "", url: "https://seglko.org/",
    image: "program1", category: "Engineering", type: "Engineering",
    estd: new Date().getFullYear(), programs: 0, students: 0,
    location: "Lucknow, UP", status: "Active", affiliation: "AKTU",
    color: "from-blue-500 to-blue-700", customImage: "",
  });

  const resetNewInst = () => setNewInst({
    title: "", code: "", tag: "ENGINEERING", short: "",
    date: { day: "01", month: "JAN", year: "2026" },
    approval: "", description: "", url: "https://seglko.org/",
    image: "program1", category: "Engineering", type: "Engineering",
    estd: new Date().getFullYear(), programs: 0, students: 0,
    location: "Lucknow, UP", status: "Active", affiliation: "AKTU",
    color: "from-blue-500 to-blue-700", customImage: "",
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/institutions");
      if (res.ok) {
        const data = await res.json();
        setInstitutions(Array.isArray(data) ? data : []);
      }
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const searchTerm = search.toLowerCase();
  const getText = (value: unknown) => String(value ?? "").toLowerCase();
  const getNumber = (value: unknown) => Number(value) || 0;

  const filtered = institutions.filter(i =>
    getText(i.title).includes(searchTerm) || getText(i.type).includes(searchTerm)
  );

  const updateField = (_id: string, field: keyof Institution, value: any) =>
    setInstitutions(prev => prev.map(i => i._id === _id ? { ...i, [field]: value } : i));

  const save = async (inst: Institution) => {
    await fetch("/api/institutions", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inst) });
    alert(`Saved "${inst.title}" successfully!`);
    setEditingId(null);
  };

  const del = async (_id: string) => {
    if (!confirm("Delete this institution?")) return;
    await fetch(`/api/institutions?id=${_id}`, { method: "DELETE" });
    setInstitutions(prev => prev.filter(i => i._id !== _id));
  };

  const handleSaveNew = async () => {
    if (!newInst.title.trim() || !newInst.short.trim()) {
      setFormError("Title and short code are required.");
      return;
    }
    const res = await fetch("/api/institutions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInst),
    });
    if (res.ok) {
      const saved = await res.json();
      setInstitutions(prev => [...prev, saved]);
      setFormError("");
      setShowAddForm(false);
      resetNewInst();
      alert(`Added "${saved.title}" successfully!`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">Our Institutions</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all institutions under Saroj Educational Group</p>
        </div>
        <button onClick={() => { setShowAddForm(true); setFormError(""); }} className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 w-full sm:w-auto">
          <span className="material-symbols-outlined text-lg">add</span>Add Institution
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Institutions", value: institutions.length, icon: "account_balance", color: "bg-indigo-500" },
          { label: "Total Programs", value: institutions.reduce((a, i) => a + getNumber(i.programs), 0), icon: "menu_book", color: "bg-blue-500" },
          { label: "Total Students", value: institutions.reduce((a, i) => a + getNumber(i.students), 0).toLocaleString(), icon: "group", color: "bg-emerald-500" },
          { label: "Est. Since", value: institutions.length ? Math.min(...institutions.map(i => getNumber(i.estd)).filter(Boolean)) || "—" : "—", icon: "history_edu", color: "bg-amber-500" },
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
        {[{ id: "list", label: "Institutions", icon: "account_balance" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "list" && (
        <>
          {showAddForm && (
            <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-black text-slate-800">New Institution</p>
                <button onClick={() => { setShowAddForm(false); setFormError(""); resetNewInst(); }} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                  <span className="material-symbols-outlined text-slate-500">close</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Title</label>
                  <input value={newInst.title} onChange={e => setNewInst({ ...newInst, title: e.target.value })} placeholder="Institution name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Short Code</label>
                  <input value={newInst.short} onChange={e => setNewInst({ ...newInst, short: e.target.value })} placeholder="e.g. SSITM" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Tag</label>
                  <input value={newInst.tag} onChange={e => setNewInst({ ...newInst, tag: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Type / Category</label>
                  <input value={newInst.type} onChange={e => setNewInst({ ...newInst, type: e.target.value, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Location</label>
                  <input value={newInst.location} onChange={e => setNewInst({ ...newInst, location: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Affiliation</label>
                  <input value={newInst.affiliation} onChange={e => setNewInst({ ...newInst, affiliation: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Description</label>
                  <textarea rows={2} value={newInst.description} onChange={e => setNewInst({ ...newInst, description: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Approval Text</label>
                  <textarea rows={2} value={newInst.approval} onChange={e => setNewInst({ ...newInst, approval: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">URL</label>
                  <input value={newInst.url} onChange={e => setNewInst({ ...newInst, url: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Est. Year</label>
                  <input type="number" value={newInst.estd} onChange={e => setNewInst({ ...newInst, estd: parseInt(e.target.value) || 0 })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Programs</label>
                  <input type="number" value={newInst.programs} onChange={e => setNewInst({ ...newInst, programs: parseInt(e.target.value) || 0 })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Students</label>
                  <input type="number" value={newInst.students} onChange={e => setNewInst({ ...newInst, students: parseInt(e.target.value) || 0 })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 mb-1 block">Institution Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: reader.result, folder: 'seglko-institutions' }) });
                        const data = await res.json();
                        if (data.url) setNewInst(prev => ({ ...prev, customImage: data.url }));
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {newInst.customImage && (
                    <div className="relative mt-2">
                      <img src={newInst.customImage} alt="Preview" className="object-cover w-full h-32 border rounded-xl border-slate-200" />
                      <button onClick={() => setNewInst(prev => ({ ...prev, customImage: "" }))} className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600">
                        <span className="text-sm material-symbols-outlined">close</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {formError && <p className="text-sm text-rose-600">{formError}</p>}
              <div className="flex justify-end gap-3">
                <button onClick={() => { setShowAddForm(false); setFormError(""); resetNewInst(); }} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSaveNew} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save Institution</button>
              </div>
            </div>
          )}

          <div className="relative max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input type="text" placeholder="Search institutions..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 transition-all shadow-sm" />
          </div>

          {isLoading && <p className="text-slate-500 p-4">Loading institutions...</p>}

          <div className="space-y-4">
            {!isLoading && filtered.map(inst => (
              <div key={inst._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className={`h-1.5 w-full bg-gradient-to-r ${inst.color}`} />
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-white font-black text-sm shadow-md overflow-hidden`}>
                        {(inst.customImage || inst.image)
                          ? <img src={inst.customImage || inst.image} alt={inst.short} className="w-full h-full object-cover" />
                          : inst.short}
                      </div>
                      <div>
                        <div className="font-black text-slate-800">{inst.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{inst.location} · {inst.affiliation}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === inst._id ? null : inst._id)} className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-xs font-semibold">
                        <span className="material-symbols-outlined text-sm">{editingId === inst._id ? "expand_less" : "edit"}</span>{editingId === inst._id ? "Collapse" : "Edit"}
                      </button>
                      {editingId === inst._id && (
                        <button onClick={() => save(inst)} className="h-8 px-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors text-xs font-semibold">
                          <span className="material-symbols-outlined text-sm">save</span>Save
                        </button>
                      )}
                      <button onClick={() => del(inst._id)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  {editingId === inst._id && (
                    <div className="space-y-3 mt-4 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Title</label>
                          <input value={inst.title} onChange={e => updateField(inst._id, "title", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Tag</label>
                          <input value={inst.tag} onChange={e => updateField(inst._id, "tag", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Description</label>
                          <textarea rows={2} value={inst.description} onChange={e => updateField(inst._id, "description", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Approval Text</label>
                          <textarea rows={2} value={inst.approval} onChange={e => updateField(inst._id, "approval", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">URL</label>
                          <input value={inst.url} onChange={e => updateField(inst._id, "url", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Category</label>
                          <input value={inst.category} onChange={e => updateField(inst._id, "category", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Students</label>
                          <input type="number" value={inst.students} onChange={e => updateField(inst._id, "students", parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div><label className="text-xs font-bold text-slate-600 mb-1 block">Programs</label>
                          <input type="number" value={inst.programs} onChange={e => updateField(inst._id, "programs", parseInt(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" /></div>
                        <div className="col-span-2">
                          <label className="text-xs font-bold text-slate-600 mb-1 block">Institution Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async e => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onloadend = async () => {
                                const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: reader.result, folder: 'seglko-institutions' }) });
                                const data = await res.json();
                                if (data.url) updateField(inst._id, 'customImage', data.url);
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                          />
                          {inst.customImage && (
                            <div className="relative mt-2">
                              <img src={inst.customImage} alt="Institution" className="object-cover w-full h-32 border rounded-xl border-slate-200" />
                              <button
                                onClick={() => updateField(inst._id, "customImage", "")}
                                className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                              >
                                <span className="text-sm material-symbols-outlined">close</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {editingId !== inst._id && (
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">{inst.description}</p>
                      <div className="flex gap-4 mt-3 text-xs text-slate-400">
                        <span>📚 {inst.programs} Programs</span>
                        <span>👥 {inst.students?.toLocaleString()} Students</span>
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
