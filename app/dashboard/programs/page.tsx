"use client";
import { useState, useEffect } from "react";
import GalleryTab from "../components/GalleryTab";

interface Program {
  _id: string;
  name: string;
  description: string;
  level: string;
  duration: string;
  seats: number;
  institution: string;
  status: string;
  fee: string;
  color: string;
  slug: string;
  icon: string;
  image: string;
  customImage?: string;
  highlights?: { title: string; desc: string }[];
  specializations?: { name: string; desc: string }[];
  whyChoose?: { title: string; desc: string }[];
  careers?: string[];
}

const levelColors: Record<string, string> = {
  UG: "bg-blue-100 text-blue-700",
  PG: "bg-purple-100 text-purple-700",
  Diploma: "bg-amber-100 text-amber-700",
};

export default function ProgramsPage() {
  const [tab, setTab] = useState<"list">("list");
  const [programsList, setProgramsList] = useState<Program[]>([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formError, setFormError] = useState("");
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    level: "UG",
    duration: "0 Years",
    seats: 0,
    institution: "",
    status: "Active",
    fee: "₹0/yr",
    color: "blue",
    slug: "",
    icon: "GearIcon",
    image: "program1",
    customImage: "",
    highlights: [] as { title: string; desc: string }[],
    specializations: [] as { name: string; desc: string }[],
    whyChoose: [] as { title: string; desc: string }[],
    careers: [] as string[],
  });

  const resetNewProgram = () => setNewProgram({
    name: "",
    description: "",
    level: "UG",
    duration: "0 Years",
    seats: 0,
    institution: "",
    status: "Active",
    fee: "₹0/yr",
    color: "blue",
    slug: "",
    icon: "GearIcon",
    image: "program1",
    customImage: "",
    highlights: [],
    specializations: [],
    whyChoose: [],
    careers: [],
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/programs");
      if (res.ok) {
        const data = await res.json();
        setProgramsList(data);
      }
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    }
    setIsLoading(false);
  };

  const filtered = programsList.filter((p) => {
    const s = p.name.toLowerCase().includes(search.toLowerCase()) || p.institution.toLowerCase().includes(search.toLowerCase());
    const l = level === "All" || p.level === level;
    return s && l;
  });

  const handleSaveNew = async () => {
    if (!newProgram.name.trim() || !newProgram.slug.trim()) {
      setFormError("Program name and slug are required.");
      return;
    }
    setIsSubmitting(true);
    setFormError("");
    try {
      let finalImage = newProgram.image;
      if (newProgram.customImage && newProgram.customImage.startsWith("data:")) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: newProgram.customImage, folder: "seglko-programs" }),
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImage = uploadData.url;
        } else {
          setFormError("Failed to upload image to Cloudinary.");
          setIsSubmitting(false);
          return;
        }
      }

      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProgram,
          image: finalImage,
          customImage: undefined,
        }),
      });
      if (res.ok) {
        const saved = await res.json();
        setProgramsList(prev => [...prev, saved]);
        setShowAddForm(false);
        resetNewProgram();
        alert(`Added "${saved.name}" successfully!`);
      } else {
        setFormError("Failed to save program details.");
      }
    } catch (error) {
      console.error("Failed to add program:", error);
      setFormError("An error occurred. Please try again.");
    }
    setIsSubmitting(false);
  };

  const updateProgram = (id: string, field: keyof Program, value: any) => {
    setProgramsList(programsList.map((p) => (p._id === id ? { ...p, [field]: value } : p)));
  };

  const saveProgram = async (program: Program) => {
    setIsSubmitting(true);
    try {
      let finalImage = program.image;
      if (program.customImage && program.customImage.startsWith("data:")) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: program.customImage, folder: "seglko-programs" }),
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImage = uploadData.url;
        } else {
          alert("Failed to upload image to Cloudinary.");
          setIsSubmitting(false);
          return;
        }
      }

      const res = await fetch("/api/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...program,
          image: finalImage,
          customImage: undefined,
        })
      });
      if (res.ok) {
        const saved = await res.json();
        setProgramsList(prev => prev.map((p) => (p._id === saved._id ? saved : p)));
        alert(`Saved ${program.name} successfully!`);
      } else {
        alert("Failed to save program changes.");
      }
    } catch (error) {
      console.error("Failed to save program:", error);
      alert("An error occurred while saving the program.");
    }
    setIsSubmitting(false);
  };

  const deleteProgram = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      const res = await fetch(`/api/programs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProgramsList(programsList.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete program:", error);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Programs</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all academic programs offered by SEG institutions</p>
        </div>
        <button onClick={() => { setShowAddForm(true); setFormError(""); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add</span>Add Program
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Programs", value: programsList.length, icon: "menu_book", color: "bg-indigo-500" },
          { label: "UG Programs", value: programsList.filter(p => p.level === "UG").length, icon: "school", color: "bg-blue-500" },
          { label: "PG Programs", value: programsList.filter(p => p.level === "PG").length, icon: "workspace_premium", color: "bg-purple-500" },
          { label: "Total Seats", value: programsList.reduce((a, p) => a + (p.seats || 0), 0), icon: "chair", color: "bg-emerald-500" },
        ].map((s) => (
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
        {[
          { id: "list", label: "Programs List", icon: "menu_book" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id as typeof tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "text-slate-500 hover:bg-slate-50"}`}>
            <span className="material-symbols-outlined text-lg">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "list" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {["All", "UG", "PG", "Diploma"].map((l) => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${level === l ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="relative w-72 max-w-full shrink-0">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">search</span>
                <input
                  type="text"
                  placeholder="Search programs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                />
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
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-sm text-slate-400">Loading programs...</td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-8 text-center text-sm text-slate-400">No programs found.</td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-800">{p.name}</td>
                        <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${levelColors[p.level] || "bg-slate-100 text-slate-700"}`}>{p.level}</span></td>
                        <td className="px-5 py-3.5 text-sm text-slate-500">{p.duration}</td>
                        <td className="px-5 py-3.5"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg">{p.institution}</span></td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-slate-700">{p.seats}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-500">{p.fee}</td>
                        <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">{p.status}</span></td>
                        <td className="px-5 py-3.5">
                          <div className="flex gap-1.5">
                            <button onClick={() => saveProgram(p)} disabled={isSubmitting} className="h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50">
                              <span className="material-symbols-outlined text-sm">save</span>
                            </button>
                            <button onClick={() => deleteProgram(p._id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">Showing {filtered.length} of {programsList.length} programs</span>
            </div>
          </div>

          {showAddForm && (
            <div className="rounded-3xl border border-indigo-100 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">New Program</h2>
                  <p className="text-sm text-slate-500 mt-1">Fill in the details below and save to add this program.</p>
                </div>
                <button onClick={() => { setShowAddForm(false); setFormError(""); resetNewProgram(); }} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                  <span className="material-symbols-outlined text-slate-500">close</span>
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Name</label>
                  <input type="text" value={newProgram.name} onChange={e => setNewProgram({ ...newProgram, name: e.target.value })} placeholder="e.g. B.Tech Computer Science" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Frontend Slug (URL path)</label>
                  <input type="text" value={newProgram.slug} onChange={e => setNewProgram({ ...newProgram, slug: e.target.value })} placeholder="e.g. btech-cse" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Frontend Description</label>
                <textarea rows={2} value={newProgram.description} onChange={e => setNewProgram({ ...newProgram, description: e.target.value })} placeholder="Brief description here..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>

              <div className="grid gap-4 lg:grid-cols-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Level</label>
                  <input type="text" value={newProgram.level} onChange={e => setNewProgram({ ...newProgram, level: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Duration</label>
                  <input type="text" value={newProgram.duration} onChange={e => setNewProgram({ ...newProgram, duration: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Seats</label>
                  <input type="number" value={newProgram.seats} onChange={e => setNewProgram({ ...newProgram, seats: Number(e.target.value) || 0 })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Institution</label>
                  <input type="text" value={newProgram.institution} onChange={e => setNewProgram({ ...newProgram, institution: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Fee</label>
                  <input type="text" value={newProgram.fee} onChange={e => setNewProgram({ ...newProgram, fee: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Status</label>
                  <input type="text" value={newProgram.status} onChange={e => setNewProgram({ ...newProgram, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Card Color</label>
                  <select value={newProgram.color} onChange={e => setNewProgram({ ...newProgram, color: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="violet">Violet</option>
                    <option value="orange">Orange</option>
                    <option value="cyan">Cyan</option>
                    <option value="rose">Rose</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Icon</label>
                  <select value={newProgram.icon} onChange={e => setNewProgram({ ...newProgram, icon: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="GearIcon">Gear (Engineering)</option>
                    <option value="BagIcon">Briefcase (Management)</option>
                    <option value="CodeIcon">Code (Computers)</option>
                    <option value="DiplomaIcon">Diploma</option>
                    <option value="FlaskIcon">Flask (Pharmacy)</option>
                    <option value="LawIcon">Scale (Law)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setNewProgram(prev => ({ ...prev, customImage: reader.result as string }));
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {(newProgram.customImage || (newProgram.image && (newProgram.image.startsWith("http") || newProgram.image.startsWith("/")))) && (
                  <div className="relative mt-2">
                    <img src={newProgram.customImage || newProgram.image} alt="Preview" className="object-cover w-full h-32 border rounded-xl border-slate-200" />
                    <button onClick={() => setNewProgram(prev => ({ ...prev, customImage: "", image: "" }))} className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600">
                      <span className="text-sm material-symbols-outlined">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Highlights for New Program */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-700 mb-2">Program Highlights</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {newProgram.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-150">
                      <div className="flex-1 space-y-1">
                        <input type="text" placeholder="Title" value={h.title} onChange={e => {
                          const updated = [...newProgram.highlights];
                          updated[i].title = e.target.value;
                          setNewProgram({ ...newProgram, highlights: updated });
                        }} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs outline-none" />
                        <input type="text" placeholder="Description" value={h.desc} onChange={e => {
                          const updated = [...newProgram.highlights];
                          updated[i].desc = e.target.value;
                          setNewProgram({ ...newProgram, highlights: updated });
                        }} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs outline-none" />
                      </div>
                      <button onClick={() => setNewProgram({ ...newProgram, highlights: newProgram.highlights.filter((_, idx) => idx !== i) })} className="text-rose-500 hover:bg-rose-50 p-1 rounded">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setNewProgram({ ...newProgram, highlights: [...newProgram.highlights, { title: "", desc: "" }] })} className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span> Add Highlight
                </button>
              </div>

              {/* Specializations for New Program */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-700 mb-2">Specializations</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {newProgram.specializations.map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-150">
                      <div className="flex-1 space-y-1">
                        <input type="text" placeholder="Name" value={spec.name} onChange={e => {
                          const updated = [...newProgram.specializations];
                          updated[i].name = e.target.value;
                          setNewProgram({ ...newProgram, specializations: updated });
                        }} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs outline-none" />
                        <input type="text" placeholder="Description" value={spec.desc} onChange={e => {
                          const updated = [...newProgram.specializations];
                          updated[i].desc = e.target.value;
                          setNewProgram({ ...newProgram, specializations: updated });
                        }} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs outline-none" />
                      </div>
                      <button onClick={() => setNewProgram({ ...newProgram, specializations: newProgram.specializations.filter((_, idx) => idx !== i) })} className="text-rose-500 hover:bg-rose-50 p-1 rounded">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setNewProgram({ ...newProgram, specializations: [...newProgram.specializations, { name: "", desc: "" }] })} className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span> Add Specialization
                </button>
              </div>

              {/* Why Choose for New Program */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold text-slate-700 mb-2">Why Choose Items</h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {newProgram.whyChoose.map((item, i) => (
                    <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-150">
                      <div className="flex-1 space-y-1">
                        <input type="text" placeholder="Title" value={item.title} onChange={e => {
                          const updated = [...newProgram.whyChoose];
                          updated[i].title = e.target.value;
                          setNewProgram({ ...newProgram, whyChoose: updated });
                        }} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs outline-none" />
                        <input type="text" placeholder="Description" value={item.desc} onChange={e => {
                          const updated = [...newProgram.whyChoose];
                          updated[i].desc = e.target.value;
                          setNewProgram({ ...newProgram, whyChoose: updated });
                        }} className="w-full bg-white border border-slate-200 rounded-lg py-1 px-2 text-xs outline-none" />
                      </div>
                      <button onClick={() => setNewProgram({ ...newProgram, whyChoose: newProgram.whyChoose.filter((_, idx) => idx !== i) })} className="text-rose-500 hover:bg-rose-50 p-1 rounded">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setNewProgram({ ...newProgram, whyChoose: [...newProgram.whyChoose, { title: "", desc: "" }] })} className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">add</span> Add Why Choose
                </button>
              </div>

              {/* Careers for New Program */}
              <div className="border-t border-slate-100 pt-4">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Career Paths (Comma-separated)</label>
                <input type="text" placeholder="e.g. Software Architect, Consultant, R&D Engineer" value={newProgram.careers.join(", ")} onChange={e => {
                  const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                  setNewProgram({ ...newProgram, careers: arr });
                }} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>

              {formError && <p className="text-sm text-rose-600">{formError}</p>}
              <div className="flex justify-end gap-3 border-t border-slate-105 pt-4">
                <button onClick={() => { setShowAddForm(false); setFormError(""); resetNewProgram(); }} disabled={isSubmitting} className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button onClick={handleSaveNew} disabled={isSubmitting} className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
                  {isSubmitting ? "Saving..." : "Save Program"}
                </button>
              </div>
            </div>
          )}

          {!isLoading && programsList.map((program) => (
            <div key={program._id} className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900">Program: {program.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">Edit this program content. Ensure changes are saved!</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => saveProgram(program)} disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50">
                    <span className="material-symbols-outlined">save</span>{isSubmitting ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => deleteProgram(program._id)} className="inline-flex items-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100 transition-colors">
                    <span className="material-symbols-outlined">delete</span>Delete
                  </button>
                </div>
              </div>
              
              <div className="grid gap-4 lg:grid-cols-2 mt-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Name</label>
                  <input type="text" value={program.name || ""} onChange={(e) => updateProgram(program._id, "name", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Frontend Slug (URL path)</label>
                  <input type="text" value={program.slug || ""} onChange={(e) => updateProgram(program._id, "slug", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Frontend Description</label>
                <textarea rows={2} value={program.description || ""} onChange={(e) => updateProgram(program._id, "description", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
              </div>

              <div className="grid gap-4 lg:grid-cols-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Level</label>
                  <input type="text" value={program.level || ""} onChange={(e) => updateProgram(program._id, "level", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Duration</label>
                  <input type="text" value={program.duration || ""} onChange={(e) => updateProgram(program._id, "duration", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Seats</label>
                  <input type="number" value={program.seats || 0} onChange={(e) => updateProgram(program._id, "seats", Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Institution</label>
                  <input type="text" value={program.institution || ""} onChange={(e) => updateProgram(program._id, "institution", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Fee</label>
                  <input type="text" value={program.fee || ""} onChange={(e) => updateProgram(program._id, "fee", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Status</label>
                  <input type="text" value={program.status || ""} onChange={(e) => updateProgram(program._id, "status", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Card Color</label>
                  <select value={program.color || "blue"} onChange={(e) => updateProgram(program._id, "color", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="violet">Violet</option>
                    <option value="orange">Orange</option>
                    <option value="cyan">Cyan</option>
                    <option value="rose">Rose</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Icon</label>
                  <select value={program.icon || "GearIcon"} onChange={(e) => updateProgram(program._id, "icon", e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="GearIcon">Gear (Engineering)</option>
                    <option value="BagIcon">Briefcase (Management)</option>
                    <option value="CodeIcon">Code (Computers)</option>
                    <option value="DiplomaIcon">Diploma</option>
                    <option value="FlaskIcon">Flask (Pharmacy)</option>
                    <option value="LawIcon">Scale (Law)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        updateProgram(program._id, "customImage", reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {(program.customImage || (program.image && (program.image.startsWith("http") || program.image.startsWith("/")))) && (
                  <div className="relative mt-2">
                    <img src={program.customImage || program.image} alt="Program" className="object-cover w-full h-32 border rounded-xl border-slate-200" />
                    <button
                      onClick={() => {
                        updateProgram(program._id, "customImage", "");
                        updateProgram(program._id, "image", "");
                      }}
                      className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                    >
                      <span className="text-sm material-symbols-outlined">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Highlights Editor */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500">star</span>
                  Program Highlights
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {(program.highlights || []).map((h, index) => (
                    <div key={index} className="flex gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Highlight Title"
                          value={h.title || ""}
                          onChange={(e) => {
                            const updated = [...(program.highlights || [])];
                            updated[index] = { ...updated[index], title: e.target.value };
                            updateProgram(program._id, "highlights", updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                          type="text"
                          placeholder="Highlight Description"
                          value={h.desc || ""}
                          onChange={(e) => {
                            const updated = [...(program.highlights || [])];
                            updated[index] = { ...updated[index], desc: e.target.value };
                            updateProgram(program._id, "highlights", updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const updated = (program.highlights || []).filter((_, i) => i !== index);
                          updateProgram(program._id, "highlights", updated);
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg animate-pulse"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(program.highlights || []), { title: "", desc: "" }];
                    updateProgram(program._id, "highlights", updated);
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <span className="material-symbols-outlined text-sm">add</span> Add Highlight
                </button>
              </div>

              {/* Specializations Editor */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500">grid_view</span>
                  Program Specializations
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {(program.specializations || []).map((spec, index) => (
                    <div key={index} className="flex gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Specialization Name"
                          value={spec.name || ""}
                          onChange={(e) => {
                            const updated = [...(program.specializations || [])];
                            updated[index] = { ...updated[index], name: e.target.value };
                            updateProgram(program._id, "specializations", updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                          type="text"
                          placeholder="Specialization Description"
                          value={spec.desc || ""}
                          onChange={(e) => {
                            const updated = [...(program.specializations || [])];
                            updated[index] = { ...updated[index], desc: e.target.value };
                            updateProgram(program._id, "specializations", updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const updated = (program.specializations || []).filter((_, i) => i !== index);
                          updateProgram(program._id, "specializations", updated);
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(program.specializations || []), { name: "", desc: "" }];
                    updateProgram(program._id, "specializations", updated);
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <span className="material-symbols-outlined text-sm">add</span> Add Specialization
                </button>
              </div>

              {/* Why Choose Editor */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500">fact_check</span>
                  Why Choose SEG Items
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {(program.whyChoose || []).map((item, index) => (
                    <div key={index} className="flex gap-2 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={item.title || ""}
                          onChange={(e) => {
                            const updated = [...(program.whyChoose || [])];
                            updated[index] = { ...updated[index], title: e.target.value };
                            updateProgram(program._id, "whyChoose", updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <input
                          type="text"
                          placeholder="Feature Description"
                          value={item.desc || ""}
                          onChange={(e) => {
                            const updated = [...(program.whyChoose || [])];
                            updated[index] = { ...updated[index], desc: e.target.value };
                            updateProgram(program._id, "whyChoose", updated);
                          }}
                          className="w-full bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const updated = (program.whyChoose || []).filter((_, i) => i !== index);
                          updateProgram(program._id, "whyChoose", updated);
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(program.whyChoose || []), { title: "", desc: "" }];
                    updateProgram(program._id, "whyChoose", updated);
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <span className="material-symbols-outlined text-sm">add</span> Add Why Choose
                </button>
              </div>

              {/* Careers Editor */}
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-500">work</span>
                  Career Paths (Comma-separated)
                </h3>
                <input
                  type="text"
                  placeholder="e.g. Software Developer, Data Scientist, IT Consultant"
                  value={(program.careers || []).join(", ")}
                  onChange={(e) => {
                    const val = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                    updateProgram(program._id, "careers", val);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
