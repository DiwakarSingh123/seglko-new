"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HappeningItem = {
  _id: string;
  title: string;
  type?: string;
  category: string;
  date: string;
  description?: string;
  image?: string;
  url?: string;
};

const categories = ["Engineering", "Pharmacy", "Law", "Polytechnic"] as const;
const ALL_CATEGORIES = "All";
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
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES);
  const fileRef = useRef<HTMLInputElement>(null);

  const visibleItems = useMemo(
    () =>
      selectedCategory === ALL_CATEGORIES
        ? items
        : items.filter((item) => item.category === selectedCategory),
    [items, selectedCategory]
  );

  const latestDate = useMemo(() => {
    const validDates = items
      .map((item) => item.date)
      .filter(Boolean)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    return validDates[0] || "-";
  }, [items]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/happenings");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
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
        type: "whats_happening",
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
            <span className="material-symbols-outlined text-base">campaign</span>
            Site CMS
          </div>
          <h1 className="mt-1 text-2xl font-black text-slate-900">What's Happening</h1>
          <p className="mt-1 text-sm text-slate-500">Manage news, notices, workshops, and institution updates shown on the website.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            reset();
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-colors hover:bg-indigo-700"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Items", value: items.length, icon: "dynamic_feed", color: "bg-indigo-600" },
          { label: "Engineering", value: countFor("Engineering"), icon: "engineering", color: "bg-blue-500" },
          { label: "Pharmacy", value: countFor("Pharmacy"), icon: "local_pharmacy", color: "bg-emerald-500" },
          { label: "Latest Date", value: latestDate, icon: "calendar_month", color: "bg-amber-500" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-400">{stat.label}</div>
                <div className="mt-2 break-words text-2xl font-black leading-tight text-slate-900">{loading ? "..." : stat.value}</div>
              </div>
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${stat.color} text-white shadow-md`}>
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-black text-slate-800">Content Library</h2>
            <p className="mt-1 text-xs text-slate-400">
              {loading ? "Loading items..." : `${visibleItems.length} of ${items.length} items visible`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[ALL_CATEGORIES, ...categories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category} ({category === ALL_CATEGORIES ? items.length : countFor(category)})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden">
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
        <div className="rounded-2xl border border-indigo-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-black text-slate-800">{editing ? "Edit Item" : "Add New Item"}</h2>
              <p className="mt-0.5 text-xs text-slate-400">{editing ? "Update the selected website update." : "Create a new update for the public site."}</p>
            </div>
            <button onClick={closeForm} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
          <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
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
          {form.image && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img src={form.image} alt="Preview" className="h-56 w-full object-cover" />
            </div>
          )}
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
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
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="text-slate-500 p-6 text-sm">Loading happenings...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center text-slate-400">
            <span className="material-symbols-outlined mb-3 text-5xl">event_busy</span>
            <p className="text-sm font-semibold text-slate-600">No happenings added yet</p>
            <p className="mt-1 text-xs">Add your first item to publish it on the website.</p>
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center text-slate-400">
            <span className="material-symbols-outlined mb-3 text-5xl">filter_alt_off</span>
            <p className="text-sm font-semibold text-slate-600">No items in {selectedCategory}</p>
            <p className="mt-1 text-xs">Choose another category or add a new item.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="bg-slate-50/70">
              <tr className="border-b border-slate-100">
                {["Item", "Category", "Date", ""].map((heading) => (
                  <th key={heading} className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleItems.map((item) => (
                <tr key={item._id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-slate-300">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-2xl">image</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                        {item.description && <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>}
                        {item.url && item.url !== "#" && <p className="mt-1 truncate text-[10px] font-semibold text-indigo-500">{item.url}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600">{item.category}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{item.date}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-1.5">
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
          </div>
        )}
      </div>
    </div>
  );
}
