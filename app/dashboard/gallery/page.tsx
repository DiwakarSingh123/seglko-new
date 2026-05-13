"use client";
import { useState, useRef, useEffect } from "react";

type GalleryImage = { id: number; title: string; url: string; section: string; category: string };

const sections = [
  { id: "about", label: "About SEG", categories: ["History", "Campus", "Events", "Leadership", "General"] },
  { id: "programs", label: "Programs", categories: ["Engineering", "Management", "Pharmacy", "Education", "General"] },
  { id: "admission", label: "Admission", categories: ["Campus Tour", "Orientation", "Registration", "General"] },
  { id: "research", label: "R & D", categories: ["Research", "Labs", "Publications", "Events", "General"] },
  { id: "institutions", label: "Our Institutions", categories: ["SIET", "SIMS", "SCP", "SCOE", "SMCH", "General"] },
  { id: "student-zone", label: "Student Zone", categories: ["Campus Views", "Library", "Students", "Events", "Facilities"] },
  { id: "placements", label: "Placements", categories: ["Placement Drive", "Award Ceremony", "Company Visit", "General"] },
  { id: "contact", label: "Contact Us", categories: ["Campus", "Office", "Events", "General"] },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedSection, setSelectedSection] = useState(sections[0].id);
  const [selectedCategory, setSelectedCategory] = useState(sections[0].categories[0]);
  const [showModal, setShowModal] = useState(false);
  const [editingImg, setEditingImg] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState({ title: "", section: sections[0].id, category: sections[0].categories[0], url: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gallery_images");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("gallery_images", JSON.stringify(images));
  }, [images]);

  const currentSection = sections.find((s) => s.id === selectedSection)!;
  const filtered = images.filter((img) => img.section === selectedSection && img.category === selectedCategory);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      if (isEdit && editingImg) setEditingImg({ ...editingImg, url });
      else setForm((f) => ({ ...f, url }));
    };
    reader.readAsDataURL(file);
  };

  const handleSectionChange = (sectionId: string) => {
    const sec = sections.find((s) => s.id === sectionId)!;
    setSelectedSection(sectionId);
    setSelectedCategory(sec.categories[0]);
  };

  const handleFormSectionChange = (sectionId: string) => {
    const sec = sections.find((s) => s.id === sectionId)!;
    setForm({ ...form, section: sectionId, category: sec.categories[0] });
  };

  const handleAdd = () => {
    if (!form.url) return;
    setImages((prev) => [...prev, { id: Date.now(), title: form.title || "Untitled", section: form.section, category: form.category, url: form.url }]);
    setForm({ title: "", section: sections[0].id, category: sections[0].categories[0], url: "" });
    if (fileRef.current) fileRef.current.value = "";
    setShowModal(false);
  };

  const handleEditSave = () => {
    if (!editingImg) return;
    setImages((prev) => prev.map((x) => x.id === editingImg.id ? editingImg : x));
    setEditingImg(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?"))
      setImages((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Add Image</h2>
              <button onClick={() => setShowModal(false)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Section</label>
              <select value={form.section} onChange={(e) => handleFormSectionChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {sections.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {sections.find((s) => s.id === form.section)?.categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Image title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Upload Image</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleFile(e)} className="w-full text-sm text-slate-600" />
            </div>
            {form.url && <img src={form.url} alt="preview" className="w-full h-40 object-cover rounded-xl border border-slate-200" />}
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Edit Image</h2>
              <button onClick={() => setEditingImg(null)} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Section</label>
              <select value={editingImg.section} onChange={(e) => {
                const sec = sections.find((s) => s.id === e.target.value)!;
                setEditingImg({ ...editingImg, section: e.target.value, category: sec.categories[0] });
              }} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {sections.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
              <select value={editingImg.category} onChange={(e) => setEditingImg({ ...editingImg, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {sections.find((s) => s.id === editingImg.section)?.categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <input value={editingImg.title} onChange={(e) => setEditingImg({ ...editingImg, title: e.target.value })}
              placeholder="Image title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Replace Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleFile(e, true)} className="w-full text-sm text-slate-600" />
            </div>
            {editingImg.url && <img src={editingImg.url} alt="preview" className="w-full h-40 object-cover rounded-xl border border-slate-200" />}
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingImg(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button onClick={handleEditSave} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Gallery</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage images for all website sections</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
          <span className="material-symbols-outlined text-lg">add_photo_alternate</span>Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Images", value: images.length, icon: "photo_library", color: "bg-indigo-500" },
          { label: "Sections Used", value: sections.filter((s) => images.some((img) => img.section === s.id)).length, icon: "folder", color: "bg-blue-500" },
          { label: "About SEG", value: images.filter(i => i.section === "about").length, icon: "info", color: "bg-purple-500" },
          { label: "Placements", value: images.filter(i => i.section === "placements").length, icon: "work", color: "bg-emerald-500" },
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

      {/* Filters + Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50">
              {currentSection.categories.map((c) => (
                <option key={c}>{c} ({images.filter(i => i.section === selectedSection && i.category === c).length})</option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-3">photo_library</span>
            <p className="text-sm font-semibold">No images in "{currentSection.label} → {selectedCategory}"</p>
            <p className="text-xs mt-1">Click "Add Image" to upload</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div key={img.id} className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                <div className="aspect-square relative">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-slate-700 truncate mb-2">{img.title}</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => setEditingImg(img)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">edit</span>Edit
                    </button>
                    <button onClick={() => handleDelete(img.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">delete</span>Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-xs text-slate-400">{filtered.length} image{filtered.length !== 1 ? "s" : ""} in "{currentSection.label} → {selectedCategory}"</div>
      </div>
    </div>
  );
}
