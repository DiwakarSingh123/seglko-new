"use client";
import { useState, useEffect, useCallback } from "react";

interface Highlight { title: string; desc: string; }
interface Specialization { name: string; desc: string; }
interface WhyChoose { title: string; desc: string; }

interface Program {
  _id?: string;
  name: string; description: string; level: string; duration: string;
  seats: number; institution: string; status: string; fee: string;
  color: string; slug: string; label: string; subtitle: string; image: string;
  highlights: Highlight[]; specializations: Specialization[];
  whyChoose: WhyChoose[]; careers: string[];
}

const levelColors: Record<string, string> = {
  UG: "bg-blue-100 text-blue-700",
  PG: "bg-purple-100 text-purple-700",
  Diploma: "bg-amber-100 text-amber-700",
};

const emptyProgram = (): Omit<Program, '_id'> => ({
  name: "", description: "", level: "UG", duration: "", seats: 0,
  institution: "", status: "Active", fee: "", color: "blue",
  slug: "", label: "", subtitle: "", image: "",
  highlights: [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }],
  specializations: [{ name: "", desc: "" }, { name: "", desc: "" }, { name: "", desc: "" }, { name: "", desc: "" }],
  whyChoose: [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }],
  careers: ["", "", "", "", "", ""],
});

async function uploadToCloudinary(base64: string): Promise<string> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64, folder: 'seglko-programs' }),
  });
  const data = await res.json();
  return data.url || '';
}

// ── ArrayEditor — defined OUTSIDE component ──
function ArrayEditor({ label, items, fields, onChange }: {
  label: string; items: any[]; fields: string[]; onChange: (items: any[]) => void;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-slate-600">{label}</label>
        <button type="button" onClick={() => onChange([...items, Object.fromEntries(fields.map(f => [f, '']))])}
          className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">+ Add</button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            {fields.map(f => (
              <input key={f} type="text" placeholder={f} value={item[f] || ''}
                onChange={e => { const arr = [...items]; arr[i] = { ...arr[i], [f]: e.target.value }; onChange(arr); }}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:ring-2 focus:ring-indigo-200" />
            ))}
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="text-rose-400 hover:text-rose-600 mt-1 flex-shrink-0">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CareersEditor — defined OUTSIDE component ──
function CareersEditor({ careers, onChange }: { careers: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-slate-600">Career Paths</label>
        <button type="button" onClick={() => onChange([...careers, ''])}
          className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100">+ Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {careers.map((c, i) => (
          <div key={i} className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
            <input type="text" value={c} placeholder="Career"
              onChange={e => { const arr = [...careers]; arr[i] = e.target.value; onChange(arr); }}
              className="bg-transparent text-xs outline-none w-28" />
            <button type="button" onClick={() => onChange(careers.filter((_, idx) => idx !== i))}
              className="text-rose-400 hover:text-rose-600">
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── FormSection — defined OUTSIDE component ──
function FormSection({ program, onChange, uploadingImg, onImageFile }: {
  program: any;
  onChange: (field: string, val: any) => void;
  uploadingImg: boolean;
  onImageFile: (file: File) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Name *</label>
          <input type="text" value={program.name} onChange={e => onChange('name', e.target.value)}
            placeholder="e.g. Bachelor of Technology"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Slug (URL) *</label>
          <input type="text" value={program.slug} onChange={e => onChange('slug', e.target.value)}
            placeholder="e.g. btech"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Label</label>
          <input type="text" value={program.label || ''} onChange={e => onChange('label', e.target.value)}
            placeholder="e.g. UNDERGRADUATE PROGRAM"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Subtitle</label>
          <input type="text" value={program.subtitle || ''} onChange={e => onChange('subtitle', e.target.value)}
            placeholder="e.g. (B.Tech)"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1.5">Description</label>
        <textarea rows={2} value={program.description} onChange={e => onChange('description', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none" />
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Level</label>
          <select value={program.level} onChange={e => onChange('level', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
            <option value="UG">UG</option><option value="PG">PG</option><option value="Diploma">Diploma</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Duration</label>
          <input type="text" value={program.duration} onChange={e => onChange('duration', e.target.value)}
            placeholder="e.g. 4 Years"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Seats</label>
          <input type="number" value={program.seats} onChange={e => onChange('seats', Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Fee</label>
          <input type="text" value={program.fee} onChange={e => onChange('fee', e.target.value)}
            placeholder="e.g. ₹80,000/yr"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Institution</label>
          <input type="text" value={program.institution} onChange={e => onChange('institution', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Status</label>
          <select value={program.status} onChange={e => onChange('status', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
            <option value="Active">Active</option><option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">Card Color</label>
          <select value={program.color} onChange={e => onChange('color', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200">
            {['blue', 'green', 'violet', 'orange', 'cyan'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-xs font-bold text-slate-600 mb-1.5">Program Image (Cloudinary)</label>
        <input type="file" accept="image/*"
          onChange={e => { const f = e.target.files?.[0]; if (f) onImageFile(f); }}
          className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
        {uploadingImg && <p className="text-xs text-indigo-500 mt-1">Uploading to Cloudinary...</p>}
        {program.image && (
          <div className="relative mt-2 w-40">
            <img src={program.image} alt="Program" className="w-full h-24 object-cover rounded-xl border border-slate-200" />
            <button type="button" onClick={() => onChange('image', '')}
              className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600">
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          </div>
        )}
      </div>

      <ArrayEditor label="Highlights (4 cards)" items={program.highlights || []}
        fields={['title', 'desc']} onChange={v => onChange('highlights', v)} />
      <ArrayEditor label="Specializations" items={program.specializations || []}
        fields={['name', 'desc']} onChange={v => onChange('specializations', v)} />
      <ArrayEditor label="Why Choose SEG" items={program.whyChoose || []}
        fields={['title', 'desc']} onChange={v => onChange('whyChoose', v)} />
      <CareersEditor careers={program.careers || []} onChange={v => onChange('careers', v)} />
    </div>
  );
}

// ── Main Page ──
export default function ProgramsPage() {
  const [programsList, setProgramsList] = useState<Program[]>([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Separate edit state — does NOT touch programsList on every keystroke
  const [editData, setEditData] = useState<Program | null>(null);
  const [newProgram, setNewProgram] = useState(emptyProgram());
  const [uploadingNew, setUploadingNew] = useState(false);
  const [uploadingEdit, setUploadingEdit] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => { fetchPrograms(); }, []);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/programs");
      if (res.ok) setProgramsList(await res.json());
    } catch (e) { console.error(e); }
    setIsLoading(false);
  };

  const filtered = programsList.filter(p => {
    const s = p.name.toLowerCase().includes(search.toLowerCase()) || (p.institution || '').toLowerCase().includes(search.toLowerCase());
    return s && (level === "All" || p.level === level);
  });

  // Toggle expand — copy program into editData
  const toggleExpand = (program: Program) => {
    if (expandedId === program._id) {
      setExpandedId(null);
      setEditData(null);
    } else {
      setExpandedId(program._id!);
      setEditData({ ...program });
    }
  };

  // Edit field changes only editData
  const handleEditChange = useCallback((field: string, val: any) => {
    setEditData(prev => prev ? { ...prev, [field]: val } : prev);
  }, []);

  // New program field changes
  const handleNewChange = useCallback((field: string, val: any) => {
    setNewProgram(prev => ({ ...prev, [field]: val }));
  }, []);

  // Image upload helper
  const handleImageUpload = async (file: File, onChange: (url: string) => void, setUploading: (v: boolean) => void) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(reader.result as string);
        onChange(url);
      } catch { alert('Image upload failed'); }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Save edited program
  const saveEdit = async () => {
    if (!editData) return;
    setSavingId(editData._id!);
    try {
      await fetch("/api/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      // Update list with saved data
      setProgramsList(prev => prev.map(p => p._id === editData._id ? { ...editData } : p));
      alert(`Saved "${editData.name}"!`);
    } catch (e) { console.error(e); }
    setSavingId(null);
  };

  // Add new program
  const handleSaveNew = async () => {
    if (!newProgram.name.trim() || !newProgram.slug.trim()) {
      alert("Program name and slug are required."); return;
    }
    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProgram),
      });
      if (res.ok) {
        const saved = await res.json();
        setProgramsList(prev => [saved, ...prev]);
        setShowAddForm(false);
        setNewProgram(emptyProgram());
        alert("Program added!");
      }
    } catch (e) { console.error(e); }
  };

  const deleteProgram = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    try {
      const res = await fetch(`/api/programs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProgramsList(prev => prev.filter(p => p._id !== id));
        if (expandedId === id) { setExpandedId(null); setEditData(null); }
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800">Programs</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage all academic programs — content, image, highlights & careers</p>
        </div>
        <button onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 w-full sm:w-auto">
          <span className="material-symbols-outlined text-lg">add</span>Add Program
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Programs", value: programsList.length, icon: "menu_book", color: "bg-indigo-500" },
          { label: "UG Programs", value: programsList.filter(p => p.level === "UG").length, icon: "school", color: "bg-blue-500" },
          { label: "PG Programs", value: programsList.filter(p => p.level === "PG").length, icon: "workspace_premium", color: "bg-purple-500" },
          { label: "Total Seats", value: programsList.reduce((a, p) => a + (p.seats || 0), 0), icon: "chair", color: "bg-emerald-500" },
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

      {/* Filter + Search */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", "UG", "PG", "Diploma"].map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${level === l ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
              {l}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none">search</span>
          <input type="text" placeholder="Search programs..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900">Add New Program</h2>
              <p className="text-sm text-slate-500 mt-0.5">Fill all details and save.</p>
            </div>
            <button onClick={() => { setShowAddForm(false); setNewProgram(emptyProgram()); }}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
          <FormSection
            program={newProgram}
            onChange={handleNewChange}
            uploadingImg={uploadingNew}
            onImageFile={f => handleImageUpload(f, url => handleNewChange('image', url), setUploadingNew)}
          />
          <div className="flex justify-end gap-3 mt-5">
            <button onClick={() => { setShowAddForm(false); setNewProgram(emptyProgram()); }}
              className="px-5 py-2.5 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={handleSaveNew}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save Program</button>
          </div>
        </div>
      )}

      {/* Programs List */}
      {isLoading ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-sm text-slate-400">Loading programs...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-sm text-slate-400">No programs found.</div>
      ) : (
        filtered.map(program => (
          <div key={program._id} className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => toggleExpand(program)}>
              <div className="flex items-center gap-4">
                {program.image
                  ? <img src={program.image} alt={program.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                  : <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-indigo-400">school</span>
                    </div>
                }
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-black text-slate-900">{program.name}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${levelColors[program.level] || 'bg-slate-100 text-slate-500'}`}>{program.level}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{program.subtitle} • {program.duration} • {program.seats} seats • {program.institution}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={e => { e.stopPropagation(); deleteProgram(program._id!); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-500 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-colors">
                  <span className="material-symbols-outlined text-sm">delete</span>Delete
                </button>
                <span className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${expandedId === program._id ? 'rotate-180' : ''}`}>expand_more</span>
              </div>
            </div>

            {/* Edit form — uses editData not program directly */}
            {expandedId === program._id && editData && (
              <div className="border-t border-slate-100 p-5">
                <FormSection
                  program={editData}
                  onChange={handleEditChange}
                  uploadingImg={uploadingEdit}
                  onImageFile={f => handleImageUpload(f, url => handleEditChange('image', url), setUploadingEdit)}
                />
                <div className="flex justify-end mt-5">
                  <button onClick={saveEdit}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-semibold hover:bg-indigo-700">
                    <span className="material-symbols-outlined text-sm">save</span>
                    {savingId === editData._id ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
