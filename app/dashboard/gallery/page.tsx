"use client";
import { useState, useRef, useEffect } from "react";

type GalleryImage = {
  id: number;
  title: string;
  url: string;
  category: string;
  description?: string;
};

const ALL_MOMENTS = "All Moments";

const categories = [
  ALL_MOMENTS,
  "Campus Views",
  "Library",
  "Transport",
  "Sports",
  "Gallery",
  "Computer Labs",
] as const;

const uploadCategories = categories.filter((c) => c !== ALL_MOMENTS);

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>(ALL_MOMENTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImg, setEditingImg] = useState<GalleryImage | null>(null);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState<{ title: string; category: (typeof uploadCategories)[number]; url: string; description: string }>(
    { title: "", category: uploadCategories[0], url: "", description: "" }
  );
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const countFor = (cat: (typeof categories)[number]) =>
    cat === ALL_MOMENTS ? images.length : images.filter((i) => i.category === cat).length;

  const filtered =
    selectedCategory === ALL_MOMENTS
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const resetForm = () => {
    setForm({ title: "", category: uploadCategories[0], url: "", description: "" });
    if (fileRef.current) fileRef.current.value = "";
  };

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

  const handleAdd = async () => {
    if (!form.title.trim()) {
      setFormError("Image title is required.");
      return;
    }
    if (!form.url) {
      setFormError("Please upload an image.");
      return;
    }
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category,
          url: form.url,
          description: form.description.trim(),
        }),
      });
      if (res.ok) {
        const saved = await res.json();
        setImages((prev) => [...prev, saved]);
        setFormError("");
        setShowAddForm(false);
        resetForm();
        setSelectedCategory(form.category);
      }
    } catch (e) {
      console.error(e);
      setFormError("Failed to save image. Please try again.");
    }
  };

  const handleEditSave = async () => {
    if (!editingImg) return;
    try {
      const res = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingImg),
      });
      if (res.ok) {
        const saved = await res.json();
        setImages((prev) => prev.map((x) => (x.id === saved.id ? saved : x)));
        setEditingImg(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) setImages((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const openAddForm = () => {
    setShowAddForm(true);
    setFormError("");

    if (selectedCategory !== ALL_MOMENTS) {
      const cat = selectedCategory as (typeof uploadCategories)[number];
      setForm((f) => ({ ...f, category: cat }));
    }
  };

  return (
    <div className="space-y-5">
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
              <select
                value={editingImg.category}
                onChange={(e) => setEditingImg({ ...editingImg, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {uploadCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <input
              value={editingImg.title}
              onChange={(e) => setEditingImg({ ...editingImg, title: e.target.value })}
              placeholder="Image title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <input
              value={editingImg.description || ""}
              onChange={(e) => setEditingImg({ ...editingImg, description: e.target.value })}
              placeholder="Short description (optional)"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Replace Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleFile(e, true)} className="w-full text-sm text-slate-600" />
            </div>
            {editingImg.url && (
              <img src={editingImg.url} alt="preview" className="w-full h-40 object-cover rounded-xl border border-slate-200" />
            )}
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditingImg(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={handleEditSave} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">Gallery</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage campus gallery images by category</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
        >
          <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Images", value: images.length, icon: "photo_library", color: "bg-indigo-500" },
          { label: "Transport", value: countFor("Transport"), icon: "directions_bus", color: "bg-blue-500" },
          { label: "Sports", value: countFor("Sports"), icon: "sports_soccer", color: "bg-emerald-500" },
          { label: "Computer Labs", value: countFor("Computer Labs"), icon: "computer", color: "bg-amber-500" },
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

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-500 mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat} ({countFor(cat)})
              </button>
            ))}
          </div>
        </div>

        {showAddForm && (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-800">Add New Image</h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setFormError("");
                  resetForm();
                }}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white"
              >
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as (typeof uploadCategories)[number] })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {uploadCategories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Image Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Welcome to SEG"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description (optional)</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short caption for this image"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 mb-1.5 block">Upload Image</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFile(e)}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
            </div>
            {form.url && (
              <img src={form.url} alt="preview" className="w-full max-h-48 object-cover rounded-xl border border-slate-200" />
            )}
            {formError && <p className="text-sm text-rose-600">{formError}</p>}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setFormError("");
                  resetForm();
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-white"
              >
                Cancel
              </button>
              <button onClick={handleAdd} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700">
                Save Image
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <p className="text-slate-500 py-8 text-center text-sm">Loading gallery...</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-3">photo_library</span>
            <p className="text-sm font-semibold">No images in &quot;{selectedCategory}&quot;</p>
            <p className="text-xs mt-1">Click &quot;Add Image&quot; to upload</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img) => (
              <div key={img.id} className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                <div className="aspect-square relative">
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/50 text-white text-[10px] font-bold">
                    {img.category}
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-slate-700 truncate">{img.title}</p>
                  {img.description && (
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{img.description}</p>
                  )}
                  <div className="flex gap-1.5 mt-2">
                    <button
                      onClick={() => setEditingImg(img)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors text-xs font-semibold"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-slate-400">
          {filtered.length} image{filtered.length !== 1 ? "s" : ""} in &quot;{selectedCategory}&quot;
        </div>
      </div>
    </div>
  );
}
