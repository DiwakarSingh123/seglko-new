"use client";

import { useEffect, useRef, useState } from "react";

type HappeningItem = {
  _id: string;
  title: string;
  category: string;
  date: string;
  description?: string;
  image?: string;
  url?: string;
};

const categories = ["Engineering", "Pharmacy", "Law", "Polytechnic"] as const;
const emptyForm = {
  title: "",
  category: "Engineering",
  date: new Date().toISOString().slice(0, 10),
  description: "",
  image: "",
  url: "#",
};

export default function HappeningsPage() {
  const [items, setItems] = useState<HappeningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<HappeningItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/happenings");
      if (res.ok) setItems(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const reset = () => {
    setForm(emptyForm);
    setEditing(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const closeForm = () => {
    setShowForm(false);
    reset();
  };

  const openEdit = (item: HappeningItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category || "Engineering",
      date: item.date || emptyForm.date,
      description: item.description || "",
      image: item.image || "",
      url: item.url || "#",
    });
    setShowForm(true);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm((current) => ({ ...current, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const saveItem = async () => {
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      let finalImageUrl = form.image;

      // If the image is a base64 encoded image, upload it to Cloudinary first
      if (form.image && form.image.startsWith("data:image/")) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: form.image, folder: "seglko-happenings" }),
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload image to Cloudinary.");
        }

        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      const payload = {
        ...(editing ? { _id: editing._id } : {}),
        title: form.title.trim(),
        category: form.category,
        date: form.date,
        description: form.description.trim(),
        image: finalImageUrl,
        url: form.url.trim() || "#",
      };

      const res = await fetch("/api/happenings", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();
      setItems((prev) =>
        editing ? prev.map((item) => (item._id === saved._id ? saved : item)) : [saved, ...prev]
      );
      closeForm();
    } catch (e) {
      console.error(e);
      setError("Could not save this item. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this happening item?")) return;
    try {
      const res = await fetch(`/api/happenings?id=${id}`, { method: "DELETE" });
      if (res.ok) setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const countFor = (category: string) => items.filter((item) => item.category === category).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-800">What's Happening</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage cards for the home section and institutions page</p>
        </div>
        <button
          type="button"
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="h-9 w-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white mb-3 shadow-md">
              <span className="material-symbols-outlined text-lg">event_note</span>
            </div>
            <div className="text-2xl font-black text-slate-800">{loading ? "..." : countFor(category)}</div>
            <div className="text-xs text-slate-400 mt-0.5">{category}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-800">{editing ? "Edit Item" : "Add New Item"}</h2>
            <button onClick={closeForm} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Title *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="Event or news title"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Read More Link</label>
              <input
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="/events/example or https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
                placeholder="Short text for the What's Happening page"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 mb-1.5 block">Image</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>
          {form.image && <img src={form.image} alt="Preview" className="w-full max-h-56 object-cover rounded-xl border border-slate-200" />}
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <div className="flex justify-end gap-3">
            <button onClick={closeForm} disabled={uploading} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60">
              Cancel
            </button>
            <button
              onClick={saveItem}
              disabled={uploading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
            >
              {uploading && <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>}
              {uploading ? "Saving..." : (editing ? "Save Changes" : "Save Item")}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-slate-500 p-6 text-sm">Loading happenings...</p>
        ) : items.length === 0 ? (
          <p className="text-slate-500 p-6 text-sm">No happenings added yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Item", "Category", "Date", ""].map((heading) => (
                  <th key={heading} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        {item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" /> : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                        {item.description && <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600">{item.category}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{item.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => openEdit(item)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => deleteItem(item._id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
