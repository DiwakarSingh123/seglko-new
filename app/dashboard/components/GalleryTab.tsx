"use client";
import { useState, useRef } from "react";

type GalleryImage = { id: number; title: string; url: string; category: string };

interface GalleryTabProps {
  section: string;
  categories: string[];
}

export default function GalleryTab({ section, categories }: GalleryTabProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCat, setSelectedCat] = useState(categories[0]);
  const [showModal, setShowModal] = useState(false);
  const [editingImg, setEditingImg] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState({ title: "", category: categories[0], url: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = images.filter((img) => img.category === selectedCat);

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

  const handleAdd = () => {
    if (!form.title.trim() || !form.url) return;
    setImages((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ title: "", category: categories[0], url: "" });
    setShowModal(false);
  };

  const handleEditSave = () => {
    if (!editingImg) return;
    setImages((prev) => prev.map((x) => x.id === editingImg.id ? editingImg : x));
    setEditingImg(null);
  };

  return (
    <div className="space-y-4">
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
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Image title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200" />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Upload Image</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleFile(e)}
                className="w-full text-sm text-slate-600" />
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
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
              <select value={editingImg.category} onChange={(e) => setEditingImg({ ...editingImg, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                {categories.map((c) => <option key={c}>{c}</option>)}
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

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Select Category</label>
            <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors">
            <span className="material-symbols-outlined text-sm">add_photo_alternate</span>Add Image
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-3">photo_library</span>
            <p className="text-sm font-semibold">No images in "{selectedCat}"</p>
            <p className="text-xs mt-1">Click "Add Image" to upload</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div key={img.id} className="group relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50 aspect-square">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <p className="text-white text-xs font-semibold truncate">{img.title}</p>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setEditingImg(img)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/40 text-white transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button onClick={() => setImages((prev) => prev.filter((x) => x.id !== img.id))} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-500/80 hover:bg-rose-600 text-white transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-3 text-xs text-slate-400">{filtered.length} image{filtered.length !== 1 ? "s" : ""} in "{selectedCat}"</div>
      </div>
    </div>
  );
}
